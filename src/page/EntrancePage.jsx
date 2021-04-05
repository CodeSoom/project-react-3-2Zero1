import React from 'react';
// import React, { useEffect } from 'react';z
// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { useHistory, useParams } from 'react-router-dom';
import EntranceContainer from '../container/EntranceContainer';

// import {
//   loadEntrance,
// } from '../state/slice';

// export default function EntrancePage({ params }) {
export default function EntrancePage() {
  // const dispatch = useDispatch();

  // const { key } = params || useParams();

  const history = useHistory();

  function handleClickPostcard() {
    const url = '/postcard';
    history.push(url);
  }

  function handleClickWritePostcard() {
    const url = '/write/0';
    history.push(url);
  }

  // useEffect(() => {
  //   dispatch(loadEntrance({ key }));
  // });

  return (
    <EntranceContainer
      onHandleClickPostcard={handleClickPostcard}
      onHandleClickWritePostcard={handleClickWritePostcard}
    />
  );
}
