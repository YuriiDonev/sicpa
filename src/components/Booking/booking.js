// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router';
// import { connect } from 'react-redux';
// import moment from 'moment';
//
// import { Grid, Col, Row } from 'react-bootstrap';
// import Card from '../Card/Card.jsx';
// // import Tasks from './Tasks/Tasks.jsx';
//
// import { getShedules,
//   // setSheduleType
// } from '../../actions/schedule-actions.js';
// import {
//   getBookingById as _getBookingById,
//   getBookingByProjectStatus as _getBookingByProjectStatus,
//   getBookingByProject as _getBookingByProject,
// } from '../../actions/booking-actions.js';
//
// class BookingRequests extends Component {
//
//   chooseScheduleSorting = (event) => {
//     this.props.setSheduleType(event.target.value);
//   }
//
//   componentDidMount () {
//     this.props.getShedules();
//   }
//
//   getBookingDetail = (booking_id) => {
//     console.log('getBookingDetail ', booking_id);
//     this.props.history.push(`booking/detail/${booking_id}`);
//   }
//
//   renderShedulesByDate = () => {
//
//     let date;
//     const { schedules } = this.props.schedules;
//
//     console.log('BookingRequests renderShedulesByDate ', schedules);
//
//     return schedules.map((item, i) => { return <div key={i}>
//         <div className='schedule-resource-name'>{item.day}</div>
//         <div>
//           {
//             item.bookings.map((booking, i) => {
//               console.log('booking ', booking);
//               if (date !== undefined && moment(date).diff(moment(booking.start_date), 'days') === 0) {
//                 date = '';
//               } else {
//                 date = booking.start_date;
//               }
//               const renderDate = (date !== '') ? moment(date).format('ddd, MMM DD') : '';
//               const startTime = moment(booking.start_date).format('HH:mmA');
//               const endTime = moment(booking.end_date).format('HH:mmA');
//
//               return <div key={i} className='schedule-resource'>
//                 <div className='schedule-resource-left'>{ renderDate }</div>
//                 <div className='schedule-resource-right'>
//
//                   <div className='time'>{ startTime + ' - ' +  endTime}</div>
//                   <div className='company'>
//                     <div className='item-name'>{booking.item_name}</div>
//                     <div className='author'>{ booking.author }</div>
//                     <div className='notes'>{ booking.notes }</div>
//                     <div className='review-request-button'>
//                       <button onClick={this.getBookingDetail.bind(this, booking.id)}>{'Review Request'}</button>
//                     </div>
//                   </div>
//
//                 </div>
//             </div> })
//           }
//         </div>
//     </div> });
//
//
//   }
//
//
//   renderShedulesByResource = () => {
//     let date;
//     const { schedules } = this.props.schedules;
//
//     console.log('BookingRequests renderShedulesByResource ', schedules);
//
//     return schedules.map((item, i) => { return <div key={i}>
//         <div className='schedule-resource-name'>{item.item_name}</div>
//         <div>
//           {
//             item.bookings.map((booking, i) => {
//               if (date !== undefined && moment(date).diff(moment(booking.start_date), 'days') === 0) {
//                 date = '';
//               } else {
//                 date = booking.start_date;
//               }
//               const renderDate = (date !== '') ? moment(date).format('ddd, MMM DD') : '';
//               const startTime = moment(booking.start_date).format('HH:mmA');
//               const endTime = moment(booking.end_date).format('HH:mmA');
//
//               return <div key={i} className='schedule-resource'>
//                 <div className='schedule-resource-left'>{ renderDate }</div>
//                 <div className='schedule-resource-right'>
//
//                   <div className='time'>{ startTime + ' - ' +  endTime}</div>
//                   <div className='company'>
//                     <div className='author'>{ booking.author }</div>
//                     <div className='notes'>{ booking.notes }</div>
//                     <div className='review-request-button'>
//                       <button onClick={this.getBookingDetail.bind(this, booking.id)}>{'Review Request'}</button>
//                     </div>
//                   </div>
//
//                 </div>
//             </div> })
//           }
//         </div>
//     </div> });
//   }
//
//
//   render() {
//
//     console.log('BookingRequests this.props.schedules ', this.props.schedules);
//
//     const { currentType } = this.props.schedules;
//
//     const scheduled = (currentType === 'date') ? this.renderShedulesByDate()
//       : (currentType === 'resource') ? this.renderShedulesByResource()
//       : [];
//
//     return (
//         <div className="main-content">
//
//           <Grid fluid>
//             <Row>
//               <Col md={12}>
//                 <Card
//                   content = {
//                     <Row>
//                       <div className='schedule-container'>
//
//                         <div className='schedule-radiobuttons'>
//                           <div className='radio-by-date'>
//                             <div className={`radio-item ${ (currentType === 'date') ? 'checked-date' : '' }`}>
//                               <input type="radio" id="ritema" name="ritem" value="date"
//                                 readOnly
//                                 checked={ (currentType === 'date') ? true : false }
//                                 onClick={this.chooseScheduleSorting}
//                               />
//                               <label htmlFor="ritema">{'Sort By Date'}</label>
//                             </div>
//                           </div>
//
//                           <div className='radio-by-resource'>
//                             <div className={`radio-item ${ (currentType === 'resource') ? 'checked-resource' : '' }`}>
//                               <input type="radio" id="ritemb" name="ritem" value="resource"
//                                 readOnly
//                                 checked={ (currentType === 'resource') ? true : false }
//                                 onClick={this.chooseScheduleSorting}
//                               />
//                               <label htmlFor="ritemb">{'Sort By Resource'}</label>
//                             </div>
//                           </div>
//                         </div>
//
//                         <div>
//                           {scheduled}
//                         </div>
//                       </div>
//                     </Row>
//                   }
//                 />
//               </Col>
//             </Row>
//           </Grid>
//         </div>
//     );
//   }
// }
//
//
// const mapStateToProps = ({ projectInfo, currentProject, schedules }) => ({
//   projectInfo,
//   currentProject,
//   schedules,
// });
//
// const actions = {
//   getShedules,
//   // setSheduleType,
//   _getBookingById,
//   _getBookingByProjectStatus,
//   _getBookingByProject,
// };
//
// export default connect(mapStateToProps, actions)(BookingRequests);
