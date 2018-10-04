import * as _t from './types.js';

export const showLoadingIndicator = () => {
  return {
    type: _t.LOADING_DATA,
    payload: true,
  }
};
