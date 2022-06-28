import React from 'react';
import { Redirect } from 'react-router-dom';

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
    const URL = 'https://opentdb.com/api_token.php?command=request';
    fetch(URL)
      .then((Response) => Response.json())
      .then((Data) => localStorage.setItem('token', Data.token));
    this.setState({ isRedirect: true });
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
        { isRedirect && <Redirect to="/game" />}
      </form>
    );
  }
}

export default Login;
