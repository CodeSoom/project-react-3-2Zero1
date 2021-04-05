import { createSlice } from '@reduxjs/toolkit';

import {
  fetchEntrance,
} from '../services/api';

import mockEntrance from '../fixtures/entrance';

// import { saveItem } from './services/storage';

// import { equal } from './utils';

const initialInputFields = {
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
  },
};

const postcard = {
  isFrontPage: true,
  sender: '',
  receiver: '',
  contents: '',
  stampURL: '',
  photoURL: '',
  photoMessage: '',
};

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    writePageIndex: 0,
    inputFields: initialInputFields,
    entrance: {
      sender: '',
      isPrivate: '',
      postcardCount: 0,
      writtenCount: 0,
    },
    postcard,
  },
  reducers: {
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
    changeInputFieldValue(state, { payload: { page, type, value } }) {
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          [page]: {
            ...state.inputFields[page],
            [type]: {
              ...state.inputFields[page][type],
              value,
            },
          },
        },
      };
    },
    setInputFieldsError(state, { payload: { page, type, error } }) {
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          [page]: {
            ...state.inputFields[page],
            [type]: {
              ...state.inputFields[page][type],
              error,
            },
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
    flipPostcard(state) {
      const {
        postcard: {
          isFrontPage,
        },
      } = state;

      return {
        ...state,
        postcard: {
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
    setEntrance(state, { payload: value }) {
      return {
        ...state,
        entrance: {
          ...value,
        },
      };
    },
  },
});

export const {
  changeInputFieldValue,
  setInputFieldsError,
  changeRadioChecked,
  increaseWritePageIndex,
  decreaseWritePageIndex,
  flipPostcard,
  flipPreviewPostcard,
  setPostcardFront,
  setEntrance,
} = actions;

export function loadEntrance({ key }) {
  return async (dispatch) => {
    const entrance = await fetchEntrance({ key });
    // TODO : API가 아직 없기 때문에 mock 데이터를 보여준다. 
    dispatch(setEntrance(entrance || mockEntrance));
  };
}

export default reducer;
