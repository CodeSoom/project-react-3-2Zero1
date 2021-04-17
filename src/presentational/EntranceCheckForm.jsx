import React from 'react';

import styled from '@emotion/styled';

import InputPart from './InputPart';

import { Button, Information } from '../style/commonCss';

const Wrapper = styled.div(() => ({
  margin: '10px 0',
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
            <Information>비공개 엽서입니다. 문자로 받은 엽서 암호를 입력 후 엽서 확인하기 버튼을 눌러주세요.</Information>
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
