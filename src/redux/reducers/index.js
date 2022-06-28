import { combineReducers } from 'redux';
import reducerLogin from './login';

const rootReducer = combineReducers({ player: reducerLogin });

export default rootReducer;
