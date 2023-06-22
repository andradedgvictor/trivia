import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleDisable = () => {
    const { email, name } = this.state;
    const isEmailValid = email.length > 0;
    const isNameValid = name.length > 0;
    // se o email e o nome forem válidos, retorna falso, o que ativa o botão
    return !(isEmailValid && isNameValid);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>Cria Pull Request</p>
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Qual é o seu e-mail do gravatar?"
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Qual é o seu nome?"
            name="name"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            disabled={ this.handleDisable() }
          >
            Play
          </button>
        </header>
      </div>
    );
  }
}

export default Login;
