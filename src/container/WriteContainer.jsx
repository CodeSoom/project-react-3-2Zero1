import React from 'react'

const writeContainers = {
  0: <WriteFirstContainer />,
  1: <WriteSecondContainer />,
  2: <PreviewContainer />,
  3: <WriteCompletedContainer />,
};

export default function EntranceContainer({ pageIndex }) {

  return writeContainers[pageIndex];
}
