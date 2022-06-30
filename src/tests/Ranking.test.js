import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react';
import Ranking from '../pages/Ranking';
import { screen, waitFor } from '@testing-library/react';

describe('Teste Página de Ranking', () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => '[{"name":"João Pedro de Oliveira Mateus","assertions":1,"score":88,"gravatarEmail":"joaopedromateus6@gmail.com"},{"name":"João Pedro de Oliveira Mateus","assertions":1,"score":89,"gravatarEmail":"joaopedromateus6@gmail.com"},{"name":"João Pedro de Oliveira Mateus","assertions":1,"score":90,"gravatarEmail":"joaopedromateus6@gmail.com"}]'),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });

  it('Teste se a página renderiza a imagem do player com a url correta.', async () => {
    const response = "https://www.gravatar.com/avatar/cad691c66ef98c56de0b2bdc24412071";

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    renderWithRouterAndRedux(<Ranking />);
    
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.gravatar.com/avatar/cad691c66ef98c56de0b2bdc24412071');
  
    await waitFor(() => expect(screen.getAllByRole('img', { name: /Logo do usuário/i })).toHaveLength(3));
  });
});
