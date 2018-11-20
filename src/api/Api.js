import 'whatwg-fetch';
import config from './Config.js';
const jwtDecode = require('jwt-decode');

class Api {
  setToken = (token) => {
    localStorage.setItem("jwt.token", token);
    localStorage.setItem('jwt.claims', JSON.stringify(jwtDecode(token)))
  };

  getToken = () => localStorage.getItem("jwt.token");

  getClaims = () => {
    if (!localStorage.getItem('jwt.claims')) {
      window.location.href = config.unauthorizedPath;
    } else {
      return JSON.parse(localStorage.getItem('jwt.claims'));
    }
  };

  buildHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    let token = this.getToken();
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }
    return headers;
  }

  get = (path) => {
    return fetch(config.baseUrl + path, {
      method: 'GET',
      headers: this.buildHeaders()
    }).then(resp => {
      if (resp.status === 401) {
        window.location.href = config.unauthorizedPath;
      } else {
        return resp.json();
      }
    });
  };


  getFetch(path) {
    return fetch(config.baseUrl + path, {
      method: 'GET',
      headers: this.buildHeaders()
    });
  }

  post = (path, body, raw) => {
    const input = config.baseUrl + path;
    return fetch(input, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: raw ? body : JSON.stringify(body),
    }).then(resp => {
      if (resp.status === 401) {
        window.location.href = config.unauthorizedPath;
      } else {
        return resp.json()
      }
    });
  };

  signout = () => {
    localStorage.clear();
    window.location.href = config.unauthorizedPath;
  }

  fetchBlob = (url) => {
    return fetch(url).then(resp => resp.blob())
  }

}

const api = new Api();
export default api;
