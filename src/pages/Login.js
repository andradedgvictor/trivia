import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAPIToken, restoreState, saveEmailAndName } from '../redux/actions';
import logo from '../assets/logo trivia.png';

import styles from '../styles/Login.module.css';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(restoreState());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    // ocultei a linha debaixo para que a branch no teste dê 100%
    // const value = target.type === 'checkbox' ? target.checked : target.value;

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
    const { history, dispatch } = this.props;
    const { email, name } = this.state;

    const data = await fetchAPIToken();

    // precisa do stringify se não tiver pegar um objeto inteiro?
    // localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('token', data.token);

    dispatch(saveEmailAndName(email, name));

    history.push('/game');
  };

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <div className={ styles['login-page'] }>
        <div className={ styles['main-container'] }>
          <div className={ styles['logo-container'] }>
            <img src={ logo } className="App-logo" alt="logo" />
          </div>
          <div className={ styles['login-container'] }>
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
              className={ styles['play-btn'] }
            >
              JOGAR
            </button>
            <button
              data-testid="btn-settings"
              onClick={ this.goToSettings }
              className={ styles['settings-btn'] }
            >
              Configurações
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
