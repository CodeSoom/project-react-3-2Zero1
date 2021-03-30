import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostcardFront from './PostcardFront';
import PostcardBack from './PostcardBack';

import { get } from '../utils/utils';

import {
  flipPostcard,
}from '../state/slice';

export default function Postcard({ 
  postcard: {
    isFrontPage,
    receiver,
    sender,
    contents,
    photoMessage,
    stampUrl,
    photoUrl,
  },
  onHandleClickPage,
  onHandlePrivousClick,
  showCompleteButton,
  onHandleCompleteClick,
}) {

  return (
    <div onClick={onHandleClickPage}>
      <div
        onClick={onHandlePrivousClick}
      >
        이전
      </div>
      {showCompleteButton ? (
      <div
        onClick={onHandleCompleteClick}
      >
        완료
      </div>
      ) : null}
      ({isFrontPage ? (
      <PostcardFront
        sender={sender}
        receiver={receiver}
        contents={contents}
        stampUrl={stampUrl}
      />
      )
      :(
        <PostcardBack
          photoUrl={photoUrl}
          photoMessage={photoMessage}
        />
      )})
    </div>
  );
}
