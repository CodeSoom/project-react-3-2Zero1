import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import EntranceCheckForm from '../presentational/EntranceCheckForm';
import EntranceWritePostcard from '../presentational/EntranceWritePostcard';

import placeholders from '../text/placeholders';
import errorMessages from '../text/errorMessages';

import { loadItem } from '../services/storage';

import {
  changeInputFieldValue,
  setInputFieldsError,
  checkValidPostcard,
  loadEntrance,
} from '../state/slice';

const Wrapper = styled.div(() => ({
  marginTop: '20px',
  textAlign: 'center',
}));

const Title = styled.div(() => ({
  marginTop: '20px',
  fontSize: '20px',
}));

const Button = styled.button(() => ({
  fontSize: '16px',
  margin: '10px',
  padding: '5px 8px',
}));

export default function EntranceContainer({
  postcardKey,
  onHandleClickPostcard,
  onHandleClickWritePostcard,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEntrance({ postcardKey }));
  });

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
  } = entrance;

  const { entrance: { secretMessage } } = inputFields;
  const { value, error } = secretMessage;

  const placeholder = placeholders.secretMessage;
  const errorMessage = errorMessages.secretMessage[error];

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
      onHandleClickPostcard,
    }));
  }

  function handleChange(v) {
    dispatch(changeInputFieldValue({
      type: 'secretMessage',
      value: v,
    }));
  }

  const field = {
    value,
    placeholder,
    errorMessage,
  };

  return (
    <Wrapper>
      <Title>{`${sender}님으로 부터 엽서가 도착했어요.`}</Title>
      <EntranceCheckForm
        isPrivate={isPrivate}
        field={field}
        onClick={handleCheckPostcardClick}
        onChange={handleChange}
      />
      <EntranceWritePostcard
        sender={sender}
        postcardCount={postcardCount}
        onHandleClickWritePostcard={onHandleClickWritePostcard}
      />
      <div>{`현재 까지 ${writtenCount}명의 엽서가 작성 되었습니다.`}</div>
      <Button type="button">다른 사람 엽서 보러가기</Button>
      <Button type="button">엽서 파기하기</Button>
    </Wrapper>
  );
}
