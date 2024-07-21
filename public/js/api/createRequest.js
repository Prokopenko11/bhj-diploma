const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  const {url, data = {}, method = '', callback} = options;

  xhr.addEventListener('load', () => {
    callback(null, xhr.response);
  });

  xhr.addEventListener('error', () => {
    callback(new Error(`В процессе отправки запроса возникла ошибка. Статус запроса - ${xhr.status}`));
  });

  let fullUrl = url;
  let body = null;

  if (method === 'GET') {
    const dataParams = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
    fullUrl = dataParams ? `${url}?${dataParams}` : url;
  } else {
    body = new FormData();
    Object.keys(data).forEach(key => {
      body.append(key, data[key]);
    });
  }

  xhr.open(method, fullUrl);
  xhr.send(body);
};