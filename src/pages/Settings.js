import React from 'react';
import logo from '../trivia.png';

class Settings extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1 data-testid="settings-title">Tela de Settings</h1>
        </header>
      </div>
    );
  }
}

export default Settings;
