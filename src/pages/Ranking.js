import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

import logo from '../assets/logo trivia.png';
import star from '../assets/🦆 icon _Star_.png';

import styles from '../styles/Ranking.module.css';

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
        <div
          className={ styles['player-content'] }
          key={ index }
        >
          <div className={ styles['player-info'] }>
            <img
              src={ getGravatarURL() }
              alt={ `player-img-${index}` }
              className={ styles['player-img'] }
            />
            <p data-testid={ `player-name-${index}` }>{ name }</p>
          </div>
          <div className={ styles['player-score'] }>
            <img src={ star } alt="star-score" />
            <p data-testid={ `player-score-${index}` }>
              <strong>{ score }</strong>
              {' '}
              points
            </p>
          </div>
        </div>
      );
    });

    return (
      <div className={ styles['ranking-page'] }>
        <div className={ styles['content-container'] }>
          <div className={ styles['ranking-logo-container'] }>
            <img src={ logo } alt="logo-trivia" />
          </div>
          <div className={ styles['ranking-container'] }>
            <h1 data-testid="ranking-title">Ranking</h1>
            <div className={ styles.ranking }>
              { renderRanking }
            </div>
            <button
              data-testid="btn-go-home"
              onClick={ this.handleNewGame }
              className={ styles['ranking-home-btn'] }
            >
              Jogar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
