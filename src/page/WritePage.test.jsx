import React from 'react';

import WritePage from './WritePage';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter, } from 'react-router-dom';

import inputFields from '../fixtures/inputFields';

const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { goBack: mockGoBack };
  },
}));

describe('WritePage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  function renderWritePage() {
    return render(
      <MemoryRouter>
        <WritePage />
      </MemoryRouter>
    );
  }

  context('when writePageIndex is 0', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        writePageIndex: 0,
        inputFields,
      }));
    });

    it('render firstPage', () => {
      const {
        getByText,
      } = renderWritePage();

      expect(getByText('엽서 작성하기')).not.toBeNull();
      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).not.toBeCalled();
    });
    context('when click next button', () => {
      context('when some inputs is invalid', () => {
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
          } = renderWritePage();
    
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
          } = renderWritePage();
    
          expect(getByText('엽서 작성하기')).not.toBeNull();
    
          fireEvent.click(getByText('다음'));
    
          expect(dispatch).toBeCalledWith({
            type: 'application/increaseWritePageIndex',
          });
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

    it('render secondPage', () => {
      const {
        getByText,
      } = renderWritePage();

      expect(getByText('이미지 첨부')).not.toBeNull();

      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).toBeCalledWith({
        type: 'application/decreaseWritePageIndex',
      });
    });

    context('when click next button', () => {
      context('when inputs or photo is invalid', () => {
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
          } = renderWritePage();
    
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
            writePageIndex: 1,
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
          } = renderWritePage();
    
          fireEvent.click(getByText('미리보기'));
    
          expect(dispatch).toBeCalledWith({
            type: 'application/increaseWritePageIndex',
          });
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

    it('render preview', () => {
      const {
        getByText,
      } = renderWritePage();

      expect(getByText('미리 보기')).not.toBeNull();

      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).toBeCalledWith({
        type: 'application/decreaseWritePageIndex',
      });

    });
    
    
    
  });
});
