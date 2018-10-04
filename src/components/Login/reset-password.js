
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RingLoader } from 'react-spinners';
import SweetAlert from 'react-bootstrap-sweetalert';

import background from "../../assets/img/cranes.jpg";
import Dockmaster_Logo from "../../assets/img/Dockmaster_Logo.png";

import { LoginHeader } from './login-header.js';
import { LoginFooter } from './login-footer.js';

import { resetPassword as _resetPassword } from '../../actions/users-actions.js';


class ResetPassword extends Component {

  state = {
    email: '',
    emailError: '',
    isResetPasswordSuccess: false,
  }

  setInputData = (event) => {
    if (event.target.name === 'email') {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      re.test(event.target.value) === false ? this.setState({ emailError: 'Email is required and format should be john@doe.com' }) : this.setState({ emailError: '' });
      this.setState({ email: event.target.value });
    } else {
      return;
    }
  }

  get validateInputs() {
    if ((this.state.email === '') || (this.state.emailError !== '')) {
      return true;
    } else {
      return false;
    }
  }

  sendEmail = () => {
    this.props._resetPassword({email: this.state.email}, () => {
      this.setState({isResetPasswordSuccess: true});
    });
  }

  confirmSuccessResetPassword = () => {
    this.setState({isResetPasswordSuccess: false});
    this.props.history.push('/login');
  }

  render() {
    console.log('SignUp ', this.props);
    console.log('SignUp this.state ', this.state);

    return (
      <div className='signup-wrapper-main reset-password'>
        {
          (this.props._isLoading) ?
            <div className="loading-indicator-wrapper">
              <RingLoader
                color={'white'}
                size={80}
              />
            </div> : null
        }

        {
          (this.state.isResetPasswordSuccess) ?
          <SweetAlert
            success
            style={{display: "block",marginTop: "-100px"}}
            title={"Success!"}
            onConfirm={this.confirmSuccessResetPassword}
          >
            {'Instructions to reset password have been sent to this email'}
          </SweetAlert> : null
        }

        <LoginHeader logo={Dockmaster_Logo} />

        <div className='login-signup-wrapper' style={{ backgroundImage: `url(${background})` }}>


          <div className='signup-container reset-password-container'>

            <div className='signup-title'>{'Reset Password'}
              {
                (this.props.networkError.resetPasswordError) ? <span className='network-error'>{'Check your email please'}</span> : null
              }
            </div>

            <div className='signup-forms-container'>

              <div className='signup-first-last-name-container'>
                <div className='first-name'>
                  <div className='first-name-title'></div>
                  <input type="text" name="email" value={this.state.email} placeholder='Enter Email'
                    maxLength='30'
                    onChange={this.setInputData} />
                  {
                    (this.state.emailError) ? <div className='input-error'>{this.state.emailError}</div> : null
                  }
                </div>
              </div>
            </div>


            <div className='signup-create-account-container'>
              <div className='signup-terms-conditions'>
                <div className='signup-terms-conditions-text'>{'You will receive an email with the link to reset your password'}</div>
              </div>
              <div className='signup-create-account-button'>
                <button disabled={this.validateInputs} onClick={this.sendEmail} className={(this.validateInputs) ? null : 'active'}>
                  {'Send'}
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

const mapStateToProps = ({ networkError, _isLoading }) => ({
  networkError,
  _isLoading,
});

const actions = {
  _resetPassword,
};

export default connect(mapStateToProps, actions)(ResetPassword);
