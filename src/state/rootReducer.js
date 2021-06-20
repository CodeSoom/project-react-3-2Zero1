import { combineReducers } from 'redux';

import commonReducer from './commonSlice';
import entranceReducer from './entranceSlice';
import writeReducer from './writeSlice';
import postcardReducer from './postcardSlice';
import postcardsReducer from './postcardsSlice';
import expireReducer from './expireSlice';

export default combineReducers({
  common: commonReducer,
  entrance: entranceReducer,
  write: writeReducer,
  postcard: postcardReducer,
  postcards: postcardsReducer,
  expire: expireReducer,
});
