
import * as _t from './types.js';
import { orders } from '../mock-data/orders.js';
import { single_order } from '../mock-data/single-order.js';

export const getOrders = () => async (dispatch, getState) => {
  try {

    setTimeout(() => {
      dispatch({
        type: _t.GET_ORDERS,
        payload: orders,
      });
    }, 500);

  } catch (e) {
    console.error(e);
  }
};

export const getSingleOrder = (orderId) => async (dispatch, getState) => {
  try {
    setTimeout(() => {
      dispatch({
        type: _t.GET_SINGLE_ORDER,
        payload: single_order,
      });
    }, 500);
  } catch (e) {
    console.error(e);
  }
};
