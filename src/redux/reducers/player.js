import { ADD_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const reducerLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return { ...action.payload.player };
  default:
    return state;
  }
};

export default reducerLogin;
