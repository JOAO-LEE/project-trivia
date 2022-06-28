import React from 'react';
import { connect } from 'react-redux';
import propTypes, { string } from 'prop-types';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  state = {
    img: '',
  }

  componentDidMount() {
    const { player } = this.props;
    const hash = md5(player.gravatarEmail).toString();

    fetch(`https://www.gravatar.com/avatar/${hash}`)
      .then((response) => (this.setState({ img: response.url })));
  }

  render() {
    const { player } = this.props;
    const { img } = this.state;
    return (
      <header>
        <img
          src={ img || 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc' }
          alt="user-profile"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          {player.name}
          <strong data-testid="header-score">{` ${player.score}`}</strong>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Game.propTypes = {
  player: propTypes.objectOf(string).isRequired,
};

export default connect(mapStateToProps)(Game);
