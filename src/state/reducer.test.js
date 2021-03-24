import reducer from './slice';

import {
  changeInputFieldValue
} from './slice';

describe('reducer', () => {
  const initialInputFields = {
  entrance: {
    secretMessage: {
      value: '',
      error: '',
    }
  },
  write: {
    secretMessage: {
      value: '',
      error: '',
    },
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
  const initialState = {
    inputFields: initialInputFields,
    entrance: {
      'sender': "",
      'isPrivate': "",
      'postcardCount': 0,
      'writtenCount': 0, 
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
      const page = 'entrance'
      const type = 'secretMessage';

      const state = reducer(initialState, changeInputFieldValue({
        page,
        type,
        value: 'hello'
      }));

      expect(state.inputFields[page][type].value).toBe('hello');
    });
  });
});
