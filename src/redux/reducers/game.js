import { NEXT_QUESTION, SET_COLOR } from '../actions';

const INITIAL_STATE = {
  correctAnswer: '',
  incorrectAnswer: '',
};

const reducerNextQuestion = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXT_QUESTION:
    return {
      correctAnswer: '',
      incorrectAnswer: '',
    };
  case SET_COLOR:
    return {
      correctAnswer: '3px solid rgb(6, 240, 15)',
      incorrectAnswer: '3px solid red',
    };
  default:
    return state;
  }
};

export default reducerNextQuestion;
