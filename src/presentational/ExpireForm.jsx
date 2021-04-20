import React from 'react';
import styled from '@emotion/styled';

import InputPart from './InputPart';

import {
  PreviousButton,
  DefaultLayout,
  NextButton,
} from '../style/commonCss';

const Title = styled.span(() => ({
  position: 'absolute',
  top: '10px',
  left: '50%',
  textAlign: 'center',
  fontSize: '20px',
  transform: 'translateX(-50%)',
}));

export default function PostcardsContainer({
  sender,
  secretMessageField,
  onHandlePreviousClick,
  onHandleClickExpire,
}) {
  return (
    <DefaultLayout>
      <PreviousButton
        type="button"
        onClick={onHandlePreviousClick}
      >
        이전
      </PreviousButton>
      <Title>파기하기</Title>
      <div>{`${sender}님으로 부터 받은 엽서를 파기하시겠습니까?`}</div>
      <div>엽서 암호를 입력해주세요</div>
      <InputPart field={secretMessageField} />
      <NextButton
        type="button"
        onClick={onHandleClickExpire}
      >
        파기
      </NextButton>
    </DefaultLayout>
  );
}
