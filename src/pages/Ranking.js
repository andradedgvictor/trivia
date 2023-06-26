import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  handleNewGame = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const playerRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const renderRanking = playerRanking.map((player, index) => {
      const { email, name, score } = player;

      const getGravatarURL = () => {
        const hash = md5(email).toString();
        const url = `https://www.gravatar.com/avatar/${hash}`;
        return url;
      };

      return (
        <div key={ index }>
          <img src={ getGravatarURL() } alt={ `player-img-${index}` } />
          <p data-testid={ `player-name-${index}` }>{ name }</p>
          <p data-testid={ `player-score-${index}` }>{ score }</p>
        </div>
      );
    });

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleNewGame }
        >
          Play Again
        </button>
        { renderRanking }
      </div>
    );
  }
}

Ranking.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
