import * as _t from '../actions/types.js';

const projects = (state = [], action) => {

  switch (action.type) {

    case _t.GET_PROJECTS_LIST:
      return [...action.payload];


    default: {
      return state;
    }
  }
};

export default projects;
