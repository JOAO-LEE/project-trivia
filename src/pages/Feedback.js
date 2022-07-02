import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import styles from './Feedback.module.css';

const ASSERTIONS_LENGTH = 3;

class Feedback extends React.Component {
  state = {
    img: '',
  }

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    fetch(`https://www.gravatar.com/avatar/${hash}`)
      .then((response) => (this.setState({ img: response.url })));
  }

  render() {
    const { img } = this.state;
    const { score, name, assertions } = this.props;
    return (
      <div className={ styles.feedbackPage }>
        <div className={ styles.feedbackBox }>
          <header className={ styles.feedbackHeader }>
            {assertions < ASSERTIONS_LENGTH
              ? <p data-testid="feedback-text">Could be better... </p>
              : <p data-testid="feedback-text">Well Done!</p> }
            <img src={ img } alt="profile-user" data-testid="header-profile-picture" />
            <p data-testid="header-player-name">{name}</p>
            <p data-testid="header-score">{score}</p>
          </header>
          <main className={ styles.feedbackMain }>
            <p data-testid="feedback-total-score">{score}</p>
            <p data-testid="feedback-total-question">{assertions}</p>
            <Link to="/" className={ styles.btn }>
              <button data-testid="btn-play-again" type="button">Play Again</button>
            </Link>
            <Link to="/ranking" className={ styles.btn }>
              <button data-testid="btn-ranking" type="button">Ranking</button>
            </Link>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  name: state.player.name,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  gravatarEmail: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  assertions: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
