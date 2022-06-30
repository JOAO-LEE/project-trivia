import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setColor, addScore } from '../redux/actions';

const scoreMin = 10;
const hardValue = 3;

class Questions extends React.Component {
  colorAnswers = ({ target }) => {
    const { dispatchSetColor,
      timer, trivia, index, dispatchAddScore, answerClick } = this.props;

    answerClick();

    let score;
    if (target.name) {
      switch (trivia[index].difficulty) {
      case 'easy':
        score = scoreMin + (timer * 1);
        dispatchAddScore(score);
        break;
      case 'medium':
        score = scoreMin + (timer * 2);
        dispatchAddScore(score);
        break;
      case 'hard':
        score = scoreMin + (timer * hardValue);
        dispatchAddScore(score);
        break;
      default:
      }
    }
    dispatchSetColor();
  }

  render() {
    const {
      trivia,
      index,
      randomizerTrivia,
      correctAnswer, incorrectAnswer, timeOver, timer, isAnswer } = this.props;
    return (
      <div>
        <h3 data-testid="question-category">{trivia[index].category}</h3>
        <h2 data-testid="question-text">{trivia[index].question}</h2>
        <section data-testid="answer-options">
          {
            randomizerTrivia.map((answer) => (
              answer === trivia[index].correct_answer
                ? (
                  <button
                    name="correct-answer"
                    key={ answer }
                    type="button"
                    disabled={ timeOver || isAnswer }
                    data-testid="correct-answer"
                    style={ { border: correctAnswer } }
                    onClick={ this.colorAnswers }
                  >
                    {answer}
                  </button>
                )
                : (
                  <button
                    key={ answer }
                    type="button"
                    disabled={ timeOver || isAnswer }
                    data-testid={
                      `wrong-answer-${trivia[index].incorrect_answers.indexOf(answer)}`
                    }
                    style={ { border: incorrectAnswer } }
                    onClick={ this.colorAnswers }
                  >
                    {answer}
                  </button>
                )
            ))
          }
          <p>{timer}</p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswer: state.game.correctAnswer,
  incorrectAnswer: state.game.incorrectAnswer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetColor: () => dispatch(setColor()),
  dispatchAddScore: (score) => dispatch(addScore(score)),
});

Questions.propTypes = {
  index: propTypes.string,
  trivia: propTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
