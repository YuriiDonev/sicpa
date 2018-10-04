
import * as _t from '../actions/types.js';

const _isLogin = (state = false, action) => {

  switch (action.type) {
    case _t.IS_LOGIN: {
      const newState = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default _isLogin;
