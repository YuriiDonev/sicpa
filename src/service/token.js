
export const saveToken = (token, userId) => {
  // const existToken = window.localStorage.getItem('dockmasters-token');
  // const existUserId = window.localStorage.getItem('dockmasters-userId');
  // if (existToken && existUserId) {
    // return;
  // } else {
    window.localStorage.setItem('dockmasters-token', token);
    window.localStorage.setItem('dockmasters-userId', userId);
  // }
};

export const getToken = () => {
  const token = window.localStorage.getItem('dockmasters-token');
  const userId = window.localStorage.getItem('dockmasters-userId');
  return {token, userId};
};

export const removeToken = () => {
  console.log('!!!! removeToken ');
  window.localStorage.removeItem('dockmasters-token');
  window.localStorage.removeItem('dockmasters-userId');

  // window.localStorage.removeItem('dockmasters-client_id');
  // window.localStorage.removeItem('dockmasters-client_secret');
};

export const getTokenForImages = () => {
  const token = window.localStorage.getItem('dockmasters-token');
  return token;
};

export const saveClientIdSecret = (client_id, client_secret) => {
  // console.log('saveClientIdSecret client_id ', client_id);
  // console.log('saveClientIdSecret client_secret ', client_secret);
  window.localStorage.setItem('dockmasters-client_id', client_id);
  window.localStorage.setItem('dockmasters-client_secret', client_secret);
};

export const getClientIdSecret = () => {
  const client_id = window.localStorage.getItem('dockmasters-client_id');
  const client_secret = window.localStorage.getItem('dockmasters-client_secret');
  return {client_id, client_secret};
};

export const refreshTokenInLS = (token, cb) => {
  console.log('!!! refreshTokenInLS ', token);
  window.localStorage.setItem('dockmasters-token', token);
  cb();
};

// export const saveToken = (token) => {
//   const existToken = window.localStorage.getItem('dockmasters-token');
//   if (existToken) {
//     return;
//   } else {
//     window.localStorage.setItem('dockmasters-token', token);
//   }
// };
//
// export const getToken = () => {
//   const token = window.localStorage.getItem('dockmasters-token');
//   return token;
// };
//
// export const removeToken = () => {
//   window.localStorage.removeItem('dockmasters-token');
// };


// export function updateToken(payload) {
//   /* Generate token */
//   const token = jwt.encode(payload, secret);
//   /* Save token to local storage */
//   window.localStorage.setItem('su-token', token);
//   return true;
// }

// /**
//  * @returns {string|null} token or null if no token in local storage
//  */
// export function getToken() {
//   const token = window.localStorage.getItem('su-token');
//   return token;
// }
//
// export default {
//   // updateToken,
//   getToken,
// };
