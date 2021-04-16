import React from 'react';

import styled from '@emotion/styled';

export const Text = styled.div({
  fontSize: '35px',
  marginTop: '30%',
  textAlign: 'center',
});

export default function NotFoundPage() {
  return (
    <>
      <Text>존재하지 않는 엽서입니다.</Text>
    </>
  );
}
