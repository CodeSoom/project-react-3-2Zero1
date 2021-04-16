import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadItem } from '../services/storage';

export default function PageMoveManager() {
  const { movingPage } = useSelector((state) => ({
    movingPage: state.movingPage,
  }));

  const history = useHistory();

  history.push(movingPage === 'entrance'
    ? `/entrance?key=${loadItem('key')}` : history.push(`/${movingPage}`));

  return (<></>);
}
