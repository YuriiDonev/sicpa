
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SweetAlert from 'react-bootstrap-sweetalert';

import {
  changeUserPassword as _changeUserPassword,
  clearChangePasswordError as _clearChangePasswordError,
} from '../../actions/users-actions.js';

class ChangePassword extends Component {

  state = {
    currentPassword: '',
    newPassword: '',
    currentPasswordError: '',
    newPasswordError: '',
    isPasswordChanged: false,
  }

  componentDidMount() {
    this.props._clearChangePasswordError();
  }

  setInputData = (event) => {
    if (event.target.name === 'current-password') {
      if (event.target.value.length < 5) {
        this.setState({ currentPasswordError: 'Current password can not be less than 5 characters' });
      } else {
        this.setState({ currentPasswordError: '' });
      }
      this.setState({ currentPassword: event.target.value });

    } else if (event.target.name === 'new-password') {
      if (event.target.value.length < 5) {
        this.setState({ newPasswordError: 'New password should be at least 5 characters' });
      } else {
        this.setState({ newPasswordError: '' });
      }
      this.setState({ newPassword: event.target.value });
    }
  }

  get isValid() {
    if ((
      this.state.currentPassword === '' ||
      this.state.newPassword === '') ||
      (this.state.currentPasswordError !== '' ||
     this.state.newPasswordError !== '')
   ) {
      return true;
    } else {
      return false;
    }
  }

  changePassword = () => {
    this.props._changeUserPassword({
      old_pass: this.state.currentPassword,
      new_pass:this.state.newPassword
    }, () => {
      this.setState({ isPasswordChanged: true });
    });
  }

  confirmSuccessPassChange = () => {
    this.props.closeChangePasswordUser();
  }

  render() {
    return (
      <div className='change-password-container'>
        {
          (this.state.isPasswordChanged) ?
          <SweetAlert
            success
            style={{display: "block",marginTop: "-100px"}}
            title={"Success!"}
            onConfirm={this.confirmSuccessPassChange}
          >
            {'Your new password has been saved!'}
          </SweetAlert> : null
        }
        <div className='change-password-forms-container'>
          <div className='change-password-page-title-container'>
            <div className='change-password-page-title'>{'Change Password'}</div>
              {
                (this.props.networkError.changePasswordError) ? <div className='change-password-page-title-error'>{'Check your data please'}</div> : null
              }
          </div>
          <div className='current-password-container current'>
            <div className='current-password-title'>{'CURRENT PASSWORD'}</div>
            <input type="text" name="current-password" value={this.state.currentPassword} placeholder='Enter Current Password'
              maxLength='30'
              onChange={this.setInputData} />
              {
              (this.state.currentPasswordError) ? <div className='input-error'>{this.state.currentPasswordError}</div> : null
              }
          </div>
          <div className='current-password-container'>
            <div className='current-password-title'>{'NEW PASSWORD'}</div>
              <input type="text" name="new-password" value={this.state.newPassword} placeholder='Enter New Password'
                maxLength='30'
                onChange={this.setInputData} />
                {
                (this.state.newPasswordError) ? <div className='input-error'>{this.state.newPasswordError}</div> : null
                }
            </div>
          </div>
          <div className='change-password-button-container'>
            <div className='change-password-button'>
              <button className={(!this.isValid) ? 'active' : ''}
                disabled={this.isValid}
                onClick={this.changePassword}>{'Change Password'}</button>
            </div>
          </div>
      </div>
    );
  }
}


const mapStateToProps = ({ networkError }) => ({
  networkError,
});

const actions = {
  _changeUserPassword,
  _clearChangePasswordError,
};

export default connect(mapStateToProps, actions)(ChangePassword);
