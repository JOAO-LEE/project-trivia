import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';

describe('Teste Página de Feedback', () => {
  it('Testando mensagem quando o assertions é menor que 3, e verificando elementos na tela.', () => {
    const INITAL_STATE = { player: { score: 136, assertions: 2, gravatarEmail: 'joaopedro4@gmail.com', name: 'joão' }};

    renderWithRouterAndRedux(<Feedback />, INITAL_STATE);
    
    expect(screen.getByText(/could be better\.\.\./i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /profile\-user/i })).toBeInTheDocument();
    expect(screen.getByText(/joão/i)).toBeInTheDocument();
    expect(screen.getAllByText(/136/i).length).toBe(2);
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });

  it('Teste se a API foi chamada, e a mensagem de assertions maior ou igual a 3 está correta', () => {
    const response = "https://www.gravatar.com/avatar/4f767c06c74e5ac127f143799d8f017e";

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    const INITAL_STATE = { player: { score: 206, assertions: 4, gravatarEmail: 'joaopedro4@gmail.com', name: 'joão' }};
    renderWithRouterAndRedux(<Feedback />, INITAL_STATE);

    expect(screen.getByText(/Well Done!/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.gravatar.com/avatar/4f767c06c74e5ac127f143799d8f017e');
  });
});
