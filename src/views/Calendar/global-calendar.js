// import React, { Component } from 'react';
// // import { connect } from 'react-redux';
// // import _ from 'lodash';
// // import Select from 'react-select';
//
// import RequestBooking from '../../components/Booking/request-booking.js';
// import RequestAdminBooking from '../../components/Booking/request-admin-booking.js';
// import Calendar from './Calendar.js';
//
// class GlobalCalendar extends Component {
//
//   state = {
//     isBookingOpen: null,
//   }
//
//   closeBooking = () => {
//     this.setState({isBookingOpen: null});
//   }
//
//   renderBookResource = (slotInfo, resource, project) => {
//     this.setState({ isBookingOpen:
//       <RequestBooking {...this.props}
//         info={slotInfo}
//         resourceDetailed={resource}
//         currentProject={project}
//         closeBookResource={this.closeBooking}
//       /> });
//   }
//
//   renderAdminBookResource = (resource_id, project, slotInfo) => {
//     this.setState({ isBookingOpen:
//       <RequestAdminBooking {...this.props}
//         info={slotInfo}
//         currentResource={resource_id}
//         currentProject={project}
//         closeBookResource={this.closeBooking}
//       /> });
//   }
//
//   render() {
//     return (
//       <div>
//         {
//           this.state.isBookingOpen ||
//           <Calendar
//             {...this.props}
//             bookResource = {this.renderBookResource}
//             bookAdminResource = {this.renderAdminBookResource}
//           />
//         }
//       </div>
//     );
//   }
// }
//
// export default GlobalCalendar;
//
//
// // this.setState({ isRequestAdminBookingOpen:
// //   <RequestAdminBooking
// //     info={null}
// //     currentResource={null}
// //     currentProject={this.props.currentProject}
// //     closeBookResource={() => console.log('CLOSE ADMIN BOOKING')}
// //   /> });
//
// // const mapStateToProps = ({ currentProject, users, calendarSchedules, resources, resourceDetailed }) => ({
// //   currentProject,
// //   // _isSelectOpen,
// //   calendarSchedules,
// //   resources,
// //   resourceDetailed,
// // });
// //
// // const actions = {
// //   _getSchedulesForCalendar,
// //   _getResourceDetails,
// // };
// //
// // export default connect(mapStateToProps, actions)(Calendar);
