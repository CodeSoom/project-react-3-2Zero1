import { combineReducers } from 'redux';

import commonReducer from './commonSlice';
import entranceReducer from './entranceSlice';

export default combineReducers({
  common: commonReducer,
  entrance: entranceReducer,
});
