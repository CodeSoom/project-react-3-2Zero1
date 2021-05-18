import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Entrance from '../presentational/Entrance';

import { getField } from '../utils/utils';

import { loadItem } from '../services/storage';

import {
  changeInputFieldValue,
  setInputFieldsError,
  checkValidPostcard,
  loadEntrance,
} from '../state/slice';

export default function EntranceContainer({
  postcardKey,
  moveToPostcardPage,
  onHandleClickWritePostcard,
  onHandleClickOtherPostcards,
  onHandleClickExpire,
}) {
  const dispatch = useDispatch();

  const {
    entrance,
    inputFields,
  } = useSelector((state) => ({
    entrance: state.entrance,
    inputFields: state.inputFields,
  }));

  const {
    sender,
    postcardCount,
    writtenCount,
    isPrivate,
    movePage,
  } = entrance;

  useEffect(() => {
    if (movePage) {
      moveToPostcardPage();
    }

    dispatch(loadEntrance({ key: postcardKey }));
  }, [movePage]);

  const { entrance: { secretMessage } } = inputFields;

  function handleCheckPostcardClick(v) {
    if (isPrivate) {
      if (v.length < 5 || v.length > 21) {
        dispatch(setInputFieldsError({
          page: 'entrance',
          type: 'secretMessage',
          error: true,
        }));
        return;
      }
    }

    const key = loadItem('postcardKey');

    dispatch(checkValidPostcard({
      key,
      secretMessage: secretMessage.value,
    }));
  }

  const entranceState = {
    sender,
    postcardCount,
    writtenCount,
    isPrivate,
  };

  const menuButtonHandlers = {
    onHandleClickWritePostcard,
    onHandleClickOtherPostcards,
    onHandleClickExpire,
  };

  function handleChange(v) {
    dispatch(changeInputFieldValue({
      page: 'entrance',
      type: 'secretMessage',
      value: v,
    }));
  }

  const field = getField({
    field: secretMessage,
    id: 'secretMessage',
    name: '',
    onChange: handleChange,
  });

  return (
    <Entrance
      menuButtonHandlers={menuButtonHandlers}
      entranceState={entranceState}
      onHandleCheckPostcardClick={handleCheckPostcardClick}
      field={field}
    />
  );
}
