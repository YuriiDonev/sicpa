
import * as _t from '../actions/types.js';

const successBooking = (state = false, action) => {

  switch (action.type) {
    case _t.SUCCESS_BOOKING: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default successBooking;
