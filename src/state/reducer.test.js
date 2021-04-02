import reducer from './slice';

import {
  changeInputFieldValue,
  increaseWritePageIndex,
  decreaseWritePageIndex,
} from './slice';

describe('reducer', () => {
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
  const initialState = {
    writePageIndex: 0,
    inputFields: initialInputFields,
    entrance: {
      sender: '',
      isPrivate: '',
      postcardCount: 0,
      writtenCount: 0,
    },
    postcard: {
      isFrontPage: true,
      sender: '',
      receiver: '',
      contents: '',
      stampURL: '',
      photoURL: '',
      photoMessage: '',
    },
  };
  context('when previous state is undefined', () => {
    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('changeInputFieldValue', () => {
    it('changes InputFieldValue', () => {
      const page = 'entrance';
      const type = 'secretMessage';

      const state = reducer(initialState, changeInputFieldValue({
        page,
        type,
        value: 'hello',
      }));

      expect(state.inputFields[page][type].value).toBe('hello');
    });
  });

  describe('increaseWritePageIndex', () => {
    it('increases writePageIndex + 1', () => {
      const state = reducer(initialState, increaseWritePageIndex());

      expect(state.writePageIndex).toBe(1);
    });
  });

  describe('decreaseWritePageIndex', () => {
    it('decreases writePageIndex -1', () => {
      const editedState = {
        ...initialState,
        writePageIndex: 1,
      };
      const state = reducer(editedState, decreaseWritePageIndex());

      expect(state.writePageIndex).toBe(0);
    });
  });
});
