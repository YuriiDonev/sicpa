
import * as _t from '../actions/types.js';

const createUserSuccess = (state = false, action) => {

  switch (action.type) {
    case _t.CREATE_USER_SUCCESS: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default createUserSuccess;
