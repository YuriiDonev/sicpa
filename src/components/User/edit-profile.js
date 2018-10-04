
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import SweetAlert from 'react-bootstrap-sweetalert';

import { Grid, Col, Row } from 'react-bootstrap';
import Card from '../Card/Card.jsx';

import { HOST_NAME } from '../../mock-data/host-name.js';
import { FIELDS_ERROR } from '../../mock-data/error-messages.js';
import { getTokenForImages } from '../../service/token.js';

import { getUserInfo as _getUserInfo,
  updateUserProfile as _updateUserProfile,
} from '../../actions/users-actions.js';

import ChangePassword from './change-password.js';

class EditProfile extends Component {

  state = {
    accepted: [],
    isImgEdit: false,
    first_name: this.props.userInfo.first_name || '',
    last_name: this.props.userInfo.last_name || '',
    email: this.props.userInfo.email || '',
    phone: this.props.userInfo.phone || '',
    mobile: this.props.userInfo.mobile || '',
    img_url: this.props.userInfo.img_url || '',
    company: this.props.userInfo.company || '',
    title: (this.props.userInfo.title) ? this.props.userInfo.title : '',
    first_nameError: '',
    last_nameError: '',
    phoneError: '',
    mobileError: '',
    companyError: '',
    isChangePassword: false,
    showLargeImgAlert: false,
  }

  componentDidMount() {
    if (this.props.currentUser.id) {
      this.props._getUserInfo(this.props.currentUser.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.userInfo, nextProps.userInfo)) {
      this.setState({ first_name: nextProps.userInfo.first_name,
        last_name: nextProps.userInfo.last_name,
        company: nextProps.userInfo.company,
        title: (nextProps.userInfo.title) ? nextProps.userInfo.title : '',
        email: nextProps.userInfo.email,
        phone: nextProps.userInfo.phone,
        mobile: nextProps.userInfo.mobile,
        img_url: nextProps.userInfo.img_url,
        isImgEdit: false,
        accepted: [],
      });
    }
    if (!_.isEqual(this.props.currentUser, nextProps.currentUser)) {
      if (nextProps.currentUser.id) {
        this.props._getUserInfo(nextProps.currentUser.id);
      }
    }
  }
  // /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i

  setInputData = (event) => {
    if (event.target.name === 'first_name') {
      (event.target.value === '') ? this.setState({ first_nameError: FIELDS_ERROR }) : this.setState({ first_nameError: '' });
      this.setState({ first_name: event.target.value });
    } else if (event.target.name === 'last_name') {
      (event.target.value === '') ? this.setState({ last_nameError: FIELDS_ERROR }) : this.setState({ last_nameError: '' });
      this.setState({ last_name: event.target.value });
    } else if (event.target.name === 'phone_number') {
      (event.target.value === '') ? this.setState({ phoneError: FIELDS_ERROR }) : this.setState({ phoneError: '' });
      this.setState({ phone: event.target.value });
    } else if (event.target.name === 'mobile_phone_number') {
      (event.target.value === '') ? this.setState({ mobileError: FIELDS_ERROR }) : this.setState({ mobileError: '' });
      this.setState({ mobile: event.target.value });
    } else if (event.target.name === 'company_name') {
      (event.target.value === '') ? this.setState({ companyError: FIELDS_ERROR }) : this.setState({ companyError: '' });
      this.setState({ company: event.target.value });
    } else if (event.target.name === 'title_name') {
      this.setState({ title: event.target.value });
    }
  }

  saveImage = (accepted, rejected) => {
    if (accepted && !_.isEmpty(accepted)) {
      this.setState({ accepted });
    } else {
      this.setState({showLargeImgAlert: true});
    }
  }

  editImg = () => {
    if (this.state.isImgEdit) {
      this.setState({ isImgEdit: false, accepted: [] });
    } else {
      this.setState({ isImgEdit: true });
    }
  }

  updateProfile = () => {
      const formdata = new FormData();
      formdata.append('email', this.state.email);
      formdata.append('first_name', this.state.first_name);
      formdata.append('last_name', this.state.last_name);
      formdata.append('company', this.state.company);
      formdata.append('title', this.state.title);
      formdata.append('phone', this.state.phone);
      formdata.append('mobile', this.state.mobile);
      if (!_.isEmpty(this.state.accepted)) {
        formdata.append('avatar', this.state.accepted[0]);
      }
      this.props._updateUserProfile(formdata);
  }

  get isSame() {
    if ((
      this.state.first_name === this.props.userInfo.first_name &&
      this.state.last_name === this.props.userInfo.last_name &&
      this.state.phone === this.props.userInfo.phone &&
      this.state.mobile === this.props.userInfo.mobile &&
      this.state.company === this.props.userInfo.company &&
      (this.state.title === '' && this.props.userInfo.title === null ||
        this.state.title === this.props.userInfo.title) &&
      _.isEmpty(this.state.accepted)
    ) || (
      this.state.first_nameError !== '' ||
      this.state.last_nameError !== '' ||
      this.state.phoneError !== '' ||
      this.state.mobileError !== '' ||
      this.state.companyError !== '')) {
      return true;
    } else {
      return false;
    }
  }

  showChangePassword = () => {
    this.setState({isChangePassword: true});
  }

  closeChangePassword = () => {
    this.setState({isChangePassword: false});
  }

  hideAlert = () => {
    this.setState({showLargeImgAlert: false});
  }

  render() {
    const token = getTokenForImages();

    return (
      <div className="main-content">
      {
        (this.state.showLargeImgAlert) ?
        <SweetAlert
          title={''}
          style={{display: "block", marginTop: "-100px", fontSize: '16px'}}
          onConfirm={this.hideAlert}>
            {'The image you are trying to upload is too big (maximum size is 2000kb), please resize and try again'}
        </SweetAlert> : null
      }
      {
        (this.state.isChangePassword) ?
        <ChangePassword
          closeChangePasswordUser={this.closeChangePassword}
        /> :
        <div className='project-add-create-contacts-container'>
          <div className='forms-container'>
            <div className='first-last-name-container'>
              <div className='first-name'>
                <div className='first-name-title'>{'FIRST NAME*'}</div>
                <input type="text" id="first_name" name="first_name" value={this.state.first_name} placeholder='Enter First Name'
                  maxLength='30'
                  onChange={this.setInputData} />
                {
                  (this.state.first_nameError) ? <div className='input-error'>{this.state.first_nameError}</div> : null
                }
              </div>
              <div className='last-name'>
                <div className='last-name-title'>{'LAST NAME*'}</div>
                <input type="text" id="last_name" name="last_name" value={this.state.last_name} placeholder='Enter Last Name'
                  maxLength='30'
                  onChange={this.setInputData} />
                {
                  (this.state.last_nameError) ? <div className='input-error'>{this.state.last_nameError}</div> : null
                }
              </div>
            </div>
            <div className='company-title-container'>
              <div className='company-name'>
                <div className='company-name-title'>{'COMPANY*'}</div>
                <input type="text" id="company_name" name="company_name" value={this.state.company} placeholder='Enter Company Name'
                  maxLength='30'
                  onChange={this.setInputData} />
                {
                  (this.state.companyError) ? <div className='input-error'>{this.state.companyError}</div> : null
                }
              </div>
              <div className='title-name'>
                <div className='title-name-title'>{'TITLE'}</div>
                <input type="text" id="title_name" name="title_name" value={this.state.title} placeholder='Enter Title'
                maxLength='30'
                onChange={this.setInputData} />
                {
                  (this.state.titleError) ? <div className='input-error'>{this.state.titleError}</div> : null
                }
              </div>
            </div>
            <div className='phone-number-email-dropzone-container'>
              <div className='phone-number-email-container'>
                <div className='phone-number-container'>
                  <div className='phone'>
                    <div className='phone-number-title'>{'PHONE NUMBER*'}</div>
                    <input type="text" id="phone_number" name="phone_number" value={this.state.phone} placeholder='Enter Phone Number'
                      maxLength='16'
                      onChange={this.setInputData} />
                    {
                      (this.state.phoneError) ? <div className='input-error'>{this.state.phoneError}</div> : null
                    }
                  </div>
                  <div className='mobile-phone'>
                    <div className='mobile-phone-number-title'>{'MOBILE PHONE NUMBER*'}</div>
                    <input type="text" id="mobile_phone_number" name="mobile_phone_number" value={this.state.mobile} placeholder='Enter Mobile Phone Number'
                      maxLength='16'
                      onChange={this.setInputData} />
                    {
                      (this.state.mobileError) ? <div className='input-error'>{this.state.mobileError}</div> : null
                    }
                  </div>
                </div>
                <div className='email-container'>
                  <div className='email'>
                    <div className='email-title'>{'EMAIL'}</div>
                    <input type="text" id="email" name="email" value={this.state.email} placeholder='Enter Email'
                      maxLength='80'
                      disabled={true} />
                  </div>
                </div>
              </div>
              <div className='dropzone-container'>
                <div className='dropzone-title'>
                <div>{'PROFILE PICTURE'}</div>
                </div>
                {
                  (this.state.img_url && !this.state.isImgEdit) ?
                    <div>
                      <img src={`${HOST_NAME}${this.state.img_url}?access_token=${token}`} alt='' />
                      <div className='edit-contact-image'><span onClick={this.editImg} className='edit'>{'edit image'}</span></div>
                    </div> :
                    <div>
                      {
                        (!_.isEmpty(this.state.accepted)) ? <img src={this.state.accepted[0].preview} alt='' /> :
                        <Dropzone
                          className='dropzone'
                          multiple={false}
                          accept="image/jpeg, image/png"
                          maxSize={2000000}
                          onDrop={this.saveImage}
                        >
                        <div className='upload'>
                          <div className='camera'><i className="pe-7s-camera"></i></div>
                          <div className='upload-picture'>{'Upload Picture'}</div>
                        </div>
                        </Dropzone>
                      }
                      {
                        (this.state.img_url) ? <div className='edit-contact-image'>
                          <span onClick={this.editImg}>{'cancel edit image'}</span>
                        </div> : null
                      }
                    </div>
                }
              </div>
            </div>
          </div>
          <div className='edit-profile-button-container'>
            <div className='change-password-link' onClick={this.showChangePassword}>{'CHANGE PASSWORD >'}</div>
            <div className='edit-profile-button'>
            <button className={(!this.isSame) ? 'active' : ''}
              disabled={this.isSame}
              onClick={this.updateProfile}>{'Update Profile'}</button>
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}


const mapStateToProps = ({ currentUser, userInfo }) => ({
  currentUser,
  userInfo,
});

const actions = {
  _getUserInfo,
  _updateUserProfile,
};

export default connect(mapStateToProps, actions)(EditProfile);
