import React from 'react';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import EntranceWritePostcard from './EntranceWritePostcard';

import entrance from '../fixtures/entrance';

describe('EntranceWritePostcard', () => {
  context('postcardCount is bigger than 0', () => {
    it('shows postcard write button and message', () => {
      const { sender, postcardCount } = entrance;
      useSelector.mockImplementation((selector) => selector(entrance));

      const { getByText } = render((
        <EntranceWritePostcard
          sender={sender}
          postcardCount={postcardCount}
        />
      ));
      expect(getByText(`${sender}님으로 부터 받은 엽서로 ${postcardCount}번의 엽서를 작성하실 수 있어요 ! 코로나로 인해 만나보지 못한 소중한 사람에게 추억이 될 엽서를 작성해보세요 !`)).not.toBeNull();
      expect(getByText('엽서 작성하기')).not.toBeNull();
    });
  });

  context('postcardCount is 0', () => {
    it('shows message that cannot write postcard', () => {
      const { sender } = entrance;
      useSelector.mockImplementation((selector) => selector(entrance));

      const { getByText } = render((
        <EntranceWritePostcard
          sender={sender}
          postcardCount={0}
        />
      ));
      expect(getByText('해당 엽서로 작성할 수 있는 횟수가 없습니다.')).not.toBeNull();
    });
  });
});
