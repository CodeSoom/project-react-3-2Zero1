import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Entrance from '../presentational/Entrance';

import { getField } from '../utils/utils';

import { loadItem } from '../services/storage';

import {
  setInputFieldsError,
  changeInputFieldValue,
  checkValidPostcard,
  loadEntrance,
  resetAdmitPostcardAccess,
} from '../state/entranceSlice';

export default function EntranceContainer({
  postcardKey,
  moveToPostcardPage,
  onHandleClickWritePostcard,
  onHandleClickOtherPostcards,
  onHandleClickExpire,
}) {
  const dispatch = useDispatch();

  const { entrance } = useSelector((state) => ({
    entrance: state.entrance,
  }));

  const {
    sender,
    postcardCount,
    writtenCount,
    isPrivate,
    movePage,
    inputFields,
  } = entrance;

  useEffect(() => {
    if (movePage) {
      dispatch(resetAdmitPostcardAccess());
      moveToPostcardPage();
      // TODO: dispatch로 movingpage 부분 false로 변경해줘야함.
      return;
    }

    dispatch(loadEntrance({ key: postcardKey }));
  }, [movePage]);

  const { secretMessage } = inputFields;

  function handleCheckPostcardClick(v) {
    if (isPrivate) {
      if (v.length < 5 || v.length > 21) {
        dispatch(setInputFieldsError({
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
