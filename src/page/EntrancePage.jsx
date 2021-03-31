import React from 'react';
import { useHistory } from 'react-router';
import EntranceContainer from '../container/EntranceContainer';

export default function EntrancePage() {
  const history = useHistory();

  function handleClickPostcard() {
    const url = '/postcard';
    history.push(url);
  }
  return (
    <EntranceContainer
      onHandleClickPostcard={handleClickPostcard}
    />
  );
}
