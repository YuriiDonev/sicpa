import * as _t from '../actions/types';

// const defaultState = {
//   id: '0',
//   images: [],
//   schedule: {
//     monday: {
//       active: false,
//       start_time: '',
//       end_time: '',
//       full_day: false,
//     },
//     tuesday: {
//       active: false,
//       start_time: '',
//       end_time: '',
//       full_day: false,
//     },
//     wednesday: {
//       active: false,
//       start_time: '',
//       end_time: '',
//       full_day: false,
//     },
//     thursday: {
//       active: false,
//       start_time: '',
//       end_time: '',
//       full_day: false,
//     },
//     friday: {
//       active: false,
//       start_time: '',
//       end_time: '',
//       full_day: false,
//     },
//     saturday: {
//       active: false,
//       start_time: '',
//       end_time: '',
//       full_day: false,
//     },
//     sunday: {
//       active: false,
//       start_time: '',
//       end_time: '',
//       full_day: false,
//     }
//   }
// };

const resourceDetailed = (state = {}, action) => {
  switch (action.type) {

    case _t.GET_RESOURCE_DETAILED: {
      const newState = {};
      for (let key in action.payload) {
        newState[key] = action.payload[key];
      }
      return newState;
    }

    // case _t.CLEAR_CURRENT_RESOURCE:
    //   return defaultState;

    default: {
      return state;
    }
  }
};

export default resourceDetailed;
