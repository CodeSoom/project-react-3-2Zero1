import React from 'react';
import PostcardFront from './PostcardFront';
import PostcardBack from './PostcardBack';

export default function Postcard({
  postcard: {
    receiver,
    sender,
    contents,
    photoMessage,
    stampUrl,
    photoUrl,
  },
  isFrontPage,
  onHandleClickPage,
  onHandlePrivousClick,
  showCompleteButton,
  onHandleCompleteClick,
}) {
  return (
    <button
      type="button"
      onClick={onHandleClickPage}
    >
      <button
        type="button"
        onClick={onHandlePrivousClick}
      >
        이전
      </button>
      {
        isFrontPage ? (
          <PostcardFront
            sender={sender}
            receiver={receiver}
            contents={contents}
            stampUrl={stampUrl}
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
    </button>
  );
}
