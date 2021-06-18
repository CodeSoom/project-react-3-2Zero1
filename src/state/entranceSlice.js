import { createSlice } from '@reduxjs/toolkit';

import { saveItem } from '../services/storage';

import {
  fetchEntrance,
  postCheckValidPostcard,
} from '../services/api';

import {
  setInputFieldsError,
  setResponseError,
  // changeInputFieldValue,
} from './commonSlice';

const initialState = {
  writePageIndex: 0,
  sender: '테스트',
  isPrivate: false,
  postcardCount: 5,
  writtenCount: 0,
  movePage: false,
};

const { actions, reducer } = createSlice({
  name: 'entrance',
  initialState,
  reducers: {
    setEntrance(state, { payload: value }) {
      return {
        ...state,
        entrance: {
          ...value,
        },
      };
    },
    admitPostcardAccess(state) {
      return {
        ...state,
        entrance: {
          ...state.entrance,
          movePage: true,
        },
      };
    },
  },
});

export const {
  setEntrance,
  admitPostcardAccess,
} = actions;

export function loadEntrance({ key }) {
  return async (dispatch) => {
    const response = await fetchEntrance({ key });

    if (response.error) {
      dispatch(setResponseError(response.error));
      return;
    }

    // 성공할 경우
    saveItem('postcardKey', key);

    dispatch(setEntrance(response.data));
  };
}

export function checkValidPostcard({ key, secretMessage }) {
  return async (dispatch) => {
    const response = await postCheckValidPostcard({ key, secretMessage });

    if (response.error) {
      dispatch(setResponseError(response.error));
      return;
    }

    const { success } = response.data;

    if (success) {
      saveItem('secretMessage', secretMessage);

      dispatch(admitPostcardAccess());
    } else {
      dispatch(setInputFieldsError({
        page: 'entrance',
        type: 'secretMessage',
        error: 'wrong',
      }));
    }
  };
}

export default reducer;
