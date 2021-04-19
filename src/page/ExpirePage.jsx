import React from 'react';
import { useHistory } from 'react-router-dom';

import ExpireContainer from '../container/ExpireContainer';

export default function ExpirePage() {
  const history = useHistory();

  function handlePrevousClick() {
    history.goBack();
  }

  return (
    <ExpireContainer handlePreviousClick={handlePrevousClick} />
  );
}
