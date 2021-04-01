import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import EntrancePage from './EntrancePage';

import inputFields from '../fixtures/inputFields';
import entrance from '../fixtures/entrance';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('EntrancePage', () => {
  const SENDER = entrance.sender;
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    entrance,
    inputFields,
  }));

  function renderEntrance() {
    return render((
      <EntrancePage />
    ));
  }
  it('renders EntrancePage', () => {
    const { getByText } = renderEntrance();
    expect(getByText(`${SENDER}님으로 부터 엽서가 도착했어요.`)).not.toBeNull();
    expect(getByText('다른 사람 엽서 보러가기')).not.toBeNull();
    expect(getByText('엽서 파기하기')).not.toBeNull();
  });

  context('when postcardCount is bigger than 0', () => {
  it('renders postcard write button', () => {
      useSelector.mockImplementation((selector) => selector({
        entrance,
        inputFields,
      }));
      const { getByText } = renderEntrance();

      expect(getByText('엽서 작성하기')).not.toBeNull();
      expect(getByText(`${SENDER}님으로 부터 받은 엽서로 ${entrance.postcardCount}번의 엽서를 작성하실 수 있어요 ! 코로나로 인해 만나보지 못한 소중한 사람에게 추억이 될 엽서를 작성해보세요 !`))
        .not.toBeNull();

      fireEvent.click(getByText('엽서 작성하기'));
      expect(mockPush).toBeCalled();
    });
  });
  context('when postcardCount is 0', () => {
    it('does not render postcard write button', () => {
      useSelector.mockImplementation((selector) => selector({
        entrance: {
          ...entrance,
          postcardCount: 0,
        },
        inputFields,
      }));
      const { queryByText } = renderEntrance();

      expect(queryByText('엽서 작성하기')).toBeNull();
    });
  });
});
