import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils/utils';

import { loadItem } from '../services/storage';

import {
  flipPostcard,
  loadPostcard,
} from '../state/slice';

import Postcard from '../presentational/Postcard';

export default function PostcardContainer({ onHandlePreviousClick }) {
  const key = loadItem('postcardKey');
  const secretMessage = loadItem('secretMessage');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostcard({ key, secretMessage }));
  }, []);

  const postcard = useSelector(get('postcard'));

  const { isFrontPage } = postcard;

  function handleClickFlipButton() {
    dispatch(flipPostcard());
  }
  return (
    <Postcard
      postcard={postcard}
      isFrontPage={isFrontPage}
      onHandlePreviousClick={onHandlePreviousClick}
      onHandleClickFlip={handleClickFlipButton}
      showCompleteButton={false}
    />
  );
}
