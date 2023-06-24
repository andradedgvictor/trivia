import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import { fetchAPIQuestions, sumScore } from '../redux/actions';

class Game extends React.Component {
  state = {
    questionIndex: 0,
    isLoaded: false,
    timer: 30,
  };

  async componentDidMount() {
    const { history } = this.props;
    const { questionIndex } = this.state;

    try {
      const token = localStorage.getItem('token');
      const questions = await fetchAPIQuestions(token);
      const expiredTokenNumber = 3;
      // checa se o toke está expirado e retorna pro login se sim
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
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }, oneSecond);
    } catch (error) {
      console.log(error);
      history.push('/');
      localStorage.removeItem('token');
    }
  }

  componentDidUpdate() {
    const { timer } = this.state;

    if (timer === 0) {
      clearInterval(this.setTimer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
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

    console.log(typeof timer);
    console.log(typeof difficultyBonus);

    const initialPoints = 10;
    const totalPoints = initialPoints + (timer * difficultyBonus);
    // const totalPoints = initialPoints;
    dispatch(sumScore(totalPoints));
  };

  render() {
    const { name, score, email } = this.props;
    const {
      questions, questionIndex, isLoaded, shuffledAnswers,
      correctAnswer, timer, difficulty,
    } = this.state;
      // startingNumber começa com -1 para que o id da primeira resposta errada seja 0
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
                <p>{ timer }</p>
                <p>{ difficulty }</p>
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
                        disabled={ timer === 0 }
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
