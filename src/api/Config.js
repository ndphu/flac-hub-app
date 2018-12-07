const apiConfig = {
  //baseUrl: 'https://csn-api.cfapps.io/api',
  //baseUrl: 'http://192.168.85.106:8080/api',
  //baseUrl: 'http://192.168.16.57:8080/api',
  //baseUrl: 'http://192.168.1.8:8080/api',
  // baseUrl: 'https://csn-api-beta.cfapps.io/api',
  // contentBaseUrl: 'https://csn-api-beta.cfapps.io/api/content',

   baseUrl: 'http://localhost:9900/api',
   contentBaseUrl: 'http://localhost:9900/api/content',
  //
  loginRedirectUrl: 'http://localhost:3000/pfm/login',
  unauthorizedPath: '/gm/unauthorized',
};

export default Object.assign({}, apiConfig);