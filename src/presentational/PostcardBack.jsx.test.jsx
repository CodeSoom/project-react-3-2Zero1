import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import PostcardBack from './PostcardBack';

test('PostcardBack', () => {
  const photoUrl = '이것은 내용입니다.';
  const photoMessage = 'ㄱ나니? 너와 그때 그시절.....';

  const onHandleClickGoToFront = jest.fn();

  const { getByText } = render((
    <PostcardBack
      photoUrl={photoUrl}
      photoMessage={photoMessage}
      onHandleClickGoToFront={onHandleClickGoToFront}
    />
  ));

  expect(getByText(photoMessage)).not.toBeNull();

  fireEvent.click(getByText('앞면'));
  expect(onHandleClickGoToFront).toBeCalled();
});
