import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import WriteCompleteContainer from './WriteCompleteContainer';

describe('WriteCompleteContainer', () => {
  const handleClickHome = jest.fn();
  const checkValidAccess = jest.fn();

  useSelector.mockImplementation((selector) => selector(
    {
      writePageIndex: 3,
      inputFields: {
        write: {
          sender: {
            value: 'sender',
          },
          complete: {
            url: 'localhost',
            secretMessage: 'secretMessage',
          },
        },
      },
    },
  ));

  it('render WriteCompleteContainer', () => {
    const { getByText } = render((
      <WriteCompleteContainer
        onClickHome={handleClickHome}
        checkValidAccess={checkValidAccess}
      />
    ));

    expect(checkValidAccess).toBeCalled();

    expect(getByText('홈로고')).not.toBeNull();

    expect(getByText('엽서 제작이 완료 되었습니다.')).not.toBeNull();
    expect(getByText('밑의 버튼을 클릭하면 전송 메시지가 복사됩니다.')).not.toBeNull();
    expect(getByText('카카오톡이나 문자 메시지에 붙혀 넣고 전송해보세요!')).not.toBeNull();
    expect(getByText('반드시 전송 메시지를 복사해주세요. 페이지를 이탈 시 해당 엽서는 찾을 수 없습니다.')).not.toBeNull();
    expect(getByText('전송 메시지 복사')).not.toBeNull();

    fireEvent.click(getByText('전송 메시지 복사'));

    expect(getByText('링크와 비밀메시지는 관련된 사람 이외에 공유 하지 말아주세요! 공유가 된다면 다른 사람이 삭제할 수도 있어요! 링크를 지우지 말아주세요. 링크를 잊어 버린다면 다시는 엽서를 보지 못할 수도 있으며, 삭제도 할 수 없습니다.')).not.toBeNull();
  });
});
