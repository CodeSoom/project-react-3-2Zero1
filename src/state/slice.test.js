import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import reducer, {
  changeRadioChecked,
  changeInputFieldValue,
  setInputFieldsError,
  increaseWritePageIndex,
  decreaseWritePageIndex,
  flipPreviewPostcard,
  flipPostcard,
  setPostcardFront,
  setEntrance,
  setWriteCompleteValues,
  resetPostcardInputFields,
  setPostcard,
  admitPostcardAccess,
  setMovingPage,

  loadEntrance,
  sendPhoto,
  sendPostcard,
  checkValidPostcard,
  loadPostcard,
} from './slice';

import {
  postCheckValidPostcard,
  fetchEntrance,
  postPostcard,
} from '../services/api';

import entrance from '../fixtures/entrance';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  let store;

  context('when previous state is undefined', () => {
    it('returns initialState', () => {
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
          complete: {
            key: '',
            secretMessage: '',
          },
        },
      };
      const initialState = {
        writePageIndex: 0,
        inputFields: initialInputFields,
        entrance: {
          sender: '테스트',
          isPrivate: false,
          postcardCount: 5,
          writtenCount: 0,
          movePage: false,
        },
        postcard: {
          isFrontPage: true,
          sender: '',
          receiver: '',
          contents: '',
          photoUrl: '',
          photoMessage: '',
        },
        movingPage: '',
      };
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
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

  describe('changeInputFieldValue', () => {
    it('changes InputFieldValue', () => {
      const page = 'entrance';
      const type = 'secretMessage';

      const initialState = {
        inputFields: {
          [page]: {
            [type]: {
              value: '',
            },
          },
        },
      };

      const state = reducer(initialState, changeInputFieldValue({
        page,
        type,
        value: 'hello',
      }));

      expect(state.inputFields[page][type].value).toBe('hello');
    });
  });

  describe('setInputFieldsError', () => {
    it('change error in InputFields', () => {
      const page = 'entrance';
      const type = 'secretMessage';

      const initialState = {
        inputFields: {
          [page]: {
            [type]: {
              error: false,
            },
          },
        },
      };

      const state = reducer(initialState, setInputFieldsError({
        page,
        type,
        error: true,
      }));

      expect(state.inputFields.entrance.secretMessage.error).toBe(true);
    });
  });

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

  describe('setMovingPage', () => {
    it('set moving page', () => {
      const initialState = {
        movingPage: '',
      };
      const page = 'entrance';

      const state = reducer(initialState, setMovingPage(page));

      expect(state.movingPage).toEqual(page);
    });
  });

  describe('loadEntrance', () => {
    beforeEach(() => {
      store = mockStore({});

      fetchEntrance.mockImplementation(() => Promise.resolve(given.response));
    });

    context('when response has error', () => {
      it('runs setMovingPage', async () => {
        given('response', () => ({
          error: {
            move: 'notfound',
          },
        }));
        await store.dispatch(loadEntrance({ key: 'key' }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setMovingPage('notfound'));
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
      key: 'test', // TODO : 입장 페이지가 완료되면 key값을 받아 넣어주도록 변경해야함.
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
          error: {
            move: 'notfound',
          },
        }));
        await store.dispatch(sendPostcard({
          postcard,
          onClickNext,
        }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setMovingPage('notfound'));
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

  describe('checkValidPostcard', () => {
    beforeEach(() => {
      store = mockStore({});
      postCheckValidPostcard.mockImplementation(() => Promise.resolve(given.response));
    });

    context('when response has error', () => {
      it('runs setMovingPage', async () => {
        given('response', () => ({
          error: {
            move: 'notfound',
          },
        }));
        await store.dispatch(checkValidPostcard({ key: 'key' }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setMovingPage('notfound'));
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
            error: true,
          }));
        });
      });
    });
  });

  describe('loadPostcard', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setPostcard', async () => {
      const key = 'test';
      const secretMessage = 'secretMessage';

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
