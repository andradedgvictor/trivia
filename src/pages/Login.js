import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { fetchAPIToken } from '../redux/actions';

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

  handleLogin = async () => {
    const { history } = this.props;

    const data = await fetchAPIToken();

    // precisa do stringify se não tiver pegar um objeto inteiro?
    // localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('token', data.token);

    history.push('/game');
  };

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1>Login</h1>
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
            onClick={ this.handleLogin }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            onClick={ this.goToSettings }
          >
            Settings
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
