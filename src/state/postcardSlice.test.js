import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import {
  // setInputFieldsError,
  setResponseError,
  // changeInputFieldValue,
} from './commonSlice';

import reducer, {
  setPostcard,
  flipPostcard,
  setPostcardFront,
  loadPostcard,

} from './postcardSlice';

import {
  fetchPostcard,
} from '../services/api';

// import entrance from '../fixtures/entrance';
import responseError from '../fixtures/responseError';
// import postcards from '../fixtures/postcards';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  let store;
  describe('setPostcard', () => {
    it('set postcard variables', () => {
      const initialState = {
        postcard: {
          sender: '',
          receiver: '',
          photoUrl: '',
          contents: '',
          photoMessage: '',
        },
      };
      const postcard = {
        sender: 'sender',
        receiver: 'receiver',
        photoUrl: 'photoUrl',
        contents: 'contents',
        photoMessage: 'photoMessage',
      };

      const state = reducer(initialState, setPostcard(postcard));

      expect(state.postcard).toEqual(postcard);
    });
  });
  describe('flipPostcard', () => {
    it('change isFrontPage in postcard', () => {
      const initialState = {
        postcard: {
          isFrontPage: false,
        },
      };

      const state = reducer(initialState, flipPostcard());

      expect(state.postcard.isFrontPage).toBe(true);
    });
  });

  describe('setPostcardFront', () => {
    it('set isFrontPage in postcard with true', () => {
      const initialState = {
        postcard: {
          isFrontPage: false,
        },
      };
      const state = reducer(initialState, setPostcardFront());

      expect(state.postcard.isFrontPage).toBe(true);
    });
  });

  describe('loadPostcard', () => {
    beforeEach(() => {
      store = mockStore({});

      fetchPostcard.mockImplementation(() => Promise.resolve(given.response));
    });

    const key = 'test';
    const secretMessage = 'secretMessage';

    const response = {
      sender: 'sender',
      receiver: 'receiver',
      photo: 'photoUrl',
      contents: 'contents',
      photoMessage: 'photoMessage',
    };

    context('when response has error', () => {
      it('runs setMovingPage', async () => {
        given('response', () => ({
          error: responseError,
        }));
        await store.dispatch(loadPostcard({ key, secretMessage }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setResponseError(responseError));
      });
    });

    context('when response does not have error', () => {
      it('runs setEntrance', async () => {
        given('response', () => ({
          data: response,
        }));
        await store.dispatch(loadPostcard({ key, secretMessage }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setPostcard({
          sender: 'sender',
          receiver: 'receiver',
          photoUrl: 'photoUrl',
          contents: 'contents',
          photoMessage: 'photoMessage',
        }));
      });
    });
  });
});
