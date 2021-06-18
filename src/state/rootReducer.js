import { combineReducers } from 'redux';

import commonReducer from './commonSlice';
import entranceReducer from './entranceSlice';
import writeReducer from './writeSlice';

export default combineReducers({
  common: commonReducer,
  entrance: entranceReducer,
  write: writeReducer,
});
