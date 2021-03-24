import React from 'react'

import { useParams } from 'react-router-dom';

import WriteFirstFormContainer from '../container/WriteFirstFormContainer';

const writeContainers = {
  0: <WriteFirstFormContainer />,
  // 1: <WriteSecondContainer />,
  // 2: <PreviewContainer />,
  // 3: <WriteCompletedContainer />,
};


export default function WritePage({ params }) {
  const { index } = params || useParams();
  
  return (
  <>
    <div>엽서 작성하기</div>
    {writeContainers[index]}
  </>
  );
}
