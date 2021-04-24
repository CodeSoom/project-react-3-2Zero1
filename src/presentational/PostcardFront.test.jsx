import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import PostcardFront from './PostcardFront';

test('PostcardFront', () => {
  const sender = '보낸이';
  const receiver = '받는이';
  const contents = '이것은 내용입니다.';
  const stampUrl = 'url';

  const onHandleClickGoToBack = jest.fn();

  const { getByText } = render((
    <PostcardFront
      sender={sender}
      receiver={receiver}
      contents={contents}
      stampUrl={stampUrl}
      onHandleClickGoToBack={onHandleClickGoToBack}
    />
  ));

  expect(getByText(`to ${receiver}`)).not.toBeNull();
  expect(getByText(`from ${sender}`)).not.toBeNull();
  expect(getByText(contents)).not.toBeNull();

  fireEvent.click(getByText('뒷면'));

  expect(onHandleClickGoToBack).toBeCalled();
});
