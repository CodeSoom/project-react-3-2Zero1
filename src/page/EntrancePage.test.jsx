import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';

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

  beforeEach(() => {
    dispatch.mockClear();
    mockPush.mockClear();
    useDispatch.mockImplementation(() => dispatch);
  });

  function renderEntrance(location) {
    return render((
      <EntrancePage location={location} />
    ));
  }

  it('renders EntrancePage', () => {
    useSelector.mockImplementation((selector) => selector({
      entrance: {
        ...entrance,
        isPrivate: false,
        inputFields: {
          ...inputFields.entrance,
        },
      },
    }));

    const { getByText } = renderEntrance({
      location: { search: '?key=test' },
    });

    expect(getByText(`${SENDER}님으로 부터 엽서가 도착했어요.`)).not.toBeNull();

    expect(getByText('엽서 확인하기')).not.toBeNull();

    expect(getByText('다른 사람 엽서 보러가기')).not.toBeNull();
    expect(getByText('엽서 파기하기')).not.toBeNull();
  });

  context('when postcardCount is bigger than 0', () => {
    it('renders postcard write button', () => {
      useSelector.mockImplementation((selector) => selector({
        entrance: {
          ...entrance,
          inputFields: {
            ...inputFields.entrance,
          },
        },
      }));

      const { getByText } = renderEntrance({ key: '발신자' });

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
          inputFields: {
            ...inputFields.entrance,
          },
        },
      }));

      const { queryByText } = renderEntrance({ key: '발신자' });

      expect(queryByText('엽서 작성하기')).toBeNull();
    });
  });

  context("when '다른 사람 엽서 보러가기' button is clicked", () => {
    it('call history push with /postcards', () => {
      useSelector.mockImplementation((selector) => selector({
        entrance: {
          ...entrance,
          inputFields: {
            ...inputFields.entrance,
          },
        },
      }));

      const { getByText } = renderEntrance({ key: '발신자' });

      fireEvent.click(getByText('다른 사람 엽서 보러가기'));

      expect(mockPush).toBeCalledWith('/postcards');
    });
  });

  context("when '엽서 파기하기' button is clicked", () => {
    it('call history push with /expire', () => {
      useSelector.mockImplementation((selector) => selector({
        entrance: {
          ...entrance,
          inputFields: {
            ...inputFields.entrance,
          },
        },
      }));

      const { getByText } = renderEntrance({ key: '발신자' });

      fireEvent.click(getByText('엽서 파기하기'));

      expect(mockPush).toBeCalledWith('/expire');
    });
  });

  context('when pageMove is true', () => {
    it('call history push with /postcard', () => {
      useSelector.mockImplementation((selector) => selector({
        entrance: {
          ...entrance,
          postcardCount: 0,
          movePage: true,
          inputFields: {
            ...inputFields.entrance,
          },
        },
      }));

      const { queryByText } = renderEntrance({ key: '발신자' });

      expect(mockPush).toBeCalledWith('/postcard');

      expect(queryByText('엽서 작성하기')).toBeNull();
    });
  });
});
