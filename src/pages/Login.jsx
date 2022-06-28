import React from 'react';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisable: true,
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
    }
  }

  render() {
    const { name, email, isDisable } = this.state;
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
          disabled={ isDisable }
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
