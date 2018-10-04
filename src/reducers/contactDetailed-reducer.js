import * as _t from '../actions/types';

const contactDetailed = (state = {}, action) => {
  switch (action.type) {

    case _t.GET_CONTACT_DETAILED: {
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

export default contactDetailed;
