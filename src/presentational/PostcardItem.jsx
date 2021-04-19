import React from 'react';

import styled from '@emotion/styled';

const Image = styled.img({
  width: '80%',
});

const Item = styled.li({
  margin: '30px 0',
});

const From = styled.div({
  fontSize: '18px',
  fontWeight: 'bold',
});

const PhotoMessage = styled.div({
  fontSize: '12px',
});

export default function PostcardItem({
  postcardItem: {
    receiver,
    photo,
    photoMessage,
  },
}) {
  return (
    <Item>
      <From>{`${receiver}님이 받은 엽서`}</From>
      <Image src={photo} alt="postcardImage" />
      <PhotoMessage>{photoMessage}</PhotoMessage>
    </Item>
  );
}
