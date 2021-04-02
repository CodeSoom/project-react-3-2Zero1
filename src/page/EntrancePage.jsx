import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EntranceContainer from '../container/EntranceContainer';

import {
  loadEntrance,
} from '../state/slice';

export default function EntrancePage({ params }) {
  const dispatch = useDispatch();

  const { key } = params || useParams();

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
