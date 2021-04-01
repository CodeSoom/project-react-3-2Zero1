import React from 'react';

import { render } from '@testing-library/react';

import PostcardBack from './PostcardBack';

test('PostcardBack', () => {
  const photoUrl = '이것은 내용입니다.';
  const photoMessage = 'ㄱ나니? 너와 그때 그시절.....';

  const { getByText } = render((
    <PostcardBack
      photoUrl={photoUrl}
      photoMessage={photoMessage}
    />
  ));

  expect(getByText(photoMessage)).not.toBeNull();
});
