import React from 'react';

import PostcardFront from './PostcardFront';
import PostcardBack from './PostcardBack';

import {
  DefaultLayout,
  PreviousButton,
} from '../style/commonCss';

export default function Postcard({
  postcard: {
    receiver,
    sender,
    contents,
    photoMessage,
    photoUrl,
  },
  isFrontPage,
  onHandleClickPage,
  onHandlePrivousClick,
  showCompleteButton,
  onHandleCompleteClick,
}) {
  return (
    <DefaultLayout
      type="button"
      onClick={onHandleClickPage}
    >
      <PreviousButton
        type="button"
        onClick={onHandlePrivousClick}
      >
        이전
      </PreviousButton>
      {
        isFrontPage ? (
          <PostcardFront
            sender={sender}
            receiver={receiver}
            contents={contents}
            stampUrl={photoUrl}
          />
        )
          : (
            <PostcardBack
              photoUrl={photoUrl}
              photoMessage={photoMessage}
              showCompleteButton={showCompleteButton}
              onHandleCompleteClick={onHandleCompleteClick}
            />
          )
      }
    </DefaultLayout>
  );
}
