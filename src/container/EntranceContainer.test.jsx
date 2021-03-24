import React from 'react';

import EntranceContainer from '../container/EntranceContainer';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import entrance from '../fixtures/entrance';
import inputFields from '../fixtures/inputFields'

import errorMessages from '../text/errorMessages';

describe('EntranceContainer', () => {
  const { sender, postcardCount, writtenCount, isPrivate } = entrance;
  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      entrance,
      inputFields: inputFields,
    }));
  });

  function entranceRender() {
    return render(<EntranceContainer />);
  }

  it('show title', () => {
    const { getByText } = entranceRender();

    expect(getByText(`${sender}님으로 부터 엽서가 도착했어요.`)).not.toBeNull();
  });

  context('when postcard is private', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        entrance,
        inputFields: inputFields,
      }));
    });

    it('show secretMessage form and information', () => {
      const { getByText, getByPlaceholderText } = entranceRender();

      expect(getByPlaceholderText('5 ~ 20자')).not.toBeNull();
      expect(getByText('비공개 엽서입니다. 문자로 받은 비밀 메시지를 입력 후 엽서 확인하기 버튼을 눌러주세요.')).not.toBeNull();
    });
    
    context('when click check postcard button', () => {
      context('with secretMessage over 5 and under 21', () => {
        beforeEach(() => {
          inputFields.entrance.secretMessage.value = 'happy day!'
          
          useSelector.mockImplementation((selector) => selector({
            entrance,
            inputFields: inputFields,
          }));
        });

        it('request', () => {
          const { getByText } = entranceRender();

        });
      });
      context('without secretMessage over 5 and under 21', () => {
        beforeEach(() => {
          inputFields.entrance.secretMessage.value = ''
          useSelector.mockImplementation((selector) => selector({
            entrance,
            inputFields: inputFields,
          }));
        });

        it('show ErrorMessage', () => {
          const { getByText } = entranceRender();
          const errorMessage = errorMessages['secretMessage']['default'];
          fireEvent.click(getByText('엽서 확인하기'));
          expect(dispatch).toBeCalledWith({
            type: 'application/setInputFieldsError',
            payload: {
              type: 'secretMessage',
              error: 'default'
            },
          });
        });
      });
    });
    
  });

  context('when postcard is not private', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        entrance: {
          ...entrance,
          isPrivate: false
        },
        inputFields: inputFields,
      }));
    });

    it("doesn'tshow secretMessage form and information", () => {
      const { queryByPlaceholderText, queryByText } = entranceRender();

      expect(queryByPlaceholderText('5 ~ 20자')).toBeNull();
      expect(queryByText('비공개 엽서입니다. 문자로 받은 비밀 메시지를 입력 후 엽서 확인하기 버튼을 눌러주세요.')).toBeNull();
    });
  });

  it('show check postcard button', () => {
    const { getByText } = entranceRender();

    expect(getByText('엽서 확인하기')).not.toBeNull();
    fireEvent.click(getByText('엽서 확인하기'));
    //공개 형이라면 바로 로드
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
          postcardCount: 0
        },
        inputFields: inputFields,
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
        inputFields: inputFields,
      }));
    });

    it("doesn't show writing parts", () => {
      const { getByText } = entranceRender();

      expect(getByText(`${sender}님으로 부터 받은 엽서로 ${postcardCount}번의 엽서를 작성하실 수 있어요 ! 코로나로 인해 만나보지 못한 소중한 사람에게 추억이 될 엽서를 작성해보세요 !`)).not.toBeNull();
      expect(getByText('엽서 작성하기')).not.toBeNull();
    });
  });
  
  it('show how many people write postcard', () => {
    const { getByText } = entranceRender();

    expect(getByText(`현재 까지 ${writtenCount}명의 엽서가 작성 되었습니다.`)).not.toBeNull();
  });

  it("show 'go to other postcard' and 'expire' button", () => {
    const { getByText } = entranceRender();

    expect(getByText('다른 사람 엽서 보러가기')).not.toBeNull();
    expect(getByText('엽서 파기하기')).not.toBeNull();
  });
});
