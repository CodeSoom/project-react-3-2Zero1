import React from 'react';
import { useHistory } from 'react-router-dom';

import PostcardsContainer from '../container/PostcardsContainer';

export default function PostcardsPage() {
  const history = useHistory();

  function handlePrevousClick() {
    history.goBack();
  }

  return (
    <PostcardsContainer handlePreviousClick={handlePrevousClick} />
  );
}
