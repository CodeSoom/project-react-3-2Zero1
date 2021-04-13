import React from 'react';

import styled from '@emotion/styled';

import PostcardFront from './PostcardFront';
import PostcardBack from './PostcardBack';

import Button from '../style/Button';

const PostcardLayout = styled.div(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}));

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
    <PostcardLayout
      type="button"
      onClick={onHandleClickPage}
    >
      <Button
        type="button"
        onClick={onHandlePrivousClick}
      >
        이전
      </Button>
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
    </PostcardLayout>
  );
}
