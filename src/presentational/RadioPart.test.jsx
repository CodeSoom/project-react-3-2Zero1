import React from 'react';

import { render } from '@testing-library/react';

import RadioPart from './RadioPart';

describe('RadioPart', () => {
  const handleRadioChange = jest.fn();

  beforeEach(() => {
    handleRadioChange.mockClear();
  });
  function renderRadioPart(isPrivate) {
    return render((
      <RadioPart
        onRadioChange={handleRadioChange}
        isPrivate={isPrivate}
      />
    ));
  }

  const { getByText } = renderRadioPart(true);

  it('renders common text', () => {
    expect(getByText('공개 여부')).not.toBeNull();
    expect(getByText('신중하게 선택해 주세요. 공개 시 다른 사람에게도 공개 되며 수정이 불가능 하며 공개하고 싶지 않다면 삭제 해야 합니다.')).not.toBeNull();
  });

  context('when isPrivate is true', () => {
    it('turns on 비공개 radio button ', () => {
      const { getByLabelText } = renderRadioPart(true);
      expect(getByLabelText('비공개')).toBeChecked();
    });
  });

  context('when isPrivate is false', () => {
    it('turns on 공개 radio button ', () => {
      const { getByLabelText } = renderRadioPart(false);
      expect(getByLabelText('공개')).toBeChecked();
    });
  });
});
