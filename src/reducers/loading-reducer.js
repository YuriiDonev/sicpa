
import * as _t from '../actions/types.js';

const _isLoading = (state = false, action) => {

  switch (action.type) {

    // case _t.IS_LOGIN: {
    //   return false;
    // }

    case _t.LOADING_DATA: {
      const newState = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default _isLoading;
