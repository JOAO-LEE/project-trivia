import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockTrivia from './mocks/mockTrivia';

describe('Teste Página de Jogo', () => {
  beforeEach(() => {
    const response = mockTrivia;

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null),
      },
      writable: true
    });
  });

  it('Teste respostas corretas e incorretas na tela do jogo.', async () => {
    const INITIAL_STATE = { player: {
      name : "João Pedro",
      assertions: 0,
      score: 0,
      gravatarEmail:"joaumlimaum@gmail.com",
    }} 

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE);
    history.push('./game');

    await waitFor(() => expect(screen.getByTestId('correct-answer')).toBeInTheDocument());
    expect(history.location.pathname).toBe('/game');
    expect(screen.getByTestId('header-player-name')).toBeInTheDocument()
    expect(screen.getByTestId('header-player-name')).toHaveTextContent(/joão pedro/i)
    expect(screen.getByTestId('header-profile-picture')).toBeInTheDocument()
    
    expect(screen.getByTestId('wrong-answer-0')).toBeInTheDocument();
    expect(screen.getByTestId('wrong-answer-1')).toBeInTheDocument();
    expect(screen.getByTestId('wrong-answer-2')).toBeInTheDocument();

    expect(screen.getByTestId('correct-answer')).not.toHaveAttribute('style')
    userEvent.click(screen.getByTestId('correct-answer'));
    expect(screen.getByTestId('correct-answer')).toHaveAttribute('style', "border: 3px solid rgb(6, 240, 15);")
    
    expect(screen.getByTestId('header-score')).toHaveTextContent(70);
    expect(screen.getByTestId('question-category')).toHaveTextContent('Vehicles');


    expect(screen.getByTestId('question-text')).toBeInTheDocument();
    expect(screen.getByTestId('question-category')).toBeInTheDocument();
    expect(screen.getByText(/Which car brand does NOT belong to General Motors/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.queryByText(/Which car brand does NOT belong to General Motors/i)).not.toBeInTheDocument();

    await waitFor(() => expect(screen.getByTestId('correct-answer')).not.toHaveAttribute('disabled'));
    

    userEvent.click(screen.getByTestId('correct-answer'));
    expect(screen.getByTestId('header-score')).toHaveTextContent(167);
    userEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => expect(screen.getByTestId('correct-answer')).not.toHaveAttribute('disabled'));

    userEvent.click(screen.getByTestId('correct-answer'));
    expect(screen.getByTestId('header-score')).toHaveTextContent(206);
    userEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => expect(screen.getByTestId('correct-answer')).not.toHaveAttribute('disabled'));
  
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    expect(screen.getByTestId('header-score')).toHaveTextContent(206);
    userEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => expect(screen.getByTestId('correct-answer')).not.toHaveAttribute('disabled'));

    expect(screen.getByTestId('wrong-answer-0')).not.toHaveAttribute('style');
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    expect(screen.getByTestId('wrong-answer-0')).toHaveAttribute('style', "border: 3px solid red;");
    expect(screen.getByTestId('header-score')).toHaveTextContent(206);
    expect(screen.getByRole('img', { name: /user\-profile/i })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(window.localStorage.getItem).toHaveBeenCalledWith('token');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('allPlayers', "[{\"name\":\"João Pedro\",\"assertions\":3,\"score\":206,\"gravatarEmail\":\"joaumlimaum@gmail.com\"}]");

    await waitFor(() => expect(screen.getByTestId('btn-ranking')).toBeInTheDocument());
    expect(history.location.pathname).toBe('/feedback');
  });

  it('Teste se ao colocar um token inválido é redirecionado para o login.', async () => {
    const response = {
      "response_code": 3,
      "results": []
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
    userEvent.type(inputEmail, 'joaopedrolveira7@gmail.com');

    userEvent.click(button);

    expect(history.location.pathname).toBe('/');
  });

  it('' , async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => '[{"name":"robinho","assertions":1,"score":68,"gravatarEmail":"robsonsilva07@gmail.com"},{"name":"aaaa","assertions":2,"score":108,"gravatarEmail":"asdasdasdasd@mmail.ocm"}]'),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null),
      },
      writable: true
    });

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('./game');

    await waitFor(() => expect(screen.getByTestId('correct-answer')).toBeInTheDocument());
    expect(history.location.pathname).toBe('/game');

    for(let i = 0; i <= 3; i += 1) {
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(screen.getByRole('button', { name: /next/i }));
      await waitFor(() => expect(screen.getByTestId('correct-answer')).not.toHaveAttribute('disabled'));
    }

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(window.localStorage.setItem).toHaveBeenCalledWith('allPlayers', "[{\"name\":\"robinho\",\"assertions\":1,\"score\":68,\"gravatarEmail\":\"robsonsilva07@gmail.com\"},{\"name\":\"aaaa\",\"assertions\":2,\"score\":108,\"gravatarEmail\":\"asdasdasdasd@mmail.ocm\"},{\"name\":\"\",\"assertions\":5,\"score\":313,\"gravatarEmail\":\"\"}]");
  });
});
