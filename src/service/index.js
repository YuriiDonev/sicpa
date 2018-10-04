
import axios from 'axios';
import uuid from 'uuid';
import { saveClientIdSecret, getClientIdSecret, saveToken, getToken, refreshTokenInLS } from './token';

import { HOST_NAME } from '../mock-data/host-name.js';

import { logoutFromAppTokenError } from '../index.js';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const loginIn = (userEmail, password, loginToApp) => {
  const device_id = uuid.v4();

  loginToApp(false);

  axios({
  	url: `${HOST_NAME}/api/login`,
  	method: 'POST',
  	auth: {
  		username: userEmail, // 'rafik@gmail.com'
  		password: password // 'doggy'
  	},
  	data: {"device_id": device_id}
  }).then(response => {

    saveClientIdSecret(response.data.client_id, response.data.client_secret);

  		axios({
  			url: `${HOST_NAME}/oauth/token`,
  			method: 'POST',
  			headers: defaultHeaders,
  			auth: {
  				username: response.data.client_id,
  				password: response.data.client_secret
  			},
  			data: {"grant_type":"client_credentials"}
  		}).then(responseToken => {
  				saveToken(responseToken.data.access_token, response.data.id);
          loginToApp(true, response.data.id);
  			},
  			error => {
  				console.log('ERROR TOKEN WHEN LOGIN ', error);
          // loginToApp(false, null, true);
  			});

  	}, reject => {
      loginToApp(false, null, true);
    });
};

export const checkToken = ({ store }) => {
	const isToken = getToken();

	if (isToken.token) {
    store.dispatch({
      type: 'IS_LOGIN',
      payload: true,
    });
		return isToken;
	} else {
    store.dispatch({
      type: 'IS_LOGIN',
      payload: false,
    });
    return isToken;
	}
};

export const refreshToken = () => {
  const clientIdSecret = getClientIdSecret();

  return new Promise((resolve, reject) => {

    axios({
      url: `${HOST_NAME}/oauth/token`,
      method: 'POST',
      headers: defaultHeaders,
      auth: {
        username: clientIdSecret.client_id,
        password: clientIdSecret.client_secret
      },
      data: {"grant_type":"client_credentials"}
    }).then(responseToken => {
        refreshTokenInLS(responseToken.data.access_token, () => {
          resolve(responseToken.data.access_token);
        });
      },
      error => {
        console.log('ERROR REFRESH TOKEN ', error);
        logoutFromAppTokenError();
        reject();
      });

  });
};
