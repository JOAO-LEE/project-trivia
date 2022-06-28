import { combineReducers } from 'redux';
import reducerLogin from './login';

const rootReducer = combineReducers({ login: reducerLogin });

export default rootReducer;
