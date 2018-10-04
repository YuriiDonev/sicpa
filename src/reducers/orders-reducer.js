
import * as _t from '../actions/types.js';

const orders = (state = [], action) => {

  switch (action.type) {

    case _t.GET_ORDERS: {
      return [...action.payload];
    }

    default: {
      return state;
    }
  }
};

export default orders;
