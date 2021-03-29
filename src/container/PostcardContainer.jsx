import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostcardFront from '../presentational/PostcardFront';
import PostcardBack from '../presentational/PostcardBack';

import { get } from '../utils/utils';

import {
  flipPostcard,
}from '../state/slice';

export default function PostcardContainer({ onHandlePrivousClick }) {

  const dispatch = useDispatch();
  const { 
    isFront,
    receiver,
    sender,
    contents,
    photoMessage,
    stampUrl,
    photoUrl,
  } = useSelector(get('postcard'));

  function handleClickPage() {
    dispatch(flipPostcard());
  }

  return (
    <div onClick={handleClickPage}>
      <div
        onClick={onHandlePrivousClick}
      >
        이전
      </div>
      ({isFront ? (
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
