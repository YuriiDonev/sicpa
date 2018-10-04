import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import SweetAlert from 'react-bootstrap-sweetalert';

import { HOST_NAME } from '../../mock-data/host-name.js';
import { getTokenForImages } from '../../service/token.js';
import {
  // getBookingById as _getBookingById,
  approveBooking as _approveBooking,
  declineBooking as _declineBooking,
  // confirmApproving as _confirmApproving,
  // confirmDeclining as _confirmDeclining,
  cancelBooking as _cancelBooking,
  clearBooking as _clearBooking,
} from '../../actions/booking-actions.js';


class BookingDetail extends Component {

  state = {
    message: '',
    photo: '',

    cancelBookingAlert: false,
    declineBookingAlert: false,

    isBookingApproved: false,
    isBookingDeclined: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentProject.id !== nextProps.currentProject.id) {
      this.props.history.push('/booking');
    }
    if (nextProps.booking) {
      if (nextProps.booking.author && nextProps.booking.author.img_url) {
        this.setState({ photo: nextProps.booking.author.img_url });
      }
    }
  }

  componentWillUnmount() {
    this.props._clearBooking();
    this.setState({ photo: '' });
  }

  enterMessage = (event) => {
    if (event.target.name === 'message') {
      this.setState({ message: event.target.value });
    }
  }

  declineBooking = () => {
    this.setState({ cancelBookingAlert: true });
  }

  confirmApproving = () => {
    // this.props._confirmApproving();
    this.setState({isBookingApproved: false});
    if (this.props.currentProject.role === 'admin') {
      this.props.history.push('/booking');
    } else {
      this.props.history.push('/my-schedule');
    }
  }

  confirmDeclining = () => {
    this.setState({isBookingDeclined: false});
    if (this.props.approveDeclineAndCloseBookingFromCalendar) {
      this.props.approveDeclineAndCloseBookingFromCalendar();
    } else {
      if (this.props.currentProject.role === 'admin') {
        this.props.history.push('/booking');
      } else {
        this.props.history.push('/my-schedule');
      }
    }
  }

  cancelBooking = () => {
    this.setState({ cancelBookingAlert: false });
    this.props._cancelBooking({ booking_id: this.props.booking.id }, () => {
      if (this.props.approveDeclineAndCloseBookingFromCalendar) {
        this.props.approveDeclineAndCloseBookingFromCalendar();
      } else {
        if (this.props.currentProject.role === 'admin') {
          this.props.history.push('/booking');
        } else {
          this.props.history.push('/my-schedule');
        }
      }
    });
  }

  cancelBookingDelete = () => {
    this.setState({ cancelBookingAlert: false });
  }

  adminApproveBooking = () => {
    this.props._approveBooking({
      booking_id: this.props.booking.id,
      status: 'approved',
      comment: this.state.message
    }, () => {
      if (this.props.approveDeclineAndCloseBookingFromCalendar) {
        this.props.approveDeclineAndCloseBookingFromCalendar();
        this.setState({ isBookingApproved: true });
      } else {
        this.setState({ isBookingApproved: true });
      }
    });
  }

  adminDeclineBooking = () => {
    this.setState({ declineBookingAlert: true });
  }

  adminDeclineBookingConfirm = () => {
    // console.log('!!! adminDeclineBookingConfirm');
    this.setState({ declineBookingAlert: false });
    this.props._declineBooking({
      booking_id: this.props.booking.id,
      status: 'rejected',
      comment: this.state.message
    }, () => {
      this.setState({ isBookingDeclined: true });
    });
  }

  adminDeclineBookingCancel = () => {
    this.setState({ declineBookingAlert: false });
  }

  _closeBookingFromCalendar = () => {
    this.props.closeBookingFromCalendar();
  }

  render() {

    const { booking } = this.props;
    const token = getTokenForImages();

    console.log('BookingDetail this.props ', this.props);
    console.log('BookingDetail this.state ', this.state);

    return (
        <div className="main-content">
          {
            (this.state.declineBookingAlert) ?
            <SweetAlert
              warning
              style={{display: "block",marginTop: "-100px"}}
              showCancel
              confirmBtnText="Yes, cancel it!"
              confirmBtnBsStyle="warning"
              cancelBtnBsStyle="info"
              title="Are you sure?"
              onConfirm={this.adminDeclineBookingConfirm}
              onCancel={this.adminDeclineBookingCancel}
            >
              {'This booking will be cancelled and removed from the calendar'}
            </SweetAlert> : null
          }

          {
            (this.state.cancelBookingAlert) ?
            <SweetAlert
            	warning
              style={{display: "block",marginTop: "-100px"}}
            	showCancel
            	confirmBtnText="Yes, cancel it!"
            	confirmBtnBsStyle="warning"
            	cancelBtnBsStyle="info"
            	title="Are you sure?"
            	onConfirm={this.cancelBooking}
            	onCancel={this.cancelBookingDelete}
            >
            	{'This booking will be cancelled and removed from the calendar'}
            </SweetAlert> : null
          }

          {
            (this.state.isBookingApproved) ?
            <SweetAlert
              success
              style={{display: "block",marginTop: "-100px"}}
              title={"Request Approved!"}
              onConfirm={this.confirmApproving}
            >
              {
                (_.isEmpty(this.props.booking)) ? null : `A notification has been sent to ${booking.author.company}`
              }
            </SweetAlert> : null
          }
          {
            (this.state.isBookingDeclined) ?
            <SweetAlert
              success
              style={{display: "block",marginTop: "-100px"}}
              title={"Request Declined!"}
              onConfirm={this.confirmDeclining}
            >
              {
                (_.isEmpty(this.props.booking)) ? null : `A notification has been sent to ${booking.author.company}`
              }
            </SweetAlert> : null
          }

          {
            (_.isEmpty(booking)) ? null :
            <div className='booking-detail-wrapper'>
              <div className='booking-detail-container'>

              <div className='booking-detail-title-container'>
                <div className='booking-detail-title'>{'Booking Detail'}</div>

                <div className='booking-detail-title-status-close-container'>
                  <div className={`booking-detail-title-status ${booking.status.toLowerCase()}`}>{booking.status.toLowerCase()}</div>
                  {
                    (this.props.closeBookingFromCalendar) ?
                    <div className='close-booking-from-calendar-button' onClick={this._closeBookingFromCalendar}>
                      <i className="pe-7s-close-circle"></i>
                    </div> : null
                  }
                </div>

              </div>

              <div className='resource-name-date-time'>
                <div className='resource-name-container'>
                  <div className='resource-name-title'>{'RESOURCE NAME'}</div>
                  <div className='resource-name'>{booking.resource_name}</div>
                </div>
                <div className='date-container'>
                  <div className='date-title'>{'START TIME'}</div>
                  <div className='date'>
                    {moment(booking.start_date).format('MMMM DD YYYY, hh:mm A')}
                  </div>
                </div>
                <div className='date-container'>
                  <div className='date-title'>{'END TIME'}</div>
                  <div className='date'>
                    {moment(booking.end_date).format('MMMM DD YYYY, hh:mm A')}
                  </div>
                </div>
              </div>

              <div className='notes-container'>
                <div className='notes-title'>{'NOTES'}</div>
                {
                  (booking.user_comment) ? <div className='notes'>{booking.user_comment}</div> : <div className='notes empty'>{'No notes'}</div>
                }
              </div>

              <div className='booked-by-wrapper'>
                <div className='booked-by-title'>{'BOOKED BY'}</div>
                <div className='booked-by-container'>
                  <div className='booked-by'>
                    <div className={`booked-by-photo ${(!this.state.photo) ? 'no-image' : ''}`}>
                      {
                        (!this.state.photo) ? <div>{'No image'}</div> : <img src={`${HOST_NAME}${this.state.photo}?access_token=${token}`} alt='' />
                      }
                    </div>
                    <div className='booked-by-photo-container'></div>
                    <div className='booked-by-info-container'>
                      <div className='booked-by-info-wrapper'>
                        <div className='booked-by-name'>{`${booking.author.first_name} ${booking.author.last_name}`}</div>
                        <div className='booked-by-company'>{booking.author.company}</div>
                        <div className='booked-by-job-position'>{booking.author.job_position}</div>
                        <div className='booked-by-phone'>{`T: ${booking.author.phone}`}</div>
                        <div className='booked-by-mobile'>{`M: ${booking.author.mobile}`}</div>
                        <div className='booked-by-email'>{booking.author.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {
                (this.props.currentProject.role === 'admin' && this.props.booking.status !== 'APPROVED') ?
                <div className='attach-message-container'>
                  <div className='attach-massage-title'>{'DO YOU WANT TO ATTACH MESSAGE?'}</div>
                  <input type="text" name="message" placeholder='Enter message' onChange={this.enterMessage} maxLength='80' />
                </div> : null
              }

              {
                (this.props.currentProject.role === 'admin' && this.props.booking.status !== 'APPROVED') ?
                <div className='approve-decline-container'>
                  <div className='approve-decline-buttons'>
                    <button className='approve-button active' onClick={this.adminApproveBooking}>{'APPROVE'}</button>
                    <button className='decline-button' onClick={this.adminDeclineBooking}>{'DECLINE'}</button>
                  </div>
                </div> :
                (this.props.currentProject.role === 'admin' && this.props.booking.status === 'APPROVED') ?
                <div className='approve-decline-container'>
                  <div className='approve-decline-buttons'>
                    <button className='decline-button' onClick={this.declineBooking}>{'CANCEL BOOKING'}</button>
                  </div>
                </div> :
                (this.props.currentProject.role !== 'admin' && this.props.booking.editable) ?
                <div className='approve-decline-container'>
                  <div className='approve-decline-buttons'>
                    <button className='decline-button' onClick={this.declineBooking}>{'CANCEL BOOKING'}</button>
                  </div>
                </div> : null
              }

              </div>
            </div>
          }
        </div>
    );
  }
}

const mapStateToProps = ({ currentProject, booking }) => ({
  currentProject,
  booking,
  // isBookingApproved,
  // isBookingDeclined,
});

const actions = {
  // _getBookingById,
  _approveBooking,
  _declineBooking,
  // _confirmApproving,
  // _confirmDeclining,
  _cancelBooking,
  _clearBooking,
};

export default connect(mapStateToProps, actions)(BookingDetail);
