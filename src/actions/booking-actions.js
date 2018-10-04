import * as _t from './types.js';
import { getBookingByProjectStatusEnd,
  getBookingByProjectEnd,
  getBookingByIdEnd,
  sendBookingRequestEnd,
  approveBookingEnd,
  cancelBookingEnd,
} from '../service/endPoint.js';


export const cancelBooking = (booking_id, cbIsCancelled) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const canceledBooking = await cancelBookingEnd(booking_id);
    if (cbIsCancelled && canceledBooking) cbIsCancelled();
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

export const approveBooking  = (booking, cbIsApproved) => async (dispatch, getState) => {
  try {
    // console.log('ACTION approveBooking ', booking);
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const approvedBooking = await approveBookingEnd(booking);
    if (approvedBooking && cbIsApproved) cbIsApproved();
    // console.log('ACTION approvedBooking ', approvedBooking);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
    // dispatch({
    //   type: 'BOOKING_APPROVED',
    //   payload: true,
    // });
  } catch (e) {
    console.error(e);
    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
  }
};

export const declineBooking  = (booking, cbIsDeclined) => async (dispatch, getState) => {
  try {
    dispatch({
      type: _t.LOADING_DATA,
      payload: true,
    });
    const declinedBooking = await approveBookingEnd(booking);
    // console.log('ACTION declinedBooking ', declinedBooking);
    if (declinedBooking && cbIsDeclined) cbIsDeclined();

    dispatch({
      type: _t.LOADING_DATA,
      payload: false,
    });
    // dispatch({
    //   type: 'BOOKING_DECLINED',
    //   payload: true,
    // });
  } catch (e) {
    console.error(e);
  }
};

export const confirmApproving = () => ({
  type: 'BOOKING_APPROVED',
  payload: false,
});

export const confirmDeclining = () => ({
  type: 'BOOKING_DECLINED',
  payload: false,
});


export const sendBookingRequest = (booking) => async (dispatch, getState) => {
    try {
      // console.log('ACTION sendBookingRequest ', booking);
      dispatch({
        type: _t.LOADING_DATA,
        payload: true,
      });
      const newBooking = await sendBookingRequestEnd(booking);
      // console.log('ACTION newBooking ', newBooking);
      dispatch({
        type: _t.SUCCESS_BOOKING,
        payload: true,
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
      dispatch({
        type: _t.CREATE_BOOKING_NETWORK_ERROR,
        payload: true,
      });
    }
};

export const clearNetworkError = () => ({
  type: _t.CREATE_BOOKING_NETWORK_ERROR,
  payload: false,
});

export const clearSuccessBooking = () => ({
  type: _t.SUCCESS_BOOKING,
  payload: false,
});

// export const getBookingByProject = (project_id) => async (dispatch, getState) => {
//     try {
//       const bookings = await getBookingByProjectEnd(project_id);
//       console.log('ACTION bookings for project: ', bookings);
//       // dispatch({
//       //   type: 'GET_BOOKING',
//       //   payload: mockBooking,
//       // });
//     } catch (e) {
//       console.error(e);
//     }
// };

export const getBookingByProjectStatus = (project_id, bookingStatus) => async (dispatch, getState) => {
    try {
      const bookings = await getBookingByProjectStatusEnd(project_id, bookingStatus);
      console.log('ACTION bookings ', bookings);
      // dispatch({
      //   type: 'GET_BOOKING',
      //   payload: mockBooking,
      // });
    } catch (e) {
      console.error(e);
    }
};

export const getBookingById = (booking_id, cb) => async (dispatch, getState) => {
    try {
      dispatch({
        type: _t.LOADING_DATA,
        payload: true,
      });
      const booking = await getBookingByIdEnd(booking_id);
      if (booking) cb();
      dispatch({
        type: _t.GET_BOOKING_BY_ID,
        payload: booking,
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

export const clearBooking = () => ({
  type: _t.GET_BOOKING_BY_ID,
  payload: {},
});
