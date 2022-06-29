import { combineReducers } from 'redux';
import reducerLogin from './player';
import reducerNextQuestion from './game';

const rootReducer = combineReducers({ player: reducerLogin, color: reducerNextQuestion });

export default rootReducer;
