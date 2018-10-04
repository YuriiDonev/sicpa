import * as _t from '../actions/types.js';

const resources = (state = {}, action) => {

  switch (action.type) {

    case _t.GET_RESOURCES_SORTED_BY_TYPE: {
      return {
        sorted: true,
        resources: action.payload
      }
    }

    case _t.GET_RESOURCES_NOT_SORTED: {
      return {
        sorted: false,
        resources: action.payload
      }
    }

    default: {
      return state;
    }
  }
};

export default resources;
