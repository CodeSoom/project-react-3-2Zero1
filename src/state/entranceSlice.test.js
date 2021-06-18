import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import {
  setInputFieldsError,
  setResponseError,
  // changeInputFieldValue,
} from './commonSlice';

import reducer, {
  setEntrance,
  loadEntrance,
  checkValidPostcard,
  admitPostcardAccess,
} from './entranceSlice';

import {
  postCheckValidPostcard,
  fetchEntrance,
  // postPostcard,
  // fetchPostcard,
  // postExpire,
} from '../services/api';

import entrance from '../fixtures/entrance';
import responseError from '../fixtures/responseError';
// import postcards from '../fixtures/postcards';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  let store;
  describe('setEntrance', () => {
    it('set entrance variables', () => {
      const initialState = {
        entrance: {
          sender: '',
          isPrivate: '',
          postcardCount: 0,
          writtenCount: 0,
        },
      };

      const state = reducer(initialState, setEntrance(entrance));

      expect(state.entrance).toEqual(entrance);
    });
  });

  describe('admitPostcardAccess', () => {
    it('set movePage with true in Entrance', () => {
      const initialState = {
        entrance: {
          movePage: false,
        },
      };

      const state = reducer(initialState, admitPostcardAccess());

      expect(state.entrance.movePage).toEqual(true);
    });
  });

  describe('loadEntrance', () => {
    beforeEach(() => {
      store = mockStore({});

      fetchEntrance.mockImplementation(() => Promise.resolve(given.response));
    });

    context('when response has error', () => {
      it('runs setResponseError', async () => {
        given('response', () => ({
          error: responseError,
        }));
        await store.dispatch(loadEntrance({ key: 'key' }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setResponseError(responseError));
      });
    });

    context('when response does not have error', () => {
      it('runs setEntrance', async () => {
        given('response', () => ({
          data: {},
        }));
        await store.dispatch(loadEntrance({ key: 'key' }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setEntrance({}));
      });
    });
  });

  describe('checkValidPostcard', () => {
    beforeEach(() => {
      store = mockStore({});
      postCheckValidPostcard.mockImplementation(() => Promise.resolve(given.response));
    });

    context('when response has error', () => {
      it('runs setMovingPage', async () => {
        given('response', () => ({
          error: responseError,
        }));

        await store.dispatch(checkValidPostcard({ key: 'key' }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setResponseError(responseError));
      });
    });

    context('when response does not have error', () => {
      context('when response is success', () => {
        it('calls admitPostcardAccess', async () => {
          given('response', () => ({
            data: { success: true },
          }));

          const key = 'test';
          const secretMessage = 'secretMessage';

          await store.dispatch(checkValidPostcard({ key, secretMessage }));

          const actions = store.getActions();

          expect(actions[0]).toEqual(admitPostcardAccess());
        });
      });

      context('when response is not success', () => {
        it('call setInputFieldsError', async () => {
          given('response', () => ({
            data: { success: false },
          }));

          const key = 'test';
          const secretMessage = 'secretMessage';

          await store.dispatch(checkValidPostcard({ key, secretMessage }));

          const actions = store.getActions();

          expect(actions[0]).toEqual(setInputFieldsError({
            page: 'entrance',
            type: 'secretMessage',
            error: 'wrong',
          }));
        });
      });
    });
  });
});