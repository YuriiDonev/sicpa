
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
// import momentTZ from 'moment-timezone';
import _ from 'lodash';
// import Dropzone from 'react-dropzone';
import { NavDropdown, MenuItem } from 'react-bootstrap';
// import Card from '../../Card/Card.jsx';
// import Select from 'react-select';

// import Image from './image.js';
// import ResourceDetailedUser from '../UserRoleView/resource-detailed-user.js';

import { timeList } from '../../../mock-data/timezones.js';

class Schedule extends Component {

  state = {
    schedule: {
      monday: {
        active: false,
        start_time: '',
        start_time12: '',
        end_time: '',
        end_time12: '',
        full_day: false,
      },
      tuesday: {
        active: false,
        start_time: '',
        start_time12: '',
        end_time: '',
        end_time12: '',
        full_day: false,
      },
      wednesday: {
        active: false,
        start_time: '',
        start_time12: '',
        end_time: '',
        end_time12: '',
        full_day: false,
      },
      thursday: {
        active: false,
        start_time: '',
        start_time12: '',
        end_time: '',
        end_time12: '',
        full_day: false,
      },
      friday: {
        active: false,
        start_time: '',
        start_time12: '',
        end_time: '',
        end_time12: '',
        full_day: false,
      },
      saturday: {
        active: false,
        start_time: '',
        start_time12: '',
        end_time: '',
        end_time12: '',
        full_day: false,
      },
      sunday: {
        active: false,
        start_time: '',
        start_time12: '',
        end_time: '',
        end_time12: '',
        full_day: false,
      }
    },
    scheduleError: '',
  }

  componentDidMount () {
    if (this.props.path === '/project/resources/add') {
      this.setState({ schedule: {
            monday: {
              active: false,
              start_time: '',
              start_time12: '',
              end_time: '',
              end_time12: '',
              full_day: false,
            },
            tuesday: {
              active: false,
              start_time: '',
              start_time12: '',
              end_time: '',
              end_time12: '',
              full_day: false,
            },
            wednesday: {
              active: false,
              start_time: '',
              start_time12: '',
              end_time: '',
              end_time12: '',
              full_day: false,
            },
            thursday: {
              active: false,
              start_time: '',
              start_time12: '',
              end_time: '',
              end_time12: '',
              full_day: false,
            },
            friday: {
              active: false,
              start_time: '',
              start_time12: '',
              end_time: '',
              end_time12: '',
              full_day: false,
            },
            saturday: {
              active: false,
              start_time: '',
              start_time12: '',
              end_time: '',
              end_time12: '',
              full_day: false,
            },
            sunday: {
              active: false,
              start_time: '',
              start_time12: '',
              end_time: '',
              end_time12: '',
              full_day: false,
            }
          } });
    } else {
      if (!_.isEmpty(this.props.resourceDetailed) && this.props.resourceDetailed.schedule !== null &&
      !_.isEmpty(this.props.resourceDetailed.schedule)) {
      	const newSchedule = {};
      	for (let key in this.state.schedule) {
      		newSchedule[key] = {};
      	}
      	for (let key in newSchedule) {
      		if (this.props.resourceDetailed.schedule[key]) {
      			if (this.props.resourceDetailed.schedule[key].full_day) {
      				newSchedule[key].active = this.props.resourceDetailed.schedule[key].active;
      				newSchedule[key].start_time = '';
      				newSchedule[key].start_time12 = '';
      				newSchedule[key].end_time = '';
      				newSchedule[key].end_time12 = '';
      				newSchedule[key].full_day = this.props.resourceDetailed.schedule[key].full_day;
      			} else {
      				newSchedule[key].active = this.props.resourceDetailed.schedule[key].active;
      				newSchedule[key].start_time = this.props.resourceDetailed.schedule[key].start_time;
      				newSchedule[key].start_time12 = _.find(timeList, (time) => time['24h'] === this.props.resourceDetailed.schedule[key].start_time)['12h'];
      				newSchedule[key].end_time = this.props.resourceDetailed.schedule[key].end_time;
      				newSchedule[key].end_time12 = _.find(timeList, (time) => time['24h'] === this.props.resourceDetailed.schedule[key].end_time)['12h'];
      				newSchedule[key].full_day = false;
      			}
      		} else {
            newSchedule[key].active = false;
            newSchedule[key].start_time = '';
            newSchedule[key].start_time12 = '';
            newSchedule[key].end_time = '';
            newSchedule[key].end_time12 = '';
            newSchedule[key].full_day = false;
          }
      	}
      	this.setState({schedule: newSchedule});
      }
    }
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(this.props.resourceDetailed, nextProps.resourceDetailed)) {
      if (!nextProps.resourceDetailed.schedule) {
        const newSchedule = {};
        for (let key in this.state.schedule) {
          newSchedule[key] = {
            active: false,
            start_time: '',
            start_time12: '',
            end_time: '',
            end_time12: '',
            full_day: false
          }
        }
        this.setState({schedule: newSchedule});
      } else {
        const newSchedule = {};
        for (let key in this.state.schedule) {
          newSchedule[key] = {};
        }
        for (let key in newSchedule) {
          if (nextProps.resourceDetailed.schedule[key]) {
            if (nextProps.resourceDetailed.schedule[key].full_day) {
              newSchedule[key].active = nextProps.resourceDetailed.schedule[key].active;
              newSchedule[key].start_time = '';
              newSchedule[key].start_time12 = '';
              newSchedule[key].end_time = '';
              newSchedule[key].end_time12 = '';
              newSchedule[key].full_day = nextProps.resourceDetailed.schedule[key].full_day;
            } else {
              newSchedule[key].active = nextProps.resourceDetailed.schedule[key].active;
              newSchedule[key].start_time = nextProps.resourceDetailed.schedule[key].start_time;
              newSchedule[key].start_time12 = _.find(timeList, (time) => time['24h'] === nextProps.resourceDetailed.schedule[key].start_time)['12h'];
              newSchedule[key].end_time = nextProps.resourceDetailed.schedule[key].end_time;
              newSchedule[key].end_time12 = _.find(timeList, (time) => time['24h'] === nextProps.resourceDetailed.schedule[key].end_time)['12h'];
              newSchedule[key].full_day = false;
            }
          } else {
            newSchedule[key].active = false;
            newSchedule[key].start_time = '';
            newSchedule[key].start_time12 = '';
            newSchedule[key].end_time = '';
            newSchedule[key].end_time12 = '';
            newSchedule[key].full_day = false;
          }
        }
        this.setState({schedule: newSchedule});
      }
		}
	}

	toggleActive = (event) => {
		const schedule = {};
		for (let key in this.state.schedule) {
		  schedule[key] = this.state.schedule[key];
		}
		let active;
		(event.target.value === 'true') ? active = false : active = true;
		if (event.target.id === 'active') {
			schedule[event.target.name].active = active;
			schedule[event.target.name].start_time = '';
			schedule[event.target.name].start_time12 = '';
			schedule[event.target.name].end_time = '';
			schedule[event.target.name].end_time12 = '';
			if (schedule[event.target.name].full_day) {
				schedule[event.target.name].full_day = false;
			}
		} else if (event.target.id === 'full_day') {
			schedule[event.target.name].full_day = active;
			schedule[event.target.name].start_time = '';
			schedule[event.target.name].start_time12 = '';
			schedule[event.target.name].end_time = '';
			schedule[event.target.name].end_time12 = '';
		} else {
			return;
		}
		this.setState({ schedule });
    this.isScheduleSame();
	}

	setSchedule = (event) => {
		event.preventDefault();
		const newSchedule = {};
		for (let key in this.state.schedule) {
			newSchedule[key] = this.state.schedule[key];
		}
		if (event.target.name === 'monday') {
			if (event.target.id === 'start_time') {
				newSchedule.monday.start_time = event.target.dataset.time;
				newSchedule.monday.start_time12 = event.target.innerHTML;
			} else {
				newSchedule.monday.end_time = event.target.dataset.time;
				newSchedule.monday.end_time12 = event.target.innerHTML;
			}
			this.setState({ schedule: newSchedule });
      this.isScheduleSame();
		} else if (event.target.name === 'tuesday') {
			if (event.target.id === 'start_time') {
				newSchedule.tuesday.start_time = event.target.dataset.time;
				newSchedule.tuesday.start_time12 = event.target.innerHTML;
			} else {
				newSchedule.tuesday.end_time = event.target.dataset.time;
				newSchedule.tuesday.end_time12 = event.target.innerHTML;
			}
			this.setState({ schedule: newSchedule });
      this.isScheduleSame();
		} else if (event.target.name === 'wednesday') {
			if (event.target.id === 'start_time') {
				newSchedule.wednesday.start_time = event.target.dataset.time;
				newSchedule.wednesday.start_time12 = event.target.innerHTML;
			} else {
				newSchedule.wednesday.end_time = event.target.dataset.time;
				newSchedule.wednesday.end_time12 = event.target.innerHTML;
			}
			this.setState({ schedule: newSchedule });
      this.isScheduleSame();
		} else if (event.target.name === 'thursday') {
			if (event.target.id === 'start_time') {
				newSchedule.thursday.start_time = event.target.dataset.time;
				newSchedule.thursday.start_time12 = event.target.innerHTML;
			} else {
				newSchedule.thursday.end_time = event.target.dataset.time;
				newSchedule.thursday.end_time12 = event.target.innerHTML;
			}
			this.setState({ schedule: newSchedule });
      this.isScheduleSame();
		} else if (event.target.name === 'friday') {
			if (event.target.id === 'start_time') {
				newSchedule.friday.start_time = event.target.dataset.time;
				newSchedule.friday.start_time12 = event.target.innerHTML;
			} else {
				newSchedule.friday.end_time = event.target.dataset.time;
				newSchedule.friday.end_time12 = event.target.innerHTML;
			}
			this.setState({ schedule: newSchedule });
      this.isScheduleSame();
		} else if (event.target.name === 'saturday') {
			if (event.target.id === 'start_time') {
				newSchedule.saturday.start_time = event.target.dataset.time;
				newSchedule.saturday.start_time12 = event.target.innerHTML;
			} else {
				newSchedule.saturday.end_time = event.target.dataset.time;
				newSchedule.saturday.end_time12 = event.target.innerHTML;
			}
			this.setState({ schedule: newSchedule });
      this.isScheduleSame();
		} else if (event.target.name === 'sunday') {
			if (event.target.id === 'start_time') {
				newSchedule.sunday.start_time = event.target.dataset.time;
				newSchedule.sunday.start_time12 = event.target.innerHTML;
			} else {
				newSchedule.sunday.end_time = event.target.dataset.time;
				newSchedule.sunday.end_time12 = event.target.innerHTML;
			}
			this.setState({ schedule: newSchedule });
      this.isScheduleSame();
		}
	}

  isScheduleSame = () => {
    if (this.props.path === '/project/resources/add') {

      const newSchedule = {};
      for (let key in this.state.schedule) {
        if (this.state.schedule[key].active) {
          newSchedule[key] = {};
          if (this.state.schedule[key].full_day) {
            newSchedule[key].active = this.state.schedule[key].active;
            newSchedule[key].full_day = this.state.schedule[key].full_day;
          } else if (!this.state.schedule[key].start_time || !this.state.schedule[key].end_time) {
            delete newSchedule[key];
          } else {
            newSchedule[key].active = this.state.schedule[key].active;
            newSchedule[key].start_time = this.state.schedule[key].start_time;
            newSchedule[key].end_time = this.state.schedule[key].end_time;
          }
        } else {
          delete newSchedule[key];
        }
      }
      for (let key1 in this.state.schedule) {
        if (this.state.schedule[key1].active && !this.state.schedule[key1].full_day &&
          (this.state.schedule[key1].start_time === '' || this.state.schedule[key1].end_time === '')) {
          return this.props.takeState(false, '', true);
        }
      }
      if (_.isEmpty(newSchedule)) {
        this.props.takeState(true, '', true);
      } else {
        this.props.takeState(true, JSON.stringify(newSchedule), true);
      }

    } else {
      const newSchedule = {};
      for (let key in this.state.schedule) {
        if (this.state.schedule[key].active) {
          newSchedule[key] = {};
          if (this.state.schedule[key].full_day) {
            newSchedule[key].active = this.state.schedule[key].active;
            newSchedule[key].full_day = this.state.schedule[key].full_day;
          } else if (!this.state.schedule[key].start_time || !this.state.schedule[key].end_time) {
            delete newSchedule[key];
          } else {
            newSchedule[key].active = this.state.schedule[key].active;
            newSchedule[key].start_time = this.state.schedule[key].start_time;
            newSchedule[key].end_time = this.state.schedule[key].end_time;
          }
        } else {
          delete newSchedule[key];
        }
      }
      if (_.isEqual(newSchedule, this.props.resourceDetailed.schedule)) {
        this.props.takeState(false);
      } else {
        for (let key1 in this.state.schedule) {
          if (this.state.schedule[key1].active && !this.state.schedule[key1].full_day &&
            (this.state.schedule[key1].start_time === '' || this.state.schedule[key1].end_time === '')) {
            return this.props.takeState(false);
          }
        }
        this.props.takeState(true, JSON.stringify(newSchedule));
      }
    }
  }

	renderSchedule = () => {
		const schedule = this.state.schedule;
		const scheduleRendered = [];
			for (let key in schedule) {
				scheduleRendered.push(<div key={key} className='schedule-settings-body-container'>
					<div className='schedule-settings-body-1'>{`${key[0].toUpperCase()}${key.substr(1)}`}</div>
						<div className='schedule-settings-body-2'>
							<label className="switch">
								<input type="checkbox" checked={(schedule[key].active) ? true : false}
									name={key}
									id={'active'}
									value={(schedule[key].active) ? true : false}
									onChange={this.toggleActive}
								/>
								<span className="slider round"></span>
							</label>
						</div>
						<div className='schedule-settings-body-3'>
							<div className={`start-time ${(schedule[key].full_day || !schedule[key].active) ? 'disactive' : ''}`}>
							{
								(schedule[key].active && !schedule[key].full_day) ?
									<div className={`resource-schedule-dropdown ${(schedule[key].start_time) ? '' : 'clear'}`}>
										<NavDropdown eventKey={3} title={(schedule[key].start_time12) ? schedule[key].start_time12 : 'Select start time'}
											id="basic-nav-dropdown">
												{
													timeList.map((time, i) => {
														if (this.state.schedule[key].end_time !== '') {
																const start = moment(time['12h'], ['HH:mm A', 'h:m A', 'h:m a']);
																const end = moment(this.state.schedule[key].end_time12, ['HH:mm A', 'h:m A', 'h:m a']);
																if (start.diff(end, 'minutes') >= 0) return;
														}
														return <MenuItem key={i} name={key} id='start_time' data-time={time['24h']} onClick={this.setSchedule}>{time['12h']}</MenuItem>})
												}
										</NavDropdown>
									</div> : null
							}
							</div>
						</div>
						<div className='schedule-settings-body-4'>
							<div className={`end-time ${(schedule[key].full_day || !schedule[key].active) ? 'disactive' : ''}`}>
							{
								(schedule[key].active && !schedule[key].full_day) ?
									<div className={`resource-schedule-dropdown ${(schedule[key].end_time) ? '' : 'clear'}`}>
										<NavDropdown eventKey={3} title={(schedule[key].end_time12) ? schedule[key].end_time12 : 'Select end time'}
											id="basic-nav-dropdown">
												{ timeList.map((time, i) => {
														if (this.state.schedule[key].start_time12 !== '') {
																const start = moment(this.state.schedule[key].start_time12, ['HH:mm A', 'h:m A', 'h:m a']);
																const end = moment(time['12h'], ['HH:mm A', 'h:m A', 'h:m a']);
																if (start.diff(end, 'minutes') >= 0) return;
														}
														return <MenuItem key={i} name={key} id='end_time' data-time={time['24h']} onClick={this.setSchedule}>{time['12h']}</MenuItem>})
												}
										</NavDropdown>
									</div> : null
							}
							</div>
						</div>
						<div className='schedule-settings-body-5'>
							<label className="switch">
								<input type="checkbox" checked={(schedule[key].full_day) ? true : false}
									disabled={(schedule[key].active) ? false : 'disabled'}
									name={key}
									id={'full_day'}
									value={(schedule[key].full_day) ? true : false}
									onChange={this.toggleActive}
								/>
								<span className="slider round"></span>
							</label>
						</div>
					</div>);
			}
			return scheduleRendered;
	}

  render() {

    console.log('SCHEDULE this.state ', this.state);

    return (
			<div className='schedule-settings-body'>
				{
					this.renderSchedule()
				}
			</div>
    );
  }
}

const mapStateToProps = ({ resourceDetailed }) => ({
	resourceDetailed,
});

export default connect(mapStateToProps, null)(Schedule);
