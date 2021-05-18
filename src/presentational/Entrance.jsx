import React from 'react';

import styled from '@emotion/styled';

import EntranceCheckForm from './EntranceCheckForm';
import EntranceWritePostcard from './EntranceWritePostcard';

import { Button } from '../style/commonCss';

const Wrapper = styled.div(() => ({
  textAlign: 'center',
}));

const Title = styled.div(() => ({
  fontSize: '24px',
}));

export default function Entrance({
  entranceState: {
    sender,
    postcardCount,
    writtenCount,
    isPrivate,
  },
  menuButtonHandlers: {
    onHandleClickWritePostcard,
    onHandleClickOtherPostcards,
    onHandleClickExpire,
  },
  onHandleCheckPostcardClick,
  field,
}) {
  return (
    <Wrapper>
      <Title>{`${sender}님으로 부터 엽서가 도착했어요.`}</Title>
      <EntranceCheckForm
        isPrivate={isPrivate}
        field={field}
        onClick={onHandleCheckPostcardClick}
      />
      <EntranceWritePostcard
        sender={sender}
        postcardCount={postcardCount}
        onHandleClickWritePostcard={onHandleClickWritePostcard}
      />
      <p>{`현재 까지 ${writtenCount}명의 엽서가 작성 되었습니다.`}</p>
      <Button
        type="button"
        onClick={onHandleClickOtherPostcards}
      >
        다른 사람 엽서 보러가기
      </Button>
      <Button
        type="button"
        onClick={onHandleClickExpire}
      >
        엽서 파기하기
      </Button>
    </Wrapper>
  );
}
