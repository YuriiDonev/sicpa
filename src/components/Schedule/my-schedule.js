import React, { Component } from 'react';

import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { getShedules as _getShedules,
  getShedulesForUser as _getShedulesForUser,
  // setSheduleType
} from '../../actions/schedule-actions.js';
import { getBookingById as _getBookingById } from '../../actions/booking-actions.js';

import NoProjectsPlaceholder from '../Project/UserRoleView/no-projects.js';

class MySchedule extends Component {

  state = {
    view: this.props.location.pathname || '',
    sortedBy: 'date',
    isOnlyMyResources: true,
  }

  chooseScheduleSorting = (event) => {
    if (this.props.history.location.pathname === '/booking' && this.props.currentProject.role === 'admin') {
      this.setState({ sortedBy: event.target.value });
      this.props._getShedulesForUser(this.props.currentProject.id, event.target.value, this.state.isOnlyMyResources);
    } else {
      this.setState({ sortedBy: event.target.value });
      if (!_.isEmpty(this.props.userInfo)) {
        this.props._getShedules(this.props.currentProject.id, event.target.value);
        // this.props._getShedules(this.props.currentProject.id, event.target.value, this.props.userInfo.id);
      }
      // this.props._getShedules(this.props.currentProject.id, event.target.value);
    }
  }

  toggleOnlyMyResources = (event) => {
    if (event.target.value === 'false') {
      this.setState({ isOnlyMyResources: true });
      if (this.props.currentProject.id) {
        this.props._getShedulesForUser(this.props.currentProject.id, this.state.sortedBy, true);
      }
    } else {
      this.setState({ isOnlyMyResources: false });
      if (this.props.currentProject.id) {
        this.props._getShedulesForUser(this.props.currentProject.id, this.state.sortedBy, false);
      }
    }
  }

  componentDidMount () {
    if (!_.isEmpty(this.props.currentProject)) {
      if (this.props.history.location.pathname === '/booking' && this.props.currentProject.role === 'admin') {
        this.props._getShedulesForUser(this.props.currentProject.id, this.state.sortedBy, this.state.isOnlyMyResources);
      } else {
        if (!_.isEmpty(this.props.userInfo)) {
          this.props._getShedules(this.props.currentProject.id, this.state.sortedBy);
          // this.props._getShedules(this.props.currentProject.id, this.state.sortedBy, this.props.userInfo.id);
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({view: nextProps.location.pathname});
      if (this.props.history.location.pathname === '/booking' && this.props.currentProject.role === 'admin') {
        this.props._getShedulesForUser(this.props.currentProject.id, this.state.sortedBy, this.state.isOnlyMyResources);
      } else {
        if (!_.isEmpty(this.props.userInfo)) {
          this.props._getShedules(this.props.currentProject.id, this.state.sortedBy);
          // this.props._getShedules(this.props.currentProject.id, this.state.sortedBy, this.props.userInfo.id);
        }
        // this.props._getShedules(this.props.currentProject.id, this.state.sortedBy);
      }
    }

    if (this.props.currentProject.id !== nextProps.currentProject.id) {
      if (nextProps.currentProject.role !== 'admin') {
        this.props.history.push('/');
      }
      if (this.props.history.location.pathname === '/booking' && nextProps.currentProject.role === 'admin') {
        this.props._getShedulesForUser(nextProps.currentProject.id, this.state.sortedBy, this.state.isOnlyMyResources);
      } else {
        if (!_.isEmpty(this.props.userInfo)) {
          this.props._getShedules(nextProps.currentProject.id, this.state.sortedBy);
          // this.props._getShedules(nextProps.currentProject.id, this.state.sortedBy, this.props.userInfo.id);
        }
        // this.props._getShedules(nextProps.currentProject.id, this.state.sortedBy);
      }
    }
    if (!_.isEqual(this.props.userInfo, nextProps.userInfo)) {
      if (this.props.currentProject.id) {
        this.props._getShedules(this.props.currentProject.id, this.state.sortedBy);
      }
    }
  }

  getBookingDetail = (booking_id) => {
    console.log('getBookingDetail ', booking_id);
    this.props._getBookingById(booking_id, () => {
      this.props.history.push(`booking/detail/${booking_id}`);
    });
    // this.props.history.push(`booking/detail/${booking_id}`);
  }

  renderShedulesByDate = () => {
    // console.log('MySchedule renderShedulesByDate');
    if (_.isEmpty(this.props.schedules)) return;

    return this.props.schedules.map((item, i) => { return <div key={i}>
        <div className='schedule-resource-name'>{moment(item.day).format('ddd, MMM DD')}</div>
        <div>
          {
            item.bookings.map((booking, i) => {
              const startTime = moment(booking.start_date).format('hh:mm A');
              const endTime = moment(booking.end_date).format('hh:mm A');

              return <div key={i} className='schedule-resource'>
                <div className='schedule-resource-left'></div>

                <div className={`schedule-resource-right ${(this.props.currentProject.role === 'admin' && this.state.view !== '/booking') ? 'active' : ''}`}
                  onClick={(this.props.currentProject.role === 'admin' && this.state.view !== '/booking') ? () => this.getBookingDetail(booking.id) : null}>

                  <div className='time'>{ startTime + ' - ' +  endTime}</div>
                  <div className='company'>
                    <div className='item-name'>{booking.resource_name}</div>
                    <div className='author'>{booking.first_name + ' ' + booking.last_name}</div>
                    <div className='notes'>{booking.reviewer_comment}</div>
                    {
                      (this.state.view === '/booking' && this.props.currentProject.role === 'admin') ?
                      <div className='review-request-button'>
                        <button onClick={() => this.getBookingDetail(booking.id)}>{'Review Request'}</button>
                      </div> : null
                    }
                  </div>
                  {
                    (this.props.currentProject.role === 'admin') ? null : <div className='status-wrapper'>
                      <div className={`status ${booking.status.toLowerCase()}`}>{booking.status.toLowerCase()}</div>
                    </div>
                  }
                </div>
            </div> })
          }
        </div>
    </div> });
  }


  renderShedulesByResource = () => {
    if (_.isEmpty(this.props.schedules)) return;
    // console.log('MySchedule renderShedulesByResource');

    return this.props.schedules.map((item, i) => {
      let date = item.bookings[0].start_date;
      let renderDate;

      return <div key={i}>
        <div className='schedule-resource-name'>{item.resource_name}</div>
        <div>
          {
            item.bookings.map((booking, i) => {
              if (renderDate === undefined) {
                renderDate = moment(booking.start_date).format('ddd, MMM DD');
              } else if (moment(date).diff(moment(booking.start_date), 'days') !== 0) {
                renderDate = moment(booking.start_date).format('ddd, MMM DD');
                date = booking.start_date;
              } else {
                renderDate = '';
              }
              const startTime = moment(booking.start_date).format('hh:mm A');
              const endTime = moment(booking.end_date).format('hh:mm A');

              return <div key={i} className='schedule-resource'>
                <div className='schedule-resource-left'>{ renderDate }</div>
                <div className={`schedule-resource-right ${(this.props.currentProject.role === 'admin' && this.state.view !== '/booking') ? 'active' : ''}`}
                  onClick={(this.props.currentProject.role === 'admin' && this.state.view !== '/booking') ? () => this.getBookingDetail(booking.id) : null}>

                  <div className='time'>{ startTime + ' - ' +  endTime}</div>
                  <div className='company'>
                    <div className='author'>{booking.first_name + ' ' + booking.last_name}</div>
                    <div className='notes'>{booking.reviewer_comment}</div>
                    {
                      (this.state.view === '/booking' && this.props.currentProject.role === 'admin') ?
                      <div className='review-request-button'>
                        <button onClick={this.getBookingDetail.bind(this, booking.id)}>{'Review Request'}</button>
                      </div> : null
                    }
                  </div>
                  {
                    (this.props.currentProject.role === 'admin') ? null : <div className='status-wrapper'>
                      <div className={`status ${booking.status.toLowerCase()}`}>{booking.status.toLowerCase()}</div>
                    </div>
                  }
                </div>
            </div> })
          }
        </div>
    </div> });
  }


  render() {
    // console.log('MySchedule this.props ', this.props);
    // console.log('MySchedule  this.state ', this.state);

    const scheduled = (this.state.sortedBy === 'date') ? this.renderShedulesByDate()
      : (this.state.sortedBy === 'resource') ? this.renderShedulesByResource()
      : [];

    if (_.isEmpty(this.props.projects)) { return <NoProjectsPlaceholder />; } else {
      return (
          <div className="main-content">

            <div className='schedule-wrapper'>
              <div className='schedule-container'>

                <div className='schedule-radiobuttons-container'>

                  <div className='schedule-radiobuttons'>
                    <div className='radio-by-date'>
                      <div className={`radio-item ${ (this.state.sortedBy === 'date') ? 'checked-date' : '' }`}>
                        <input type="radio" id="ritema" name="ritem" value="date"
                          readOnly
                          checked={ (this.state.sortedBy === 'date') ? true : false }
                          onClick={this.chooseScheduleSorting}
                        />
                        <label htmlFor="ritema">{'Sort By Date'}</label>
                      </div>
                    </div>
                    <div className='radio-by-resource'>
                      <div className={`radio-item ${ (this.state.sortedBy === 'resource') ? 'checked-resource' : '' }`}>
                        <input type="radio" id="ritemb" name="ritem" value="resource"
                          readOnly
                          checked={ (this.state.sortedBy === 'resource') ? true : false }
                          onClick={this.chooseScheduleSorting}
                        />
                        <label htmlFor="ritemb">{'Sort By Resource'}</label>
                      </div>
                    </div>
                  </div>

                  {
                    (this.props.history.location.pathname === '/booking' && this.props.currentProject.role === 'admin') ?
                    <div className='only-my-resources'>
                      <div className='switch-title'>{'Only Show My Resources'}</div>
                      <label className="switch">
                        <input type="checkbox"
                          checked={this.state.isOnlyMyResources}
                          name={'sort'}
                          id={'active'}
                          value={this.state.isOnlyMyResources}
                          onChange={this.toggleOnlyMyResources}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div> : null
                  }

                </div>


                <div>
                  { (_.isEmpty(scheduled)) ? <div>{'You currently do not have any booking requests for this project'}</div> : scheduled }
                </div>
              </div>
            </div>
          </div>
      );
    }
  }
}


const mapStateToProps = ({ currentProject, schedules, projects, userInfo }) => ({
  currentProject,
  schedules,
  projects,
  userInfo,
});

const actions = {
  _getShedules,
  _getShedulesForUser,
  _getBookingById,
  // setSheduleType,
};

export default connect(mapStateToProps, actions)(MySchedule);
