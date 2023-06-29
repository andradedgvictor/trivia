import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import logo from '../assets/logo trivia.png';

class Feedback extends React.Component {
  componentDidMount() {
    const { email, name, score } = this.props;

    const newPlayer = {
      email,
      name,
      score,
    };

    const playerRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const updatedRanking = [...playerRanking, newPlayer];
    const sortedRanking = updatedRanking.sort(
      (player, nextPlayer) => nextPlayer.score - player.score,
    );

    localStorage.setItem('ranking', JSON.stringify(sortedRanking));
  }

  getGravatarURL = () => {
    const { email } = this.props;

    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  };

  handleNewGame = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const three = 3;

    return (
      <div>
        <div>
          <img src={ logo } alt="logo-trivia" />
        </div>
        <div>
          <img src={ this.getGravatarURL() } alt="gravatar-profile" />
          <h2 data-testid="feedback-text">
            { assertions < three ? 'Podia ser melhor...' : 'Mandou bem!'}
          </h2>
          <div>
            <p>
              Você acertou
              {' '}
              <span data-testid="feedback-total-question">{ assertions }</span>
              {' '}
              {assertions === 1 ? 'questão!' : 'questões!'}
            </p>
            <p>
              Um total de
              {' '}
              <span data-testid="feedback-total-score">{ score }</span>
              {' '}
              pontos
            </p>
          </div>

          <button
            data-testid="btn-ranking"
            onClick={ () => this.handleRanking() }
          >
            VER RANKING
          </button>

          <button
            data-testid="btn-play-again"
            onClick={ () => this.handleNewGame() }
          >
            JOGAR NOVAMENTE
          </button>
        </div>
        <div>
          <footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Feedback);
