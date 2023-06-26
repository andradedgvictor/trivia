import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import Ranking from '../pages/Ranking';
import App from '../App';

const scoreState = {
    player: {
      name: 'Lucas',
      assertions: 4,
      score: 1000,
      gravatarEmail: 'email@email.com',
    }};

const rankingLocalStorage = [
    {
      name: 'Lucas',
      assertions: 4,
      score: 1000,
      gravatarEmail: 'email@email.com',
    },
    {
      name: 'Lucas',
      assertions: 2,
      score: 500,
      gravatarEmail: 'email@email.com',
    },
]

describe('Testa a página de Ranking', () => {
  it('Verifica se o botão com o data-testid "btn-go-home" aparece na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App/>, scoreState, '/ranking');

    const homeBtn = screen.getByTestId('btn-go-home')
    expect(homeBtn).toBeInTheDocument();

    userEvent.click(homeBtn);

    const { location: { pathname }} = history;
    expect(pathname).toBe('/');
  })

  it('Verifica se o ranking é renderizado corretamente', async () => {
    const setLocalStorage = (ranking, data) => {
      window.localStorage.setItem(ranking, JSON.stringify(data));
    };
    
    setLocalStorage('ranking', rankingLocalStorage)

    renderWithRouterAndRedux(<App/>, scoreState, '/ranking');

    const homeBtn = screen.getByTestId('btn-go-home')
    expect(homeBtn).toBeInTheDocument();

    const imgPlayer1 = screen.getByAltText('player-img-0');
    expect(imgPlayer1).toBeInTheDocument();
    const namePlayer1 = screen.getByTestId('player-name-0');
    expect(namePlayer1).toBeInTheDocument();
    expect(namePlayer1.innerHTML).toBe('Lucas');
    const scorePlayer1 = screen.getByTestId('player-score-0')
    expect(scorePlayer1).toBeInTheDocument();
    expect(scorePlayer1.innerHTML).toBe('1000');

    const imgPlayer2 = screen.getByAltText('player-img-1');
    expect(imgPlayer2).toBeInTheDocument();
    const namePlayer2 = screen.getByTestId('player-name-1');
    expect(namePlayer2).toBeInTheDocument();
    expect(namePlayer2.innerHTML).toBe('Lucas');
    const scorePlayer2 = screen.getByTestId('player-score-1')
    expect(scorePlayer2).toBeInTheDocument();
    expect(scorePlayer2.innerHTML).toBe('500');
  })
})