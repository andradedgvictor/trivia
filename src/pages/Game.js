import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../assets/logo trivia.png';
import { fetchAPIQuestions, sumScore } from '../redux/actions';
import Header from '../components/Header';

import styles from '../styles/Game.module.css';

class Game extends React.Component {
  state = {
    questionIndex: 0,
    isLoaded: false,
    timer: 30,
    clickedAnswer: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const { questionIndex } = this.state;

    try {
      const token = localStorage.getItem('token');
      const questions = await fetchAPIQuestions(token);
      const expiredTokenNumber = 3;
      // checa se o token está expirado e retorna pro login se sim
      if (questions.response_code === expiredTokenNumber) {
        history.push('/');
        localStorage.removeItem('token');
      }
      // salvar todas as respostas em um array
      const answers = [
        questions.results[questionIndex].correct_answer,
        ...questions.results[questionIndex].incorrect_answers,
      ];
      // 'embaralha' o array
      const sortRandomlyNumber = 0.5;
      const shuffledArray = [...answers].sort(() => Math.random() - sortRandomlyNumber);

      this.setState({
        questions,
        isLoaded: true,
        correctAnswer: answers[0],
        shuffledAnswers: shuffledArray,
        difficulty: questions.results[questionIndex].difficulty,
      });
      // configura o timer descrescente de 30 segundos
      const oneSecond = 1000;
      this.setTimer = setInterval(() => {
        this.setState((state) => ({
          timer: state.timer - 1,
        }));
      }, oneSecond);
    } catch (error) {
      console.log(error);
      history.push('/');
      localStorage.removeItem('token');
    }
  }

  componentDidUpdate() {
    const { timer, clickedAnswer } = this.state;

    if (timer === 0) {
      clearInterval(this.setTimer);
    }
    if (clickedAnswer === true) {
      clearInterval(this.setTimer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
  }

  answerQuestion = ({ target }) => {
    this.setState({ clickedAnswer: true });

    const selected = document.querySelector(`#${target.id}`);
    const parent = selected.parentElement;
    const allButtons = parent.querySelectorAll('*');
    const correctAnswer = 'correct-answer';

    allButtons.forEach((button) => {
      button.style.border = button.id === correctAnswer
        ? '3px solid rgb(6, 240, 15)' : '3px solid red';
    });

    if (target.id === correctAnswer) {
      this.calculateScore();
    }
  };

  calculateScore = () => {
    const { dispatch } = this.props;
    const { timer, difficulty } = this.state;
    let difficultyBonus;
    const hard = 3;

    if (difficulty === 'hard') {
      difficultyBonus = hard;
    } else if (difficulty === 'medium') {
      difficultyBonus = 2;
    } else {
      difficultyBonus = 1;
    }

    const initialPoints = 10;
    const totalPoints = initialPoints + (timer * difficultyBonus);
    dispatch(sumScore(totalPoints));
  };

  goToNextQuestion = () => {
    const { history } = this.props;
    const { questionIndex, questions } = this.state;
    const maxIndex = 4;

    if (questionIndex < maxIndex) {
      // this.setState({ questionIndex: questionIndex + 1 });

      // const selected = document.querySelector(`#${target.id}`);
      const parent = document.querySelector('#answer-options');
      const allButtons = parent.querySelectorAll('*');

      allButtons.forEach((button) => {
        button.style.border = 'revert';
      });

      const answers = [
        questions.results[questionIndex + 1].correct_answer,
        ...questions.results[questionIndex + 1].incorrect_answers,
      ];
      // 'embaralha' o array
      const sortRandomlyNumber = 0.5;
      const shuffledArray = [...answers].sort(() => Math.random() - sortRandomlyNumber);

      this.setState({
        questionIndex: questionIndex + 1,
        correctAnswer: answers[0],
        shuffledAnswers: shuffledArray,
        difficulty: questions.results[questionIndex + 1].difficulty,
      });

      // configura o timer descrescente de 30 segundos
      this.setState({ timer: 30, clickedAnswer: false });

      const oneSecond = 1000;
      this.setTimer = setInterval(() => {
        this.setState((state) => ({
          timer: state.timer - 1,
        }));
      }, oneSecond);
    } else {
      history.push('/feedback');
    }
  };

  render() {
    const {
      questions, questionIndex, isLoaded, shuffledAnswers,
      correctAnswer, timer, difficulty, clickedAnswer,
    } = this.state;
      // startingNumber começa com -1 para que o id da primeira resposta errada seja 0
    const startingNumber = -1;
    let incorrectId = startingNumber;

    return (
      <div className={ styles['game-page'] }>
        <div className={ styles['game-container'] }>
          <Header />
          <img src={ logo } className="App-logo" alt="logo" />
          <div>
            {isLoaded ? (
              <>
                <p id="timer">{ timer }</p>
                <p>{ difficulty }</p>
                <h1 data-testid="question-category">
                  {questions.results[questionIndex].category}
                </h1>
                <p data-testid="question-text">
                  {questions.results[questionIndex].question}
                </p>
                <div data-testid="answer-options" id="answer-options">
                  { shuffledAnswers.map((answer, index) => {
                    const id = answer === correctAnswer
                      ? 'correct-answer' : `wrong-answer-${(incorrectId += 1)}`;
                    return (
                      <button
                        key={ index }
                        data-testid={ id }
                        id={ id }
                        onClick={ (e) => this.answerQuestion(e) }
                        disabled={ timer === 0 }
                      >
                        {answer}
                      </button>
                    );
                  }) }
                </div>
                <div>
                  { (timer === 0 || clickedAnswer === true)
                    && (
                      <button
                        data-testid="btn-next"
                        onClick={ this.goToNextQuestion }
                      >
                        Next
                      </button>
                    )}
                </div>
              </>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
