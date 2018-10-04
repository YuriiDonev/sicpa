import * as _t from '../actions/types.js';


const currentProject = (state = {}, action) => {
  switch (action.type) {

    case _t.SET_CURRENT_PROJECT:
      return action.payload;

    default: {
      return state;
    }
  }
};

export default currentProject;
