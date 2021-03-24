const inputFields = {
  entrance: {
    secretMessage: {
      placeholder: '5 ~ 20자',
      value: '',
      error: '',
      errorMessages: '올바른 비밀 메시지를 입력해주세요.',
    }
  },
  write: {
    firstPage: {
      secretMessage: {
        placeholder: '5 ~ 20자',
        value: '',
        error: '',
        errorMessages: '올바른 비밀 메시지를 입력해주세요.',
      },
      sender: {
        placeholder: '2 ~ 5자',
        value: '',
        error: '',
        errorMessage: '이름 길이는 2자 ~ 5자 입니다.',
      },
      receiver: {
        placeholder: '2 ~ 5자',
        value: '',
        error: '',
        errorMessage: '이름 길이는 2자 ~ 5자 입니다.',
      }
    },
    secondPage: {
      photo: {
        value: '',
        error: '',
        errorMessage: '이미지를 선택해 주세요.',
      },
      photoMessage: {
        placeholder: '10 ~ 20자',
        value: '',
        error: '',
        errorMessage: '사진 메시지 길이는 10자 ~ 20자 입니다.',
      }
    }
  }
};

export default inputFields;
