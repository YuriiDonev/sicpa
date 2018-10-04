import * as _t from './types.js';
import { createNewUserEnd, getUserInfoEnd, logoutFromAppEnd } from '../service/endPoint.js';
import { removeToken } from '../service/token.js';

export const createNewUser = (user) => async (dispatch, getState) => {
  try {
    const newUser = await createNewUserEnd(user);
    // console.log('ACTION newUser ', newUser);
    if (newUser) {
      dispatch({
        type: _t.CREATE_USER_SUCCESS,
        payload: true,
      });
      dispatch({
        type: _t.CREATE_USER_NETWORK_ERROR,
        payload: false,
      });
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: _t.CREATE_USER_NETWORK_ERROR,
      payload: true,
    });
  }
};

export const closeSuccess = () => ({
  type: _t.CREATE_USER_SUCCESS,
  payload: false,
});

export const loginToApp = (isLogin, userId, error) => async (dispatch, getState) => {
  try {
    if (isLogin) {
      dispatch({
        type: _t.IS_LOGIN,
        payload: true,
      });
      dispatch({
        type: _t.LOGIN_NETWORK_ERROR,
        payload: false,
      });
      const userInfo = await getUserInfoEnd(userId);
      if (userInfo) {
        dispatch({
          type: _t.GET_USER_INFO,
          payload: userInfo,
        });
      }
    } else {
      dispatch({
        type: _t.IS_LOGIN,
        payload: false,
      });
      if (error) {
        dispatch({
          type: _t.LOGIN_NETWORK_ERROR,
          payload: true,
        });
        dispatch({
          type: _t.LOADING_DATA,
          payload: false,
        });
      }
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};

export const logoutFromApp = () => async (dispatch, getState) => {
  try {
      dispatch({
        type: _t.LOADING_DATA,
        payload: true,
      });
      dispatch({
        type: _t.IS_LOGIN,
        payload: false,
      });
      dispatch({
        type: _t.GET_USER_INFO,
        payload: {}
      });
      dispatch({
        type: _t.GET_PROJECTS_LIST,
        payload: []
      });
      dispatch({
        type: _t.SET_CURRENT_PROJECT,
        payload: {}
      });
      dispatch({
        type: _t.GET_SCHEDULES,
        payload: []
      });
      dispatch({
        type: _t.GET_PROJECT_CONTACTS_BY_ID,
        payload: []
      });
      const logout = await logoutFromAppEnd();
      if (logout) {
        removeToken();
        dispatch({
          type: _t.LOADING_DATA,
          payload: false,
        });
      } else {
        dispatch({
          type: _t.LOADING_DATA,
          payload: false,
        });
      }
  } catch (e) {
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};
