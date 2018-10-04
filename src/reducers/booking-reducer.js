import * as _t from '../actions/types.js';

const booking = (state = {}, action) => {

  switch (action.type) {

    case _t.GET_BOOKING_BY_ID:
      return  action.payload;

    default: {
      return state;
    }
  }
};

export default booking;
