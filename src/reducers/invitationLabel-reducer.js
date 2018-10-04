
// import * as _t from '../actions/types.js';

const isInvitationSent = (state = '', action) => {

  switch (action.type) {

    case 'INVITATION_SENT': {
      const newState = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default isInvitationSent;
