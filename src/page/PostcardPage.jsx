import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PostcardContainer from '../container/PostcardContainer';

import { setPostcardFront } from '../state/slice';

export default function PostcardPage() {
  const history = useHistory();
  const dispatch = useDispatch();

   //이전 버튼 클릭시, isFront를 true로 돌려놓고 goBack
  function handlePrivousClick(e) {
    e.stopPropagation();
    dispatch(setPostcardFront());
    history.goBack();
  }

  return (
  <PostcardContainer
   onHandlePrivousClick={handlePrivousClick}
  />
  );
}
