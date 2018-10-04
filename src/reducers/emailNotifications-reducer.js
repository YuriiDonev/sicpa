
import * as _t from '../actions/types.js';

const defaultSettings = {
	email_notifications: {
		active: false,
		only_own_resource: false
	}
};

const emailNotificationsSettings = (state = defaultSettings, action) => {

  switch (action.type) {

    case _t.EMAIL_NOTIFICATIONS_SETTINGS: {
      return {
				email_notifications: {...action.payload.email_notifications}
	    }
		}

    default: {
      return state;
    }
  }
};

export default emailNotificationsSettings;
