import * as _t from '../actions/types.js';

const projectInfo = (state = {}, action) => {

  switch (action.type) {

    case _t.GET_PROJECT_INFO_BY_ID: {
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

export default projectInfo;
