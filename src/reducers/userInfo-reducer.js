import * as _t from '../actions/types.js';

const userInfo = (state = {}, action) => {

  switch (action.type) {

    case _t.GET_USER_INFO: {
      const newState = {};
      for (let key in action.payload) {
        newState[key] = action.payload[key];
      }
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default userInfo;
