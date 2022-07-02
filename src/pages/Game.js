/* eslint-disable no-magic-numbers */
import React from 'react';
import { connect } from 'react-redux';
import propTypes, { string } from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';
import Questions from '../components/Questions';
import { nextBtnEnable, nextQuestion } from '../redux/actions';
import styles from './Game.module.css';

const ONE_SECOND = 1000;
const ZERO_FIVE = 0.5;
const MINUS_ONE = -1;

class Game extends React.Component {
  state = {
    img: '',
    isTokenValid: false,
    trivia: [],
    index: 0,
    timer: 30,
    timeOver: false,
    isAnswer: false,
    randomizerTrivia: [],
    isRedirect: false,
  }

  async componentDidMount() {
    const { player } = this.props;
    const hash = md5(player.gravatarEmail).toString();

    fetch(`https://www.gravatar.com/avatar/${hash}`)
      .then((response) => (this.setState({ img: response.url })));

    await this.fetchTrivia();

    this.idInterval = setInterval(this.handleTimer, ONE_SECOND);

    const { trivia, index } = this.state;
    const randomizerTrivia = this.shuffleTrivia(trivia, index);

    this.setState({ randomizerTrivia });
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  handleTimer = () => {
    const { timer } = this.state;
    const { dispatchNextBtnEnable } = this.props;
    if (timer <= 0) {
      dispatchNextBtnEnable();
      this.setState({
        timeOver: true,
      });
    } else {
      this.setState((prevState) => ({
        ...prevState,
        timer: prevState.timer - 1,
        timeOver: false,
      }));
    }
  }

  fetchTrivia = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({ trivia: data.results });

    if (await data?.results?.length <= 0) {
      localStorage.removeItem('token');
      this.setState({ isTokenValid: true });
    }
  }

  redirectFeedback = () => {
    const { index } = this.state;
    const maxLength = 4;

    if (index === maxLength) {
      this.setState({
        isRedirect: true,
      });
    }
  }

  handleNextBtn = () => {
    const maxLength = 4;
    const { dispatchNextQuestion } = this.props;
    this.redirectFeedback();

    dispatchNextQuestion();
    this.setState((prevState) => ({
      index: prevState.index < maxLength ? prevState.index + 1 : prevState.index,
      timer: 30,
      timeOver: true,
      isAnswer: false,
    }), () => {
      const { trivia, index } = this.state;
      const randomizerTrivia = this.shuffleTrivia(trivia, index);

      this.setState({ randomizerTrivia });
    });
  }

  answerClick = () => this.setState({ isAnswer: true });

  shuffleTrivia = (trivia, index) => {
    if (trivia && trivia[index]?.incorrect_answers) {
      const answersTrivia = [
        ...trivia[index].incorrect_answers, trivia[index].correct_answer];
      const randomizerTrivia = answersTrivia
        .sort(() => ((Math.random() > ZERO_FIVE) ? 1 : MINUS_ONE));
      return randomizerTrivia;
    }
  }

  savePlayers = (player) => {
    const response = localStorage.getItem('allPlayers');
    const prevPlayers = JSON.parse(response);
    if (prevPlayers === null) {
      const allPlayers = [player];
      localStorage.setItem('allPlayers', JSON.stringify(allPlayers));
    } else {
      const allPlayers = [...prevPlayers, player];
      localStorage.setItem('allPlayers', JSON.stringify(allPlayers));
    }
  }

  render() {
    const { player, nextBtn } = this.props;
    const { img,
      isTokenValid,
      trivia,
      index,
      timer, timeOver, randomizerTrivia, isRedirect, isAnswer } = this.state;
    return (
      <div className={ styles.gamePage }>
        <header className={ styles.header }>
          <img
            src={ img || 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc' }
            alt="user-profile"
            data-testid="header-profile-picture"
            className={ styles.profileImg }
          />
          <h3 data-testid="header-player-name" className={ styles.profileName }>
            {player.name}
            <strong data-testid="header-score">{` - Pontuação: ${player.score}`}</strong>
          </h3>
        </header>
        <main className={ styles.main }>
          {trivia?.length > 0 && (
            <Questions
              trivia={ trivia }
              randomizerTrivia={ randomizerTrivia }
              index={ index }
              timer={ timer }
              timeOver={ timeOver }
              isAnswer={ isAnswer }
              answerClick={ this.answerClick }
            />
          )}
          {!nextBtn
           && (
             <button
               onClick={ this.handleNextBtn }
               data-testid="btn-next"
               type="button"
               className={ styles.nextButton }
             >
               Next
             </button>
           )}
        </main>
        {isTokenValid && <Redirect to="/" />}
        {isRedirect
        && (
          this.savePlayers(player),
          (<Redirect to="/feedback" />)
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  nextBtn: state.game.nextBtn,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNextQuestion: () => dispatch(nextQuestion()),
  dispatchNextBtnEnable: () => dispatch(nextBtnEnable()),
});

Game.propTypes = {
  player: propTypes.objectOf(string),
  dispatchNextQuestion: propTypes.func,
  nextBtn: propTypes.bool,
  dispatchNextBtnEnable: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
