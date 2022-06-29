import { ADD_PLAYER, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const reducerLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return { ...action.payload.player };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default reducerLogin;
