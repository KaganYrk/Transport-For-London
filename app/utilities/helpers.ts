export const Fetch = (url: string, requestOptions: object | undefined) => (fetch(url, requestOptions)
  .then(async response => {
    if (response.ok) {
      return response.json();
    }
    if (response.status === 401) {
      console.warn('401');
    }
    if (response.status === 400) {
      console.warn('400');
      const parsedResponse = await response.text().then(x => JSON.parse(x));
      return parsedResponse;
    }
    return false;
  })
  .catch(() => false)
);
