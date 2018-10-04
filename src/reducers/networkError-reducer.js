
import * as _t from '../actions/types.js';

const defaultState = {
  createUserNetworkError: false,
  loginNetworkError: false,
  createBookingError: false,
  changePasswordError: false,
  resetPasswordError: false,
  userNetworkError: '',
};

const networkError = (state = defaultState, action) => {

  switch (action.type) {
    case _t.CREATE_USER_NETWORK_ERROR: {
      return {
        ...state,
        createUserNetworkError: true,
      };
    }

    case _t.LOGIN_NETWORK_ERROR: {
      return {
        ...state,
        loginNetworkError: action.payload,
      };
    }

    case _t.CREATE_BOOKING_NETWORK_ERROR: {
      return {
        ...state,
        createBookingError: action.payload,
      };
    }

    case _t.CHANGE_PASSWORD_NETWORK_ERROR: {
      return {
        ...state,
        changePasswordError: action.payload,
      };
    }

    case _t.RESET_PASSWORD_NETWORK_ERROR: {
      return {
        ...state,
        resetPasswordError: action.payload,
      };
    }

    case _t.USER_NETWORK_ERROR: {
      return {
        ...state,
        userNetworkError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default networkError;
