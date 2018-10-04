// import React, { Component } from 'react';
//
// import { connect } from 'react-redux';
// import moment from 'moment';
// import momentTZ from 'moment-timezone';
// import Select from 'react-select';
// import Datetime from 'react-datetime';
//
// import { timeList } from '../../mock-data/timezones.js';
//
// import SweetAlert from 'react-bootstrap-sweetalert';
//
// import {
//   sendBookingRequest as _sendBookingRequest,
//   clearNetworkError as _clearNetworkError,
//   clearSuccessBooking as _clearSuccessBooking,
// } from '../../actions/booking-actions.js';
// import {scrollToTop as _scrollToTop} from '../../actions/scrollTop-actions.js';
//
// import { getResourceDetails as _getResourceDetails } from '../../actions/resources-actions.js';
// import ResourceDetailedUser from '../Project/UserRoleView/resource-detailed-user.js';
//
// import { HOST_NAME } from '../../mock-data/host-name.js';
// import { getTokenForImages } from '../../service/token.js';
//
// class RequestBooking extends Component {
//
//   state = {
//     notes: '',
//     start_time12: '',
//     start_time24: '',
//     end_time12: '',
//     end_time24: '',
//
//     start_date: '',
//     end_date: '',
//
//     isResourceInfoOpen: false,
//   }
//
//   componentDidMount () {
//     this.props._scrollToTop();
//   }
//
//   enterMessage = (event) => {
//     if (event.target.name === 'notes') {
//       this.setState({ notes: event.target.value });
//     }
//   }
//
//   createTZStartDate = () => {
//     const dateTimeStart = moment(this.state.start_date + ' ' + this.state.start_time24).format('YYYY-MM-DDTHH:mm:ss');
//     let startWithTZ = moment.tz(dateTimeStart, this.props.currentProject.timezone).format();
//     return startWithTZ;
//   }
//
//   createTZEndDate = () => {
//     const dateTimeEnd = moment(this.state.end_date + ' ' + this.state.end_time24).format('YYYY-MM-DDTHH:mm:ss');
//     let endtWithTZ = moment.tz(dateTimeEnd, this.props.currentProject.timezone).format();
//     return endtWithTZ;
//   }
//
//   sendBookingRequest = () => {
//     if (this.props.info) {
//         if (this.checkIsFullDay()) {
//           const start = moment(this.props.info.start).format('YYYY-MM-DD');
//           const dateTimeStart = moment(start + ' ' + this.state.start_time24).format('YYYY-MM-DDTHH:mm:ss');
//           const startWithTZ = moment.tz(dateTimeStart, this.props.currentProject.timezone).format();
//           const end = moment(this.props.info.end).format('YYYY-MM-DD');
//           const dateTimeEnd = moment(end + ' ' + this.state.end_time24).format('YYYY-MM-DDTHH:mm:ss');
//           const endWithTZ = moment.tz(dateTimeEnd, this.props.currentProject.timezone).format();
//           this.props._sendBookingRequest({
//             resource_id: this.props.resourceDetailed.id,
//             start_date: startWithTZ,
//             end_date: endWithTZ,
//             user_comment: this.state.notes
//           });
//         } else {
//           const startDate = moment(this.props.info.start).format('YYYY-MM-DD');
//           const startTime = moment(this.props.info.start).format('HH:mm:ss');
//           const dateTimeStart = moment(startDate + ' ' + startTime).format('YYYY-MM-DDTHH:mm:ss');
//           const startWithTZ = moment.tz(dateTimeStart, this.props.currentProject.timezone).format();
//
//           const endDate = moment(this.props.info.end).format('YYYY-MM-DD');
//           const endTime = moment(this.props.info.end).format('HH:mm:ss');
//           const dateTimeEnd = moment(endDate + ' ' + endTime).format('YYYY-MM-DDTHH:mm:ss');
//           const endWithTZ = moment.tz(dateTimeEnd, this.props.currentProject.timezone).format();
//           this.props._sendBookingRequest({
//             resource_id: this.props.resourceDetailed.id,
//             start_date: startWithTZ,
//             end_date: endWithTZ,
//             user_comment: this.state.notes
//           });
//         }
//       } else {
//       this.props._sendBookingRequest({
//         resource_id: this.props.resourceDetailed.id,
//         start_date: this.createTZStartDate(),
//         end_date: this.createTZEndDate(),
//         user_comment: this.state.notes
//       });
//     }
//   }
//
//   confirmSuccess = () => {
//     // this.props.history.push('/project/resources');
//     this.props.closeBookResource();
//     this.props._clearNetworkError();
//     this.props._clearSuccessBooking();
//   }
//
//   goBackToCalendar = () => {
//     this.props.closeBookResource();
//     this.props._clearNetworkError();
//   }
//
//   componentWillUnmount() {
//     this.props._clearNetworkError();
//   }
//
//   checkIsFullDay = () => {
//     if ((
//       moment(this.props.info.start).isSame(this.props.info.end) &&
//       moment(this.props.info.start).format('HH:mm A') === '00:00 AM' &&
//       moment(this.props.info.end).format('HH:mm A') === '00:00 AM') ||
//       (
//         !moment(this.props.info.start).isSame(this.props.info.end) &&
//         moment(this.props.info.start).format('HH:mm A') === '00:00 AM' &&
//         moment(this.props.info.end).format('HH:mm A') === '00:00 AM')) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//
//   selectStartTime = (time) => {
//     if (time) {
//       this.setState({ start_time12: time.value, start_time24: time.time24 });
//     } else {
//       this.setState({ start_time12: '', start_time24: '' });
//     }
//   }
//
//   selectEndTime = (time) => {
//     if (time) {
//       this.setState({ end_time12: time.value, end_time24: time.time24 });
//     } else {
//       this.setState({ end_time12: '', end_time24: '' });
//     }
//   }
//
//   getOptions = () => {
//     return timeList.map((time) => ({value: time['12h'], label: time['12h'], time24: time['24h']}));
//   }
//
//   filterOptionsStart = (options, filterValueEnd) => {
//     // if (this.props.info) {
//     //   if (!moment(this.props.info.start).isSame(this.props.info.end, 'day')) return options;
//     // }
//     if (
//       (this.props.info && !moment(this.props.info.start).isSame(this.props.info.end, 'day')) ||
//       (this.state.start_date && this.state.end_date && !moment(this.state.start_date).isSame(this.state.end_date, 'day'))
//     ) return options;
//
//     if (filterValueEnd) {
//       return options.filter((time) => {
//         const start = moment(time.value, ['HH:mm A', 'h:m A', 'h:m a']);
//         const end = moment(filterValueEnd, ['HH:mm A', 'h:m A', 'h:m a']);
//         if (start.isBefore( end )) {
//           return time;
//         }
//       });
//     } else {
//       return options;
//     }
//   }
//
//   filterOptionsEnd = (options, filterValueStart) => {
//     // if (this.props.info) {
//     //   if (!moment(this.props.info.start).isSame(this.props.info.end, 'day')) return options;
//     // }
//     if (
//       (this.props.info && !moment(this.props.info.start).isSame(this.props.info.end, 'day')) ||
//       (this.state.start_date && this.state.end_date && !moment(this.state.start_date).isSame(this.state.end_date, 'day'))
//     ) return options;
//
//     if (filterValueStart) {
//       return options.filter((time) => {
//         const start = moment(filterValueStart, ['HH:mm A', 'h:m A', 'h:m a']);
//         const end = moment(time.value, ['HH:mm A', 'h:m A', 'h:m a']);
//         if (end.isAfter( start )) {
//           return time;
//         }
//       });
//     } else {
//       return options;
//     }
//   }
//
//   fromDateStart = (current) => {
//     const yesterday = moment().subtract( 1, 'day' );
//     return current.isAfter( yesterday );
//   }
//
//   fromDateEnd = (current) => {
//     if (this.state.start_date) {
//       const selected = moment(this.state.start_date).subtract( 1, 'day' );
//       return current.isAfter( selected );
//     } else {
//       const yesterday = moment().subtract( 1, 'day' );
//       return current.isAfter( yesterday );
//     }
//   }
//
//   selectStartDate = (date) => {
//     this.setState({ start_date: moment(date).format('YYYY-MM-DD') });
//   }
//   selectEndDate = (date) => {
//     this.setState({ end_date: moment(date).format('YYYY-MM-DD') });
//   }
//
//   selectResource = (resource) => {
//     if (resource) {
//       this.setState({ resourceName: resource.label, resourceId: resource.id });
//     } else {
//       this.setState({ resourceName: '', resourceId: '' });
//     }
//   }
//
//   get isValid() {
//     if (this.props.info) {
//       if (this.checkIsFullDay()) {
//         if (this.state.start_time12 === '' ||
//           this.state.start_time24 === '' ||
//           this.state.end_time12 === '' ||
//           this.state.end_time24 === '' ||
//           this.state.resourceName === '' ||
//           this.state.resourceId === '') {
//           return true;
//         } else {
//           return false;
//         }
//       } else {
//         if (this.state.resourceName === '' || this.state.resourceId === '') {
//           return true;
//         } else {
//           return false;
//         }
//       }
//     } else {
//       if (this.state.start_time12 === '' ||
//         this.state.start_time24 === '' ||
//         this.state.end_time12 === '' ||
//         this.state.end_time24 === '' ||
//         this.state.start_date === '' ||
//         this.state.end_date === '' ||
//         this.state.resourceName === '' ||
//         this.state.resourceId === '') {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   }
//
//   openResourceInfo = () => {
//     if (this.state.isResourceInfoOpen) {
//       this.setState({ isResourceInfoOpen: false });
//     } else {
//       this.setState({ isResourceInfoOpen: true });
//     }
//   }
//
//   render() {
//     console.log('RequestBooking USER ', this.props);
//     console.log('RequestBooking USER this.state ', this.state);
//
//     const { booking } = this.props;
//     const token = getTokenForImages();
//
//     return (
//       <div className="main-content">
//         {
//           (this.props.successBooking) ?
//           <SweetAlert
//             success
//             style={{display: "block",marginTop: "-100px"}}
//             title="Success!"
//             onConfirm={this.confirmSuccess}
//           /> : null
//         }
//
//         {
//           (this.state.isResourceInfoOpen) ? <ResourceDetailedUser {...this.props} closeResourceInfo={this.openResourceInfo}/> :
//
//           <div className='booking-detail-wrapper'>
//             <div className='booking-detail-container'>
//               <div className='booking-detail-title-container request-booking'>{'Request Booking'}</div>
//               <div className='request-booking-project-resource-image-name-container'>
//                 <div className='request-booking-resource-image-container'>
//                   {
//                     (this.props.resourceDetailed && this.props.resourceDetailed.listing_img) ?
//                     <img src={`${HOST_NAME}${this.props.resourceDetailed.listing_img}?access_token=${token}`} alt='' /> : null
//                   }
//                 </div>
//                 <div className='request-booking-project-resource-name'>
//                   <div className='request-booking-project-name'>
//                     <div className='request-booking-project-resource-name-title'>{'PROJECT NAME*'}</div>
//                     <input type="text" placeholder='Select project' value={this.props.currentProject.name} disabled={true} />
//                   </div>
//                   <div className='request-booking-resource-name'>
//                     <div className='request-booking-project-resource-name-title'>
//                       <div>{'RESOURCE NAME*'}</div>
//                       {
//                         (this.props.resourceDetailed.id) ?
//                         <div className='request-booking-more-info' onClick={this.openResourceInfo}>{'More info'}</div> : null
//                       }
//                     </div>
//                     <input type="text" placeholder='Select resource' value={this.props.resourceDetailed.name} disabled={true} />
//                   </div>
//                 </div>
//               </div>
//               {
//                 (this.props.info) ?
//                 <div className='request-booking-start-end-time'>
//                   <div className='request-booking-start-time'>
//                     <div className='request-booking-start-end-time-title'>{'START TIME*'}</div>
//                       <div className='request-booking-start-time-slots'>
//                         <div className='request-start-end-date'>{moment(this.props.info.start).format('MMM DD, YYYY')}</div>
//                         {
//                           (this.checkIsFullDay()) ?
//                           <div className='request-start-end-time select'>
//                             <Select
//   														placeholder={'Please select time'}
//   														options={this.getOptions()}
//                               filterOptions={(options) => this.filterOptionsStart(options, this.state.end_time12)}
//   														clearable={true}
//   														value={this.state.start_time12}
//   														onChange={this.selectStartTime}
//   														searchable={true}
//   													/>
//                           </div> :
//                           <div className='request-start-end-time'>{moment(this.props.info.start).format('HH:mm A')}</div>
//                         }
//                       </div>
//                   </div>
//                   <div className='request-booking-end-time'>
//                     <div className='request-booking-start-end-time-title'>{'END TIME*'}</div>
//                       <div className='request-booking-start-time-slots'>
//                         <div className='request-start-end-date'>{moment(this.props.info.end).format('MMM DD, YYYY')}</div>
//                         {
//                           (this.checkIsFullDay()) ?
//                           <div className='request-start-end-time select'>
//                             <Select
//                               placeholder={'Please select time'}
//                               options={this.getOptions()}
//                               filterOptions={(options) => this.filterOptionsEnd(options, this.state.start_time12)}
//                               clearable={true}
//                               value={this.state.end_time12}
//                               onChange={this.selectEndTime}
//                               searchable={true}
//                             />
//                           </div> :
//                           <div className='request-start-end-time'>{moment(this.props.info.end).format('HH:mm A')}</div>
//                         }
//                       </div>
//                   </div>
//                 </div> :
//
//                 <div className='request-booking-start-end-time'>
//                   <div className='request-booking-start-time'>
//                     <div className='request-booking-start-end-time-title'>{'START TIME'}</div>
//                       <div className='request-booking-start-time-slots'>
//                         <div className='request-start-end-date select-date'>
//                           <Datetime
//                             dateFormat="MMM DD, YYYY"
//                             timeFormat={false}
//                             isValidDate={this.fromDateStart}
//                             inputProps={{ placeholder: 'Please select a date', disabled: false }}
//                             onChange={this.selectStartDate}
//                           />
//                         </div>
//                           <div className='request-start-end-time select'>
//                             <Select
//                               placeholder={'Please select time'}
//                               options={this.getOptions()}
//                               filterOptions={(options) => this.filterOptionsStart(options, this.state.end_time12)}
//                               clearable={true}
//                               value={this.state.start_time12}
//                               onChange={this.selectStartTime}
//                               searchable={true}
//                             />
//                           </div>
//                       </div>
//                   </div>
//                   <div className='request-booking-end-time'>
//                     <div className='request-booking-start-end-time-title'>{'END TIME'}</div>
//                       <div className='request-booking-start-time-slots'>
//                         <div className='request-start-end-date select-date'>
//                           <Datetime
//                             dateFormat="MMM DD, YYYY"
//                             timeFormat={false}
//                             inputProps={{ placeholder: 'Please select a date', disabled: false }}
//                             isValidDate={this.fromDateEnd}
//                             onChange={this.selectEndDate}
//                           />
//                         </div>
//                           <div className='request-start-end-time select'>
//                             <Select
//                               placeholder={'Please select time'}
//                               options={this.getOptions()}
//                               filterOptions={(options) => this.filterOptionsEnd(options, this.state.start_time12)}
//                               clearable={true}
//                               value={this.state.end_time12}
//                               onChange={this.selectEndTime}
//                               searchable={true}
//                             />
//                           </div>
//                       </div>
//                   </div>
//                 </div>
//               }
//
//               <div className='request-booking-notes-container'>
//                 <div className='request-booking-notes-title'>{'NOTES'}</div>
//                 <textarea rows="3" name="notes"
//                   value={this.state.notes}
//                   placeholder='Enter Your Notes'
//                   maxLength="150" onChange={this.enterMessage}></textarea>
//               </div>
//
//               {
//                 (this.props.networkError.createBookingError) ?
//                 <div className='booking-warning'>{'Sorry, this interval is not available for reservations.'}</div> : null
//               }
//
//               <div className='approve-decline-container'>
//                 <div className='approve-decline-buttons'>
//                   <button
//                   disabled={this.isValid} className={`approve-button request ${(!this.isValid) ? 'active' : ''}`}
//                   onClick={this.sendBookingRequest}>{'SEND REQUEST'}</button>
//                   <button className='decline-button' onClick={this.goBackToCalendar}>{'CANCEL'}</button>
//                 </div>
//               </div>
//
//
//             </div>
//           </div>
//
//         }
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = ({ successBooking, networkError, resourceDetailed }) => ({
//   successBooking,
//   networkError,
//   resourceDetailed,
// });
//
// const actions = {
//   _sendBookingRequest,
//   _clearNetworkError,
//   _clearSuccessBooking,
//   _scrollToTop,
//   _getResourceDetails,
// };
//
// export default connect(mapStateToProps, actions)(RequestBooking);
