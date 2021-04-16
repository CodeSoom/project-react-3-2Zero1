export const fetchEntrance = jest.fn();

export async function postPhoto() {
  const fileName = 'test';
  return fileName;
}

export const postPostcard = jest.fn();

export const postCheckValidPostcard = jest.fn();

export async function fetchPostcard() {
  return {
    data: {
      sender: 'sender',
      receiver: 'receiver',
      photo: 'photoUrl',
      contents: 'contents',
      photoMessage: 'photoMessage',
    },
  };
}
