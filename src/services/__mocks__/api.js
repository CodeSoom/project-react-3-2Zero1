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

export async function postCheckValidPostcard() {
  return {
    success: true,
  };
}

export async function fetchPostcard() {
  return {
    sender: 'sender',
    receiver: 'receiver',
    photo: 'photoUrl',
    contents: 'contents',
    photoMessage: 'photoMessage',
  };
}
