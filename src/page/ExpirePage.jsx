import React from 'react';
import { useHistory } from 'react-router-dom';

import ExpireFormContainer from '../container/ExpireFormContainer';

export default function ExpirePage() {
  const history = useHistory();

  function handlePrevousClick() {
    history.goBack();
  }

  return (
    <ExpireFormContainer handlePreviousClick={handlePrevousClick} />
  );
}
