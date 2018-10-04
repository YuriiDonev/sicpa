
import * as _t from './types.js';

// import { sortedByDateShedules, sortedByResourceShedules } from '../mock-data/mock-schedules.js';

import { getSchedulesEnd, getSchedulesForCalendarEnd, getSchedulesForUserEnd } from '../service/endPoint.js';

export const getSchedulesForCalendar = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const schedule = await getSchedulesForCalendarEnd(query);
    dispatch({
      type: _t.GET_CALENDAR_SCHEDULES,
      payload: schedule,
    });
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  } catch (e) {
    console.error(e);
  }
};

export const getShedules = (project_id, type, user_id) => async (dispatch, getState) => {
  try {
    // console.log('ACTION ', project_id);
    // console.log('ACTION ', type);
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const schedules = await getSchedulesEnd(project_id, type, user_id);
    dispatch({
      type: _t.GET_SCHEDULES,
      payload: schedules
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

export const getShedulesForUser = (project_id, type, onlyMy) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const schedules = await getSchedulesForUserEnd(project_id, type, onlyMy);
    dispatch({
      type: _t.GET_SCHEDULES,
      payload: schedules
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
