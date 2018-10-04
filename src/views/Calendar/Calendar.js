import React, { Component, Children } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Select from 'react-select';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import CustomToolbar from './custom-toolbar.js';

import { getResourcesNotSortedEnd } from '../../service/endPoint.js';
import { getSchedulesForCalendar as _getSchedulesForCalendar } from '../../actions/schedule-actions.js';
import { getResourceDetails as _getResourceDetails } from '../../actions/resources-actions.js';

import BookingDetail from '../../components/Booking/booking-detail.js';

import RequestAdminBooking from '../../components/Booking/request-admin-booking.js';

import {
  getBookingById as _getBookingById,
} from '../../actions/booking-actions.js';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const EMPTY_SLOTS_COLOR = '#dedede';
const CURRENT_DATE = moment().toDate();

const leftColumn = document.getElementsByClassName('rbc-time-gutter');
const topRow = document.getElementsByClassName('rbc-row-bg');

class Calendar extends Component {
  constructor(props){
      super(props);
      this.state = {
          events: (_.isEmpty(this.props.calendarSchedules)) ? [] : this.filterSchedules(null),
          currentStart: '',
          currentEnd: '',
          currentView: 'week',
          currentStartWeek: '',
          currentEndWeek: '',
          currentStartDay: '',
          currentEndDay: '',
          currentStartAgenda: '',
          currentEndAgenda: '',
          navigationDate: null,
          resourceName: '',
          resourceId: '',
          options: [],
          isBookingOpen: false,
          currentQuery: '',
          currentResource: (_.isEmpty(this.props.resourceDetailed)) ? '' : this.props.resourceDetailed.id,

          isRequestAdminBookingOpen: null,
      };
  }

  makeMonthQuery = (date, period, project_id, start, resourceIdFromUrl) => {
    if (start) {
      const startOfMonth = moment(start).startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment(start).endOf('month').add(1, 'days').format('YYYY-MM-DD');
      let query;
      if (!project_id) {
        query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfMonth}&end_date=${endOfMonth}`;
      } else {
        query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfMonth}&end_date=${endOfMonth}`;
      }
      this.props._getSchedulesForCalendar(query);
      this.setState({ currentStart: startOfMonth, currentEnd: endOfMonth, currentView: period });
    } else {
      let startOfMonth;
      let endOfMonth;
      if (!date) {
        startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        endOfMonth = moment().endOf('month').add(1, 'days').format('YYYY-MM-DD');
      } else {
        startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
        endOfMonth = moment(date).endOf('month').add(1, 'days').format('YYYY-MM-DD');
      }
      let query;
      if (resourceIdFromUrl) {
        if (!project_id) {
          query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfMonth}&end_date=${endOfMonth}&resource_id=${resourceIdFromUrl}`;
        } else {
          query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfMonth}&end_date=${endOfMonth}&resource_id=${resourceIdFromUrl}`;
        }
      } else {
        if (!project_id) {
          query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfMonth}&end_date=${endOfMonth}`;
        } else {
          query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfMonth}&end_date=${endOfMonth}`;
        }
      }
      this.props._getSchedulesForCalendar(query);
      this.setState({ currentStart: startOfMonth, currentEnd: endOfMonth, currentView: period, currentQuery: query });
    }
  }

  makeWeekQuery = (date, period, project_id, start, resourceIdFromUrl) => {
    if (start) {
      const startOfWeek = moment(start).startOf('week').format('YYYY-MM-DD');
      const endOfWeek = moment(start).endOf('week').add(1, 'days').format('YYYY-MM-DD');
      let query;
      if (!project_id) {
        query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfWeek}&end_date=${endOfWeek}`;
      } else {
        query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfWeek}&end_date=${endOfWeek}`;
      }
      this.props._getSchedulesForCalendar(query);
      this.setState({ currentStartWeek: startOfWeek, currentEndWeek: endOfWeek, currentView: period });
    } else {
      let startOfWeek;
      let endOfWeek;
      if (!date) {
        startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
        endOfWeek = moment().endOf('week').add(1, 'days').format('YYYY-MM-DD');
      } else {
        startOfWeek = moment(date).startOf('week').format('YYYY-MM-DD');
        endOfWeek = moment(date).endOf('week').add(1, 'days').format('YYYY-MM-DD');
      }
      let query;
      if (resourceIdFromUrl) {
        if (!project_id) {
          query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfWeek}&end_date=${endOfWeek}&resource_id=${resourceIdFromUrl}`;
        } else {
          query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfWeek}&end_date=${endOfWeek}&resource_id=${resourceIdFromUrl}`;
        }
      } else {
        if (!project_id) {
          query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfWeek}&end_date=${endOfWeek}`;
        } else {
          query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfWeek}&end_date=${endOfWeek}`;
        }
      }
      this.props._getSchedulesForCalendar(query);
      this.setState({ currentStartWeek: startOfWeek, currentEndWeek: endOfWeek, currentView: period, currentQuery: query });
    }
  }

  makeDayQuery = (date, period, project_id, start, resourceIdFromUrl) => {
    if (start) {
      const startOfDay = moment(start).startOf('day').format('YYYY-MM-DD');
      const endOfDay = moment(start).endOf('day').add(1, 'days').format('YYYY-MM-DD');
      let query;
      if (!project_id) {
        query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfDay}&end_date=${endOfDay}`;
      } else {
        query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfDay}&end_date=${endOfDay}`;
      }
      this.props._getSchedulesForCalendar(query);
      this.setState({ currentStartDay: startOfDay, currentEndDay: endOfDay, currentView: period });
    } else {
      let startOfDay;
      let endOfDay;
      if (!date) {
        startOfDay = moment().startOf('day').format('YYYY-MM-DD');
        endOfDay = moment().endOf('day').add(1, 'days').format('YYYY-MM-DD');
      } else {
        startOfDay = moment(date).startOf('day').format('YYYY-MM-DD');
        endOfDay = moment(date).endOf('day').add(1, 'days').format('YYYY-MM-DD');
      }
      let query;
      if (resourceIdFromUrl) {
        if (!project_id) {
          query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfDay}&end_date=${endOfDay}&resource_id=${resourceIdFromUrl}`;
        } else {
          query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfDay}&end_date=${endOfDay}&resource_id=${resourceIdFromUrl}`;
        }
      } else {
        if (!project_id) {
          query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfDay}&end_date=${endOfDay}`;
        } else {
          query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfDay}&end_date=${endOfDay}`;
        }
      }
      this.props._getSchedulesForCalendar(query);
      this.setState({ currentStartDay: startOfDay, currentEndDay: endOfDay, currentView: period, currentQuery: query });
    }
  }

  makeAgendaQuery = (date, period, project_id, start, resourceIdFromUrl) => {
    if (start) {
      const startOfAgenda = moment(start).format('YYYY-MM-DD');
      const endOfAgenda = moment(start).add(1, 'months').add(1, 'days').format('YYYY-MM-DD');
      let query;
      if (!project_id) {
        query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfAgenda}&end_date=${endOfAgenda}`;
      } else {
        query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfAgenda}&end_date=${endOfAgenda}`;
      }
      this.props._getSchedulesForCalendar(query);
      this.setState({ currentStartAgenda: startOfAgenda, currentEndAgenda: endOfAgenda, currentView: period });
    } else {
      let startOfAgenda;
      let endOfAgenda;
      if (!date) {
        startOfAgenda = moment().format('YYYY-MM-DD');
        endOfAgenda = moment().add(1, 'months').add(1, 'days').format('YYYY-MM-DD');
      } else {
        startOfAgenda = moment(date).format('YYYY-MM-DD');
        endOfAgenda = moment(date).add(1, 'months').add(1, 'days').format('YYYY-MM-DD');
      }
      let query;
      if (resourceIdFromUrl) {
        if (!project_id) {
          query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfAgenda}&end_date=${endOfAgenda}&resource_id=${resourceIdFromUrl}`;
        } else {
          query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfAgenda}&end_date=${endOfAgenda}&resource_id=${resourceIdFromUrl}`;
        }
      } else {
        if (!project_id) {
          query = `/api/view/schedule?project_id=${this.props.currentProject.id}&start_date=${startOfAgenda}&end_date=${endOfAgenda}`;
        } else {
          query = `/api/view/schedule?project_id=${project_id}&start_date=${startOfAgenda}&end_date=${endOfAgenda}`;
        }
      }
      this.props._getSchedulesForCalendar(query);
      this.setState({ currentStartAgenda: startOfAgenda, currentEndAgenda: endOfAgenda, currentView: period, currentQuery: query });
    }
  }

  getEventsFromProps = (schedules) => {
    const calendarEvents = [];
    schedules.forEach((day) => {
      day.bookings.forEach((booking) => {
        if (!this.state.resourceId) {
          if (this.props.match.params.resource_id) {
            if (booking.resource_id === this.props.match.params.resource_id) {
              calendarEvents.push({
                  title: booking.company,
                  // allDay: false,
                  start: moment(booking.start_date).toDate(),
                  end: moment(booking.end_date).toDate(),
                  booking_id: booking.id,
                  status: booking.status
                });
            }
          } else {
            calendarEvents.push({
                title: booking.company,
                // allDay: false,
                start: moment(booking.start_date).toDate(),
                end: moment(booking.end_date).toDate(),
                booking_id: booking.id,
                status: booking.status
              });
          }
        } else {
          if (booking.resource_id === this.state.resourceId) {
            calendarEvents.push({
                title: booking.company,
                start: moment(booking.start_date).toDate(),
                end: moment(booking.end_date).toDate(),
                booking_id: booking.id,
                status: booking.status
              });
          }
        }
      })
    });
    return calendarEvents;
  }

  getResources = (project_id) => {
    if (!project_id) return;
    return getResourcesNotSortedEnd(project_id)
      .then(resources => {
        const options = resources.map(resource => ({
            value: resource.name,
            label: resource.name,
            id: resource.id
          }));
        this.setState({ options });
      }
    );
  }

  componentDidMount() {
    if (!this.props.currentProject.id) return;
    this.makeWeekQuery(null, 'week', null, null, this.props.match.params.resource_id);
    if (!this.props.match.params.resource_id) {
      this.getResources(this.props.currentProject.id);
    } else {
      this.props._getResourceDetails(this.props.match.params.resource_id);
      const newEvents = this.filterSchedules(this.props.match.params.resource_id);
      this.setState({ events: newEvents });
    }

    if (leftColumn[0]) {
      for (let i = 0; i < leftColumn[0].children.length; i++) {
        for (let j = 0; j < leftColumn[0].children[i].children.length; j++) {
          leftColumn[0].children[i].children[j].style.backgroundColor = '';
        }
      }
    }
    if (topRow[0]) {
      for (let i = 0; i < topRow[0].children.length; i++) {
        topRow[0].children[i].style.backgroundColor = '';
      }
    }
  }

  componentDidUpdate() {
    if (leftColumn[0]) {
      for (let i = 0; i < leftColumn[0].children.length; i++) {
        for (let j = 0; j < leftColumn[0].children[i].children.length; j++) {
          leftColumn[0].children[i].children[j].style.backgroundColor = '';
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.calendarSchedules, nextProps.calendarSchedules)) {
      const newEvents = this.getEventsFromProps(nextProps.calendarSchedules);
      this.setState({ events: newEvents });
    }
    if (this.props.currentProject.id !== nextProps.currentProject.id ) {
      if (nextProps.currentProject.role !== 'admin') {
        this.props.history.push('/');
      } else {
        this.setState({ resourceName: '', resourceId: '' });
        if (this.state.currentView === 'week') {
          this.makeWeekQuery(null, this.state.currentView, nextProps.currentProject.id, this.state.navigationDate, this.props.match.params.resource_id);
        } else if (this.state.currentView === 'month') {
          this.makeMonthQuery(null, this.state.currentView, nextProps.currentProject.id, this.state.navigationDate, this.props.match.params.resource_id);
        } else if (this.state.currentView === 'agenda') {
          this.makeAgendaQuery(null, this.state.currentView, nextProps.currentProject.id, this.state.navigationDate, this.props.match.params.resource_id);
        } else {
          this.makeDayQuery(null, this.state.currentView, nextProps.currentProject.id, this.state.navigationDate, this.props.match.params.resource_id);
        }
        if (!this.props.match.params.resource_id) {
          this.getResources(nextProps.currentProject.id);
        }
      }
    }
    if (!_.isEqual(this.props.resourceDetailed, nextProps.resourceDetailed)) {
      this.setState({currentResource: nextProps.resourceDetailed.id});
    }

    if (this.props.match.params.resource_id !== nextProps.match.params.resource_id) {

      this.setState({isRequestAdminBookingOpen: null, currentQuery: ''});

      this.getResources(this.props.currentProject.id);
      if (this.state.currentView === 'week') {
        this.makeWeekQuery(null, this.state.currentView, this.props.currentProject.id, this.state.navigationDate, nextProps.match.params.resource_id);
      } else if (this.state.currentView === 'month') {
        this.makeMonthQuery(null, this.state.currentView, this.props.currentProject.id, this.state.navigationDate, nextProps.match.params.resource_id);
      } else if (this.state.currentView === 'agenda') {
        this.makeAgendaQuery(null, this.state.currentView, this.props.currentProject.id, this.state.navigationDate, nextProps.match.params.resource_id);
      } else {
        this.makeDayQuery(null, this.state.currentView, this.props.currentProject.id, this.state.navigationDate, nextProps.match.params.resource_id);
      }

    }
  }

  selectedEvent(event) {
    this.props._getBookingById(event.booking_id, () => {
      this.setState({isBookingOpen: true});
    });
  }

  addNewEventAlert(slotInfo) {

    const currentDateUnix = moment().format('X');
    if (moment(slotInfo.end).format('X') < currentDateUnix) return;
    if (_.isEmpty(this.props.currentProject)) return;

    if (this.props.match.params.resource_id || this.state.resourceId) {

      if (this.props.resourceDetailed && !this.props.resourceDetailed.schedule) return;

      if (moment(slotInfo.start).isSame(slotInfo.end, 'day')) {
        const dayOfWeekEnd = moment(slotInfo.end).format('dddd').toLowerCase();
        if (this.props.resourceDetailed.schedule[dayOfWeekEnd] === undefined) {
          return;
        } else {
          if (this.props.resourceDetailed.schedule[dayOfWeekEnd].start_time !== undefined) {
            const timeFormatStart = moment(slotInfo.start).format('HH:mm');
            const timeFormatEnd = moment(slotInfo.end).format('HH:mm');
            const timeStart = moment(timeFormatStart, 'HH:mm');
            const timeEnd = moment(timeFormatEnd, 'HH:mm');
            const scheduleStartTime = moment(this.props.resourceDetailed.schedule[dayOfWeekEnd].start_time, 'HH:mm');
            const scheduleEndTime = moment(this.props.resourceDetailed.schedule[dayOfWeekEnd].end_time, 'HH:mm');
            if (moment(timeStart).isBefore(scheduleStartTime) || moment(timeEnd).isAfter(scheduleEndTime)) {
              return;
            }
          } else if (!this.props.resourceDetailed.schedule[dayOfWeekEnd].full_day) {
            return;
          }
        }
      } else {
        if (moment(slotInfo.start).format('X') < currentDateUnix) {
          return;
        } else {
          if (slotInfo.slots.every((date) => {
            const dayOfWeek = moment(date).format('dddd').toLowerCase();
            return this.props.resourceDetailed.schedule[dayOfWeek] !== undefined
          })) {
          } else {
            return;
          }
        }
      }
    }

    if (this.props.currentProject.role === 'admin') {

      if (this.state.resourceId) {
        // this.props.bookAdminResource({resourceId: this.state.resourceId, resourceName: this.state.resourceName}, this.props.currentProject, slotInfo);
        this.setState({ isRequestAdminBookingOpen:
          <RequestAdminBooking
            info={slotInfo}
            currentResource={{resourceId: this.state.resourceId, resourceName: this.state.resourceName}}
            currentProject={this.props.currentProject}
            closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
          /> });
      } else {
        // this.props.bookAdminResource(null, this.props.currentProject, slotInfo);
        this.setState({ isRequestAdminBookingOpen:
          <RequestAdminBooking
            info={slotInfo}
            currentResource={null}
            currentProject={this.props.currentProject}
            closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
          /> });
      }

    } else {

      if (this.props.match.params.resource_id && !_.isEmpty(this.props.resourceDetailed) &&
          this.props.match.params.resource_id === this.props.resourceDetailed.id) {

            this.setState({ isRequestAdminBookingOpen:
              <RequestAdminBooking
                info={slotInfo}
                currentResource={{resourceId: this.props.resourceDetailed.id, resourceName: this.props.resourceDetailed.name}}
                currentProject={this.props.currentProject}
                closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
              /> });

      } else {
        if (this.state.resourceId) {
          this.setState({ isRequestAdminBookingOpen:
            <RequestAdminBooking
              info={slotInfo}
              currentResource={{resourceId: this.state.resourceId, resourceName: this.state.resourceName}}
              currentProject={this.props.currentProject}
              closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
            /> });
        } else {
          this.setState({ isRequestAdminBookingOpen:
            <RequestAdminBooking
              info={slotInfo}
              currentResource={null}
              currentProject={this.props.currentProject}
              closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
            /> });
        }
      }
    }
  }

  navigateOccur = (date, view, direct) => {
    this.setState({navigationDate: date});
    if (view !== 'month') {
      setTimeout(() => {
        const leftColumnNav = document.getElementsByClassName('rbc-time-gutter');
        if (leftColumnNav[0]) {
          for (let i = 0; i < leftColumnNav[0].children.length; i++) {
            for (let j = 0; j < leftColumnNav[0].children[i].children.length; j++) {
              leftColumnNav[0].children[i].children[j].style.backgroundColor = '';
            }
          }
        }
        const topRowNav = document.getElementsByClassName('rbc-row-bg');
        if (topRowNav[0]) {
          for (let i = 0; i < topRowNav[0].children.length; i++) {
            topRowNav[0].children[i].style.backgroundColor = '';
          }
        }
      }, 50);
    }

    if (view === 'week') {
      if (direct === 'PREV') {
        this.makeWeekQuery(date, 'week', null, null, this.props.match.params.resource_id);
      } else if (direct === 'NEXT') {
        this.makeWeekQuery(date, 'week', null, null, this.props.match.params.resource_id);
      } else {
        this.makeWeekQuery(null, 'week', null, null, this.props.match.params.resource_id);
      }
    } else if (view === 'month') {
      if (direct === 'PREV') {
        this.makeMonthQuery(date, view, null, null, this.props.match.params.resource_id);
      } else if (direct === 'NEXT') {
        this.makeMonthQuery(date, view, null, null, this.props.match.params.resource_id);
      } else {
        if (date) {
          this.makeMonthQuery(date, view, null, null, this.props.match.params.resource_id);
        } else {
          this.makeMonthQuery(null, 'month', null, null, this.props.match.params.resource_id);
        }
      }
    } else if (view === 'day') {
      if (direct === 'PREV') {
        this.makeDayQuery(date, view, null, null, this.props.match.params.resource_id);
      } else if (direct === 'NEXT') {
        this.makeDayQuery(date, view, null, null, this.props.match.params.resource_id);
      } else {
        this.makeDayQuery(null, 'day', null, null, this.props.match.params.resource_id);
      }
    } else if (view === 'agenda') {
      if (direct === 'PREV') {
        this.makeAgendaQuery(date, view, null, null, this.props.match.params.resource_id);
      } else if (direct === 'NEXT') {
        this.makeAgendaQuery(date, view, null, null, this.props.match.params.resource_id);
      } else {
        this.makeAgendaQuery(null, 'agenda', null, null, this.props.match.params.resource_id);
      }
    } else {
      return;
    }
  }

  changeViewOccur = (view) => {
    this.setState({currentView: view});

    if (view === 'week') {
      if (this.state.navigationDate) {
        this.makeWeekQuery(null, 'week', null, this.state.navigationDate, this.props.match.params.resource_id);
      } else {
        this.makeWeekQuery(null, 'week', null, null, this.props.match.params.resource_id);
      }
    } else if (view === 'month') {
      if (this.state.navigationDate) {
        this.makeMonthQuery(null, 'month', null, this.state.navigationDate, this.props.match.params.resource_id);
      } else {
        this.makeMonthQuery(null, 'month', null, null, this.props.match.params.resource_id);
      }
    } else if (view === 'agenda') {
      if (this.state.navigationDate) {
        this.makeAgendaQuery(null, 'agenda', null, this.state.navigationDate, this.props.match.params.resource_id);
      } else {
        this.makeAgendaQuery(null, 'agenda', null, null, this.props.match.params.resource_id);
      }
    }

    if (view !== 'month') {
      setTimeout(() => {
        const leftColumnView = document.getElementsByClassName('rbc-time-gutter');
        if (leftColumnView[0]) {
          for (let i = 0; i < leftColumnView[0].children.length; i++) {
            for (let j = 0; j < leftColumnView[0].children[i].children.length; j++) {
              leftColumnView[0].children[i].children[j].style.backgroundColor = '';
            }
          }
        }
        const topRowView = document.getElementsByClassName('rbc-row-bg');
        if (topRowView[0]) {
          for (let i = 0; i < topRowView[0].children.length; i++) {
            topRowView[0].children[i].style.backgroundColor = '';
          }
        }
      }, 50);
    }

    this.setState({
      currentStart: '',
      currentEnd: '',
      currentStartWeek: '',
      currentEndWeek: '',
      currentStartDay: '',
      currentEndDay: '',
      currentStartAgenda: '',
      currentEndAgenda: ''
    });
  }

  filterSchedules = (_resource_id) => {
    const calendarEvents = [];
    this.props.calendarSchedules.forEach((day) => {
      day.bookings.forEach((booking) => {
        if (!_resource_id) {
          calendarEvents.push({
              title: booking.company,
              start: moment(booking.start_date).toDate(),
              end: moment(booking.end_date).toDate(),
              booking_id: booking.id,
              status: booking.status
            });
        } else {
          if (booking.resource_id === _resource_id) {
            calendarEvents.push({
                title: booking.company,
                start: moment(booking.start_date).toDate(),
                end: moment(booking.end_date).toDate(),
                booking_id: booking.id,
                status: booking.status
              });
          }
        }
      })
    });
    return calendarEvents;
  }

  selectResource = (resource) => {
    if (!resource) {
      const newEvents = this.filterSchedules(null);
      this.setState({ events: newEvents, resourceName: '', resourceId: '' });
      return;
    }
    this.props._getResourceDetails(resource.id);
    const newEvents = this.filterSchedules(resource.id);
    this.setState({ events: newEvents, resourceName: resource.label, resourceId: resource.id });
  }

  findResourceFromProps = () => {
    let resourceName;
    if (!_.isEmpty(this.props.resources)) {
      if (this.props.resources.sorted) {
        this.props.resources.resources.forEach((resourcesArray) => {
          resourcesArray.items.forEach((resource) => { if (resource.id === this.props.match.params.resource_id) resourceName = resource.name });
        });
      } else {
        this.props.resources.resources.forEach((resource) => { if (resource.id === this.props.match.params.resource_id) resourceName = resource.name });
      }
     }
    return resourceName;
  }

  calendarEventsStyle = (event, start, end, isSelected) => {
    let style;
    if (event.status === 'APPROVED') {
      style = {
        backgroundColor: ' #43A047',
      };
    } else if (event.status === 'REJECTED' || event.status === 'CANCELLED') {
      style = {
        backgroundColor: '#F4511E',
      };
    } else if (event.status === 'PENDING') {
      style = {
        backgroundColor: '#FFB300',
        color: '#FEFEFE',
      };
    } else {
      style = {
        backgroundColor: '',
        borderColor: ''
      };
    }
    return {
      style
    };
  }

  calendarSlotsStyle = (date) => {
    let color;
    if (moment(date).format('X') < moment(CURRENT_DATE).format('X')) {
      color = EMPTY_SLOTS_COLOR;
    } else {
      if (this.props.match.params.resource_id) {
        color = EMPTY_SLOTS_COLOR;
        if (this.props.resourceDetailed.schedule) {
          const dateOfWeek = moment(date).format('dddd').toLowerCase();
          if (this.props.resourceDetailed.schedule[dateOfWeek] !== undefined) {
            if (this.props.resourceDetailed.schedule[dateOfWeek].start_time !== undefined) {
              const timeFormat = moment(date).format('HH:mm');
              const time = moment(timeFormat, 'HH:mm');
              const startTime = moment(this.props.resourceDetailed.schedule[dateOfWeek].start_time, 'HH:mm');
              const endTime = moment(this.props.resourceDetailed.schedule[dateOfWeek].end_time, 'HH:mm').subtract(30, 'minutes');
              if (moment(time).isBefore(startTime) || moment(time).isAfter(endTime)) {

                if (timeFormat === '23:30' && moment(endTime).format('HH:mm') === '23:29') {
                  color = '';
                } else {
                  color = EMPTY_SLOTS_COLOR;
                }
              } else {
                if (moment(date).format('X') < moment(CURRENT_DATE).format('X')) {
                  color = EMPTY_SLOTS_COLOR;
                } else {
                  color = '';
                }
              }
            } else if (this.props.resourceDetailed.schedule[dateOfWeek].full_day) {
              if (moment(date).format('X') < moment(CURRENT_DATE).format('X')) {
                color = EMPTY_SLOTS_COLOR;
              } else {
                color = '';
              }
            }
          }
        }
      } else {
        if (moment(date).format('X') < moment(CURRENT_DATE).format('X')) {
          color = EMPTY_SLOTS_COLOR;
        }

        if (this.props.resourceDetailed.schedule && this.state.resourceId) {

          color = EMPTY_SLOTS_COLOR;
          const dateOfWeek = moment(date).format('dddd').toLowerCase();
          if (this.props.resourceDetailed.schedule[dateOfWeek] !== undefined) {
            if (this.props.resourceDetailed.schedule[dateOfWeek].start_time !== undefined) {
              const timeFormat = moment(date).format('HH:mm');
              const time = moment(timeFormat, 'HH:mm');
              const startTime = moment(this.props.resourceDetailed.schedule[dateOfWeek].start_time, 'HH:mm');
              const endTime = moment(this.props.resourceDetailed.schedule[dateOfWeek].end_time, 'HH:mm').subtract(30, 'minutes');
              if (moment(time).isBefore(startTime) || moment(time).isAfter(endTime)) {
                if (timeFormat === '23:30' && moment(endTime).format('HH:mm') === '23:29') {
                  color = '';
                } else {
                  color = EMPTY_SLOTS_COLOR;
                }
              } else {
                if (moment(date).format('X') < moment(CURRENT_DATE).format('X')) {
                  color = EMPTY_SLOTS_COLOR;
                } else {
                  color = '';
                }
              }
            } else if (this.props.resourceDetailed.schedule[dateOfWeek].full_day) {
              color = '';
            }
          }
        } else {
          if (this.state.resourceId && this.state.resourceId === this.props.resourceDetailed.id && !this.props.resourceDetailed.schedule) {
            color = EMPTY_SLOTS_COLOR;
          }
        }
      }
    }

    const style = {
      backgroundColor: color,
    };
    return {
      style
    };
  }

  createNewBooking = () => {
    if (_.isEmpty(this.props.currentProject)) return;
    if (this.props.currentProject.role === 'admin') {
      if (this.state.resourceId) {
        this.setState({ isRequestAdminBookingOpen:
          <RequestAdminBooking
            info={null}
            currentResource={{resourceId: this.state.resourceId, resourceName: this.state.resourceName}}
            currentProject={this.props.currentProject}
            closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
          /> });
      } else {
        this.setState({ isRequestAdminBookingOpen:
          <RequestAdminBooking
            info={null}
            currentResource={null}
            currentProject={this.props.currentProject}
            closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
          /> });
      }
    } else {
      if (this.props.match.params.resource_id) {
        if (_.isEmpty(this.props.resourceDetailed)) return;
        this.setState({ isRequestAdminBookingOpen:
          <RequestAdminBooking
            info={null}
            currentResource={{resourceId: this.props.resourceDetailed.id, resourceName: this.props.resourceDetailed.name}}
            currentProject={this.props.currentProject}
            closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
          /> });
      } else {
        if (this.state.resourceId) {
          this.setState({ isRequestAdminBookingOpen:
            <RequestAdminBooking
              info={null}
              currentResource={{resourceId: this.state.resourceId, resourceName: this.state.resourceName}}
              currentProject={this.props.currentProject}
              closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
            /> });
        } else {
          this.setState({ isRequestAdminBookingOpen:
            <RequestAdminBooking
              info={null}
              currentResource={null}
              currentProject={this.props.currentProject}
              closeBookResource={this.sendRequestOrCloseRequestAdminBooking}
            /> });
        }
      }
        // this.props.bookResource(null,
        //   this.props.resourceDetailed,
        //   this.props.currentProject
        // );
        // this.setState({ isRequestBookingOpen:
        //   <RequestBooking
        //     info={null}
        //     resourceDetailed={this.props.resourceDetailed}
        //     currentProject={this.props.currentProject}
        //     closeBookResource={this.sendRequestOrCloseRequestBooking}
        //   /> });
    }
  }

  approveDeclineAndCloseBooking = () => {
    if (this.state.currentQuery) {
      this.props._getSchedulesForCalendar(this.state.currentQuery);
    }
    this.setState({isBookingOpen: false});
  }

  sendRequestOrCloseRequestAdminBooking = () => {
    if (this.state.currentQuery) {
      this.props._getSchedulesForCalendar(this.state.currentQuery);
    }
    this.setState({isRequestAdminBookingOpen: null});
  }

  // sendRequestOrCloseRequestBooking = () => {
  //   if (this.state.currentQuery) {
  //     this.props._getSchedulesForCalendar(this.state.currentQuery);
  //   }
  //   this.setState({isRequestBookingOpen: null});
  // }

  // iPhoneVersion = () => {
  //   var iHeight = window.screen.height;
  //   var iWidth = window.screen.width;
  //   if (iWidth === 320 && iHeight === 480) {
  //     return "4";
  //   }
  //   else if (iWidth === 375 && iHeight === 667) {
  //     return "6";
  //   }
  //   else if (iWidth === 414 && iHeight === 736) {
  //     return "6+";
  //   }
  //   else if (iWidth === 320 && iHeight === 568) {
  //     return "5";
  //   }
  //   else if (iHeight <= 480) {
  //     return "2-3";
  //   }
  //   return 'none';
  // }

  isIphone = () => {
    return !!navigator.userAgent.match(/iPhone/i);
  }
  isIpad = () => {
    return !!navigator.userAgent.match(/Ipad/i);
  }

  closeBooking = () => {
    this.setState({ isBookingOpen: false });
  }


  render() {

    const isIphone = (this.isIphone() || this.isIpad()) ? 'Iphone' : '';

    return (
      <div>
      {
        (this.state.isBookingOpen) ?
        <BookingDetail
          {...this.props}
          approveDeclineAndCloseBookingFromCalendar={this.approveDeclineAndCloseBooking}
          closeBookingFromCalendar={this.closeBooking}
        />
        : null
      }

      {
        this.state.isRequestAdminBookingOpen
      }

      <div className={`main-content${(this.state.isBookingOpen || this.state.isRequestAdminBookingOpen || this.state.isRequestBookingOpen)
        ? ' calendar-custom' : ''}`}>
        <div className='calendar-wrapper'>
          <div className='select-resource-container'>
          {
            (this.props.match.params.resource_id) ? <div className='resource-selected-from-list'>{this.findResourceFromProps()}</div> :
            <Select
              placeholder={'Select Resource'}
              options={this.state.options}
              clearable={true}
              value={(this.state.resourceName !== '') ? this.state.resourceName : undefined}
              onChange={this.selectResource}
              searchable={true}
            />
          }
          </div>

          <BigCalendar
            components={{
            toolbar: CustomToolbar,
              dateCellWrapper: ({children, value}) => {
                let cellColor = (moment(value).diff(CURRENT_DATE, 'days') < 0) ? EMPTY_SLOTS_COLOR : '';
                if ((this.state.resourceId && this.state.currentResource && this.state.resourceId === this.state.currentResource) ||
                (this.props.match.params.resource_id && !_.isEmpty(this.props.resourceDetailed) &&
                this.props.match.params.resource_id === this.props.resourceDetailed.id)) {
                  const dayOfWeek = moment(value).format('dddd').toLowerCase();
                  if (this.props.resourceDetailed.schedule && this.props.resourceDetailed.schedule[dayOfWeek] === undefined) {
                  cellColor = EMPTY_SLOTS_COLOR;
                  }
                }
                return React.cloneElement(Children.only(children), {
                  style: {
                    ...children.props.style,
                    backgroundColor: cellColor,
                  },
                });
              }
            }}
            selectable='ignoreEvents'
            events={this.state.events}
            defaultView='week'
            scrollToTime={moment([1970, 1, 1, 6]).toDate()}
            defaultDate={moment().toDate()}
            onSelectEvent={event => this.selectedEvent(event)}
            onSelectSlot={(slotInfo) => this.addNewEventAlert(slotInfo)}
            onNavigate={this.navigateOccur}
            eventPropGetter={this.calendarEventsStyle}
            slotPropGetter={this.calendarSlotsStyle}
            onView={this.changeViewOccur}
          />
          </div>
          <div className={(this.state.isBookingOpen) ? `plus-booking-button-container not-visible ${isIphone}` :
          `plus-booking-button-container ${isIphone}`}>
            <div className='make-booking' onClick={this.createNewBooking}>{'Make Booking'}</div>
            <div className='plus-booking-button' onClick={this.createNewBooking}>{'+'}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currentProject, users, calendarSchedules, resources, resourceDetailed, booking }) => ({
  currentProject,
  calendarSchedules,
  resources,
  resourceDetailed,
  booking,
});

const actions = {
  _getSchedulesForCalendar,
  _getResourceDetails,
  _getBookingById,
};

export default connect(mapStateToProps, actions)(Calendar);
