import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import InformationFormContainer from './InformationFormContainer';

import placeholders from '../text/placeholders';
import inputFields from '../fixtures/inputFields';

describe('InformationFormContainer', () => {
  const dispatch = jest.fn();

  const handleNextClick = jest.fn();
  const handlePreviousClick = jest.fn();
  const checkValidAccess = jest.fn();

  function renderInformationForm() {
    return render((
      <InformationFormContainer
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
        checkValidAccess={checkValidAccess}
      />
    ));
  }

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector(
    {
      writePageIndex: 1,
      inputFields,
    },
  ));

  it('render InformationFormContainer and change input fields', () => {
    const {
      getByLabelText,
      getByText,
    } = renderInformationForm();

    expect(checkValidAccess).toBeCalled();

    const labels = [
      {
        label: '보내는 사람',
        id: 'sender',
      },
      {
        label: '받는 사람',
        id: 'receiver',
      },
      {
        label: '엽서 암호',
        id: 'secretMessage',
      },
    ];

    labels.forEach(({ label, id }) => {
      expect(getByLabelText(label)).not.toBeNull();
      expect(getByLabelText(label).placeholder).toBe(placeholders[id]);

      fireEvent.change(getByLabelText(label), {
        target: {
          value: 'test',
        },
      });

      expect(dispatch).toBeCalledWith({
        type: 'application/changeInputFieldValue',
        payload: {
          page: 'write',
          type: id,
          value: 'test',
        },
      });
    });

    expect(getByText('엽서를 확인 또는 파기하기 위해 사용되며 받는 사람에게도 공유됩니다.')).not.toBeNull();

    expect(getByLabelText('비공개')).not.toBeNull();
    expect(getByLabelText('공개')).not.toBeNull();

    fireEvent.click(getByLabelText('공개'));

    expect(dispatch).toBeCalledWith({
      type: 'write/changeRadioChecked',
      payload: false,
    });

    expect(getByText('신중하게 선택해 주세요. 공개 시 다른 사람에게도 공개 되며 수정이 불가능 하며 공개하고 싶지 않다면 삭제 해야 합니다.')).not.toBeNull();
    expect(getByText('다음')).not.toBeNull();
  });
});
