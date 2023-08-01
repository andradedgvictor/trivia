import React from 'react';
import PropTypes from 'prop-types';
import he from 'he';

import styles from '../styles/Game.module.css';
import correctIcon from '../assets/correct.png';
import wrongIcon from '../assets/wrong.png';

function AnswerOption({
  answer,
  index,
  correctAnswer,
  clickedAnswer,
  onClick,
}) {
  const id = answer === correctAnswer ? 'correct-answer' : `wrong-answer-${index + 1}`;
  const numberChar = 97;
  const answerLetter = String.fromCharCode(numberChar + index);

  const handleClick = () => {
    if (!clickedAnswer) {
      onClick(answer === correctAnswer);
    }
  };

  return (
    <button
      key={ index }
      data-testid={ id }
      id={ id }
      onClick={ handleClick }
      disabled={ clickedAnswer }
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
      && <span className={ styles['answer-letter'] }>{answerLetter}</span>}
      {he.decode(answer)}
    </button>
  );
}

AnswerOption.propTypes = {
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  clickedAnswer: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AnswerOption;
