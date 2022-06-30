import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Teste Página de Login', () => {
  it('Teste se os elementos estão na tela: link, inputs, button', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('textbox', { name: /nome/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /configurações/i })).toBeInTheDocument();
  });

  it('Botão de entrar é habilitado ao digitar nos campos, caso contrário desabilita', () => {
    renderWithRouterAndRedux(<App />);
    const inputNome = screen.getByRole('textbox', { name: /nome/i });
    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toHaveAttribute('disabled');

    userEvent.type(inputNome, 'João');
    userEvent.type(inputEmail, 'joaopedrolveira7@gmail.com');

    expect(button).not.toHaveAttribute('disabled');
  });

  it('Teste se ao clicar no botão entrar ele é redirecionado para página do Game', () => {
    const response = {
      response_code: 0,
      response_message: "Token Generated Successfully!",
      token: "8fba62d626aeff3bc910381cc8b282f82cf9b71cefec1316b5701a4697c0d431",
    }

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    const inputNome = screen.getByRole('textbox', { name: /nome/i });
    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toHaveAttribute('disabled');

    userEvent.type(inputNome, 'João');
    userEvent.type(inputEmail, 'joaopedrolveira7@gmail.com')

    userEvent.click(button);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
    setTimeout(() => expect(history.location.pathname).toBe('/game') , 5000);
  });
});
