
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { RingLoader } from 'react-spinners';

import { loginToApp as _loginToApp } from '../../actions/login-actions.js';
import { showLoadingIndicator as _showLoadingIndicator } from '../../actions/loading-actions.js';

import { loginIn } from '../../service/index.js';

import background from "../../assets/img/cranes.jpg";
import Dockmaster_Logo from "../../assets/img/Dockmaster_Logo.png";

import { LoginHeader } from './login-header.js';
import { LoginFooter } from './login-footer.js';

class Login extends Component {

  state = {
    email: '',
    password: '',
    loading: false,
    emailError: '',
    passwordError: '',
  }

  logIn = () => {
    loginIn(this.state.email, this.state.password, this.props._loginToApp);
    this.props._showLoadingIndicator();
  }

  signUp = () => {
    this.props.history.push('/signup');
  }

  // forgotPassword = () => {
  //   this.props.history.push('/reset-password');
  // }

  setInputData = (event) => {
    if (event.target.name === 'email') {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      re.test(event.target.value) === false ? this.setState({ emailError: 'Email is required and format should be john@doe.com' }) : this.setState({ emailError: '' });
      this.setState({ email: event.target.value });
    } else if (event.target.name === 'password') {

      if (event.target.value === '') {
        this.setState({ passwordError: 'Password shouldn`t be emty' });
      } else if (event.target.value !== '' && event.target.value.length < 5) {
        this.setState({ passwordError: 'Password should be at least 5 characters' });
      } else { this.setState({ passwordError: '' }); }

      this.setState({ password: event.target.value });
    }
  }

  get validateInputs() {
    if ((this.state.email === '' || this.state.password === '') || (this.state.passwordError !== '' || this.state.emailError !== '')) {
      return true;
    } else {
      // setTimeout(() => { this.loginButton.focus(); }, 100);
      return false;
    }
  }

  render() {
    // console.log('LOGIN ', this.props);
    // console.log('LOGIN _isLoading', this.props._isLoading);
    // console.log('LOGIN networkError ', this.props.networkError);
    // console.log('LOGIN this.state ', this.state);

    return (

      <div className='login-wrapper-main'>
        {
          (this.props._isLoading) ?
            <div className="loading-indicator-wrapper">
              <RingLoader
                color={'white'}
                size={80}
              />
            </div> : null
        }

        <LoginHeader logo={Dockmaster_Logo} />

        <div className='login-signup-wrapper' style={{ backgroundImage: `url(${background})` }}>
          <div className='login-container'>
            <div className='login-title'>{'Login'}</div>
            {
              (this.props.networkError.loginNetworkError) ? <span className='network-error'>{`You've entered an invalid email address or password`}</span> : null
            }
            <div className='login-email-container'>
              <div className='login-email-title'>{'EMAIL*'}</div>
              <div className='login-email-input'>
                <input type="text" name="email" value={this.state.email} placeholder={'Enter email address'}
                maxLength='80'
                onChange={this.setInputData} />
                {
                  (this.state.emailError) ? <div className='input-error'>{this.state.emailError}</div> : null
                }
              </div>
            </div>

            <div className='login-password-container'>
              <div className='login-password-title'>{'PASSWORD*'}</div>
              <div className='login-password-input'>
                <input type="password" name="password" value={this.state.password} placeholder={'Enter password'}
                maxLength='30'
                onChange={this.setInputData} />
                {
                  (this.state.passwordError) ? <div className='input-error'>{this.state.passwordError}</div> : null
                }
              </div>
            </div>

            <div className='login-signup-buttons'>
              <div className='login-signup-container'>
                <button
                  disabled={this.validateInputs}
                  className={`login-button ${(this.validateInputs) ? '' : 'active'}`}
                  onClick={this.logIn}
                >{'Login'}</button>
              </div>
            </div>

            <div className='login-forgot-password'><Link to={'/reset-password'}><div>{'I forgot my password >'}</div></Link></div>
            <div className='login-contact-us'>
              <a href="mailto:info@interfaced.ca">{'New to Dockmasters? Contact us for a free demo'}</a>
            </div>
          </div>
        </div>

        <LoginFooter />

      </div>
    );
  }
}

const mapStateToProps = ({ _isLoading, networkError  }) => ({
  _isLoading,
  networkError,
});

const actions = {
  _loginToApp,
  // _loginInMain,
  _showLoadingIndicator,
};

export default connect(mapStateToProps, actions)(Login);

// <button
//   ref={(el) => this.loginButton = el}
//   disabled={this.validateInputs}
//   className={`login-button ${(this.validateInputs) ? '' : 'active'}`}
//   onClick={this.logIn}
// >{'Login'}</button>
