import React from 'react';
import logo from '../trivia.png';

class Game extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1>Game</h1>
        </header>
      </div>
    );
  }
}

export default Game;