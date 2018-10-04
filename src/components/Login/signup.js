
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SweetAlert from 'react-bootstrap-sweetalert';

import Dropzone from 'react-dropzone';

import { RingLoader } from 'react-spinners';

import background from "../../assets/img/cranes.jpg";
import Dockmaster_Logo from "../../assets/img/Dockmaster_Logo.png";
import { FIELDS_ERROR } from '../../mock-data/error-messages.js';

import { LoginHeader } from './login-header.js';
import { LoginFooter } from './login-footer.js';

import { createNewUser as _createNewUser, closeSuccess as _closeSuccess } from '../../actions/login-actions.js';


class SignUp extends Component {

  state = {
    invitation_code: '',
    first_name: '',
    last_name: '',
    phone: '',
    mobile: '',
    img_url: '',
    company: '',
    title: '',
    password: '',
    confirmPassword: '',

    first_nameError: '',
    last_nameError: '',
    phoneError: '',
    mobileError: '',
    companyError: '',
    passwordError: '',
    confirmPasswordError: '',
    invitation_codeError: '',

    isConditionsAccepted: '',

    accepted: [],
    showLargeImgAlert: false,

    urlEmail: '',
  }

  componentDidMount() {
    const email = window.location.search.split('email=')[1];
    if (email) {
      this.setState({ urlEmail: email });
    } else {
      this.props.history.push('/login');
    }
  }

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
    } else if (event.target.name === 'password') {

      if (event.target.value === '') {
        this.setState({ passwordError: FIELDS_ERROR });
      } else if (event.target.value !== '' && event.target.value.length < 5) {
        this.setState({ passwordError: 'Password should be at least 5 characters' });
      } else if (event.target.value !== this.state.confirmPassword) {
        this.setState({ passwordError: 'Check your Password and confirm it please' });
      } else if (event.target.value.length < 5) {
        this.setState({ passwordError: 'Password should be at least 5 characters' });
      } else if (event.target.value !== this.state.confirmPassword) {
        this.setState({ passwordError: 'Check your Password and confirm it please' });
      } else {
        this.setState({ passwordError: '', confirmPasswordError: '' });
      }

      this.setState({ password: event.target.value });
    } else if (event.target.name === 'confirm_password') {

      if (this.state.password !== event.target.value || this.state.password === '') {
        this.setState({ confirmPasswordError: 'Check your Password and confirm it please' });
      } else if (this.state.password.length < 5) {
        this.setState({ passwordError: 'Password should be at least 5 characters' });
      } else {
        this.setState({ confirmPasswordError: '', passwordError: '' });
      }

      this.setState({ confirmPassword: event.target.value });
    } else if (event.target.name === 'invitation_code') {
      let inv_code = /^-?\d+\.?\d*$/;
      inv_code.test(event.target.value) === false ? this.setState({ invitation_codeError: FIELDS_ERROR + ' and should be digits only' }) :
      this.setState({ invitation_codeError: '' });
      this.setState({ invitation_code: event.target.value });
    } else {
      return;
    }
  }

  // else if (event.target.name === 'email') {
  //   // let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   // re.test(event.target.value) === false ? this.setState({ emailError: FIELDS_ERROR + ' and format should be john@doe.com' }) : this.setState({ emailError: '' });
  //   // this.setState({ email: event.target.value });
  // }

  get validateInputs() {
    if ((
      this.state.first_name === '' ||
      this.state.last_name === '' ||
      this.state.company === '' ||
      this.state.phone === '' ||
      this.state.mobile === '' ||
      this.state.password === '' ||
      this.state.confirmPassword === '' ||
      this.state.invitation_code === '' ||
      this.state.isConditionsAccepted === '') ||
      (
      this.state.first_nameError !== '' ||
      this.state.last_nameError !== '' ||
      this.state.companyError !== '' ||
      this.state.phoneError !== '' ||
      this.state.mobileError !== '' ||
      this.state.passwordError !== '' ||
      this.state.confirmPasswordError !== '' ||
      this.state.invitation_codeError !== '')) {
      return true;
    } else {
      // setTimeout(() => { this.signUpButton.focus(); }, 100);
      return false;
    }
  }

  createAccount = () => {
    const formdata = new FormData();
    formdata.append('email', this.state.urlEmail);
    formdata.append('first_name', this.state.first_name);
    formdata.append('last_name', this.state.last_name);
    formdata.append('company', this.state.company);
    if (this.state.title !== '') {
      formdata.append('title', this.state.title);
    }
    formdata.append('phone', this.state.phone);
    formdata.append('mobile', this.state.mobile);
    formdata.append('password', this.state.password);
    formdata.append('invitation_code', this.state.invitation_code);
    if (!_.isEmpty(this.state.accepted)) {
      formdata.append('avatar', this.state.accepted[0]);
    }
    this.props._createNewUser(formdata);
  }

  saveAvatar = (accepted, rejected) => {
		if (accepted && !_.isEmpty(accepted)) {
			this.setState({ accepted });
		} else {
      this.setState({showLargeImgAlert: true});
		}
	}


  acceptConditions = (event) => {
    if (this.state.isConditionsAccepted) {
      this.setState({isConditionsAccepted: ''});
    } else {
      this.setState({isConditionsAccepted: event.target.value});
    }
  }

  moveToLogin = () => {
    this.props._closeSuccess();
    this.props.history.push('/login');
  }

  hideAlert = () => {
    this.setState({showLargeImgAlert: false});
  }

  render() {
    // console.log('SignUp ', this.props);
    // console.log('SignUp this.state ', this.state);

    return (
      <div className='signup-wrapper-main'>
        {
          (this.state.loading) ?
            <div className="loading-indicator-wrapper">
              <RingLoader
                color={'white'}
                size={80}
              />
            </div> : null
        }
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
          (this.props.createUserSuccess) ?
          <SweetAlert
            success
            style={{display: "block",marginTop: "-100px"}}
            title={"Success!"}
            confirmBtnText="Login"
            confirmBtnBsStyle="info"
            onConfirm={this.moveToLogin}
          >
            {'Your account has been created. Please check your email to confirm your email address'}
          </SweetAlert> : null
        }

        <LoginHeader logo={Dockmaster_Logo} />

        <div className='login-signup-wrapper' style={{ backgroundImage: `url(${background})` }}>


          <div className='signup-container'>

            <div className='signup-title'>{'Create Account'}
              {
                (this.props.networkError.createUserNetworkError) ? <span className='network-error'>{'Check your data please'}</span> : null
              }
            </div>

            <div className='signup-forms-container'>

              <div className='signup-first-last-name-container'>
                <div className='first-name'>
                  <div className='first-name-title'>{'FIRST NAME*'}</div>
                  <input type="text" name="first_name" value={this.state.first_name} placeholder='Enter First Name'
                    maxLength='30'
                    onChange={this.setInputData} />
                  {
                    (this.state.first_nameError) ? <div className='input-error'>{this.state.first_nameError}</div> : null
                  }
                </div>
                <div className='last-name'>
                  <div className='last-name-title'>{'LAST NAME*'}</div>
                  <input type="text" name="last_name" value={this.state.last_name} placeholder='Enter Last Name'
                    maxLength='30'
                    onChange={this.setInputData} />
                  {
                    (this.state.last_nameError) ? <div className='input-error'>{this.state.last_nameError}</div> : null
                  }
                </div>
              </div>

              <div className='signup-first-last-name-container'>
                <div className='first-name'>
                  <div className='first-name-title'>{'COMPANY*'}</div>
                  <input type="text" name="company_name" value={this.state.company} placeholder='Enter Company Name'
                    maxLength='30'
                    onChange={this.setInputData} />
                  {
                    (this.state.companyError) ? <div className='input-error'>{this.state.companyError}</div> : null
                  }
                </div>
                <div className='last-name'>
                  <div className='last-name-title'>{'TITLE'}</div>
                  <input type="text" name="title_name" value={this.state.title} placeholder='Enter Title'
                  maxLength='30'
                  onChange={this.setInputData} />
                </div>
              </div>

              <div className='signup-first-last-name-container'>
                <div className='first-name'>
                  <div className='first-name-title'>{'PHONE NUMBER*'}</div>
                  <input type="text" name="phone_number" value={this.state.phone} placeholder='Enter Phone Number'
                    maxLength='16'
                    onChange={this.setInputData} />
                  {
                    (this.state.phoneError) ? <div className='input-error'>{this.state.phoneError}</div> : null
                  }
                </div>
                <div className='last-name'>
                  <div className='last-name-title'>{'MOBILE PHONE NUMBER*'}</div>
                  <input type="text" name="mobile_phone_number" value={this.state.mobile} placeholder='Enter Mobile Phone Number'
                    maxLength='16'
                    onChange={this.setInputData} />
                  {
                    (this.state.mobileError) ? <div className='input-error'>{this.state.mobileError}</div> : null
                  }
                </div>
              </div>

              <div className='signup-first-last-name-container'>
                <div className='first-name'>
                  <div className='first-name-title'>{'EMAIL*'}</div>
                  <input type="text" name="email" value={this.state.urlEmail} placeholder='Enter Email'
                    disabled={true}
                  />
                  {
                    (this.state.emailError) ? <div className='input-error'>{this.state.emailError}</div> : null
                  }
                </div>
                <div className='last-name'></div>
              </div>


              <div className='signup-first-last-name-container'>
                <div className='first-name'>
                  <div className='first-name-title'>{'PASSWORD*'}</div>
                  <input type="password" name="password" value={this.state.password} placeholder={'Enter password'}
                    maxLength='30'
                    onChange={this.setInputData} />
                    {
                      (this.state.passwordError) ? <div className='input-error'>{this.state.passwordError}</div> : null
                    }
                </div>
                <div className='last-name'>
                  <div className='last-name-title'>{'CONFIRM PASSWORD*'}</div>
                  <input type="password" name="confirm_password" value={this.state.confirmPassword} placeholder={'Confirm password'}
                    maxLength='30'
                    onChange={this.setInputData} />
                    {
                      (this.state.confirmPasswordError) ? <div className='input-error'>{this.state.confirmPasswordError}</div> : null
                    }
                </div>
              </div>

              <div className='signup-first-last-name-container'>
                <div className='first-name'>
                  <div className='first-name-title'>{'PROFILE PHOTO'}</div>
                  <div className='signup-upload-photo'>
                  {
                    (!_.isEmpty(this.state.accepted)) ? <img src={this.state.accepted[0].preview} alt='' /> :
                    <Dropzone
                      className='dropzone'
                      multiple={false}
                      accept="image/jpeg, image/png"
                      maxSize={2000000}
                      onDrop={this.saveAvatar}
                    >
                      <div className='upload'>
                        <div className='camera'><i className="pe-7s-camera"></i></div>
                        <div className='upload-picture'>{'Upload Picture'}</div>
                      </div>
                    </Dropzone>
                  }
                  </div>
                </div>
                <div className='last-name'>
                  <div className='last-name-title'>{'INVITATION CODE*'}</div>
                  <input type="text" name="invitation_code" value={this.state.invitation_code} placeholder={'Enter Invitation Code'}
                    maxLength='30'
                    onChange={this.setInputData} />
                    {
                      (this.state.invitation_codeError) ? <div className='input-error'>{this.state.invitation_codeError}</div> : null
                    }
                </div>
              </div>

            </div>


            <div className='signup-create-account-container'>
              <div className='signup-terms-conditions'>

                <div className='signup-terms-conditions-checkbox'>
                  <label className="container">
                    <input type="checkbox" checked={this.state.isConditionsAccepted} onChange={this.acceptConditions} />
                    <span className="checkmark"></span>
                  </label>
                </div>

                <div className='signup-terms-conditions-text'>By clicking Create Account, you agree to our&nbsp;
                  <a href={'https://dockmasters.ca/terms.html'} target='_blank'>{'Terms and Conditions'}</a></div>
                </div>
              <div className='signup-create-account-button'>
                <button disabled={this.validateInputs} onClick={this.createAccount} className={(this.validateInputs) ? null : 'active'}>
                  {'Create Account'}
                </button>
              </div>
            </div>

          </div>


        </div>

        <LoginFooter />

      </div>
    );
  }
}

const mapStateToProps = ({ networkError, createUserSuccess }) => ({
  networkError,
  createUserSuccess,
});

const actions = {
  _createNewUser,
  _closeSuccess,
};

export default connect(mapStateToProps, actions)(SignUp);

// <button ref={(el) => this.signUpButton = el} disabled={this.validateInputs} onClick={this.createAccount} className={(this.validateInputs) ? null : 'active'}>
//   {'Create Account'}
// </button>
