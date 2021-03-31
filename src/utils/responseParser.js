export default function responseParser(response) {
  if (!response || !response.data) return null;

  return response.data;
}
