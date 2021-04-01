import React from 'react';
import { useHistory } from 'react-router-dom';
import EntranceContainer from '../container/EntranceContainer';

export default function EntrancePage() {
  const history = useHistory();

  function handleClickPostcard() {
    const url = '/postcard';
    history.push(url);
  }

  function handleClickWritePostcard() {
    const url = '/write/0';
    history.push(url);
  }

  return (
    <EntranceContainer
      onHandleClickPostcard={handleClickPostcard}
      onHandleClickWritePostcard={handleClickWritePostcard}
    />
  );
}
