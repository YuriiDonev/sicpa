import * as _t from './types.js';
import { getUsersListByProjectEnd,
  // getUsersListByProjectRevisionEnd, getUserEnd, updateUserStatusEnd,
  getUserInfoEnd,
  inviteUserInProjectEnd, updateUserProfileEnd, deleteUserFromProjectEnd, updateExistUserStatusEnd,
  resendInvitationEnd, changeUserPasswordEnd, resetPasswordEnd, getEmailNotificationsSettingsEnd,
	setEmailNotificationsSettingsEnd
} from '../service/endPoint.js';

export const getEmailNotificationsSettings = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: _t.LOADING_DATA,
			payload: true,
		});
		const emailNotificationsSettings = await getEmailNotificationsSettingsEnd();
		dispatch({
			type: _t.EMAIL_NOTIFICATIONS_SETTINGS,
			payload: emailNotificationsSettings,
		});
		dispatch({
			type: _t.LOADING_DATA,
			payload: false,
		});
	} catch(e) {
		console.error(e);
		dispatch({
			type: _t.LOADING_DATA,
			payload: false,
		});
	}
};

export const setEmailNotificationsSettings = (settings) => async (dispatch, getState) => {
	try {
		dispatch({
			type: _t.LOADING_DATA,
			payload: true,
		});
		const emailNotificationsSettings = await setEmailNotificationsSettingsEnd(settings);
		dispatch({
			type: _t.EMAIL_NOTIFICATIONS_SETTINGS,
			payload: emailNotificationsSettings,
		});
		dispatch({
			type: _t.LOADING_DATA,
			payload: false,
		});
	} catch(e) {
		console.error(e);
		dispatch({
			type: _t.LOADING_DATA,
			payload: false,
		});
	}
};

export const removeNetworkError = () => ({
  type: _t.USER_NETWORK_ERROR,
  payload: '',
});

export const resetPassword = (email, cb) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.RESET_PASSWORD_NETWORK_ERROR,
      payload: false,
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const resetedPassword = await resetPasswordEnd(email);
    if (resetedPassword) cb();
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch(e) {
    console.error(e);
    dispatch({
      type: _t.RESET_PASSWORD_NETWORK_ERROR,
      payload: true,
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};

export const changeUserPassword = (passwords, cb) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    dispatch({
      type: _t.CHANGE_PASSWORD_NETWORK_ERROR,
      payload: false,
    });
    const changedPassword = await changeUserPasswordEnd(passwords);
    if (changedPassword) {
      dispatch({
        type: _t.LOADING_DATA,
        payload: false,
      });
      cb();
    }
  } catch(e) {
    console.error(e);
    dispatch({
      type: _t.CHANGE_PASSWORD_NETWORK_ERROR,
      payload: true,
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};

export const clearChangePasswordError = () => ({
  type: _t.CHANGE_PASSWORD_NETWORK_ERROR,
  payload: false,
});

export const resendInvitation = (project_id, email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    dispatch({
      type: _t.INVITATION_SENT,
      payload: email,
    });
    const resendedInvitation = await resendInvitationEnd(project_id, email);
    if (resendedInvitation) {
      const usersList = await getUsersListByProjectEnd(project_id);
      dispatch({
        type: _t.GET_USERS_LIST_BY_PROJECT,
        payload: usersList,
      });
      dispatch({
        type: _t.LOADING_DATA,
        payload: false,
      });
      dispatch({
        type: _t.INVITATION_SENT,
        payload: '',
      });
    }
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch(e) {
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const userUpdated = await updateUserProfileEnd(user);
    dispatch({
      type: _t.GET_USER_INFO,
      payload: userUpdated,
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch(e) {
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};

export const updateExistUserStatus = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const updatedUser = await updateExistUserStatusEnd(user);
    if (updatedUser) {
      const { project_id } = user;
      const usersList = await getUsersListByProjectEnd(project_id);
      dispatch({
        type: _t.GET_USERS_LIST_BY_PROJECT,
        payload: usersList,
      });
      dispatch({
        type: _t.LOADING_DATA,
        payload: false,
      });
    }
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch(e) {
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
    dispatch({
      type: _t.USER_NETWORK_ERROR,
      payload: e.response.data.error,
    });
    console.error(e);
  }
};

export const deleteUserFromProject = (user_project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const deletedUser = await deleteUserFromProjectEnd(user_project);
    if (deletedUser) {
      const { project_id } = user_project;
      const usersList = await getUsersListByProjectEnd(project_id);
      dispatch({
        type: _t.GET_USERS_LIST_BY_PROJECT,
        payload: usersList,
      });
      dispatch({
        type: _t.LOADING_DATA,
        payload: false,
      });
    }
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch(e) {
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
    dispatch({
      type: _t.USER_NETWORK_ERROR,
      payload: e.response.data.error,
    });
    console.error(e);
  }
};


export const inviteUserInProject = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const inviteSent = await inviteUserInProjectEnd(user);
    if (inviteSent) {
      const { project_id } = user;
      const usersList = await getUsersListByProjectEnd(project_id);
      dispatch({
        type: _t.GET_USERS_LIST_BY_PROJECT,
        payload: usersList,
      });
      dispatch({
        type: _t.LOADING_DATA,
        payload: false,
      });
    }
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch(e) {
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
    dispatch({
      type: _t.USER_NETWORK_ERROR,
      payload: e.response.data.error,
    });
    console.error(e);
  }
};

export const getUserInfo = (user_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const userInfo = await getUserInfoEnd(user_id);
    dispatch({
      type: _t.GET_USER_INFO,
      payload: userInfo,
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch(e) {
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};

export const getUsersListByProject = (project_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const usersList = await getUsersListByProjectEnd(project_id);
    dispatch({
      type: _t.GET_USERS_LIST_BY_PROJECT,
      payload: usersList,
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};
