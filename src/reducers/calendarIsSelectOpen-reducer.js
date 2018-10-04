
import * as _t from '../actions/types.js';

const _isSelectOpen = (state = false, action) => {

  switch (action.type) {

    case _t.SELECT_OPEN: {
      const newState = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default _isSelectOpen;
