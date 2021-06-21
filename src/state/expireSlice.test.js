import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import {
  setMovingPage,
  setResponseError,
  setToast,
} from './commonSlice';

import reducer, {
  changeInputFieldValue,
  setInputFieldsError,
  expirePostcard,
} from './expireSlice';

import {
  postExpire,
} from '../services/api';

import responseError from '../fixtures/responseError';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  let store;
  describe('changeInputFieldValue', () => {
    it('changes InputFieldValue', () => {
      const type = 'secretMessage';

      const initialState = {
        inputFields: {
          [type]: {
            value: '',
          },
        },
      };

      const state = reducer(initialState, changeInputFieldValue({
        type,
        value: 'hello',
      }));

      expect(state.inputFields[type].value).toBe('hello');
    });
  });

  describe('setInputFieldsError', () => {
    it('change error in InputFields', () => {
      const type = 'secretMessage';

      const initialState = {
        inputFields: {
          [type]: {
            error: false,
          },
        },
      };

      const state = reducer(initialState, setInputFieldsError({
        type,
        error: true,
      }));

      expect(state.inputFields.secretMessage.error).toBe(true);
    });
  });

  describe('expirePostcard', () => {
    beforeEach(() => {
      store = mockStore({});

      postExpire.mockImplementation(() => Promise.resolve(given.response));
    });

    context('when response has error', () => {
      it('runs setMovingPage', async () => {
        given('response', () => ({
          error: responseError,
        }));
        await store.dispatch(expirePostcard({ key: 'key', secretMessage: 'secretMessage' }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setResponseError(responseError));
      });
    });

    context('when response does not have error', () => {
      context('when success is true', () => {
        it('runs setToast and setMovingPage', async () => {
          given('response', () => ({
            data: { success: true },
          }));
          await store.dispatch(expirePostcard({ key: 'key', secretMessage: 'secretMessage' }));

          const actions = store.getActions();

          expect(actions[0]).toEqual(setToast({
            triggered: false,
            message: '엽서가 삭제되었습니다.',
          }));

          expect(actions[1]).toEqual(setMovingPage({
            movingPage: 'notfound',
          }));
        });
      });

      context('when success is false', () => {
        it('runs setInputFieldsError', async () => {
          given('response', () => ({
            data: { success: false },
          }));
          await store.dispatch(expirePostcard({ key: 'key', secretMessage: 'secretMessage' }));

          const actions = store.getActions();

          expect(actions[0]).toEqual(setInputFieldsError({
            type: 'secretMessage',
            error: 'wrong',
          }));
        });
      });
    });
  });
});
