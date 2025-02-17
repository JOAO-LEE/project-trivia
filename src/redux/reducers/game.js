import { NEXT_QUESTION, SET_COLOR, NEXT_BTN_ENABLE } from '../actions';

const INITIAL_STATE = {
  correctAnswer: '',
  incorrectAnswer: '',
  nextBtn: true,
};

const reducerNextQuestion = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXT_QUESTION:
    return {
      correctAnswer: '',
      incorrectAnswer: '',
      nextBtn: true,
    };
  case SET_COLOR:
    return {
      correctAnswer: '3px solid rgb(6, 240, 15)',
      incorrectAnswer: '3px solid red',
      nextBtn: false,
    };
  case NEXT_BTN_ENABLE:
    return {
      ...state,
      nextBtn: false,
    };
  default:
    return state;
  }
};

export default reducerNextQuestion;
