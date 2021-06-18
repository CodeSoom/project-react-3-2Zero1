import { createSlice } from '@reduxjs/toolkit';

import {
  postPhoto,
  postPostcard,
} from '../services/api';

import {
  setResponseError,
  changeInputFieldValue,
} from './commonSlice';

const initialState = {
  entrance: {
    sender: '테스트',
    isPrivate: false,
    postcardCount: 5,
    writtenCount: 0,
    movePage: false,
  },
};

const { actions, reducer } = createSlice({
  name: 'write',
  initialState,
  reducers: {
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
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          write: {
            ...state.inputFields.write,
            preview: {
              ...state.inputFields.write.preview,
              isFrontPage: !state.inputFields.write.preview.isFrontPage,
            },
          },
        },
      };
    },
    setWriteCompleteValues(state, { payload: { url, secretMessage } }) {
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          write: {
            ...state.inputFields.write,
            complete: {
              url,
              secretMessage,
            },
          },
        },
      };
    },
    changeRadioChecked(state, { payload: value }) {
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          write: {
            ...state.inputFields.write,
            isPrivate: value,
          },
        },
      };
    },
    resetPostcardInputFields(state) {
      return {
        ...state,
        inputFields: {
          entrance: {
            secretMessage: {
              value: '',
              error: false,
            },
          },
          write: {
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
} = actions;

export function sendPhoto({ file }) {
  return async (dispatch) => {
    const photo = await postPhoto({ file });
    dispatch(changeInputFieldValue({
      page: 'write',
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
