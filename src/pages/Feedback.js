import React from 'react';
import logo from '../trivia.png';

class Feedback extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1 data-testid="feedback-text">Tela de Feedback</h1>
        </header>
      </div>
    );
  }
}

export default Feedback;
