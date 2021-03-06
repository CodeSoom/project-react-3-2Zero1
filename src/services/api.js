const getDomain = (path) => `http://ec2-52-79-249-161.ap-northeast-2.compute.amazonaws.com:80/${path}`;
// 'http://localhost:3000'

export async function fetchEntrance({ key }) {
  const url = getDomain('entrance');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({ key }),
  });
  const data = await response.json();

  return data;
}

export async function postPhoto({ file }) {
  const url = getDomain('photo');
  const formData = new FormData();
  formData.append('photo', file);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Headers': '*',
    },
    body: formData,
  });
  const result = await response.json();
  return result.data.photo;
}

export async function postPostcard({
  key,
  sender,
  receiver,
  contents,
  photoUrl,
  photoMessage,
  secretMessage,
  isPrivate,
}) {
  const url = getDomain('write');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({
      key,
      sender,
      receiver,
      contents,
      photoUrl,
      photoMessage,
      secretMessage,
      isPrivate,
    }),
  });
  const result = await response.json();

  return result;
}

export async function postCheckValidPostcard({
  key,
  secretMessage,
}) {
  const url = getDomain('check');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({
      key,
      secretMessage,
    }),
  });
  const result = await response.json();

  return result;
}

export async function fetchPostcard({
  key,
  secretMessage,
}) {
  const url = getDomain('postcard');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({
      key,
      secretMessage,
    }),
  });
  const result = await response.json();

  return result;
}

export async function fetchPostcards() {
  const url = getDomain('postcards');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({}),
  });
  const result = await response.json();

  return result;
}

export async function postExpire({ key, secretMessage }) {
  const url = getDomain('expire');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({ key, secretMessage }),
  });
  const result = await response.json();

  return result;
}
