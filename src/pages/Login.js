import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addPlayer } from '../redux/actions';
import styles from './Login.module.css';
import Logo from '../imgs/logo.png';
import Config from '../imgs/config.png';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisable: true,
    isRedirect: false,
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.canButtonEnable);
  };

  canButtonEnable = () => {
    const { name, email } = this.state;
    const formatEmail = /\S+@\S+\.\S+/;

    if (name.length > 0 && email.length > 0 && formatEmail.test(email)) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  handleBtn = () => {
    const { savePlayer } = this.props;
    const { name, email } = this.state;

    const URL = 'https://opentdb.com/api_token.php?command=request';

    fetch(URL)
      .then((Response) => Response.json())
      .then((Data) => localStorage.setItem('token', Data.token))
      .then(() => (this.setState({ isRedirect: true })));

    const player = { name, assertions: 0, score: 0, gravatarEmail: email };
    savePlayer(player);
  }

  render() {
    const { name, email, isDisable, isRedirect } = this.state;
    return (
      <form className={ styles.loginPage }>
        <div className={ styles.inputBox }>
          <img src={ Logo } alt="Trivia logo" className={ styles.img } />
          <label htmlFor="name">
            <p>Nome</p>
            <input
              type="text"
              data-testid="input-player-name"
              id="name"
              name="name"
              onChange={ this.handleChange }
              value={ name }
              className={ styles.input }
              placeholder="Digite o nome do jogador!"
            />
          </label>

          <label htmlFor="email">
            <p>Email</p>
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
              className={ styles.input }
              placeholder="Digite o email do jogador!"
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handleBtn }
            disabled={ isDisable }
            className={ styles.loginButton }
          >
            Entrar
          </button>
          <Link to="/settings" data-testid="btn-settings">
            <img src={ Config } alt="configurações" className={ styles.config } />
          </Link>
          { isRedirect && <Redirect to="/game" />}
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  savePlayer: (player) => dispatch(addPlayer(player)),
});

Login.propTypes = {
  savePlayer: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
