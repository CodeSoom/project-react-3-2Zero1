import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExpireForm from '../presentational/ExpireForm';

import { getField } from '../utils/utils';

import {
  changeInputFieldValue,
  expirePostcard,
  setInputFieldsError,
} from '../state/expireSlice';

import { loadItem } from '../services/storage';

export default function ExpireFormContainer({ handlePreviousClick }) {
  const dispatch = useDispatch();

  const { expire, entrance } = useSelector((state) => ({
    expire: state.expire,
    entrance: state.entrance,
  }));

  const {
    inputFields: { secretMessage },
  } = expire;

  const { sender } = entrance;

  const getChangeHandler = (type) => ((value) => {
    dispatch(changeInputFieldValue({
      type,
      value,
    }));
  });

  const secretMessageField = getField({
    field: secretMessage,
    id: 'secretMessage',
    name: '엽서 암호',
    onChange: getChangeHandler('secretMessage'),
  });

  function handleClickExpire() {
    const { value } = secretMessage;
    if (value.length < 5 || value.length > 21) {
      dispatch(setInputFieldsError({
        type: 'secretMessage',
        error: true,
      }));
      return;
    }
    const key = loadItem('postcardKey');

    dispatch(expirePostcard({
      key,
      secretMessage: secretMessage.value,
    }));
  }

  return (
    <ExpireForm
      sender={sender}
      secretMessageField={secretMessageField}
      onHandlePreviousClick={handlePreviousClick}
      onHandleClickExpire={handleClickExpire}
    />
  );
}
