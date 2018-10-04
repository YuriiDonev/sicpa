import * as _t from '../actions/types.js';

const projectContacts = (state = [], action) => {

  switch (action.type) {

    case _t.GET_PROJECT_CONTACTS_BY_ID: {
      const newState = action.payload.slice();
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default projectContacts;
