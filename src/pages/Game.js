import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import { fetchAPIQuestions } from '../redux/actions';

class Game extends React.Component {
  state = {
    // questions: {},
    questionIndex: 0,
    isLoaded: false,
    // correctAnswer,
    // shuffledAnswers,
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
      }

      const answers = [
        questions.results[questionIndex].correct_answer,
        ...questions.results[questionIndex].incorrect_answers,
      ];

      const correct = answers[0];

      // shuffleAnswers = (array) => [...array].sort(() => Math.random() - 0.5);
      const sortRandomlyNumber = 0.5;
      const shuffledArray = [...answers].sort(() => Math.random() - sortRandomlyNumber);

      this.setState({
        questions,
        isLoaded: true,
        correctAnswer: correct,
        shuffledAnswers: shuffledArray,
      });
    } catch (error) {
      console.log(error);
      history.push('/');
      localStorage.removeItem('token');
    }
  }

  getGravatarURL = (email) => {
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  };

  answerQuestion = ({ target }) => {
    const selected = document.querySelector(`#${target.id}`);
    const parent = selected.parentElement;
    const allButtons = parent.querySelectorAll('*');

    allButtons[0].style.border = '3px solid red';

    for (let index = 0; index < allButtons.length; index += 1) {
      if (allButtons[index].id === 'correct-answer') {
        allButtons[index].style.border = '3px solid rgb(6, 240, 15)';
      } else {
        allButtons[index].style.border = '3px solid red';
      }
    }
  };

  render() {
    const { name, score, email } = this.props;
    const {
      questions, questionIndex, isLoaded, shuffledAnswers, correctAnswer,
    } = this.state;

    const startingNumber = -1;
    let incorrectId = startingNumber;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1>Game</h1>
          <p data-testid="header-player-name">{ name }</p>
          <img
            src={ this.getGravatarURL(email) }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-score">{ score }</p>
          <div>
            {isLoaded ? (
              <>
                <h1 data-testid="question-category">
                  {questions.results[questionIndex].category}
                </h1>
                <p data-testid="question-text">
                  {questions.results[questionIndex].question}
                </p>
                <div data-testid="answer-options">
                  { shuffledAnswers.map((answer, index) => {
                    const id = answer === correctAnswer
                      ? 'correct-answer' : `wrong-answer-${(incorrectId += 1)}`;
                    return (
                      <button
                        key={ index }
                        data-testid={ id }
                        id={ id }
                        onClick={ (e) => this.answerQuestion(e) }
                      >
                        {answer}
                      </button>
                    );
                  }) }
                </div>
              </>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </header>
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
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
