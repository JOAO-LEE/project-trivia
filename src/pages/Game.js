import React from 'react';
import { connect } from 'react-redux';
import propTypes, { string } from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';
import Questions from '../components/Questions';
import { nextQuestion } from '../redux/actions';

// const TIME_OUT = 3000;

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

  handleNextBtn = () => {
    const maxLength = 3;
    const { dispatchNextQuestion } = this.props;
    dispatchNextQuestion();
    this.setState((prevState) => ({
      index: prevState.index <= maxLength ? prevState.index + 1 : prevState.index,
    }));
  }

  shuffleTrivia = (trivia, index) => {
    const answersTrivia = [
      ...trivia[index].incorrect_answers, trivia[index].correct_answer];
    const randomizerTrivia = this.shuffle(answersTrivia);
    return randomizerTrivia;
  }

  shuffle(array) {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
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
          {trivia.length > 0 && (
            <Questions
              trivia={ trivia }
              randomizerTrivia={ this.shuffleTrivia(trivia, index) }
              index={ index }
            />
          )}
          <button
            onClick={ this.handleNextBtn }
            data-testid="btn-next"
            type="button"
          >
            Next

          </button>
        </main>
        {isTokenValid && <Redirect to="/" />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNextQuestion: () => dispatch(nextQuestion()),
});

Game.propTypes = {
  player: propTypes.objectOf(string).isRequired,
  dispatchNextQuestion: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
