import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addPlayer } from '../redux/actions';

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

    // const response = await fetch(URL);
    // const data = await response.json();
    // localStorage.setItem('token', data.token);
    // this.setState({ isRedirect: true });

    fetch(URL)
      .then((Response) => Response.json())
      .then((Data) => localStorage.setItem('token', Data.token))
      .then(() => (this.setState({ isRedirect: true })));

    const player = { name, assertions: '0', score: '0', gravatarEmail: email };
    savePlayer(player);
  }

  render() {
    const { name, email, isDisable, isRedirect } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            id="name"
            name="name"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleBtn }
          disabled={ isDisable }
        >
          Entrar
        </button>
        <Link to="/settings" data-testid="btn-settings">
          Configurações
        </Link>
        { isRedirect && <Redirect to="/game" />}
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
