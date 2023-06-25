import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';
const { questionsResponse, invalidTokenQuestionsResponse } = require('../../cypress/mocks/questions');

const badScoreState = {
  player: {
    name: 'Lucas',
    assertions: 2,
    score: 500,
    gravatarEmail: 'email@email.com',
  }};

const goodScoreState = {
  player: {
    name: 'Lucas',
    assertions: 4,
    score: 1000,
    gravatarEmail: 'email@email.com',
  }};

describe('pagina de Feedback', () => {
  test('testa se componentes aparecem na tela quando tem mais de 3 acertos', () => {
    
    const { history } = renderWithRouterAndRedux(<App />, goodScoreState, '/feedback');

    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent(/well done/i);

    const totalScoreText = screen.getByTestId('feedback-total-score');
    expect(totalScoreText).toHaveTextContent('1000');

    const assertionsText = screen.getByTestId('feedback-total-question');
    expect(assertionsText).toHaveTextContent('4')

    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toHaveTextContent('Lucas');

    const profilePicture = screen.getByTestId('header-profile-picture');
    expect(profilePicture).toBeInTheDocument();

});

test('testa se componentes aparecem na tela quando menos de 3 acertos', () => {
    
  const { history } = renderWithRouterAndRedux(<App />, badScoreState, '/feedback');

  const feedbackText = screen.getByTestId('feedback-text');
  expect(feedbackText).toHaveTextContent(/could be/i);

  const totalScoreText = screen.getByTestId('feedback-total-score');
  expect(totalScoreText).toHaveTextContent('500');

  const assertionsText = screen.getByTestId('feedback-total-question');
  expect(assertionsText).toHaveTextContent('2')

});

test('testa se ao clicar em Play Again o jogo recomeça', async () => {
    
  const { history } = renderWithRouterAndRedux(<App />, badScoreState, '/feedback');

  const btnPlayAgain = screen.getByTestId('btn-play-again');
  expect(btnPlayAgain).toBeInTheDocument();

  act(() => {
    userEvent.click(btnPlayAgain)
}) 

await waitFor(() => {
  expect(history.location.pathname).toEqual('/');
});
});

test('testa se ao clicar em Play Again o jogo recomeça', async () => {
    
  const { history } = renderWithRouterAndRedux(<App />, badScoreState, '/feedback');

  const btnRanking = screen.getByTestId('btn-ranking');
  expect(btnRanking).toBeInTheDocument();

  act(() => {
    userEvent.click(btnRanking)
}) 

await waitFor(() => {
  expect(history.location.pathname).toEqual('/ranking');
});
});

})