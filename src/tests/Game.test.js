import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';
const { questionsResponse, invalidTokenQuestionsResponse } = require('../../cypress/mocks/questions');

describe('component Game', () => {

  test('testa o timer', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')

    const title = screen.getByText('Game');
    expect(title).toBeInTheDocument();

     await waitForElementToBeRemoved(() => 
          screen.getByText(/loading/i),
      )
  
    const timer = document.getElementById('timer');
    expect(timer).toHaveTextContent('30');

    await waitFor(() =>
    // expect(correctAnswer).BeDisabled(),
    expect(timer).toHaveTextContent('29'),
    {timeout: 1000 },
  );
    // expect(timer).toHaveTextContent('20');
  })

  test('testa se a primeira pergunta aparece na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')

    const title = screen.getByText('Game');
    expect(title).toBeInTheDocument();

     await waitForElementToBeRemoved(() => 
          screen.getByText(/loading/i),
      )

    const category = screen.getByTestId('question-category');
    expect(category).toBeInTheDocument();
    expect(category).toHaveTextContent('Geography');

    const question = screen.getByTestId('question-text');
    expect(question).toBeInTheDocument();
    expect(question).toHaveTextContent(/The Republic of Malta/i);
  
    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer).toHaveTextContent(/false/i);

    const incorrectAnswer = screen.getByTestId('wrong-answer-0');
    expect(incorrectAnswer).toBeInTheDocument();
    expect(incorrectAnswer).toHaveTextContent(/true/i);
  })

  test('testa se ao clicar no botão Next, vai para a segunda pergunta', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')

    const title = screen.getByText('Game');
    expect(title).toBeInTheDocument();

     await waitForElementToBeRemoved(() => 
          screen.getByText(/loading/i),
      )

    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer).toHaveTextContent(/false/i);

    
    act(() => {
        userEvent.click(correctAnswer)
    }) 
      
      const btnNext = screen.getByTestId('btn-next');

    act(() => {
        userEvent.click(btnNext)
    }) 

    const question = screen.getByTestId('question-text');
    expect(question).toBeInTheDocument();
    expect(question).toHaveTextContent(/In quantum physics,/i);

    const newCorrectAnswer = screen.getByTestId('correct-answer');
    expect(newCorrectAnswer).toBeInTheDocument();
    expect(newCorrectAnswer).toHaveTextContent(/graviton/i);

    const incorrectAnswers = screen.getAllByTestId(/wrong-answer-/i);
    expect(incorrectAnswers).toHaveLength(3);

  })
  // mudar o setTimeout de lugar
  jest.setTimeout(50000);

  test('testa se ao passar 30 segundos os botões são desabilitados', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')

    const title = screen.getByText('Game');
    expect(title).toBeInTheDocument();

     await waitForElementToBeRemoved(() => 
          screen.getByText(/loading/i),
      )
  
    const timer = document.getElementById('timer');
    expect(timer).toHaveTextContent('30');

    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer).toHaveTextContent(/false/i);

    const incorrectAnswer = screen.getByTestId('wrong-answer-0');
    expect(incorrectAnswer).toBeInTheDocument();
    expect(incorrectAnswer).toHaveTextContent(/true/i);

    // expect(correctAnswer).toBeDisabled();
    // expect(incorrectAnswer).toBeDisabled();

    await waitFor(() =>
    // expect(correctAnswer).BeDisabled(),
    expect(correctAnswer).not.toBeEnabled(),
    {timeout: 31000 },
  );

  await waitFor(() =>
  // expect(correctAnswer).BeDisabled(),
  expect(incorrectAnswer).not.toBeEnabled(),
  {timeout: 4000 },
);

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('0');

    // const timer = screen.getByRole('paragraph', { id: 'timer' })
    // const timer = document.getElementById('timer');
    expect(timer).toHaveTextContent('0');

    const btnNext = screen.getByTestId('btn-next');

    act(() => {
        userEvent.click(btnNext)
    }) 

    expect(timer).toHaveTextContent('30');
    
    await waitFor(() => {
      expect(timer).toHaveTextContent('29');
    });

    await waitFor(() => {
      expect(timer).toHaveTextContent('28');
    });

    await waitFor(() => {
      expect(timer).toHaveTextContent('27');
    });

  })

  test('teste se soma pontos ao clicar na resposta correta', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')

     await waitForElementToBeRemoved(() => 
          screen.getByText(/loading/i),
      )

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('0');
  
    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer).toHaveTextContent(/false/i);

    const incorrectAnswer = screen.getByTestId('wrong-answer-0');
    expect(incorrectAnswer).toBeInTheDocument();
    expect(incorrectAnswer).toHaveTextContent(/true/i);

    act(() => {
      userEvent.click(correctAnswer)
  }) 

    expect(score).toHaveTextContent('40');

  })

  test('testa se após responder as 5 perguntar, vai para a página de feedback', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')

     await waitForElementToBeRemoved(() => 
          screen.getByText(/loading/i),
      )

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('0');
  
    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer).toHaveTextContent(/false/i);

    const incorrectAnswer = screen.getByTestId('wrong-answer-0');
    expect(incorrectAnswer).toBeInTheDocument();
    expect(incorrectAnswer).toHaveTextContent(/true/i);

  act(() => {
      userEvent.click(correctAnswer)
  }) 

  const btnNext = screen.getByTestId('btn-next');

  act(() => {
      userEvent.click(btnNext)
  }) 

  const correctAnswer2 = screen.getByTestId('correct-answer');
  expect(correctAnswer2).toHaveTextContent(/graviton/i);

  act(() => {
    userEvent.click(correctAnswer2)
  }) 

  const btnNext2 = screen.getByTestId('btn-next');

  act(() => {
    userEvent.click(btnNext2)
  }) 


  const correctAnswer3 = screen.getByTestId('correct-answer');
  expect(correctAnswer3).toHaveTextContent(/Video Card/i);

  act(() => {
    userEvent.click(correctAnswer3)
  }) 

  const btnNext3 = screen.getByTestId('btn-next');

  act(() => {
    userEvent.click(btnNext3)
  }) 

  const correctAnswer4 = screen.getByTestId('correct-answer');
  expect(correctAnswer4).toHaveTextContent(/Scar/i);

  act(() => {
    userEvent.click(correctAnswer4)
  }) 

  const btnNext4 = screen.getByTestId('btn-next');

  act(() => {
    userEvent.click(btnNext4)
  }) 

  const correctAnswer5 = screen.getByTestId('correct-answer');
  expect(correctAnswer5).toHaveTextContent(/Junji Ito/i);

  act(() => {
    userEvent.click(correctAnswer5)
  }) 

  const btnNext5 = screen.getByTestId('btn-next');
  
  expect(score).toHaveTextContent('350');

  act(() => {
    userEvent.click(btnNext5)
  }) 


  await waitFor(() => {
    expect(history.location.pathname).toEqual('/feedback');
  });


  })

  test('testa se volta para o login, se o token estiver expirado', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')

    localStorage.setItem('token', 'quebrado');
    expect(history.location.pathname).toBe('/game');
    await waitFor(() => {
      expect(history.location.pathname).toBe('/'),
      {timeout: 2000 };
    });
    // expect(localStorage.removeItem('token')).toHaveBeenCalled();

    const tokenStorage = localStorage.getItem('token');
    expect(tokenStorage).toBeNull();

  })

  test('testa se retorna para o login com um objeto de questions invalido', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(invalidTokenQuestionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')

    expect(history.location.pathname).toBe('/game');
    await waitFor(() => {
      expect(history.location.pathname).toBe('/'),
      {timeout: 2000 };
    });

  })

  test('testa se após errar as 5 perguntar, ficar com 0', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')

     await waitForElementToBeRemoved(() => 
          screen.getByText(/loading/i),
      )

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('0');

    const incorrectAnswer = screen.getByTestId('wrong-answer-0');
    expect(incorrectAnswer).toBeInTheDocument();
    expect(incorrectAnswer).toHaveTextContent(/true/i);

  act(() => {
      userEvent.click(incorrectAnswer)
  }) 

  const btnNext = screen.getByTestId('btn-next');

  act(() => {
      userEvent.click(btnNext)
  }) 

  const incorrectAnswer2 = screen.getByTestId('wrong-answer-0');
  expect(incorrectAnswer2).not.toHaveTextContent(/graviton/i);

  act(() => {
    userEvent.click(incorrectAnswer2)
  }) 

  const btnNext2 = screen.getByTestId('btn-next');

  act(() => {
    userEvent.click(btnNext2)
  }) 


  const incorrectAnswer3 = screen.getByTestId('wrong-answer-0');
  expect(incorrectAnswer3).not.toHaveTextContent(/Video Card/i);

  act(() => {
    userEvent.click(incorrectAnswer3)
  }) 

  const btnNext3 = screen.getByTestId('btn-next');

  act(() => {
    userEvent.click(btnNext3)
  }) 

  const incorrectAnswer4 = screen.getByTestId('wrong-answer-0');
  expect(incorrectAnswer4).not.toHaveTextContent(/Scar/i);

  act(() => {
    userEvent.click(incorrectAnswer4)
  }) 

  const btnNext4 = screen.getByTestId('btn-next');

  act(() => {
    userEvent.click(btnNext4)
  }) 

  const incorrectAnswer5 = screen.getByTestId('wrong-answer-0');
  expect(incorrectAnswer5).not.toHaveTextContent(/Junji Ito/i);

  act(() => {
    userEvent.click(incorrectAnswer5)
  }) 

  const btnNext5 = screen.getByTestId('btn-next');
  
  expect(score).toHaveTextContent('0');

})
});
