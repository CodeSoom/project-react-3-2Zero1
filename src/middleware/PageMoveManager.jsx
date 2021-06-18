import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  initMovingPage,
  setToastTriggered,
} from '../state/commonSlice';

import { loadItem } from '../services/storage';

export default function PageMoveManager() {
  const dispatch = useDispatch();

  const { movingPage, toast } = useSelector((state) => ({
    movingPage: state.common.movingPage,
    toast: state.common.toast,
  }));

  const history = useHistory();

  const key = loadItem('postcardKey');

  if (movingPage) {
    switch (movingPage) {
    case 'entrance': history.push(`/?key=${key}`); break;
    default: history.push(`/${movingPage}`);
    }

    dispatch(initMovingPage());

    const { message } = toast;
    if (message) {
      dispatch(setToastTriggered(true));
    }
  }
  return null;
}
