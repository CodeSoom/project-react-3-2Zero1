import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import InputPart from '../presentational/InputPart';

import { getField } from '../utils/utils';

import {
  changeInputFieldValue,
  expirePostcard,
  setInputFieldsError,
} from '../state/slice';

import { loadItem } from '../services/storage';

import {
  PreviousButton,
  DefaultLayout,
} from '../style/commonCss';

const Title = styled.span(() => ({
  position: 'absolute',
  top: '10px',
  left: '50%',
  textAlign: 'center',
  fontSize: '20px',
  transform: 'translateX(-50%)',
}));

export default function PostcardsContainer({ handlePreviousClick }) {
  const dispatch = useDispatch();

  const {
    entrance: { sender },
    inputFields: {
      expire: { secretMessage },
    },
  } = useSelector((state) => ({
    entrance: state.entrance,
    inputFields: state.inputFields,
  }));

  const getChangeHandler = (type) => ((value) => {
    dispatch(changeInputFieldValue({
      page: 'expire',
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
        page: 'expire',
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
    <DefaultLayout>
      <PreviousButton
        type="button"
        onClick={handlePreviousClick}
      >
        이전
      </PreviousButton>
      <Title>파기하기</Title>
      <div>{`${sender}님으로 부터 받은 엽서를 파기하시겠습니까?`}</div>
      <div>엽서 암호를 입력해주세요</div>
      <InputPart field={secretMessageField} />
      <button
        type="button"
        onClick={handleClickExpire}
      >
        파기
      </button>
    </DefaultLayout>
  );
}
