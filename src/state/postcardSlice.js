import { createSlice } from '@reduxjs/toolkit';

import {
  fetchPostcard,
} from '../services/api';

import {
  setResponseError,
  // changeInputFieldValue,
} from './commonSlice';

const initialState = {
  isFrontPage: true,
  sender: '',
  receiver: '',
  contents: '',
  photoUrl: '',
  photoMessage: '',
};

const { actions, reducer } = createSlice({
  name: 'postcard',
  initialState,
  reducers: {
    flipPostcard(state) {
      const { postcard } = state;
      const { isFrontPage } = postcard;
      return {
        ...state,
        postcard: {
          ...postcard,
          isFrontPage: !isFrontPage,
        },
      };
    },
    setPostcardFront(state) {
      return {
        ...state,
        postcard: {
          ...state.postcard,
          isFrontPage: true,
        },
      };
    },
    setPostcard(state, { payload: value }) {
      return {
        ...state,
        postcard: {
          ...state.postcard,
          ...value,
        },
      };
    },
  },
});

export const {
  flipPostcard,
  setPostcardFront,
  setPostcard,
} = actions;

export function loadPostcard({ key, secretMessage }) {
  return async (dispatch) => {
    const response = await fetchPostcard({ key, secretMessage });

    if (response.error) {
      dispatch(setResponseError(response.error));
      return;
    }

    const {
      sender,
      receiver,
      photo,
      contents,
      photoMessage,
    } = response.data;

    dispatch(setPostcard({
      sender,
      receiver,
      photoUrl: photo,
      contents,
      photoMessage,
    }));
  };
}

export default reducer;
