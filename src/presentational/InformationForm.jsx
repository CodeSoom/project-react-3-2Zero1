import React from 'react';

import styled from '@emotion/styled';

import InputPart from './InputPart';
import RadioPart from './RadioPart';

import { Button, Information } from '../style/commonCss';

const Title = styled.span(() => ({
  position: 'absolute',
  top: '10px',
  left: '50%',
  textAlign: 'center',
  fontSize: '20px',
  transform: 'translateX(-50%)',
}));

const CompleteButton = styled.button(() => ({
  position: 'absolute',
  right: '10px',
  top: '10px',
  padding: '5px 8px',
  fontSize: '16px',
}));

export default function InformationForm({
  fields: {
    sender,
    receiver,
    secretMessage,
  },
  onHandleClick,
  onRadioChange,
  isPrivate,
  onClickPrevious,
}) {
  return (
    <>
      <Title>엽서 작성하기</Title>
      <Button
        type="button"
        onClick={onClickPrevious}
      >
        이전
      </Button>
      <CompleteButton
        type="button"
        onClick={onHandleClick}
      >
        다음
      </CompleteButton>
      <InputPart field={sender} />
      <InputPart field={receiver} />
      <Information>관리자에게 쓰고 싶은 편지가 있다면 받는 사람을 ‘관리자’로 입력해주세요.</Information>
      <InputPart field={secretMessage} />
      <Information>엽서를 확인 또는 파기하기 위해 사용되며 받는 사람에게도 공유됩니다.</Information>
      <RadioPart
        onRadioChange={onRadioChange}
        isPrivate={isPrivate}
      />
    </>
  );
}
