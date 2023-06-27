import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import scoreImg from '../assets/🦆 icon _Star_.png';

import styles from '../styles/Header.module.css';

class Header extends React.Component {
  getGravatarURL = (email) => {
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  };

  render() {
    const { name, score, email } = this.props;

    return (
      <div className={ styles['header-container'] }>
        <div className={ styles['profile-container'] }>
          <img
            src={ this.getGravatarURL(email) }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
        </div>
        <div className={ styles['score-container'] }>
          <img src={ scoreImg } alt="score-img" />
          <p data-testid="header-score">{ `Pontos: ${score}` }</p>
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

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Header);
