import reducer, {
  setResponseError,
  initToast,
  setToastTriggered,
  initMovingPage,
  setToast,
  setMovingPage,
} from './commonSlice';

jest.mock('../services/api');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    it('returns initialState', () => {
      const initialState = {
        movingPage: '',
        toast: {
          triggered: false,
          message: '',
        },
      };
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setResponseError', () => {
    const page = 'entrance';
    const method = 'toast';
    context('when error has all properties', () => {
      it('set moving page', () => {
        const error = {
          move: page,
          method,
          message: 'message',
        };

        const initialState = {
          movingPage: '',
          toast: {
            triggered: false,
            message: '',
          },
        };

        const state = reducer(initialState, setResponseError(error));

        expect(state.movingPage).toEqual(page);
        expect(state.toast).toEqual({
          triggered: false,
          message: 'message',
        });
      });
    });

    context('when error does not have all properties', () => {
      it('set moving page', () => {
        const error = {
          move: page,
        };

        const initialState = {
          movingPage: '',
          toast: {
            triggered: false,
            message: '',
          },
        };

        const state = reducer(initialState, setResponseError(error));

        expect(state.movingPage).toEqual(page);
        expect(state.toast).toEqual({
          triggered: false,
          message: '',
        });
      });
    });
  });

  describe('initToast', () => {
    it('initialize toast', () => {
      const initialState = {
        toast: {
          message: 'test',
          triggered: true,
        },
      };

      const state = reducer(initialState, initToast());

      expect(state.toast).toEqual({
        message: '',
        triggered: false,
      });
    });
  });

  describe('setToastTriggered', () => {
    it('set triggered in toast', () => {
      const initialState = {
        toast: {
          message: 'test',
          triggered: false,
        },
      };

      const state = reducer(initialState, setToastTriggered(true));

      expect(state.toast).toEqual({
        message: 'test',
        triggered: true,
      });
    });
  });

  describe('setToast', () => {
    it('set Toast', () => {
      const initialState = {
        toast: {
          message: '',
          triggered: false,
        },
      };

      const message = 'message';

      const state = reducer(initialState, setToast({ message, triggered: true }));

      expect(state.toast).toEqual({
        message,
        triggered: true,
      });
    });
  });

  describe('initMovingPage', () => {
    it('initializes movingPage', () => {
      const initialState = {
        movingPage: 'entrance',
      };

      const state = reducer(initialState, initMovingPage());

      expect(state.movingPage).toEqual('');
    });
  });

  describe('setMovingPage', () => {
    it('set movingPage', () => {
      const initialState = {
        movingPage: '',
      };

      const state = reducer(initialState, setMovingPage({ movingPage: 'notfound' }));

      expect(state.movingPage).toEqual('notfound');
    });
  });
});
