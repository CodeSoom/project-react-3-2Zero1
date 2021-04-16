import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initToast } from '../state/slice';

export default function ToastManager() {
  const dispatch = useDispatch();

  const { toast } = useSelector((state) => ({
    toast: state.toast,
  }));

  const { triggered, message } = toast;

  if (triggered) {
    setTimeout(() => {
      dispatch(initToast());
    }, 1500);

    return (
      <div className="fade-out-box">{message}</div>
    );
  }
  return null;
}
