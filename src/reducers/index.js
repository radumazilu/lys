import { combineReducers } from 'redux';
import ArticlesReducer from './ArticlesReducer';
import AuthReducer from './AuthReducer';
import RecorderReducer from './RecorderReducer';

export const allReducers = combineReducers({
  articles: ArticlesReducer,
  auth: AuthReducer,
  recorder: RecorderReducer
});
