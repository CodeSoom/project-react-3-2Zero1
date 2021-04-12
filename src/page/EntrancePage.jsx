import React from 'react';
import { useHistory } from 'react-router-dom';

import queryString from 'query-string';
import EntranceContainer from '../container/EntranceContainer';

export default function EntrancePage({ location }) {
  const { key } = queryString.parse(location.search);

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
      postcardKey={key}
      onHandleClickPostcard={handleClickPostcard}
      onHandleClickWritePostcard={handleClickWritePostcard}
    />
  );
}
