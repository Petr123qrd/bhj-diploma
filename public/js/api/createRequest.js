/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  const xhr = new XHR();

  xhr.responseType = 'json';

  if(options.method === 'GET'){

    let params = '?';

    for(let param in options.data) {
      params += `${param}=${options.data[param]}&`;
    }

    try {
      xhr.open('GET', options.url + params);
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.send();
    }
    catch ( e ) {
      options.callback( e );
    }

  } else {

    let formData = new FormData();

    for (let key in options.data){
      formData.append(key, options.data[key]);
    }

    try {
      xhr.open(options.method, options.url);
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.send(formData);
    }
    catch ( e ) {
      options.callback( e );
    }
  }

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      options.callback(null, xhr.response);
    }
  };

  xhr.onerror = function () {
    options.callback(xhr.response.error, xhr.response);
  };
};
