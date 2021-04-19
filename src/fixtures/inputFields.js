const inputFields = {
  entrance: {
    secretMessage: {
      value: '',
      error: '',
    },
  },
  write: {
    isPrivate: true,
    secretMessage: {
      value: '',
      error: '',
    },
    sender: {
      value: '',
      error: '',
    },
    receiver: {
      value: '',
      error: '',
    },
    contents: {
      value: '',
      error: '',
    },
    photo: {
      value: '',
      error: '',
    },
    photoMessage: {
      value: '',
      error: '',
    },
    preview: {
      isFrontPage: true,
    },
  },
  expire: {
    secretMessage: {
      value: '',
      error: false,
    },
  },
};

export default inputFields;
