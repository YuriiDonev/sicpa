
import * as _t from '../actions/types.js';

const calendarSchedules = (state = [], action) => {

  switch (action.type) {

    case _t.GET_CALENDAR_SCHEDULES: {
      const newState = action.payload.slice();
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default calendarSchedules;
