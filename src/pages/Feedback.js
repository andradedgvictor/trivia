import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import logo from '../assets/logo trivia.png';

import styles from '../styles/Feedback.module.css';

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
    const renderFeedbackScore = () => (
      <span data-testid="feedback-total-score">
        A total of
        {' '}
        {score}
        {' '}
        points
      </span>
    );
    const renderFeedbackTotal = () => (
      <span data-testid="feedback-total-question">
        You got
        {' '}
        { assertions }
        {' '}
        {assertions === 1 ? 'question right!' : 'questions right!'}
      </span>
    );

    return (
      <div className={ styles['page-container'] }>
        <div className={ styles['feedback-container'] }>
          <div className={ styles['logo-container'] }>
            <img src={ logo } alt="logo-trivia" />
          </div>
          <div className={ styles['infos-container'] }>
            <img
              src={ this.getGravatarURL() }
              alt="gravatar-profile"
              className={
                assertions < three
                  ? styles['gravatar-negative'] : styles['gravatar-positive']
              }
            />
            <div className={ styles['score-container'] }>
              <h2
                data-testid="feedback-text"
                className={
                  assertions < three
                    ? styles['feedback-negative'] : styles['feedback-positive']
                }
              >
                { assertions < three ? 'Could be better...' : 'Nice job!'}
              </h2>
              <p>{renderFeedbackTotal()}</p>
              <p>{renderFeedbackScore()}</p>
            </div>
            <div className={ styles['buttons-container'] }>
              <button
                data-testid="btn-ranking"
                onClick={ () => this.handleRanking() }
                className={ styles['ranking-btn'] }
              >
                SEE RANKING
              </button>

              <button
                data-testid="btn-play-again"
                onClick={ () => this.handleNewGame() }
                className={ styles['home-btn'] }
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
          <div className={ styles['feedback-footer'] }>
            <footer />
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
