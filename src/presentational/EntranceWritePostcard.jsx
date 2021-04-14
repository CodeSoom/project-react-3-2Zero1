import React from 'react';

import styled from '@emotion/styled';

import { Button, Information } from '../style/commonCss';

const Wrapper = styled.div(() => ({
  margin: '20px 0',
}));

export default function EntranceWritePostcard({
  sender,
  postcardCount,
  onHandleClickWritePostcard,
}) {
  return (
    <Wrapper>
      {
        postcardCount
          ? (
            <>
              <Information>{`${sender}님으로 부터 받은 엽서로 ${postcardCount}번의 엽서를 작성하실 수 있어요 ! 코로나로 인해 만나보지 못한 소중한 사람에게 추억이 될 엽서를 작성해보세요 !`}</Information>
              <Button
                type="button"
                onClick={onHandleClickWritePostcard}
              >
                엽서 작성하기
              </Button>
            </>
          ) : ('해당 엽서로 작성할 수 있는 횟수가 없습니다.')
      }
    </Wrapper>
  );
}
