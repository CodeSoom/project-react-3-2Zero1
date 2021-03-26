import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import WriteFirstFormContainer from '../container/WriteFirstFormContainer';
import WriteSecondFormContainer from '../container/WriteSecondFormContainer';
import PreviewContainer from '../container/PreviewContainer';

import { get } from '../utils/utils';

import {
  increaseWritePageIndex,
  decreaseWritePageIndex,
  changeInputFieldValue,
} from '../state/slice';

export default function WritePage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const writePageIndex = useSelector(get('writePageIndex'));
  console.log(writePageIndex);

  const getChangeHandler = (type) => {
    return ((value) => {
      dispatch(changeInputFieldValue({
        page: 'write',
        type,
        value,
      }));
    });
  };

  function handleNextClick() {
    dispatch(increaseWritePageIndex());
  }
  function handlePreviousClick() {
    if (writePageIndex == 0) {
      return history.goBack();
    }
    dispatch(decreaseWritePageIndex());
  }

  const writeContainers = {
    0: (
      <WriteFirstFormContainer
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
        getChangeHandler={getChangeHandler}
      />
    ),
    1: (
      <WriteSecondFormContainer
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
        getChangeHandler={getChangeHandler}
      />
    ),
    2: <PreviewContainer />,
    // 3: <WriteCompletedContainer />,
  };
  
  return (
  <>
    {writeContainers[writePageIndex]}
  </>
  );
}
