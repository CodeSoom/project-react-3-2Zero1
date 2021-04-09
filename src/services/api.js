export async function fetchEntrance({ key }) {
  const url = 'http://localhost/entrance.php';
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
  const url = 'http://localhost:3000/photo';
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
