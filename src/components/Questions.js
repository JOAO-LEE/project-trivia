import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setColor } from '../redux/actions';

class Questions extends React.Component {
  // state={
  //   timer: 30,
  //   timeOver: false,
  //   id: '',
  // }

  // componentDidMount() {
  //   const timerToAnswer = setInterval(this.handleTimer, ONE_SECOND);
  //   this.setState({
  //     id: timerToAnswer,
  //   });
  // }

  // handleTimer = () => {
  //   const { timer, id } = this.state;
  //   if (timer === 0) {
  //     clearInterval(id);
  //     this.setState({
  //       timeOver: true,
  //     });
  //   } else {
  //     this.setState((prevState) => ({
  //       ...prevState,
  //       timer: prevState.timer - 1,
  //       timeOver: false,
  //     }));
  //   }
  // }

  colorAnswers = () => {
    const { dispatchSetColor } = this.props;
    dispatchSetColor();
  }

  render() {
    const {
      trivia,
      index,
      randomizerTrivia, correctAnswer, incorrectAnswer, timeOver, timer } = this.props;
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
                    key={ answer }
                    type="button"
                    disabled={ timeOver }
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
                    disabled={ timeOver }
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
});

Questions.propTypes = {
  index: propTypes.string,
  trivia: propTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
