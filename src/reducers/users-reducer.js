import * as _t from '../actions/types.js';

const users = (state = {}, action) => {

  switch (action.type) {

    case _t.GET_USERS_LIST_BY_PROJECT: {
      // const newState = action.payload.users.slice();
      const newState = {...action.payload};
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default users;
