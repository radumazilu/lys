import { combineReducers } from 'redux';
import ArticlesReducer from './ArticlesReducer';
import AuthReducer from './AuthReducer';
import RecordingReducer from './RecordingReducer';
import RecordingReferenceReducer from './RecordingReferenceReducer';

export const allReducers = combineReducers({
  articles: ArticlesReducer,
  auth: AuthReducer,
  recording: RecordingReducer,
  recordingRef: RecordingReferenceReducer
});
