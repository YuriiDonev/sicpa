import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  getEmailNotificationsSettings as _getEmailNotificationsSettings,
	setEmailNotificationsSettings as _setEmailNotificationsSettings,
} from '../../actions/users-actions.js';

class Settings extends Component {

  state = {
    sendBookingRequestsNotifications: this.props.emailNotificationsSettings.email_notifications.active,
    resourcesType:
		(this.props.emailNotificationsSettings.email_notifications.only_own_resource) ?
		'only-my-resources' : 'all-resources',
  }

	componentDidMount() {
		this.props._getEmailNotificationsSettings();
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(this.props.emailNotificationsSettings, nextProps.emailNotificationsSettings)) {
			this.setState({
				sendBookingRequestsNotifications: nextProps.emailNotificationsSettings.email_notifications.active,
				resourcesType: (nextProps.emailNotificationsSettings.email_notifications.only_own_resource) ?
				'only-my-resources' : 'all-resources'
			});
		}
	}

  toggleSendByBookingRequests = (event) => {
    if (event.target.value === 'false') {
			this.props._setEmailNotificationsSettings({
				email_notifications: {
					active: true,
					only_own_resource: false
				}
			});

    } else {
			this.props._setEmailNotificationsSettings({
				email_notifications: {
					active: false,
					only_own_resource: false
				}
			});
    }
  }

  chooseResourcesType = (event) => {
		if (event.target.value === 'only-my-resources') {
			this.props._setEmailNotificationsSettings({
				email_notifications: {
					active: true,
					only_own_resource: true
				}
			});
		} else if (event.target.value === 'all-resources') {
			this.props._setEmailNotificationsSettings({
				email_notifications: {
					active: true,
					only_own_resource: false
				}
			});
		} else {
			return;
		}
  }

  render() {

    return (
      <div className='settings-wrapper'>
        <div className='notifications-settings-title'>{'NOTIFICATIONS SETTINGS'}</div>
        <div className='notifications-settings-container'>
            <div className='notifications-settings-toggler'>
              <label className="switch">
                <input type="checkbox"
                  checked={this.state.sendBookingRequestsNotifications}
                  name={'sort'}
                  id={'active'}
                  value={this.state.sendBookingRequestsNotifications}
                  onChange={this.toggleSendByBookingRequests}
                />
                <span className="slider round"></span>
              </label>
              <div className='switch-title'>{'Send me notifications for booking requests'}</div>
            </div>
          <div className='notifications-settings-radiobuttons-container'>
            <div className='notifications-settings-radiobuttons'>
              <div className='radio-only-my-resources'>
                <div className={`radio-item ${ (this.state.sendBookingRequestsNotifications &&
									this.state.resourcesType === 'only-my-resources') ? 'checked-only-my-resources' : '' }`}>
                  <input type="radio" id="ritema" name="ritem" value="only-my-resources"
										readOnly
                    checked={ (this.state.sendBookingRequestsNotifications &&
										this.state.resourcesType === 'only-my-resources') ? true : false }
                    onClick={this.chooseResourcesType}
                    disabled={!this.state.sendBookingRequestsNotifications}
                  />
                  <label htmlFor="ritema">{'Only for my resources'}</label>
                </div>
              </div>
              <div className='radio-by-resource'>
                <div className={`radio-item ${ (this.state.sendBookingRequestsNotifications &&
									this.state.resourcesType === 'all-resources') ? 'checked-all-resources' : '' }`}>
                  <input type="radio" id="ritemb" name="ritem" value="all-resources"
										readOnly
                    checked={ (this.state.sendBookingRequestsNotifications &&
										this.state.resourcesType === 'all-resources') ? true : false }
                    onClick={this.chooseResourcesType}
                    disabled={!this.state.sendBookingRequestsNotifications}
                  />
                  <label htmlFor="ritemb">{'For all resources'}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ emailNotificationsSettings }) => ({
	emailNotificationsSettings,
});

const actions = {
  _getEmailNotificationsSettings,
	_setEmailNotificationsSettings,
};

export default connect(mapStateToProps, actions)(Settings);
