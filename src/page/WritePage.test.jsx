import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import WritePage from './WritePage';

import inputFields from '../fixtures/inputFields';

import { loadItem } from '../services/storage';

jest.mock('../services/storage');

const mockGoBack = jest.fn();
const mockReplace = jest.fn();
const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return {
      goBack: mockGoBack,
      replace: mockReplace,
      push: mockPush,
    };
  },
}));

describe('WritePage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  function renderWritePage(params) {
    return render((
      <MemoryRouter>
        <WritePage params={params} />
      </MemoryRouter>
    ));
  }

  context('when writePageIndex is 0', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        write: {
          writePageIndex: 0,
          inputFields: {
            ...inputFields.write,
          },
        },
      }));
    });

    it('renders InformationFormPage', () => {
      const {
        getByText,
      } = renderWritePage({ index: 0 });

      expect(getByText('엽서 작성하기')).not.toBeNull();
      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).not.toBeCalled();
    });

    context('when all inputs are not valid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          write: {
            writePageIndex: 0,
            inputFields: {
              ...inputFields.write,
            },
          },
        }));
      });

      it('does not call increasePageIndex action', () => {
        const {
          getByText,
        } = renderWritePage({ index: 0 });

        expect(getByText('엽서 작성하기')).not.toBeNull();

        fireEvent.click(getByText('다음'));

        expect(dispatch).not.toBeCalledWith({
          type: 'write/increaseWritePageIndex',
        });
      });
    });

    context('when all inputs are valid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          write: {
            writePageIndex: 0,
            inputFields: {
              ...inputFields.write,
              sender: {
                ...inputFields.write.sender,
                value: '보낸이',
              },
              receiver: {
                ...inputFields.write.receiver,
                value: '받는이',
              },
              secretMessage: {
                ...inputFields.write.secretMessage,
                value: 'hello guys ! ',
              },
            },
          },
        }));
      });

      it('calls increasePageIndex action', () => {
        const {
          getByText,
        } = renderWritePage({ index: 0 });

        expect(getByText('엽서 작성하기')).not.toBeNull();

        fireEvent.click(getByText('다음'));

        expect(dispatch).toBeCalledWith({
          type: 'write/increaseWritePageIndex',
        });
      });
    });
  });

  context('when writePageIndex is 1', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        write: {
          writePageIndex: 1,
          inputFields: {
            ...inputFields.write,
          },
        },
      }));
    });

    it('renders contentsForm', () => {
      const {
        getByText,
      } = renderWritePage({ index: 1 });

      expect(getByText('내용 작성')).not.toBeNull();
      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).toBeCalledWith({
        type: 'write/decreaseWritePageIndex',
      });
    });

    context('when contents are valid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          write: {
            writePageIndex: 1,
            inputFields: {
              ...inputFields.write,
              contents: {
                ...inputFields.write.contents,
                value: '이것은 테스트 입니다. 30자를 넘겨야만 하는 테스트이기 때문에 아무 글자나 적습니다. 이해해 주시길 바랍니다.',
              },
            },
          },
        }));
      });

      it('calls increasePageIndex action', () => {
        const {
          getByText,
        } = renderWritePage({ index: 1 });

        fireEvent.click(getByText('다음'));

        expect(dispatch).toBeCalledWith({
          type: 'write/increaseWritePageIndex',
        });
      });
    });

    context('when contents are invalid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          write: {
            writePageIndex: 1,
            inputFields: {
              ...inputFields.write,
            },
          },
        }));
      });

      it('does not call increasePageIndex action', () => {
        const {
          getByText,
        } = renderWritePage({ index: 1 });

        fireEvent.click(getByText('다음'));

        expect(dispatch).not.toBeCalledWith({
          type: 'write/increaseWritePageIndex',
        });
      });
    });
  });

  context('when writePageIndex is 2', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        write: {
          writePageIndex: 2,
          inputFields: {
            ...inputFields.write,
          },
        },
      }));
    });

    it('renders PhotoFormPage', () => {
      const {
        getByText,
      } = renderWritePage({ index: 2 });

      expect(getByText('이미지 첨부')).not.toBeNull();
      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).toBeCalledWith({
        type: 'write/decreaseWritePageIndex',
      });
    });

    context('when inputs or photo is invalid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          write: {
            writePageIndex: 2,
            inputFields: {
              ...inputFields.write,
            },
          },
        }));
      });

      it('does not call increasePageIndex action', () => {
        const {
          getByText,
        } = renderWritePage({ index: 2 });

        fireEvent.click(getByText('미리보기'));

        expect(dispatch).not.toBeCalledWith({
          type: 'write/increaseWritePageIndex',
        });
      });
    });

    context('when inputs and photo are valid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          write: {
            writePageIndex: 2,
            inputFields: {
              ...inputFields.write,
              photo: {
                ...inputFields.write.photo,
                value: 'imagefile',
              },
              photoMessage: {
                ...inputFields.write.photoMessage,
                value: '사진 메시지 입니다. 정말 오랜만이야',
              },
            },
          },
        }));
      });

      it('calls increasePageIndex action', () => {
        const {
          getByText,
        } = renderWritePage({ index: 2 });

        fireEvent.click(getByText('미리보기'));

        expect(dispatch).toBeCalledWith({
          type: 'write/increaseWritePageIndex',
        });
      });
    });
  });

  context('when writePageIndex is 3', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        write: {
          writePageIndex: 3,
          inputFields: {
            ...inputFields.write,
            photo: {
              ...inputFields.write.photo,
              value: 'imagefile',
            },
            photoMessage: {
              ...inputFields.write.photoMessage,
              value: '사진 메시지 입니다. 정말 오랜만이야',
            },
            preview: {
              isFrontPage: given.isFrontPage,
            },
          },
        },
      }));
    });

    it('renders preview', () => {
      given('isFrontPage', () => true);

      const { getByText } = renderWritePage({ index: 3 });

      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).toBeCalledWith({
        type: 'write/decreaseWritePageIndex',
      });
    });

    context('isFrontPage is true', () => {
      given('isFrontPage', () => true);
      it('does not show complete button', () => {
        const {
          queryByText,
        } = renderWritePage({ index: 3 });

        expect(queryByText('완료')).toBeNull();
      });
    });

    context('isFrontPage is false', () => {
      given('isFrontPage', () => false);
      it('shows complete button', () => {
        const {
          getByText,
        } = renderWritePage({ index: 3 });

        expect(getByText('완료')).not.toBeNull();

        fireEvent.click(getByText('완료'));

        expect(dispatch).toBeCalledWith({
          type: 'write/increaseWritePageIndex',
        });
      });
    });
  });

  context('when writePageIndex is 4', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        write: {
          writePageIndex: 1,
          inputFields: {
            ...inputFields.write,
            sender: {
              value: 'sender',
            },
            complete: {
              url: 'localhost',
              secretMessage: 'secretMessage',
            },
          },
        },
      }));
    });
    it('renders writeCompletePage', () => {
      const {
        getByText,
      } = renderWritePage({ index: 4 });

      expect(getByText('홈으로')).not.toBeNull();

      fireEvent.click(getByText('홈으로'));

      expect(mockGoBack).toBeCalled();
      expect(dispatch).toBeCalledWith({
        type: 'write/resetPostcardInputFields',
      });
    });
  });

  context('when invalid access', () => {
    const key = 'test';

    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        write: {
          writePageIndex: 1,
          inputFields: {
            ...inputFields.write,
            sender: {
              value: 'sender',
            },
            complete: {
              url: 'localhost',
              secretMessage: 'secretMessage',
            },
          },
        },
      }));

      loadItem.mockImplementation(() => key);
    });
    it("call push to '/write/reactIndex'", () => {
      renderWritePage({ index: 4 });

      expect(mockReplace).toBeCalledWith('/write/1');
    });
  });
});
