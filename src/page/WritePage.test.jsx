import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import WritePage from './WritePage';

import inputFields from '../fixtures/inputFields';

const mockGoBack = jest.fn();
const mockReplace = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return {
      goBack: mockGoBack,
      replace: mockReplace,
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
        writePageIndex: 0,
        inputFields,
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
          writePageIndex: 0,
          inputFields,
        }));
      });

      it('does not call increasePageIndex action', () => {
        const {
          getByText,
        } = renderWritePage({ index: 0 });

        expect(getByText('엽서 작성하기')).not.toBeNull();

        fireEvent.click(getByText('다음'));

        expect(dispatch).not.toBeCalledWith({
          type: 'application/increaseWritePageIndex',
        });
      });
    });

    context('when all inputs are valid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          writePageIndex: 0,
          inputFields: {
            ...inputFields,
            write: {
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
          type: 'application/increaseWritePageIndex',
        });
      });
    });
  });

  context('when writePageIndex is 1', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        writePageIndex: 1,
        inputFields,
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
        type: 'application/decreaseWritePageIndex',
      });
      // TODO : 다음 버튼 클릭시 에러 메시지 있으면 넘어가지 않도록 하는 테스트 코드 작성해야함.
    });

    context('when contents are valid', () => {
      beforeEach(() => {
        dispatch.mockClear();
  
        useSelector.mockImplementation((selector) => selector({
          writePageIndex: 1,
          inputFields: {
            ...inputFields,
            write: {
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
          type: 'application/increaseWritePageIndex',
        });
      });
    });

    context('when contents are invalid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          writePageIndex: 1,
          inputFields,
        }));
      });

      it('does not call increasePageIndex action', () => {
        const {
          getByText,
        } = renderWritePage({ index: 1 });

        fireEvent.click(getByText('다음'));

        expect(dispatch).not.toBeCalledWith({
          type: 'application/increaseWritePageIndex',
        });
      });
    });
  });

  context('when writePageIndex is 2', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        writePageIndex: 2,
        inputFields,
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
        type: 'application/decreaseWritePageIndex',
      });
    });

    context('when inputs or photo is invalid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          writePageIndex: 2,
          inputFields,
        }));
      });

      it('does not call increasePageIndex action', () => {
        const {
          getByText,
        } = renderWritePage({ index: 2 });

        fireEvent.click(getByText('미리보기'));

        expect(dispatch).not.toBeCalledWith({
          type: 'application/increaseWritePageIndex',
        });
      });
    });

    context('when inputs and photo are valid', () => {
      beforeEach(() => {
        dispatch.mockClear();

        useSelector.mockImplementation((selector) => selector({
          writePageIndex: 2,
          inputFields: {
            ...inputFields,
            write: {
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
          type: 'application/increaseWritePageIndex',
        });
      });
    });
  });

  context('when writePageIndex is 3', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        writePageIndex: 3,
        inputFields: {
          ...inputFields,
          write: {
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
      const {
        getByText,
      } = renderWritePage({ index: 3 });

      expect(getByText('미리 보기')).not.toBeNull();
      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).toBeCalledWith({
        type: 'application/decreaseWritePageIndex',
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
          type: 'application/increaseWritePageIndex',
        });
      });
    });
  });

  context('when writePageIndex is 4', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        writePageIndex: 4,
      }));
    });
    it('renders writeCompletePage', () => {
      const {
        getByText,
      } = renderWritePage({ index: 4 });

      expect(getByText('홈로고')).not.toBeNull();

      fireEvent.click(getByText('홈로고'));

      expect(mockGoBack).toBeCalled();
    });
  });
});
