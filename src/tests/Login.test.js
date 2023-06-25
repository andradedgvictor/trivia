import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';
import { fetchAPIQuestions } from '../redux/actions';

const mockGetRequest = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6",
}

describe('Tela de Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockGetRequest),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('componentes aparecem na tela', () => {
    renderWithRouterAndRedux(<Login />, {}, '/');

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
    
  })

  test('vai para a paginas /settings ao clicar no botão', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');

    const btnSettings = screen.getByTestId('btn-settings');

    act(() => {
      userEvent.click(btnSettings);
    })
      expect(history.location.pathname).toEqual('/settings');
  })

  test('fetch é chamado ao clicar no botão "Play"', async () => {
    const {store, history } = renderWithRouterAndRedux(<App />, {}, '/');

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    act(() => {
      userEvent.type(inputName, 'Zé');
      userEvent.type(inputEmail, 'ze@email.com');
    })

    expect(btnPlay).toBeEnabled();

    act(() => {
      userEvent.click(btnPlay);
    })

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/game');
    });
  
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request')
  })
})