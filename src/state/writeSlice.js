import { createSlice } from '@reduxjs/toolkit';

import {
  postPhoto,
  postPostcard,
} from '../services/api';

import {
  setResponseError,
  // changeInputFieldValue,
} from './commonSlice';

const initialState = {
  writePageIndex: 0,
  inputFields: {
    isPrivate: true,
    secretMessage: {
      value: '',
      error: false,
    },
    sender: {
      value: '',
      error: false,
    },
    receiver: {
      value: '',
      error: false,
    },
    contents: {
      value: '',
      error: '',
    },
    photo: {
      value: '',
      error: false,
    },
    photoMessage: {
      value: '',
      error: false,
    },
    preview: {
      isFrontPage: true,
    },
    complete: {
      key: '',
      secretMessage: '',
    },
  },
};

const { actions, reducer } = createSlice({
  name: 'write',
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
    increaseWritePageIndex(state) {
      return {
        ...state,
        writePageIndex: (+state.writePageIndex) + 1,
      };
    },
    decreaseWritePageIndex(state) {
      return {
        ...state,
        writePageIndex: (+state.writePageIndex) - 1,
      };
    },
    flipPreviewPostcard(state) {
      // state는 이곳의 slice에서 init한 상태만 가져온다. 그렇기 때문에 밑의 inputFields는 다 common에만 이씅ㅁ.
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          preview: {
            ...state.inputFields.preview,
            isFrontPage: !state.inputFields.isFrontPage,
          },
        },
      };
    },
    setWriteCompleteValues(state, { payload: { url, secretMessage } }) {
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          complete: {
            url,
            secretMessage,
          },
        },
      };
    },
    changeRadioChecked(state, { payload: value }) {
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          isPrivate: value,
        },
      };
    },
    resetPostcardInputFields(state) {
      return {
        ...state,
        inputFields: {
          isPrivate: true,
          secretMessage: {
            value: '',
            error: false,
          },
          sender: {
            value: '',
            error: false,
          },
          receiver: {
            value: '',
            error: false,
          },
          contents: {
            value: '',
            error: '',
          },
          photo: {
            value: '',
            error: false,
          },
          photoMessage: {
            value: '',
            error: false,
          },
          preview: {
            isFrontPage: true,
          },
          complete: {
            key: '',
            secretMessage: '',
          },
        },
      };
    },
  },
});

export const {
  increaseWritePageIndex,
  decreaseWritePageIndex,
  flipPreviewPostcard,
  setWriteCompleteValues,
  changeRadioChecked,
  resetPostcardInputFields,
  changeInputFieldValue,
  setInputFieldsError,
} = actions;

export function sendPhoto({ file }) {
  return async (dispatch) => {
    const photo = await postPhoto({ file });
    dispatch(changeInputFieldValue({
      type: 'photo',
      value: photo,
    }));
  };
}

export function sendPostcard({ postcardValues, onClickNext }) {
  return async (dispatch) => {
    const response = await postPostcard(postcardValues);

    if (response.error) {
      dispatch(setResponseError(response.error));
      return;
    }

    const { url, secretMessage } = response.data;
    dispatch(setWriteCompleteValues({
      url,
      secretMessage,
    }));
    onClickNext();
  };
}

export default reducer;
