import React from 'react';

import { render } from '@testing-library/react';

import PostcardItem from './PostcardItem';

test('PostcardItem', () => {
  const receiver = '모두에게';
  const photoMessage = '요가 하면서 자고 있다옹';

  const postcardItem = {
    rid: 128,
    sender: '관리자',
    receiver,
    photo: 'https://postcard-yh1.s3.ap-northeast-2.amazonaws.com/uploads/1618394889881_2A5E67B5-10AF-4908-85B3-3678E7D982FE.jpeg',
    photoMessage,
  };
  const { getByText } = render((<PostcardItem postcardItem={postcardItem} />));

  expect(getByText(`${receiver}님이 받은 엽서`)).not.toBeNull();
  expect(getByText(photoMessage)).not.toBeNull();
});
