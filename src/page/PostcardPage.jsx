import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostcardContainer from '../container/PostcardContainer';

import { setPostcardFront } from '../state/slice';

export default function PostcardPage() {
  const history = useHistory();

  const dispatch = useDispatch();

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
