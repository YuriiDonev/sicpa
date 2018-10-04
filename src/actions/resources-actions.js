
import * as _t from './types';
import {
  getResourcesSortedByTypeEnd,
  getResourcesNotSortedEnd,
  getResourceDetailsEnd,
  updateResourceEnd,
  deleteResourceEnd,
  deleteResourceImgEnd,
  deleteImgFromResourceEnd,
  editResourceImgDescriptionEnd,
} from '../service/endPoint.js';

export const editResourceImgDescription = (img_descr) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const imgDescr = await editResourceImgDescriptionEnd(img_descr);
    if (imgDescr) {
      const { resource_id } = img_descr;
      const resourceDetailed = await getResourceDetailsEnd(resource_id);
      dispatch({
        type: _t.GET_RESOURCE_DETAILED,
        payload: resourceDetailed,
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


export const deleteResource = (resource_id)  => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const deletedResource = await deleteResourceEnd(resource_id);
    if (deletedResource) {
      dispatch({
        type: _t.LOADING_DATA,
        payload: true,
      });
      const project_id = getState().currentProject.id;
      const sortType = getState().resources.sorted;
      if (sortType) {
        const resourcesSorted = await getResourcesSortedByTypeEnd(project_id);
        dispatch({
          type: _t.GET_RESOURCES_SORTED_BY_TYPE,
          payload: resourcesSorted,
        });
        dispatch({
          type: _t.LOADING_DATA,
          payload: false,
        });
      } else {
        const resourcesNotSorted = await getResourcesNotSortedEnd(project_id);
        dispatch({
          type: _t.GET_RESOURCES_NOT_SORTED,
          payload: resourcesNotSorted,
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
    }
  } catch (e) {
    console.error(e);
  }
};

export const deleteResourceImg = (img) => async (dispatch, getState) => {
  try {
    const deletedImg = await deleteResourceImgEnd(img);
    console.log('ACTION deleteResourceImg ', deletedImg);
  } catch (e) {
    console.error(e);
  }
};

export const createNewResource = (resource_data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const newResource = await updateResourceEnd(resource_data);
    if (newResource) {
      const project_id = getState().currentProject.id;

      const resourcesNotSorted = await getResourcesNotSortedEnd(project_id);
      dispatch({
        type: _t.GET_RESOURCES_NOT_SORTED,
        payload: resourcesNotSorted,
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

export const updateResource = (resource_data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const updatedResource = await updateResourceEnd(resource_data);
    // console.log('ACTION updatedResource ', updatedResource);
    dispatch({
      type: _t.GET_RESOURCE_DETAILED,
      payload: updatedResource,
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


export const getResourcesSortedByType = (project_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const resourcesSorted = await getResourcesSortedByTypeEnd(project_id);
    dispatch({
    	type: _t.GET_RESOURCES_SORTED_BY_TYPE,
    	payload: resourcesSorted,
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

export const getResourcesNotSorted = (project_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
		const resourcesNotSorted = await getResourcesNotSortedEnd(project_id);
		dispatch({
			type: _t.GET_RESOURCES_NOT_SORTED,
			payload: resourcesNotSorted,
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

export const getResourceDetails = (resource_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
		const resourceDetailed = await getResourceDetailsEnd(resource_id);
		dispatch({
			type: _t.GET_RESOURCE_DETAILED,
			payload: resourceDetailed,
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

export const deleteImgFromResource = (img) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const deletedImg = await deleteImgFromResourceEnd(img);
    if (deletedImg) {
      const { resource_id } = img;
      const resourceDetailed = await getResourceDetailsEnd(resource_id);
      dispatch({
        type: _t.GET_RESOURCE_DETAILED,
        payload: resourceDetailed,
      });
      dispatch({
        type: _t.LOADING_DATA,
        payload: false,
      });
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};
