import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import WriteFirstFormContainer from '../container/WriteFirstFormContainer';

import { get } from '../utils/utils';

import {
  increaseWritePageIndex,
  decreaseWritePageIndex,
} from '../state/slice';




export default function WritePage() {

  const dispatch = useDispatch();
  const writePageIndex = useSelector(get('writePageIndex'));
  console.log(writePageIndex);

  function handleNextClick() {
    dispatch(increaseWritePageIndex());
  }
  function toPreviousPage() {
    dispatch(decreaseWritePageIndex());
  }

  const writeContainers = {
    0: <WriteFirstFormContainer onClickNext={handleNextClick} />,
    // 1: <WriteSecondContainer />,
    // 2: <PreviewContainer />,
    // 3: <WriteCompletedContainer />,
  };
  
  return (
  <>
    <div>엽서 작성하기</div>
    {writeContainers[writePageIndex]}
  </>
  );
}
