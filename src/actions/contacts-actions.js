import _ from 'lodash';
import * as _t from './types.js';

import {
  getContactsForProjectEnd,
  getContactsForProjectWithoutAdminEnd,
  getContactDetailsEnd,
  createNewContactEnd,
  deleteProjectContactEnd,
 } from '../service/endPoint.js';

export const createNewContact = (contact) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const newContact = await createNewContactEnd(contact);
    console.log('ACTION newContact ', newContact);
    if (newContact) {
      const contacts = getState().projectContacts;
      // const project_id = getState().currentProject.id;
      // const contacts = await getContactsForProjectEnd(project_id);
      dispatch({
        type: _t.GET_PROJECT_CONTACTS_BY_ID,
        payload: [...contacts, newContact]
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
  } catch (e) {
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};

export const updateContact = (contact) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const updatedContact = await createNewContactEnd(contact);
    dispatch({
      type: _t.GET_CONTACT_DETAILED,
      payload: updatedContact,
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

export const deleteProjectContact = (contact_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const deletedContact = await deleteProjectContactEnd(contact_id);

    // console.log('ACTION contact_id ', contact_id);
    // console.log('ACTION contact_id.contact_id ', contact_id.contact_id);
    // console.log('ACTION deletedContact ', deletedContact);

    if (deletedContact) {
      const contacts = getState().projectContacts;
      const newContacts = _.filter(contacts, (contact) => contact.id !== contact_id.contact_id);
      dispatch({
        type: _t.GET_PROJECT_CONTACTS_BY_ID,
        payload: newContacts
      });
    }
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch (e) {
    alert('Sorry, server error occured');
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};

export const getContactsForProject = (project_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const contacts = await getContactsForProjectEnd(project_id);
    dispatch({
      type: _t.GET_PROJECT_CONTACTS_BY_ID,
      payload: contacts
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch (e) {
    console.error(e);
  }
};

export const getContactsForProjectWithoutAdmin = (project_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const contacts = await getContactsForProjectWithoutAdminEnd(project_id);
    dispatch({
      type: _t.GET_PROJECT_CONTACTS_BY_ID,
      payload: contacts
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch (e) {
    console.error(e);
  }
};


export const getContactDetails = (contact_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const contact = await getContactDetailsEnd(contact_id);
    dispatch({
      type: _t.GET_CONTACT_DETAILED,
      payload: contact,
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch (e) {
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
    console.error(e);
  }
};
