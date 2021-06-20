import { createSlice } from '@reduxjs/toolkit';

import {
  fetchPostcards,
} from '../services/api';

const initialState = {
  postcards: [],
};

const { actions, reducer } = createSlice({
  name: 'postcards',
  initialState,
  reducers: {
    setPostcards(state, { payload: value }) {
      return {
        ...state,
        postcards: value,
      };
    },
  },
});

export const {
  setPostcards,
} = actions;

export function loadPostcards() {
  return async (dispatch) => {
    const response = await fetchPostcards();

    dispatch(setPostcards(response.data.postcards));
  };
}

export default reducer;
