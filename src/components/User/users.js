
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
// import moment from 'moment';
import _ from 'lodash';

import { NavDropdown, MenuItem } from 'react-bootstrap';

import SweetAlert from 'react-bootstrap-sweetalert';

import UserItem from './user-item.js';

import {
  getUsersListByProject as _getUsersListByProject,
  updateExistUserStatus as _updateExistUserStatus,
  deleteUserFromProject as _deleteUserFromProject,
  inviteUserInProject as _inviteUserInProject,
  resendInvitation as _resendInvitation,
  removeNetworkError as _removeNetworkError,
} from '../../actions/users-actions.js';

class Users extends Component {

  state = {
    status: 'Select role',
    email: '',
    emailError: '',
    role: '',
    emailToDelete: '',

    showDeleteAlert: false,
  }

  componentDidMount() {
    this.props.currentProject.id && this.props._getUsersListByProject(this.props.currentProject.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentProject.id !== this.props.currentProject.id) {
      if (nextProps.currentProject.role !== 'admin') {
        this.props.history.push('/');
      } else {
        this.props._getUsersListByProject(nextProps.currentProject.id);
      }
    }
  }

  enterEmail = (event) => {
    if (event.target.name === 'email') {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      re.test(event.target.value) === false ? this.setState({ emailError: 'Email is required and format should be john@doe.com' }) : this.setState({ emailError: '' });
      this.setState({ email: event.target.value });
    }
  }

  chooseStatus = (event) => {
    event.preventDefault();
    if (event.target.innerHTML === 'Read-Only') {
      this.setState({ status: event.target.innerHTML, role: 'read-only' });
    } else if (event.target.innerHTML === 'User') {
      this.setState({ status: event.target.innerHTML, role: 'user' });
    } else if (event.target.innerHTML === 'Admin') {
      this.setState({ status: event.target.innerHTML, role: 'admin' });
    } else {
      return;
    }
  }

  resendInvitationToUser = (email) => {
    if (this.props.currentProject.id) {
      this.props._resendInvitation(this.props.currentProject.id, email);
    }
  }

  updateStatusForExistUser = (email, role, is_contact) => {
    if (this.props.currentProject.id) {
      this.props._updateExistUserStatus({
        project_id: this.props.currentProject.id,
        email,
        role,
        is_contact
      });
    }
  }

  _deleteUser = (email) => {
    this.setState({ showDeleteAlert: true, emailToDelete: email });
  }

  inviteUser = () => {
    if (this.props.currentProject.id) {
      this.props._inviteUserInProject({
        project_id: this.props.currentProject.id,
        email: this.state.email,
        role: this.state.role //(admin | user | read-only)
      });
      this.setState({ email: '', role: '', emailError: '', status: 'Select role' });
    }
  }

  get isValid() {
    if ((
      this.state.emailError !== ''
    ) || (
      this.state.email === '' ||
      this.state.role === ''))
    {
      return true;
    } else {
      return false;
    }
  }

  changeIsUserContact = (email, role, is_contact) => {
    if (this.props.currentProject.id) {
      this.props._updateExistUserStatus({
        project_id: this.props.currentProject.id,
        email,
        role,
        is_contact
      });
    }
  }

  confirmUserDelete = () => {
    if (this.props.currentProject.id) {
      // console.log('confirmUserDelete this.props.currentProject.id ', this.props.currentProject.id);
      // console.log('confirmUserDelete this.state.emailToDelete ', this.state.emailToDelete);
      this.props._deleteUserFromProject({
        project_id: this.props.currentProject.id,
        email: this.state.emailToDelete
      });
      this.setState({ showDeleteAlert: false, emailToDelete: '' });
    }
  }

  cancelUserDelete = () => {
    this.setState({ showDeleteAlert: false, emailToDelete: '' });
  }

  hideAlert = () => {
    this.props._removeNetworkError();
  }

  render() {

    return (
        <div className="main-content">

        {
          (this.props.networkError.userNetworkError) ?
          <SweetAlert
            title={''}
            style={{display: "block", marginTop: "-100px", fontSize: '16px'}}
            onConfirm={this.hideAlert}>
              {this.props.networkError.userNetworkError}
          </SweetAlert> : null
        }

        {
          (this.state.showDeleteAlert) ?
          <SweetAlert
            warning
            style={{display: "block",marginTop: "-100px"}}
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="warning"
            cancelBtnBsStyle="info"
            title="Are you sure?"
            onConfirm={this.confirmUserDelete}
            onCancel={this.cancelUserDelete}
          >
            {'This user will be deleted from the project'}
          </SweetAlert> : null
        }

        <div className='users-list-container'>

          <div className='invite-users-title-input-dropdown-button'>
            <div className='invite-users-title'>{'INVITE USER'}</div>

            <div className='invite-users-input-dropdown-button'>
              <div className='invite-users-input'>

                <input type="email" name="email" value={this.state.email} placeholder='Enter user email'
                maxLength='80'
                onChange={this.enterEmail} />
                {
                  (this.state.emailError) ? <div className='input-error'>{this.state.emailError}</div> : null
                }

              </div>
              <div className='invite-users-dropdown-wrapper'>
                <div className={`invite-users-dropdown ${(this.state.status !== 'Select role') ? '' : 'clear'}`}>
                  <NavDropdown eventKey={3} title={this.state.status} id="basic-nav-dropdown">
                    <MenuItem onClick={this.chooseStatus} eventKey={3.1}>Admin</MenuItem>
                    <MenuItem onClick={this.chooseStatus} eventKey={3.2}>User</MenuItem>
                    <MenuItem onClick={this.chooseStatus} eventKey={3.3}>Read-Only</MenuItem>
                  </NavDropdown>
                </div>
              </div>
              <div className='invite-users-button'>
                <button onClick={this.inviteUser} className={(!this.isValid) ? 'active' : ''}
                  disabled={this.isValid}
                  >{'INVITE USER'}</button>
              </div>
            </div>
          </div>
          <div className='invite-users-list-wrapper'>
            <div className='invite-users-list-header'>
              <div className='close-cross-header'></div>

              <div className='users-header'>{'USERS'}</div>

              <div className='admin-header'>{'ADMIN'}</div>
              <div className='user-header'>{'USER'}</div>
              <div className='read-only-header'>{'READ-ONLY'}</div>

              <div className='user-project-contact-header'>{'PROJECT CONTACT'}</div>

            </div>

              {
                (_.isEmpty(this.props.users)) ? null :
                <div  className='invite-users-list'>
                {
                  (_.isEmpty(this.props.users.users)) ? null :
                  this.props.users.users.map((user, i) => {
                    return <div key={i} className='invite-item-wrapper'>
                        <UserItem
                          id={i+''}
                          email={user.email}
                          invitationList={false}
                          first_name={user.first_name || ''}
                          last_name={user.last_name || ''}
                          invitation={false}
                          resendLabel={false}
                          role={user.role}
                          contact={user.is_contact}
                          resendInvitation={this.resendInvitationToUser}
                          updateStatus={this.updateStatusForExistUser}
                          deleteUser={this._deleteUser}
                          isUserContact={this.changeIsUserContact}
                        />
                        <div className='contact-item-line'></div>
                      </div>
                  })
                }
                {
                  (_.isEmpty(this.props.users.invitations)) ? null :
                  this.props.users.invitations.map((user, i) => {
                    return <div key={i} className='invite-item-wrapper'>
                        <UserItem
                          id={i+'inv'}
                          email={user.email}
                          invitationList={true}
                          first_name={user.first_name || ''}
                          last_name={user.last_name || ''}
                          invitation={false}
                          resendLabel={true}
                          resendInvitation={this.resendInvitationToUser}
                          role={user.role}
                          contact={user.is_contact}
                          updateStatus={this.updateStatusForExistUser}
                          deleteUser={this._deleteUser}
                          isUserContact={this.changeIsUserContact}
                          _isInvitationSent={(user.email === this.props.isInvitationSent) ? true : false}
                        />
                        <div className='contact-item-line'></div>
                      </div>
                  })
                }
                </div>
              }

          </div>

        </div>

        </div>
    );
  }
}


const mapStateToProps = ({ projectInfo, currentProject, users, isInvitationSent, networkError }) => ({
  projectInfo,
  currentProject,
  users,
  isInvitationSent,
  networkError,
});

const actions = {
  _getUsersListByProject,
  _updateExistUserStatus,
  _deleteUserFromProject,
  _inviteUserInProject,
  _resendInvitation,
  _removeNetworkError,
};

export default connect(mapStateToProps, actions)(Users);
