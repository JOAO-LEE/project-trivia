import React from 'react';
import propTypes from 'prop-types';

class Questions extends React.Component {
  render() {
    const { trivia, index } = this.props;
    return (
      <div>
        <h3 data-testid="question-category">{trivia[index].category}</h3>
        <h2 data-testid="question-text">{trivia[index].question}</h2>
        <section data-testid="answer-options">
          {trivia[index].type === 'multiple'
            ? (
              <>
                <button
                  type="button"
                  data-testid="wrong-answer-0"
                >
                  {trivia[index].incorrect_answers[0]}
                </button>
                <button
                  type="button"
                  data-testid="wrong-answer-1"
                >
                  {trivia[index].incorrect_answers[1]}
                </button>
                <button
                  type="button"
                  data-testid="wrong-answer-2"
                >
                  {trivia[index].incorrect_answers[2]}
                </button>
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {trivia[index].correct_answer}
                </button>
              </>
            )
            : (
              <>
                <button
                  type="button"
                  data-testid="wrong-answer-0"
                >
                  {trivia[index].incorrect_answers[0]}
                </button>
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {trivia[index].correct_answer}
                </button>
              </>
            ) }
        </section>
      </div>
    );
  }
}

Questions.propTypes = {
  index: propTypes.string,
  trivia: propTypes.array,
}.isRequired;

export default Questions;
