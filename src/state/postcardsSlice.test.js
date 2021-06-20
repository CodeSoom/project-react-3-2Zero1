import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import reducer, {
  setPostcards,
  loadPostcards,
} from './postcardsSlice';

import postcards from '../fixtures/postcards';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  let store;
  describe('setPostcards', () => {
    it('set postcards', () => {
      const initialState = {
        postcards: [],
      };

      const state = reducer(initialState, setPostcards(postcards));

      expect(state.postcards).toEqual(postcards);
    });
  });
  describe('loadPostcards', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setPostcards', async () => {
      await store.dispatch(loadPostcards());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setPostcards([]));
    });
  });
});
