import React from 'react';
import { connect } from 'react-redux';
import propTypes, { string } from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';
import Questions from '../components/Questions';

const TIME_OUT = 30000;

class Game extends React.Component {
  state = {
    img: '',
    isTokenValid: false,
    trivia: [],
    index: 0,
  }

  componentDidMount() {
    const { player } = this.props;
    const hash = md5(player.gravatarEmail).toString();

    fetch(`https://www.gravatar.com/avatar/${hash}`)
      .then((response) => (this.setState({ img: response.url })));

    this.fetchTrivia();
  }

  componentDidUpdate(_, prevState) {
    const index = 3;
    setTimeout(() => {
      if (prevState.index <= index) {
        this.setState({ index: prevState.index + 1 });
      } else {
        console.log('acabou!');
      }
    }, TIME_OUT);
  }

  fetchTrivia = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({ trivia: data.results });

    if (await data.results.length <= 0) {
      localStorage.removeItem('token');
      this.setState({ isTokenValid: true });
    }
  }

  render() {
    const { player } = this.props;
    const { img, isTokenValid, trivia, index } = this.state;
    return (
      <>
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
        <main>
          {trivia.length > 0 && <Questions trivia={ trivia } index={ index } />}
        </main>
        {isTokenValid && <Redirect to="/" />}
      </>
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
