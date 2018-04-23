const apiConfig = {
  baseUrl: 'https://csn-api.cfapps.io/api',
  //baseUrl: 'http://192.168.16.57:8080/api',
  //baseUrl: 'http://192.168.1.8:8080/api',
  loginRedirectUrl: 'http://localhost:3000/pfm/login',
  unauthorizedPath: '/gm/unauthorized',
};

export default Object.assign({}, apiConfig);