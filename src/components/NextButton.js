import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Game.module.css';

function NextButton({ onClick }) {
  return (
    <div className={ styles['next-button-container'] }>
      <button data-testid="btn-next" onClick={ onClick }>
        NEXT
      </button>
    </div>
  );
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NextButton;
