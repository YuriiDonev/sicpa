import * as _t from '../actions/types.js';

// const initialState = {
//   currentType: 'date',
//   schedules: [],
// };

const schedules = (state = [], action) => {

  switch (action.type) {

    case _t.GET_SCHEDULES:
      return action.payload;

    default: {
      return state;
    }
  }
};

export default schedules;
