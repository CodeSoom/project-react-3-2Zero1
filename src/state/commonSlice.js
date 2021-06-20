import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    movingPage: '',
    toast: {
      triggered: false,
      message: '',
    },
  },
  reducers: {
    setResponseError(state, {
      payload: {
        move,
        method = '',
        message = '',
      },
    }) {
      return {
        ...state,
        movingPage: move,
        [method]: {
          triggered: false,
          message,
        },
      };
    },
    initToast(state) {
      return {
        ...state,
        toast: {
          triggered: false,
          message: '',
        },
      };
    },
    setToastTriggered(state, { payload: value }) {
      return {
        ...state,
        toast: {
          ...state.toast,
          triggered: value,
        },
      };
    },
    initMovingPage(state) {
      return {
        ...state,
        movingPage: '',
      };
    },
    setToast(state, { payload: { triggered, message } }) {
      return {
        ...state,
        toast: {
          triggered,
          message,
        },
      };
    },
    setMovingPage(state, { payload: { movingPage } }) {
      return {
        ...state,
        movingPage,
      };
    },
  },
});

export const {
  setResponseError,
  initToast,
  setToastTriggered,
  initMovingPage,
  setToast,
  setMovingPage,
  // changeInputFieldValue,
  // setInputFieldsError,
  // changeRadioChecked,
  // increaseWritePageIndex,
  // decreaseWritePageIndex,
  // flipPostcard,
  // flipPreviewPostcard,
  // setPostcardFront,
  // setEntrance,
  // setWriteCompleteValues,
  // resetPostcardInputFields,
  // setPostcard,
  // admitPostcardAccess,
  // initToast,
  // setToastTriggered,
  // initMovingPage,
  // setToast,
  // setPostcards,
  // setMovingPage,
} = actions;

export default reducer;
