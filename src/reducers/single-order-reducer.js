import * as _t from '../actions/types.js';

const singleOrder = (state = {}, action) => {

  switch (action.type) {

    case _t.GET_SINGLE_ORDER: {
      return {...action.payload};
    }

    default: {
      return state;
    }
  }
};

export default singleOrder;
