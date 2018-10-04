
// import * as _t from '../actions/types.js';

const scrollTop = (state = false, action) => {

  switch (action.type) {
    case 'SCROLL_TO_TOP': {
      return action.payload;
    }

    case 'NOT_SCROLL_TO_TOP': {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default scrollTop;
