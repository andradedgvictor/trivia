import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>Cria Pull Request</p>
        </header>
      </div>
    );
  }
}

export default Login;
