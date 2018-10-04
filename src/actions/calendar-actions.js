import * as _t from './types.js';
// import {  } from '../service/endPoint.js';

// import { mockUsersForProject, mockUserInfo } from '../mock-data/mock-user.js';


export const openSelect = (isOpen) => async (dispatch, getState) => {
  if (isOpen) {
    dispatch({
      type: _t.SELECT_OPEN,
      payload: true,
    });
  } else {
    setTimeout(() => {
      dispatch({
        type: _t.SELECT_OPEN,
        payload: false,
      });
    }, 100);
  }
};
