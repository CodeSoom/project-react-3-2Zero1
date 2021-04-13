import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import EntranceCheckForm from '../presentational/EntranceCheckForm';
import EntranceWritePostcard from '../presentational/EntranceWritePostcard';

import { getField } from '../utils/utils';

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
      onHandleClickPostcard();
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
    <Wrapper>
      <Title>{`${sender}님으로 부터 엽서가 도착했어요.`}</Title>
      <EntranceCheckForm
        isPrivate={isPrivate}
        field={field}
        onClick={handleCheckPostcardClick}
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
