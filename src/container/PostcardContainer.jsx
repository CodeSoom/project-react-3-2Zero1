import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils/utils';

import {
  flipPostcard,
} from '../state/slice';
import Postcard from '../presentational/Postcard';

export default function PostcardContainer({ onHandlePrivousClick }) {
  const dispatch = useDispatch();
  const postcard = useSelector(get('postcard'));
  const { isFrontPage } = postcard;

  function handleClickPage() {
    dispatch(flipPostcard());
  }

  return (
    <Postcard
      postcard={postcard}
      isFrontPage={isFrontPage}
      onHandlePrivousClick={onHandlePrivousClick}
      onHandleClickPage={handleClickPage}
      showCompleteButton={false}
    />
  );
}
