import React from 'react';
import propTypes from 'prop-types';

class Questions extends React.Component {
  state = {
    correctAnswer: '',
    incorrectAnswer: '',
  }

  colorAnswers = () => {
    this.setState({
      correctAnswer: '3px solid rgb(6, 240, 15)',
      incorrectAnswer: '3px solid red',
    });
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
    const { trivia, index } = this.props;
    const { correctAnswer, incorrectAnswer } = this.state;
    const randomizerTrivia = [
      ...trivia[index].incorrect_answers, trivia[index].correct_answer];
    this.shuffle(randomizerTrivia);
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
