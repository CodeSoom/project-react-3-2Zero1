import { createSlice } from '@reduxjs/toolkit';

import {
  postExpire,
} from '../services/api';

import {
  setResponseError,
  setMovingPage,
  setToast,
} from './commonSlice';

const initialState = {
  inputFields: {
    secretMessage: {
      value: '',
      error: false,
    },
  },
};

const { actions, reducer } = createSlice({
  name: 'expire',
  initialState,
  reducers: {
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
  changeInputFieldValue,
  setInputFieldsError,
} = actions;

export function expirePostcard({ key, secretMessage }) {
  return async (dispatch) => {
    const response = await postExpire({ key, secretMessage });

    if (response.error) {
      dispatch(setResponseError(response.error));
      return;
    }

    const { success } = response.data;

    if (success) {
      dispatch(setToast({
        triggered: false,
        message: '엽서가 삭제되었습니다.',
      }));
      dispatch(setMovingPage({ movingPage: 'notfound' }));
    } else {
      dispatch(setInputFieldsError({
        type: 'secretMessage',
        error: 'wrong',
      }));
    }
  };
}

export default reducer;
