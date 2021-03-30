import React from 'react';

import PreviewContainer from './PreviewContainer';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import inputFields from '../fixtures/inputFields';

describe('PreviewContainer', () => {
  const dispatch = jest.fn();
  function renderSecondPage() {
    return render(
      <PreviewContainer />
    );
  }

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector(
    {
      inputFields
    },
  ));

  it('render preview', () => {
    const { getByText } = renderSecondPage();

    expect(getByText('이전')).not.toBeNull();

    expect(getByText('미리 보기')).not.toBeNull();

    expect(getByText('to')).not.toBeNull();

    fireEvent.click(getByText('to'));

    expect(dispatch).toBeCalledWith({
      type: 'application/flipPreviewPostcard',
    });
  });
  
});
