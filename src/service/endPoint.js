import axios from 'axios';
import { getToken } from './token';
import { refreshToken } from './index.js';

import { HOST_NAME } from '../mock-data/host-name.js';

// const defaultHeaders = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

// {'Content-Type': 'multipart/form-data', Accept: 'application/json',}
// function _request(url, body, method = 'GET', headers = defaultHeaders) {


function _request(url, body, method = 'GET', headersPublic, json) {
  return new Promise((resolve, reject) => {

    const tokenFromLS = getToken();
    const pathUrl = `${HOST_NAME}${url}`;

    let headers;
    if (method === 'POST') {
      if (headersPublic) {
        headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Pragma': 'no-cache'
        };
      } else {
        if (json) {
          headers = {
            Authorization: 'Bearer ' + tokenFromLS.token,
            Accept: ['application/json', 'multipart/form-data'],
            'Content-Type': 'application/json',
            'Pragma': 'no-cache'
          };
        } else {
          headers = {
            Authorization: 'Bearer ' + tokenFromLS.token,
            Accept: ['application/json', 'multipart/form-data'],
            'Content-Type': 'multipart/form-data',
            'Pragma': 'no-cache'
          };
        }
      }
    } else {
      headers = {
        Authorization: 'Bearer ' + tokenFromLS.token,
        Accept: ['application/json', 'multipart/form-data'],
        'Content-Type': 'application/json',
        'Pragma': 'no-cache'
      };
    }

    axios({
      url: pathUrl,
      method,
      data: body,
      headers
    }).then(response => {
        resolve(response.data);
      }, error => {
        if (error.response.status === 401) {
          console.error('!!! TOKEN ERROR ', error);
          refreshToken().then(result => {
            headers.Authorization = 'Bearer ' + result;
            axios({
              url: pathUrl,
              method,
              data: body,
              headers
            }).then(response => {
                resolve(response.data);
              }, error => {
                reject(error);
              });
          }, error => {
            console.error('ERROR IN REFRESH ', error);
          });
        }
        reject(error);

      }).catch(error => {
      if (error && error.response && error.response.status && error.response.status === 401) {
        console.error('TOKEN ERROR catch ', error);

        refreshToken().then(result => {
          headers.Authorization = 'Bearer ' + result;
          axios({
            url: pathUrl,
            method,
            data: body,
            headers
          }).then(response => {
              resolve(response.data);
            }, error => {
              reject(error);
            });
        }, error => {
          console.error('ERROR IN REFRESH CATCH ', error);
        });

      }
      reject(error);
    });
  });
};


// USERS
export const createNewUserEnd = (user) => (
  _request(`/api/create_account`, user, 'POST', true)
);

export const updateUserProfileEnd = (user) => (
  _request('/api/edit_account', user, 'POST')
);

export const loginEnd = (email, password) => (
  _request('/api/login', { email, password }, 'POST', true)
);

export const logoutFromAppEnd = () => (
  _request('/api/logout')
);

export const getUsersListByProjectEnd = (project_id) => (
  _request(`/api/admin/project/users?project_id=${project_id}`)
);

export const getUserInfoEnd = (user_id) => (
  _request(`/api/user/${user_id}`)
);

export const getUsersListByProjectRevisionEnd = (project_id) => (
  _request(`/api/admin/project/users?project_id=${project_id}&revision=true`)
);

export const resendInvitationEnd = (project_id, email) => (
  _request(`/api/admin/resend?project_id=${project_id}&email=${email}`)
);

// export const updateUserStatusEnd = (user_info) => (
//   _request(`/api/admin/project/user`,  user_info, 'POST')
// );

export const getUserEnd = (user_id) => (
  _request(`/api/user/${user_id}`)
);

export const getUsersForProjectEnd = (project_id) => (
  _request(`/api/admin/project/users?project_id=${project_id}`)
);

export const inviteUserInProjectEnd = (user) => (
  _request('/api/admin/project/user', user, 'POST', null, true)
);

export const deleteUserFromProjectEnd = (user_project) => (
  _request('/api/admin/project/user', user_project, 'DELETE')
);

export const updateExistUserStatusEnd = (user) => (
  _request('/api/admin/project/user', user, 'POST', null, true)
);

export const changeUserPasswordEnd = (passwords) => (
  _request('/api/change_password', passwords, 'POST', null, true)
);

export const resetPasswordEnd = (email) => (
  _request('/api/forgot', email, 'POST', true)
);

export const getEmailNotificationsSettingsEnd = () => (
  _request('/api/admin/settings')
);

export const setEmailNotificationsSettingsEnd = (settings) => (
	_request('/api/admin/settings', settings, 'POST', null, true)
);

//PROJECTS
export const getProjectInfoByIdEnd = (project_id) => (
  _request(`/api/project?project_id=${project_id}`)
);

export const getProjectsEnd = () => (
  _request(`/api/user/projects`)
);

export const createNewProjectEnd = (newProject) => (
	_request('/api/admin/project',  newProject, 'POST')
);

export const deleteImgFromProjectEnd = (img) => (
  _request('/api/admin/project_img',  img, 'DELETE')
);

export const updateProjectInfoEnd = (projectInfoData) => (
  _request('/api/admin/project', projectInfoData, 'POST')
);

export const editProjectImgDescriptionEnd = (img_descr) => (
  _request('/api/admin/project_img/description_edit', img_descr, 'POST', null, true)
);

// CONTACTS
export const getContactsForProjectWithoutAdminEnd = (project_id) => (
  _request(`/api/project/contacts?project_id=${project_id}`)
);

export const getContactsForProjectEnd = (project_id) => (
  _request(`/api/project/contacts?project_id=${project_id}&admin=true`)
);

export const getContactDetailsEnd = (contact_id) => (
  _request(`/api/view/contact?contact_id=${contact_id}`)
);

export const createNewContactEnd = (contact) => (
  _request('/api/admin/contact', contact, 'POST')
);

export const deleteProjectContactEnd = (contact_id) => (
  _request('/api/admin/contact', contact_id, 'DELETE')
);

//BOOKINGS

export const cancelBookingEnd = (booking_id) => (
  _request('/api/cancel/booking', booking_id, 'POST', null, true)
);

export const approveBookingEnd = (booking) => (
  _request('/api/admin/requests/change_status', booking, 'POST', null, true)
);

export const sendBookingRequestEnd = (booking) => (
  _request('/api/project/booking', booking, 'POST', null, true)
);

export const getBookingByProjectStatusEnd = (project_id, status) => (
  _request(`/api/view/schedule?project_id=${project_id}&status=${status}`)
);

export const getBookingByProjectEnd = (project_id) => (
  _request(`/api/view/schedule?project_id=${project_id}`)
);

export const getBookingByIdEnd = (booking_id) => (
  _request(`/api/view/booking?booking_id=${booking_id}`)
);

//RESOURCES
export const getResourcesSortedByTypeEnd = (project_id) => (
  _request(`/api/project/items?project_id=${project_id}&sorted_by=type`)
);

export const getResourcesNotSortedEnd = (project_id) => (
  _request(`/api/project/items?project_id=${project_id}`)
);

export const getResourceDetailsEnd = (resource_id) => (
  _request(`/api/view/resource?resource_id=${resource_id}`)
);

export const updateResourceEnd = (resource_data) => (
  _request('/api/admin/resource', resource_data, 'POST')
);

export const deleteResourceEnd = (resource_id) => (
  _request('/api/admin/resource',  resource_id, 'DELETE')
);

export const deleteResourceImgEnd = (resource_img) => (
  _request('/api/admin/resource_img',  resource_img, 'DELETE')
);

export const deleteImgFromResourceEnd = (img) => (
  _request('/api/admin/resource_img',  img, 'DELETE')
);

export const editResourceImgDescriptionEnd = (img_descr) => (
  _request('/api/admin/resource_img/description_edit', img_descr, 'POST', null, true)
);

// SCHEDULES
export const getSchedulesForCalendarEnd = (query) => (
  _request(query)
);

export const getSchedulesEnd = (project_id, type) => (
  _request(`/api/my_schedule?project_id=${project_id}&sorted_by=${type}`)
);

// export const getSchedulesEnd = (project_id, type, user_id) => (
//   _request(`/api/my_schedule?project_id=${project_id}&sorted_by=${type}&user_id=${user_id}`)
// );

export const getSchedulesForUserEnd = (project_id, type, onlyMy) => (
  _request(`/api/admin/requests?project_id=${project_id}&filter=${onlyMy}&sorted_by=${type}`)
);
