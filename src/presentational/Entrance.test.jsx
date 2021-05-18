import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Entrance from './Entrance';

import entrance from '../fixtures/entrance';
import inputFields from '../fixtures/inputFields';

import { getField } from '../utils/utils';

describe('Entrance', () => {
  const { sender, writtenCount } = entrance;
  const { entrance: { secretMessage } } = inputFields;

  const onHandleCheckPostcardClick = jest.fn();
  const onHandleClickWritePostcard = jest.fn();
  const onHandleClickOtherPostcards = jest.fn();
  const onHandleClickExpire = jest.fn();

  const menuButtonHandlers = {
    onHandleClickWritePostcard,
    onHandleClickOtherPostcards,
    onHandleClickExpire,
  };

  const field = getField({
    field: secretMessage,
    id: 'secretMessage',
    name: '',
    onChange: jest.fn(),
  });

  function entranceRender({ postcardCount, isPrivate } = { postcardCount: 5, isPrivate: false }) {
    const entranceState = {
      sender,
      postcardCount,
      writtenCount,
      isPrivate,
    };

    return render((
      <Entrance
        menuButtonHandlers={menuButtonHandlers}
        entranceState={entranceState}
        onHandleCheckPostcardClick={onHandleCheckPostcardClick}
        field={field}
      />
    ));
  }

  it('shows title', () => {
    const { getByText } = entranceRender();

    expect(getByText(`${sender}님으로 부터 엽서가 도착했어요.`)).not.toBeNull();
  });

  context('when postcard is private', () => {
    it('shows secretMessage form and information', () => {
      const { getByText, getByPlaceholderText } = entranceRender({ isPrivate: true });

      expect(getByPlaceholderText('5 ~ 20자')).not.toBeNull();
      expect(getByText('비공개 엽서입니다. 문자로 받은 엽서 암호를 입력 후 엽서 확인하기 버튼을 눌러주세요.')).not.toBeNull();

      expect(getByText('엽서 확인하기')).not.toBeNull();

      fireEvent.click(getByText('엽서 확인하기'));

      expect(onHandleCheckPostcardClick).toBeCalled();
    });
  });

  context('when postcard is not private', () => {
    it('does not show secretMessage input', () => {
      const { getByText, queryByPlaceholderText } = entranceRender({ isPrivate: false });

      expect(queryByPlaceholderText('5 ~ 20자')).toBeNull();

      expect(getByText('엽서 확인하기')).not.toBeNull();

      fireEvent.click(getByText('엽서 확인하기'));

      expect(onHandleCheckPostcardClick).toBeCalled();
    });
  });

  context('when postcardCount is 0', () => {
    it("doesn't show writing parts", () => {
      const { getByText } = entranceRender({ postcardCount: 0 });

      expect(getByText('해당 엽서로 작성할 수 있는 횟수가 없습니다.')).not.toBeNull();
    });
  });

  context('when postcardCount bigger than 0', () => {
    it('shows writing parts', () => {
      const { getByText } = entranceRender({ postcardCount: 5 });

      expect(getByText(`${sender}님으로 부터 받은 엽서로 ${5}번의 엽서를 작성하실 수 있어요 ! 코로나로 인해 만나보지 못한 소중한 사람에게 추억이 될 엽서를 작성해보세요 !`)).not.toBeNull();
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

    fireEvent.click(getByText('다른 사람 엽서 보러가기'));
    expect(onHandleClickOtherPostcards).toBeCalled();

    expect(getByText('엽서 파기하기')).not.toBeNull();
    fireEvent.click(getByText('엽서 파기하기'));
    expect(onHandleClickExpire).toBeCalled();
  });
});
