import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import queryString from 'query-string';
import EntranceContainer from '../container/EntranceContainer';

import {
  loadEntrance,
} from '../state/slice';

export default function EntrancePage({ location }) {
  const { key } = queryString.parse(location.search);
  const dispatch = useDispatch();

  const history = useHistory();

  function handleClickPostcard() {
    const url = '/postcard';
    history.push(url);
  }

  function handleClickWritePostcard() {
    const url = '/write/0';
    history.push(url);
  }

  useEffect(() => {
    dispatch(loadEntrance({ key }));
  });

  return (
    <EntranceContainer
      onHandleClickPostcard={handleClickPostcard}
      onHandleClickWritePostcard={handleClickWritePostcard}
    />
  );
}
