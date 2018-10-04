import _ from 'lodash';
import * as _t from './types.js';

import {
  getProjectsEnd,
  // createNewProjectEnd,
  getUsersForProjectEnd,
  getProjectInfoByIdEnd,
  deleteImgFromProjectEnd,
  updateProjectInfoEnd,
  editProjectImgDescriptionEnd,
 } from '../service/endPoint.js';


export const editProjectImgDescription = (img_descr) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const imgDescr = await editProjectImgDescriptionEnd(img_descr);
    if (imgDescr) {
      const { project_id } = img_descr;
      const projectInfo = await getProjectInfoByIdEnd(project_id);
      dispatch({
        type: _t.GET_PROJECT_INFO_BY_ID,
        payload: projectInfo
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


export const updateProjectInfo = (projectInfoData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const newProjectInfo = await updateProjectInfoEnd(projectInfoData);
    console.log('ACTION newProjectInfo ', newProjectInfo);
    if (newProjectInfo) {
      dispatch({
        type: _t.GET_PROJECT_INFO_BY_ID,
        payload: newProjectInfo
      });
      const projects = await getProjectsEnd();

      if (_.isEmpty(projects)) {
        dispatch({
          type: _t.GET_PROJECTS_LIST,
          payload: projects,
        });
        dispatch({
          type: _t.SET_CURRENT_PROJECT,
          payload: {},
        });
      } else {
        dispatch({
          type: _t.GET_PROJECTS_LIST,
          payload: projects,
        });
        const project_idLS = localStorage.getItem('current-project');
        if (project_idLS && !_.isEmpty(projects)) {
          const currentProject = _.find(projects, (proj) => proj.id === project_idLS );
          if (currentProject) {
            dispatch({
              type: _t.SET_CURRENT_PROJECT,
              payload: currentProject,
            });
          } else {
            dispatch({
              type: _t.SET_CURRENT_PROJECT,
              payload: projects[0],
            });
          }
        } else {
          dispatch({
            type: _t.SET_CURRENT_PROJECT,
            payload: projects[0],
          });
        }
      }
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

export const getProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const projects = await getProjectsEnd();
    dispatch({
      type: _t.GET_PROJECTS_LIST,
			payload: projects,
    });

    if (_.isEmpty(projects)) {
      dispatch({
        type: _t.SET_CURRENT_PROJECT,
        payload: {},
      });
    } else {
      const project_idLS = localStorage.getItem('current-project');
      if (project_idLS && !_.isEmpty(projects)) {
        const currentProject = _.find(projects, (proj) => proj.id === project_idLS );
        if (currentProject) {
          dispatch({
            type: _t.SET_CURRENT_PROJECT,
            payload: currentProject,
          });
        } else {
          dispatch({
            type: _t.SET_CURRENT_PROJECT,
            payload: projects[0],
          });
        }
      } else {
        dispatch({
          type: _t.SET_CURRENT_PROJECT,
          payload: projects[0],
        });
      }
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

export const getProjectInfoById = (project_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const projectInfo = await getProjectInfoByIdEnd(project_id);
    dispatch({
      type: _t.GET_PROJECT_INFO_BY_ID,
      payload: projectInfo
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


export const setProject = (project) => ({
  type: 'SET_CURRENT_PROJECT',
  payload: project,
});

// export const getProjectById = (projectId) => async (dispatch, getState) => {
//   console.log('getProjectById ', projectId);
//   try {
//     if (projectId === '1') {
//       dispatch({
//         type: 'GET_PROJECT_BY_ID',
//         payload: mockSingleProject1,
//       });
//     } else if (projectId === '2') {
//       dispatch({
//         type: 'GET_PROJECT_BY_ID',
//         payload: mockSingleProject2,
//       });
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };

export const getUsersForProject = (project_id) => async (dispatch, getState) => {
  console.log('ACTION getUsersForProject');
  try {
    const users = await getUsersForProjectEnd(project_id);
    console.log('ACTION getUsersForProject ', users);
  } catch (e) {
    console.error(e);
  }
};

// export const createNewProject = (newProject) => async (dispatch, getState) => {
// 	createNewProjectEnd(newProject).then(result => {
// 		console.log('createNewProject result ', result);
// 		dispatch({
// 			type: 'GET_PROJECTS_LIST',
// 			payload: result,
// 		});
// 	}, error => {
// 		console.error(error);
// 	});
// };

export const deleteImgFromProject = (img) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const deletedImg = await deleteImgFromProjectEnd(img);
    if (deletedImg) {
      const project_id = getState().currentProject.id;
      const projectInfo = await getProjectInfoByIdEnd(project_id);
      dispatch({
        type: _t.GET_PROJECT_INFO_BY_ID,
        payload: projectInfo
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
