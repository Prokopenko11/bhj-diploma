const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  const {url, data = {}, method = '', callback} = options;

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
    } else {
      callback(new Error(`В процессе отправки запроса возникла ошибка. Статус запроса - ${xhr.status}`));
    }
  })

  if (method === 'GET') {
    const dataParams = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
    const fullUrl = dataParams ? `${url}?${dataParams}` : url;
    
    xhr.open('GET', fullUrl);
    xhr.send();
  } else {
    xhr.open(method, url);

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    })

    xhr.send(formData);
  }
};