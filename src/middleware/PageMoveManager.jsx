import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadItem } from '../services/storage';

export default function PageMoveManager() {
  const { movingPage } = useSelector((state) => ({
    movingPage: state.movingPage,
  }));

  const history = useHistory();

  if (movingPage) {
    switch (movingPage) {
    case 'entrance': history.push(`/entrance?key=${loadItem('key')}`); break;
    default: history.push(`/${movingPage}`);
    }
  }
  return null;
}
