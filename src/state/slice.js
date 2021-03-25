import { createSlice } from '@reduxjs/toolkit';

// import {
//   fetchRegions,
// } from './services/api';

// import { saveItem } from './services/storage';

// import { equal } from './utils';

const secretMessage = {
  value: '',
  error: false,
};

const initialInputFields = {
  entrance: {
    secretMessage
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
    photo: {
      value: '',
      error: false,
    },
    photoMessage: {
      value: '',
      error: false,
    },
  },
};

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    writePageIndex: 0,
    inputFields: initialInputFields,
    entrance: {
      'sender': '',
      'isPrivate': '',
      'postcardCount': 0,
      'writtenCount': 0, 
    },
  },
  reducers: {
    changeRadioChecked(state, { payload: value } ){
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          write:{
            ...state.inputFields['write'],
            isPrivate: value === 'true',
          },
        },
      };
    },
    changeInputFieldValue(state, { payload: { page, type, value } }) {
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          [page]:{
            ...state.inputFields[page],
            [type]:{
              ...state.inputFields[page][type],
              value,
            },
          },
        },
      };
    },
    setInputFieldsError(state, { payload: { page, type, error } }) {
      console.log({
        ...state,
        inputFields: {
          ...state.inputFields,
          [page]:{
            ...state.inputFields[page],
            [type]:{
              ...state.inputFields[page][type],
              error,
            },
          },
        },
      });
      return {
        ...state,
        inputFields: {
          ...state.inputFields,
          [page]:{
            ...state.inputFields[page],
            [type]:{
              ...state.inputFields[page][type],
              error,
            },
          },
        },
      };
    },
    increaseWritePageIndex(state){
      return {
        ...state,
        writePageIndex: (+state.writePageIndex) + 1,
      }
    },
    decreaseWritePageIndex(state){
      return {
        ...state,
        writePageIndex: (+state.writePageIndex) - 1,
      }
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
} = actions;


// export function loadReview({ restaurantId }) {
//   return async (dispatch) => {
//     const restaurant = await fetchRestaurant({ restaurantId });

//     dispatch(setReviews(restaurant.reviews));
//   };
// }


export default reducer;
