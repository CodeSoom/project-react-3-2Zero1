import React from 'react';

import styled from '@emotion/styled';

import InputPart from './InputPart';

const Wrapper = styled.div(() => ({
  margin: '20px 0',
}));

const Button = styled.button(() => ({
  fontSize: '16px',
  margin: '10px',
  padding: '5px 8px',
}));

const Information = styled.p(() => ({
  margin: '0 15px',
  fontSize: '12px',
  color: 'gray',
}));

export default function EntranceCheckForm({
  isPrivate,
  onClick,
  field,
}) {
  function handleClick(v) {
    onClick(v);
  }


  return (
    <Wrapper>
      {
        isPrivate ? (
          <>
            <InputPart field={field} />
            <Information>비공개 엽서입니다. 문자로 받은 비밀 메시지를 입력 후 엽서 확인하기 버튼을 눌러주세요.</Information>
          </>
        ) : null
      }
      <Button
        type="button"
        onClick={() => handleClick(field.value)}
      >
        엽서 확인하기
      </Button>
    </Wrapper>
  );
}
