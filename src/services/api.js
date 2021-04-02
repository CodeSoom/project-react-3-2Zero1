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

export async function fetchXXX() {
  // TODO : 이후 개발
}
