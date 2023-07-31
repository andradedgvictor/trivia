import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import he from 'he';

import logo from '../assets/logo trivia.png';
import timerIcon from '../assets/🦆 icon _timer_.png';
import correctIcon from '../assets/correct.png';
import wrongIcon from '../assets/wrong.png';
import loadingIcon from '../assets/loading.gif';
import { fetchAPIQuestions, sumScore } from '../redux/actions';
import Header from '../components/Header';

import styles from '../styles/Game.module.css';

class Game extends Component {
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

      if (questions.response_code === expiredTokenNumber) {
        history.push('/');
        localStorage.removeItem('token');
        return;
      }

      const { correct_answer, incorrect_answers, difficulty } = questions.results[questionIndex];
      const answers = [correct_answer, ...incorrect_answers];
      const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

      this.setState({
        questions,
        isLoaded: true,
        correctAnswer: answers[0],
        shuffledAnswers,
        difficulty,
      });

      this.setTimerInterval();
    } catch (error) {
      console.log(error);
      history.push('/');
      localStorage.removeItem('token');
    }
  }

  componentDidUpdate() {
    const { timer, clickedAnswer } = this.state;

    if (timer === 0 || clickedAnswer) {
      clearInterval(this.setTimer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
  }

  setTimerInterval = () => {
    const oneSecond = 1000;
    this.setTimer = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, oneSecond);
  };

  answerQuestion = ({ target }) => {
    this.setState({ clickedAnswer: true });

    const selected = document.querySelector(`#${target.id}`);
    const parent = selected.parentElement;
    const allButtons = parent.querySelectorAll('*');
    const correctAnswer = 'correct-answer';

    allButtons.forEach((button) => {
      button.style.border = button.id === correctAnswer
        ? '1px solid rgb(6, 240, 15)' : '1px solid red';
    });

    if (target.id === correctAnswer) {
      this.calculateScore();
    }
  };

  calculateScore = () => {
    const { dispatch } = this.props;
    const { timer, difficulty } = this.state;
    const minDifficulty = 3;
    const difficultyBonus = difficulty === 'hard' ? minDifficulty : difficulty === 'medium' ? 2 : 1;
    const minPoints = 10;
    const totalPoints = minPoints + timer * difficultyBonus;
    dispatch(sumScore(totalPoints));
  };

  goToNextQuestion = () => {
    const { history } = this.props;
    const { questionIndex, questions } = this.state;
    const maxIndex = 4;

    if (questionIndex >= maxIndex) {
      history.push('/feedback');
      return;
    }

    const parent = document.querySelector('#answer-options');
    const allButtons = parent.querySelectorAll('*');

    allButtons.forEach((button) => {
      button.style.border = 'revert';
    });

    const { correct_answer, incorrect_answers, difficulty } = questions.results[questionIndex + 1];
    const answers = [correct_answer, ...incorrect_answers];
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      correctAnswer: answers[0],
      shuffledAnswers,
      difficulty,
      timer: 30,
      clickedAnswer: false,
    }));

    this.setTimerInterval();
  };

  render() {
    const {
      questions, questionIndex, isLoaded,
      shuffledAnswers, correctAnswer, timer, clickedAnswer,
    } = this.state;
    const startingNumber = -1;
    let incorrectId = startingNumber;

    return (
      <div className={ styles['game-page'] }>
        <div className={ styles['game-container'] }>
          <Header />
          <div className={ styles['trivia-container'] }>
            <div className={ styles.logo }>
              <img src={ logo } className="App-logo" alt="logo" />
            </div>
            {isLoaded ? (
              <>
                <div className={ styles['question-container'] }>
                  <div className={ styles['category-container'] }>
                    <h1
                      data-testid="question-category"
                    >
                      {questions.results[questionIndex].category}
                    </h1>
                  </div>
                  <div className={ styles['question-text-container'] }>
                    <p data-testid="question-text">
                      {he.decode(questions.results[questionIndex].question.split(':')[0])}
                    </p>
                  </div>
                  <div className={ styles['timer-container'] }>
                    <img src={ timerIcon } alt="timer-icon" />
                    <p id="timer">{`Tempo: ${timer}s`}</p>
                  </div>
                </div>
                <div className={ styles['answer-container'] }>
                  <div
                    data-testid="answer-options"
                    id="answer-options"
                    className={ styles['options-container'] }
                  >
                    {shuffledAnswers.map((answer, index) => {
                      const id = answer === correctAnswer
                        ? 'correct-answer' : `wrong-answer-${(incorrectId += 1)}`;
                      const numberChar = 97;
                      const answerLetter = String.fromCharCode(numberChar + index);

                      return (
                        <button
                          key={ index }
                          data-testid={ id }
                          id={ id }
                          onClick={ this.answerQuestion }
                          disabled={ timer === 0 }
                          className={ `${styles[id]} ${clickedAnswer && styles.clicked}` }
                        >
                          {clickedAnswer && (
                            <img
                              src={ answer === correctAnswer ? correctIcon : wrongIcon }
                              alt="Answer Icon"
                              className={ styles.icon }
                            />
                          )}
                          {!clickedAnswer
                            && (
                              <span
                                className={ styles['answer-letter'] }
                              >
                                {answerLetter}
                              </span>
                            )}
                          {he.decode(answer)}
                        </button>
                      );
                    })}
                  </div>
                  <div className={ styles['next-container'] }>
                    {(timer === 0 || clickedAnswer) && (
                      <button data-testid="btn-next" onClick={ this.goToNextQuestion }>
                        NEXT
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <img src={ loadingIcon } alt="loading" className={ styles.loading } />
            )}
          </div>
          <footer className={ styles.footer } />
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
