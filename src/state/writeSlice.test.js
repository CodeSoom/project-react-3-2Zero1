import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import {
  postPostcard,
} from '../services/api';

import reducer, {
  changeRadioChecked,
  flipPreviewPostcard,
  increaseWritePageIndex,
  decreaseWritePageIndex,
  setWriteCompleteValues,
  resetPostcardInputFields,
  sendPhoto,
  sendPostcard,
} from './writeSlice';

import {
  setResponseError,
  changeInputFieldValue,
} from './commonSlice';

import responseError from '../fixtures/responseError';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  let store;
  describe('increaseWritePageIndex', () => {
    it('increases writePageIndex + 1', () => {
      const initialState = {
        writePageIndex: 0,
      };

      const state = reducer(initialState, increaseWritePageIndex());

      expect(state.writePageIndex).toBe(1);
    });
  });

  describe('decreaseWritePageIndex', () => {
    it('decreases writePageIndex -1', () => {
      const initialState = {
        writePageIndex: 1,
      };

      const state = reducer(initialState, decreaseWritePageIndex());

      expect(state.writePageIndex).toBe(0);
    });
  });

  describe('flipPreviewPostcard', () => {
    it('change isFrontPage in preview inputField', () => {
      const initialState = {
        inputFields: {
          write: {
            preview: {
              isFrontPage: false,
            },
          },
        },
      };

      const state = reducer(initialState, flipPreviewPostcard());

      expect(state.inputFields.write.preview.isFrontPage).toBe(true);
    });
  });

  describe('sendPhoto', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs changeInputFieldValue', async () => {
      const fileName = 'test';
      await store.dispatch(sendPhoto({ file: new File([''], fileName) }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(changeInputFieldValue({
        page: 'write',
        type: 'photo',
        value: fileName,
      }));
    });
  });

  describe('sendPostcard', () => {
    beforeEach(() => {
      store = mockStore({});

      postPostcard.mockImplementation(() => Promise.resolve(given.response));
    });

    const postcard = {
      key: 'test',
      sender: 'sender',
      receiver: 'receiver',
      contents: 'contents',
      photo: 'photo',
      photoMessage: 'photoMessage',
      secretMessage: 'secretMessage',
      isPrivate: 'isPrivate',
    };
    const onClickNext = jest.fn();

    context('when response has error', () => {
      it('runs setMovingPage', async () => {
        given('response', () => ({
          error: responseError,
        }));

        await store.dispatch(sendPostcard({
          postcard,
          onClickNext,
        }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setResponseError(responseError));
      });
    });

    context('when response does not have error', () => {
      it('runs changeInputFieldValue', async () => {
        const url = 'url';
        const secretMessage = 'secretMessage';

        given('response', () => ({
          data: {
            url,
            secretMessage,
          },
        }));

        await store.dispatch(sendPostcard({
          postcard,
          onClickNext,
        }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setWriteCompleteValues({
          url,
          secretMessage,
        }));
      });
    });
  });
  describe('setWriteCompleteValues', () => {
    it('set WriteCompleteValues in inputFields', () => {
      const page = 'write';
      const type = 'complete';

      const url = 'url';
      const secretMessage = 'secretMessage';

      const initialState = {
        inputFields: {
          [page]: {
            [type]: {
              url: '',
              secretMessage: '',
            },
          },
        },
      };

      const state = reducer(initialState, setWriteCompleteValues({
        url,
        secretMessage,
      }));

      expect(state.inputFields[page][type].url).toBe(url);
      expect(state.inputFields[page][type].secretMessage).toBe(secretMessage);
    });
  });
  describe('changeRadioChecked', () => {
    it('changes isPrivate in write variable', () => {
      const initialState = {
        inputFields: {
          write: {
            isPrivate: false,
          },
        },
      };

      const state = reducer(initialState, changeRadioChecked({ value: true }));

      expect(state.inputFields.write.isPrivate.value).toBe(true);
    });
  });
  describe('resetPostcardInputFields', () => {
    it('reset resetPostcardInputFields in inputFields', () => {
      const inputFields = {
        entrance: {
          value: '1',
          error: 'false',
        },
        write: {
          isPrivate: true,
          secretMessage: {
            value: 'secretMessage',
            error: false,
          },
          sender: {
            value: 'sender',
            error: false,
          },
          receiver: {
            value: 'receiver',
            error: false,
          },
          contents: {
            value: 'contents',
            error: '',
          },
          photo: {
            value: 'photo',
            error: false,
          },
          photoMessage: {
            value: 'photoMessage',
            error: false,
          },
          preview: {
            isFrontPage: true,
          },
          complete: {
            key: 'complete',
            secretMessage: '',
          },
        },
      };

      const initialState = { inputFields };

      const state = reducer(initialState, resetPostcardInputFields());

      expect(state.inputFields).toEqual({
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
          complete: {
            key: '',
            secretMessage: '',
          },
        },
      });
    });
  });
});
