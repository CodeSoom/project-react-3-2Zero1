import { createSlice } from '@reduxjs/toolkit';

// import {
//   fetchRegions,
// } from './services/api';

// import { saveItem } from './services/storage';

// import { equal } from './utils';

const secretMessage = {
  value: '',
  error: '',
};

const initialInputFields = {
  entrance: {
    secretMessage
  },
  write: {
    secretMessage,
    sender: {
      value: '',
      error: '',
    },
    receiver: {
      value: '',
      error: '',
    },
    photo: {
      value: '',
      error: '',
    },
    photoMessage: {
      value: '',
      error: '',
    },
  },
};

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    inputFields: initialInputFields,
    entrance: {
      'sender': '',
      'isPrivate': '',
      'postcardCount': 0,
      'writtenCount': 0, 
    },
  },
  reducers: {
    changeInputFieldValue(state, { payload: { page, type, value } }) {
      const { inputFields } = state;
      const types = inputFields[page];
      const inputField = inputFields[page][type];

      return {
        ...state,
        inputFields: {
          ...inputFields,
          [page]:{
            ...types,
            [type]:{
              ...inputField,
              value,
            },
          },
        },
      };
    },
    setInputFieldsError(state, { payload: { type, error } }) {
      const { inputFields } = state;
      const inputField = inputFields[type];
      
      return {
        ...state,
        inputFields: {
          ...inputFields,
          [type]:{
            ...inputField,
            error,
          } 
        }
      };
    },
    loadPostcard(){
      // return async (dispatch, getState) => {
      //   const { accessToken, reviewFields: { score, description } } = getState();
    
      //   await postReview({
      //     accessToken, restaurantId, score, description,
      //   });
    
      //   dispatch(loadReview({ restaurantId }));
      //   dispatch(clearReviewFields());
      // };
    },
  },
});

export const {
  changeInputFieldValue,
  setInputFieldsError
} = actions;


// export function loadReview({ restaurantId }) {
//   return async (dispatch) => {
//     const restaurant = await fetchRestaurant({ restaurantId });

//     dispatch(setReviews(restaurant.reviews));
//   };
// }


export default reducer;
