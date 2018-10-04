import * as _t from '../actions/types.js';

// import { mockUserLogined } from '../mock-data/mock-user';

const currentUser = (state = {}, action) => {

  switch (action.type) {

    case _t.GET_CURRENT_USER: {
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

export default currentUser;
