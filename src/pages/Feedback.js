import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

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
      <div className="App">
        <Header />
        <main>
          <h2 data-testid="feedback-text">
            { assertions < three ? 'Could be better...' : 'Well Done!'}
          </h2>
          <div>
            <p>
              Score final:
              {' '}
              <span data-testid="feedback-total-score">{ score }</span>
            </p>
            <p>
              Número de acertos:
              {' '}
              <span data-testid="feedback-total-question">{ assertions }</span>
            </p>
          </div>

          <button
            data-testid="btn-play-again"
            onClick={ () => this.handleNewGame() }
          >
            Play Again
          </button>

          <button
            data-testid="btn-ranking"
            onClick={ () => this.handleRanking() }
          >
            Ranking
          </button>
        </main>
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
