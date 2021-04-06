import React from 'react';

import styled from '@emotion/styled';

import RadioButton from './RadioButton';

const Wrapper = styled.div(() => ({
  textAlign: 'center',
}));

const Label = styled.div(() => ({
  margin: '20px 20px 5px',
  fontSize: '20px',
}));

const Information = styled.p(() => ({
  margin: '0 15px',
  fontSize: '12px',
  color: 'gray',
}));

export default function RadioPart({
  onRadioChange,
  isPrivate,
}) {
  const privateValue = true;
  const publicValue = false;
  return (
    <Wrapper>
      <Label>공개 여부</Label>
      <RadioButton
        id="private"
        label="비공개"
        name="isPrivate"
        value={privateValue}
        onChange={onRadioChange}
        checked={isPrivate}
      />
      <RadioButton
        id="public"
        label="공개"
        name="isPrivate"
        value={publicValue}
        onChange={onRadioChange}
        checked={!isPrivate}
      />
      <Information>신중하게 선택해 주세요. 공개 시 다른 사람에게도 공개 되며 수정이 불가능 하며 공개하고 싶지 않다면 삭제 해야 합니다.</Information>
    </Wrapper>
  );
}
