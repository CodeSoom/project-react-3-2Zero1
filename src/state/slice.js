import { createSlice } from '@reduxjs/toolkit';

import {
  fetchEntrance,
} from '../services/api';

// import { saveItem } from './services/storage';

// import { equal } from './utils';

const secretMessage = {
  value: '',
  error: false,
};

const initialInputFields = {
  entrance: {
    secretMessage,
  },
  write: {
    isPrivate: true,
    secretMessage,
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
    // return async (dispatch, getState) => {
    //   const { accessToken, reviewFields: { score, description } } = getState();
    //   await postReview({
    //     accessToken, restaurantId, score, description,
    //   });
    //   dispatch(loadReview({ restaurantId }));
    //   dispatch(clearReviewFields());
    // };
  // },
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
    dispatch(setEntrance(entrance));
  };
}

export default reducer;
