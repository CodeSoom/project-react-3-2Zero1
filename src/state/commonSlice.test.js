import reducer, {
  setResponseError,
  initToast,
  setToastTriggered,
  initMovingPage,
  setToast,
  setMovingPage,
} from './commonSlice';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  // let store;

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

  // describe('changeRadioChecked', () => {
  //   it('changes isPrivate in write variable', () => {
  //     const initialState = {
  //       inputFields: {
  //         write: {
  //           isPrivate: false,
  //         },
  //       },
  //     };

  //     const state = reducer(initialState, changeRadioChecked({ value: true }));

  //     expect(state.inputFields.write.isPrivate.value).toBe(true);
  //   });
  // });
  /*
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
*/
  // describe('increaseWritePageIndex', () => {
  //   it('increases writePageIndex + 1', () => {
  //     const initialState = {
  //       writePageIndex: 0,
  //     };

  //     const state = reducer(initialState, increaseWritePageIndex());

  //     expect(state.writePageIndex).toBe(1);
  //   });
  // });

  // describe('decreaseWritePageIndex', () => {
  //   it('decreases writePageIndex -1', () => {
  //     const initialState = {
  //       writePageIndex: 1,
  //     };

  //     const state = reducer(initialState, decreaseWritePageIndex());

  //     expect(state.writePageIndex).toBe(0);
  //   });
  // });

  // describe('flipPreviewPostcard', () => {
  //   it('change isFrontPage in preview inputField', () => {
  //     const initialState = {
  //       inputFields: {
  //         write: {
  //           preview: {
  //             isFrontPage: false,
  //           },
  //         },
  //       },
  //     };

  //     const state = reducer(initialState, flipPreviewPostcard());

  //     expect(state.inputFields.write.preview.isFrontPage).toBe(true);
  //   });
  // });

  // describe('flipPostcard', () => {
  //   it('change isFrontPage in postcard', () => {
  //     const initialState = {
  //       postcard: {
  //         isFrontPage: false,
  //       },
  //     };

  //     const state = reducer(initialState, flipPostcard());

  //     expect(state.postcard.isFrontPage).toBe(true);
  //   });
  // });

  // describe('setPostcardFront', () => {
  //   it('set isFrontPage in postcard with true', () => {
  //     const initialState = {
  //       postcard: {
  //         isFrontPage: false,
  //       },
  //     };
  //     const state = reducer(initialState, setPostcardFront());

  //     expect(state.postcard.isFrontPage).toBe(true);
  //   });
  // });

  // describe('setEntrance', () => {
  //   it('set entrance variables', () => {
  //     const initialState = {
  //       entrance: {
  //         sender: '',
  //         isPrivate: '',
  //         postcardCount: 0,
  //         writtenCount: 0,
  //       },
  //     };

  //     const state = reducer(initialState, setEntrance(entrance));

  //     expect(state.entrance).toEqual(entrance);
  //   });
  // });

  // describe('setWriteCompleteValues', () => {
  //   it('set WriteCompleteValues in inputFields', () => {
  //     const page = 'write';
  //     const type = 'complete';

  //     const url = 'url';
  //     const secretMessage = 'secretMessage';

  //     const initialState = {
  //       inputFields: {
  //         [page]: {
  //           [type]: {
  //             url: '',
  //             secretMessage: '',
  //           },
  //         },
  //       },
  //     };

  //     const state = reducer(initialState, setWriteCompleteValues({
  //       url,
  //       secretMessage,
  //     }));

  //     expect(state.inputFields[page][type].url).toBe(url);
  //     expect(state.inputFields[page][type].secretMessage).toBe(secretMessage);
  //   });
  // });

  // describe('resetPostcardInputFields', () => {
  //   it('reset resetPostcardInputFields in inputFields', () => {
  //     const inputFields = {
  //       entrance: {
  //         value: '1',
  //         error: 'false',
  //       },
  //       write: {
  //         isPrivate: true,
  //         secretMessage: {
  //           value: 'secretMessage',
  //           error: false,
  //         },
  //         sender: {
  //           value: 'sender',
  //           error: false,
  //         },
  //         receiver: {
  //           value: 'receiver',
  //           error: false,
  //         },
  //         contents: {
  //           value: 'contents',
  //           error: '',
  //         },
  //         photo: {
  //           value: 'photo',
  //           error: false,
  //         },
  //         photoMessage: {
  //           value: 'photoMessage',
  //           error: false,
  //         },
  //         preview: {
  //           isFrontPage: true,
  //         },
  //         complete: {
  //           key: 'complete',
  //           secretMessage: '',
  //         },
  //       },
  //     };

  //     const initialState = { inputFields };

  //     const state = reducer(initialState, resetPostcardInputFields());

  //     expect(state.inputFields).toEqual({
  //       entrance: {
  //         secretMessage: {
  //           value: '',
  //           error: false,
  //         },
  //       },
  //       write: {
  //         isPrivate: true,
  //         secretMessage: {
  //           value: '',
  //           error: false,
  //         },
  //         sender: {
  //           value: '',
  //           error: false,
  //         },
  //         receiver: {
  //           value: '',
  //           error: false,
  //         },
  //         contents: {
  //           value: '',
  //           error: '',
  //         },
  //         photo: {
  //           value: '',
  //           error: false,
  //         },
  //         photoMessage: {
  //           value: '',
  //           error: false,
  //         },
  //         preview: {
  //           isFrontPage: true,
  //         },
  //         complete: {
  //           key: '',
  //           secretMessage: '',
  //         },
  //       },
  //     });
  //   });
  // });

  // describe('setPostcard', () => {
  //   it('set postcard variables', () => {
  //     const initialState = {
  //       postcard: {
  //         sender: '',
  //         receiver: '',
  //         photoUrl: '',
  //         contents: '',
  //         photoMessage: '',
  //       },
  //     };
  //     const postcard = {
  //       sender: 'sender',
  //       receiver: 'receiver',
  //       photoUrl: 'photoUrl',
  //       contents: 'contents',
  //       photoMessage: 'photoMessage',
  //     };

  //     const state = reducer(initialState, setPostcard(postcard));

  //     expect(state.postcard).toEqual(postcard);
  //   });
  // });

  // describe('admitPostcardAccess', () => {
  //   it('set movePage with true in Entrance', () => {
  //     const initialState = {
  //       entrance: {
  //         movePage: false,
  //       },
  //     };

  //     const state = reducer(initialState, admitPostcardAccess());

  //     expect(state.entrance.movePage).toEqual(true);
  //   });
  // });

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

  // describe('setPostcards', () => {
  //   it('set postcards', () => {
  //     const initialState = {
  //       postcards: [],
  //     };

  //     const state = reducer(initialState, setPostcards(postcards));

  //     expect(state.postcards).toEqual(postcards);
  //   });
  // });

  describe('setMovingPage', () => {
    it('set movingPage', () => {
      const initialState = {
        movingPage: '',
      };

      const state = reducer(initialState, setMovingPage({ movingPage: 'notfound' }));

      expect(state.movingPage).toEqual('notfound');
    });
  });

  // describe('loadEntrance', () => {
  //   beforeEach(() => {
  //     store = mockStore({});

  //     fetchEntrance.mockImplementation(() => Promise.resolve(given.response));
  //   });

  //   context('when response has error', () => {
  //     it('runs setResponseError', async () => {
  //       given('response', () => ({
  //         error: responseError,
  //       }));
  //       await store.dispatch(loadEntrance({ key: 'key' }));

  //       const actions = store.getActions();

  //       expect(actions[0]).toEqual(setResponseError(responseError));
  //     });
  //   });

  //   context('when response does not have error', () => {
  //     it('runs setEntrance', async () => {
  //       given('response', () => ({
  //         data: {},
  //       }));
  //       await store.dispatch(loadEntrance({ key: 'key' }));

  //       const actions = store.getActions();

  //       expect(actions[0]).toEqual(setEntrance({}));
  //     });
  //   });
  // });

  // describe('sendPhoto', () => {
  //   beforeEach(() => {
  //     store = mockStore({});
  //   });

  //   it('runs changeInputFieldValue', async () => {
  //     const fileName = 'test';
  //     await store.dispatch(sendPhoto({ file: new File([''], fileName) }));

  //     const actions = store.getActions();

  //     expect(actions[0]).toEqual(changeInputFieldValue({
  //       page: 'write',
  //       type: 'photo',
  //       value: fileName,
  //     }));
  //   });
  // });

  // describe('sendPostcard', () => {
  //   beforeEach(() => {
  //     store = mockStore({});

  //     postPostcard.mockImplementation(() => Promise.resolve(given.response));
  //   });

  //   const postcard = {
  //     key: 'test',
  //     sender: 'sender',
  //     receiver: 'receiver',
  //     contents: 'contents',
  //     photo: 'photo',
  //     photoMessage: 'photoMessage',
  //     secretMessage: 'secretMessage',
  //     isPrivate: 'isPrivate',
  //   };
  //   const onClickNext = jest.fn();

  //   context('when response has error', () => {
  //     it('runs setMovingPage', async () => {
  //       given('response', () => ({
  //         error: responseError,
  //       }));

  //       await store.dispatch(sendPostcard({
  //         postcard,
  //         onClickNext,
  //       }));

  //       const actions = store.getActions();

  //       expect(actions[0]).toEqual(setResponseError(responseError));
  //     });
  //   });

  //   context('when response does not have error', () => {
  //     it('runs changeInputFieldValue', async () => {
  //       const url = 'url';
  //       const secretMessage = 'secretMessage';

  //       given('response', () => ({
  //         data: {
  //           url,
  //           secretMessage,
  //         },
  //       }));

  //       await store.dispatch(sendPostcard({
  //         postcard,
  //         onClickNext,
  //       }));

  //       const actions = store.getActions();

  //       expect(actions[0]).toEqual(setWriteCompleteValues({
  //         url,
  //         secretMessage,
  //       }));
  //     });
  //   });
  // });

  // describe('checkValidPostcard', () => {
  //   beforeEach(() => {
  //     store = mockStore({});
  //     postCheckValidPostcard.mockImplementation(() => Promise.resolve(given.response));
  //   });

  //   context('when response has error', () => {
  //     it('runs setMovingPage', async () => {
  //       given('response', () => ({
  //         error: responseError,
  //       }));

  //       await store.dispatch(checkValidPostcard({ key: 'key' }));

  //       const actions = store.getActions();

  //       expect(actions[0]).toEqual(setResponseError(responseError));
  //     });
  //   });

  //   context('when response does not have error', () => {
  //     context('when response is success', () => {
  //       it('calls admitPostcardAccess', async () => {
  //         given('response', () => ({
  //           data: { success: true },
  //         }));

  //         const key = 'test';
  //         const secretMessage = 'secretMessage';

  //         await store.dispatch(checkValidPostcard({ key, secretMessage }));

  //         const actions = store.getActions();

  //         expect(actions[0]).toEqual(admitPostcardAccess());
  //       });
  //     });

  //     context('when response is not success', () => {
  //       it('call setInputFieldsError', async () => {
  //         given('response', () => ({
  //           data: { success: false },
  //         }));

  //         const key = 'test';
  //         const secretMessage = 'secretMessage';

  //         await store.dispatch(checkValidPostcard({ key, secretMessage }));

  //         const actions = store.getActions();

  //         expect(actions[0]).toEqual(setInputFieldsError({
  //           page: 'entrance',
  //           type: 'secretMessage',
  //           error: 'wrong',
  //         }));
  //       });
  //     });
  //   });
  // });

  // describe('loadPostcard', () => {
  //   beforeEach(() => {
  //     store = mockStore({});

  //     fetchPostcard.mockImplementation(() => Promise.resolve(given.response));
  //   });

  //   const key = 'test';
  //   const secretMessage = 'secretMessage';

  //   const response = {
  //     sender: 'sender',
  //     receiver: 'receiver',
  //     photo: 'photoUrl',
  //     contents: 'contents',
  //     photoMessage: 'photoMessage',
  //   };

  //   context('when response has error', () => {
  //     it('runs setMovingPage', async () => {
  //       given('response', () => ({
  //         error: responseError,
  //       }));
  //       await store.dispatch(loadPostcard({ key, secretMessage }));

  //       const actions = store.getActions();

  //       expect(actions[0]).toEqual(setResponseError(responseError));
  //     });
  //   });

  //   context('when response does not have error', () => {
  //     it('runs setEntrance', async () => {
  //       given('response', () => ({
  //         data: response,
  //       }));
  //       await store.dispatch(loadPostcard({ key, secretMessage }));

  //       const actions = store.getActions();

  //       expect(actions[0]).toEqual(setPostcard({
  //         sender: 'sender',
  //         receiver: 'receiver',
  //         photoUrl: 'photoUrl',
  //         contents: 'contents',
  //         photoMessage: 'photoMessage',
  //       }));
  //     });
  //   });
  // });

  // describe('loadPostcards', () => {
  //   beforeEach(() => {
  //     store = mockStore({});
  //   });

  //   it('runs setPostcards', async () => {
  //     await store.dispatch(loadPostcards());

  //     const actions = store.getActions();

  //     expect(actions[0]).toEqual(setPostcards([]));
  //   });
  // });

  // describe('expirePostcard', () => {
  //   beforeEach(() => {
  //     store = mockStore({});

  //     postExpire.mockImplementation(() => Promise.resolve(given.response));
  //   });

  //   context('when response has error', () => {
  //     it('runs setMovingPage', async () => {
  //       given('response', () => ({
  //         error: responseError,
  //       }));
  //       await store.dispatch(expirePostcard({ key: 'key', secretMessage: 'secretMessage' }));

  //       const actions = store.getActions();

  //       expect(actions[0]).toEqual(setResponseError(responseError));
  //     });
  //   });

  //   context('when response does not have error', () => {
  //     context('when success is true', () => {
  //       it('runs setToast and setMovingPage', async () => {
  //         given('response', () => ({
  //           data: { success: true },
  //         }));
  //         await store.dispatch(expirePostcard({ key: 'key', secretMessage: 'secretMessage' }));

  //         const actions = store.getActions();

  //         expect(actions[0]).toEqual(setToast({
  //           triggered: false,
  //           message: '엽서가 삭제되었습니다.',
  //         }));

  //         expect(actions[1]).toEqual(setMovingPage({
  //           movingPage: 'notfound',
  //         }));
  //       });
  //     });

  //     context('when success is false', () => {
  //       it('runs setInputFieldsError', async () => {
  //         given('response', () => ({
  //           data: { success: false },
  //         }));
  //         await store.dispatch(expirePostcard({ key: 'key', secretMessage: 'secretMessage' }));

  //         const actions = store.getActions();

  //         expect(actions[0]).toEqual(setInputFieldsError({
  //           page: 'expire',
  //           type: 'secretMessage',
  //           error: 'wrong',
  //         }));
  //       });
  //     });
  //   });
  // });
});
