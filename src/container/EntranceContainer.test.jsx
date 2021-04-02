import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import EntranceContainer from './EntranceContainer';

import entrance from '../fixtures/entrance';
import inputFields from '../fixtures/inputFields';

describe('EntranceContainer', () => {
  const { sender, postcardCount, writtenCount } = entrance;

  const dispatch = jest.fn();
  const onHandleClickPostcard = jest.fn();
  const onHandleClickWritePostcard = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      entrance,
      inputFields,
    }));
  });

  function entranceRender() {
    return render((
      <EntranceContainer
        onHandleClickPostcard={onHandleClickPostcard}
        onHandleClickWritePostcard={onHandleClickWritePostcard}
      />
    ));
  }

  it('shows title', () => {
    const { getByText } = entranceRender();

    expect(getByText(`${sender}님으로 부터 엽서가 도착했어요.`)).not.toBeNull();
  });

  context('when postcard is private', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        entrance,
        inputFields,
      }));
    });

    it('shows secretMessage form and information', () => {
      const { getByText, getByPlaceholderText } = entranceRender();

      expect(getByPlaceholderText('5 ~ 20자')).not.toBeNull();
      expect(getByText('비공개 엽서입니다. 문자로 받은 비밀 메시지를 입력 후 엽서 확인하기 버튼을 눌러주세요.')).not.toBeNull();

      fireEvent.change(getByPlaceholderText('5 ~ 20자'), { target: { value: 'hello' } });

      expect(dispatch).toBeCalledWith({
        payload: {
          type: 'secretMessage',
          value: 'hello',
        },
        type: 'application/changeInputFieldValue',
      });
    });

    context('when clicks check postcard button', () => {
      context('with secretMessage over 5 and under 21', () => {
        beforeEach(() => {
          inputFields.entrance.secretMessage.value = 'happy day!';

          useSelector.mockImplementation((selector) => selector({
            entrance,
            inputFields,
          }));
        });

        it('calls onHandleClickPostcard function', () => {
          const { getByText } = entranceRender();
          expect(getByText('엽서 확인하기')).not.toBeNull();

          fireEvent.click(getByText('엽서 확인하기'));

          expect(onHandleClickPostcard).toBeCalled();
        });
      });
      context('without secretMessage over 5 and under 21', () => {
        beforeEach(() => {
          inputFields.entrance.secretMessage.value = '';
          useSelector.mockImplementation((selector) => selector({
            entrance,
            inputFields,
          }));
        });

        it('shows ErrorMessage', () => {
          const { getByText } = entranceRender();
          fireEvent.click(getByText('엽서 확인하기'));
          expect(dispatch).toBeCalledWith({
            type: 'application/setInputFieldsError',
            payload: {
              type: 'secretMessage',
              error: true,
            },
          });
        });
      });
    });
  });

  context('when click check postcard button', () => {
    context('with isPrivate is false', () => {
      beforeEach(() => {
        useSelector.mockImplementation((selector) => selector({
          entrance: {
            ...entrance,
            isPrivate: false,
          },
          inputFields,
        }));
      });

      it("doesn't check secretMessage is valid", () => {
        const { queryByText } = entranceRender();

        fireEvent.click(queryByText('엽서 확인하기'));

        expect(dispatch).not.toBeCalledWith({
          type: 'application/setInputFieldsError',
          payload: {
            type: 'secretMessage',
            error: true,
          },
        });
      });
    });

    context('with isPrivate is true', () => {
      beforeEach(() => {
        useSelector.mockImplementation((selector) => selector({
          entrance: {
            ...entrance,
            isPrivate: true,
          },
          inputFields,
        }));
      });

      it('check secretMessage is valid', () => {
        const { queryByText } = entranceRender();

        fireEvent.click(queryByText('엽서 확인하기'));

        expect(dispatch).toBeCalledWith({
          type: 'application/setInputFieldsError',
          payload: {
            type: 'secretMessage',
            error: true,
          },
        });
      });
    });
  });

  it('shows check postcard button', () => {
    const { getByText } = entranceRender();

    expect(getByText('엽서 확인하기')).not.toBeNull();

    // 공개 형이라면 바로 로드
    // 비공개 형이라면 체크한 후에 로드
    // expect(dispatch).toBeCalledWith({
    //   type: 'application/changeInputFieldValue',
    //   payload: {
    //     type: 'secretMessage',
    //     error: 'default'
    //   },
    // });
  });

  context('when postcardCount is 0', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        entrance: {
          ...entrance,
          postcardCount: 0,
        },
        inputFields,
      }));
    });

    it("doesn't show writing parts", () => {
      const { getByText } = entranceRender();

      expect(getByText('해당 엽서로 작성할 수 있는 횟수가 없습니다.')).not.toBeNull();
    });
  });
  context('when postcardCount bigger than 0', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        entrance,
        inputFields,
      }));
    });

    it('shows writing parts', () => {
      const { getByText } = entranceRender();

      expect(getByText(`${sender}님으로 부터 받은 엽서로 ${postcardCount}번의 엽서를 작성하실 수 있어요 ! 코로나로 인해 만나보지 못한 소중한 사람에게 추억이 될 엽서를 작성해보세요 !`)).not.toBeNull();
      expect(getByText('엽서 작성하기')).not.toBeNull();

      fireEvent.click(getByText('엽서 작성하기'));
      expect(onHandleClickWritePostcard).toBeCalled();
    });
  });

  it('shows how many people write postcard', () => {
    const { getByText } = entranceRender();

    expect(getByText(`현재 까지 ${writtenCount}명의 엽서가 작성 되었습니다.`)).not.toBeNull();
  });

  it("shows go to other postcard' and 'expire' button", () => {
    const { getByText } = entranceRender();

    expect(getByText('다른 사람 엽서 보러가기')).not.toBeNull();
    expect(getByText('엽서 파기하기')).not.toBeNull();
  });
});
