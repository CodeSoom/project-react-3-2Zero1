import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils/utils';

import { loadItem } from '../services/storage';

import {
  flipPostcard,
  loadPostcard,
} from '../state/slice';

import Postcard from '../presentational/Postcard';

export default function PostcardContainer({ onHandlePrivousClick }) {
  const key = loadItem('postcardKey');
  const secretMessage = loadItem('secretMessage');
  
  useEffect(() => {
    dispatch(loadPostcard({ key, secretMessage }));
  }, []);

  const dispatch = useDispatch();

  const postcard = useSelector(get('postcard'));

  const { isFrontPage } = postcard;

  function handleClickPage() {
    dispatch(flipPostcard());
  }
  console.log(postcard);
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
