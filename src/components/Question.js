import React from 'react';
import PropTypes from 'prop-types';
import he from 'he';

import styles from '../styles/Game.module.css';
import timerIcon from '../assets/🦆 icon _timer_.png';

function Question({ category, text, timer }) {
  return (
    <div className={ styles['question-container'] }>
      <div className={ styles['category-container'] }>
        <h1 data-testid="question-category">{category}</h1>
      </div>
      <div className={ styles['question-text-container'] }>
        <p data-testid="question-text">{he.decode(text.split(':')[0])}</p>
      </div>
      <div className={ styles['timer-container'] }>
        <img src={ timerIcon } alt="timer-icon" />
        <p id="timer">{`Tempo: ${timer}s`}</p>
      </div>
    </div>
  );
}

Question.propTypes = {
  category: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};

export default Question;
