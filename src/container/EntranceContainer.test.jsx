import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import EntranceContainer from './EntranceContainer';

import entrance from '../fixtures/entrance';
import inputFields from '../fixtures/inputFields';

describe('EntranceContainer', () => {
  const { sender } = entrance;

  const dispatch = jest.fn();
  const moveToPostcardPage = jest.fn();
  const onHandleClickWritePostcard = jest.fn();
  const onHandleClickOtherPostcards = jest.fn();
  const onHandleClickExpire = jest.fn();

  const postcardKey = 'test';

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      entrance: {
        ...entrance,
        inputFields: {
          ...inputFields.entrance,
        },
        movePage: given.movePage,
      },
    }));
  });

  function entranceRender() {
    return render((
      <EntranceContainer
        postcardKey={postcardKey}
        moveToPostcardPage={moveToPostcardPage}
        onHandleClickWritePostcard={onHandleClickWritePostcard}
        onHandleClickOtherPostcards={onHandleClickOtherPostcards}
        onHandleClickExpire={onHandleClickExpire}
      />
    ));
  }

  context('when secretMessage is correct', () => {
    given('movePage', () => true);

    it('moves to PostcardPage', () => {
      entranceRender();
      expect(moveToPostcardPage).toBeCalled();
      expect(dispatch).toBeCalledWith({
        type: 'entrance/resetAdmitPostcardAccess',
      });
    });
  });

  context('when checking button is not clicked or secretMessage is not correct', () => {
    given('movePage', () => false);

    it('renders EntrancePage', () => {
      const { getByText } = entranceRender();

      expect(getByText(`${sender}님으로 부터 엽서가 도착했어요.`)).not.toBeNull();
    });

    context('when postcard is private', () => {
      it('shows secret message form and information', () => {
        const { getByText, getByPlaceholderText } = entranceRender();

        expect(getByPlaceholderText('5 ~ 20자')).not.toBeNull();
        expect(getByText('비공개 엽서입니다. 문자로 받은 엽서 암호를 입력 후 엽서 확인하기 버튼을 눌러주세요.')).not.toBeNull();

        fireEvent.change(getByPlaceholderText('5 ~ 20자'), { target: { value: 'hello' } });

        expect(dispatch).toBeCalledWith({
          payload: {
            type: 'secretMessage',
            value: 'hello',
          },
          type: 'entrance/changeInputFieldValue',
        });
      });

      context('with valid secretMessage', () => {
        beforeEach(() => {
          inputFields.entrance.secretMessage.value = 'happy day!';

          useSelector.mockImplementation((selector) => selector({
            entrance: {
              ...entrance,
              inputFields: {
                ...inputFields.entrance,
              },
            },
          }));
        });

        it('goes to postcardPage', () => {
          const { getByText } = entranceRender();
          expect(getByText('엽서 확인하기')).not.toBeNull();

          fireEvent.click(getByText('엽서 확인하기'));

          // TODO: 공개 || 비공개일 경우 각각 다른 action들이 발생하는 것에 대한 테스트 코드를 작성 해야함.
          // expect(dispatch).toBeCalledWith({
          //   type: 'application/',
          // });
        });
      });
      context('without invalid secretMessage', () => {
        beforeEach(() => {
          inputFields.entrance.secretMessage.value = '';
          useSelector.mockImplementation((selector) => selector({
            entrance: {
              ...entrance,
              inputFields: {
                ...inputFields.entrance,
              },
            },
          }));
        });

        it('calls setInputFieldsError', () => {
          const { getByText } = entranceRender();
          fireEvent.click(getByText('엽서 확인하기'));
          expect(dispatch).toBeCalledWith({
            type: 'entrance/setInputFieldsError',
            payload: {
              type: 'secretMessage',
              error: true,
            },
          });
        });
      });
    });

    context('when postcard is private', () => {
      beforeEach(() => {
        useSelector.mockImplementation((selector) => selector({
          entrance: {
            ...entrance,
            isPrivate: false,
            inputFields: {
              ...inputFields.entrance,
            },
          },
        }));
      });

      it("doesn't check secretMessage is valid", () => {
        const { queryByText } = entranceRender();

        fireEvent.click(queryByText('엽서 확인하기'));

        expect(dispatch).not.toBeCalledWith({
          type: 'write/setInputFieldsError',
          payload: {
            type: 'secretMessage',
            error: true,
          },
        });
      });
    });
  });
});
