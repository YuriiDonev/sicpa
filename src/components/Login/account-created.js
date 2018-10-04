import React, { Component } from 'react';

import background from "../../assets/img/cranes.jpg";
import Dockmaster_Logo from "../../assets/img/Dockmaster_Logo.png";

import { LoginHeader } from './login-header.js';
import { LoginFooter } from './login-footer.js';

class AccCreated extends Component {

  render() {
    return (
      <div className='login-wrapper-main'>
        <LoginHeader logo={Dockmaster_Logo} />
        <div className='login-signup-wrapper' style={{ backgroundImage: `url(${background})` }}>
          <div className='login-container account-created'>
            <div className='login-title'>Almost there!</div>
            <div className='create-account-success first'>{'Your account was created successfully!'}</div>
            <div className='create-account-success'>{'Please check your email to verify your'}</div>
            <div className='create-account-success'>{'email address and activate your account'}
              <span><i className="pe-7s-check"></i></span>
            </div>
          </div>
        </div>
        <LoginFooter />
      </div>
    );
  }
}

export default AccCreated;
