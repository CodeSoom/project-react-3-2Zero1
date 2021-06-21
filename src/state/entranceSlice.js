import { createSlice } from '@reduxjs/toolkit';

import { saveItem } from '../services/storage';

import {
  fetchEntrance,
  postCheckValidPostcard,
} from '../services/api';

import {
  setResponseError,
} from './commonSlice';

const initialState = {
  sender: '테스트',
  isPrivate: false,
  postcardCount: 5,
  writtenCount: 0,
  movePage: false,
  inputFields: {
    secretMessage: {
      value: '',
      error: false,
    },
  },
};

const { actions, reducer } = createSlice({
  name: 'entrance',
  initialState,
  reducers: {
    setEntrance(state, { payload: value }) {
      return {
        ...state,
        ...value,
      };
    },
    admitPostcardAccess(state) {
      return {
        ...state,
        movePage: true,
      };
    },
    resetAdmitPostcardAccess(state) {
      return {
        ...state,
        movePage: false,
      };
    },
    changeInputFieldValue(state, { payload: { type, value } }) {
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          [type]: {
            ...state.inputFields[type],
            value,
          },
        },
      };
    },
    setInputFieldsError(state, { payload: { type, error } }) {
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          [type]: {
            ...state.inputFields[type],
            error,
          },
        },
      };
    },
  },
});

export const {
  setEntrance,
  admitPostcardAccess,
  resetAdmitPostcardAccess,
  setInputFieldsError,
  changeInputFieldValue,
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
        type: 'secretMessage',
        error: 'wrong',
      }));
    }
  };
}

export default reducer;
