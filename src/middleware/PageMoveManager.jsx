import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setToastTriggered } from '../state/slice';

import { loadItem } from '../services/storage';

export default function PageMoveManager() {
  const dispatch = useDispatch();

  const { movingPage, toast } = useSelector((state) => ({
    movingPage: state.movingPage,
    toast: state.toast,
  }));

  const history = useHistory();

  if (movingPage) {
    switch (movingPage) {
    case 'entrance': history.push(`/entrance?key=${loadItem('key')}`); break;
    default: history.push(`/${movingPage}`);
    }

    const { message } = toast;
    if (message) {
      dispatch(setToastTriggered(true));
    }
  }
  return null;
}
