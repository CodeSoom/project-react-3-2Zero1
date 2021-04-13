export async function fetchEntrance() {
  return { data: [] };
}

export async function postPhoto() {
  const fileName = 'test';
  return fileName;
}

export async function postPostcard() {
  return {
    url: 'url',
    secretMessage: 'secretMessage',
  };
}

export const postCheckValidPostcard = jest.fn();

export async function fetchPostcard() {
  return {
    sender: 'sender',
    receiver: 'receiver',
    photo: 'photoUrl',
    contents: 'contents',
    photoMessage: 'photoMessage',
  };
}
