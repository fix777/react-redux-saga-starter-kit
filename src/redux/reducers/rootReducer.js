import { combineReducers } from 'redux';

import userSliceReducer, { USER_SLICE_NAME } from './userSlice';
import reposSliceReducer, { REPOS_SLICE_NAME } from './reposSlice';

export default combineReducers({
  [USER_SLICE_NAME]: userSliceReducer,
  [REPOS_SLICE_NAME]: reposSliceReducer,
});
