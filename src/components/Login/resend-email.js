
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RingLoader } from 'react-spinners';

import background from "../../assets/img/cranes.jpg";
import Dockmaster_Logo from "../../assets/img/Dockmaster_Logo.png";

import { LoginHeader } from './login-header.js';
import { LoginFooter } from './login-footer.js';


class ResendEmail extends Component {

  state = {
    loading: false,
  }

  resendEmail = () => {
    console.log('reSendEmail Email ', this.state);
  }

  render() {
    console.log('ResendEmail ', this.props);

    return (
      <div className='signup-wrapper-main reset-password'>
        {
          (this.state.loading) ?
            <div className="loading-indicator-wrapper">
              <RingLoader
                color={'white'}
                size={80}
              />
            </div> : null
        }

        <LoginHeader logo={Dockmaster_Logo} />

        <div className='login-signup-wrapper' style={{ backgroundImage: `url(${background})` }}>


          <div className='signup-container reset-password-container'>

            <div className='signup-title resend-email'>{'Welcome to Dockmasters!'}
              {
                (this.props.networkError.createUserNetworkError) ? <span className='network-error'>{'Check your email please'}</span> : null
              }
            </div>


            <div className='resend-email-text'>{'We have sent you a verification email at user@email.com'}</div>
            <div className='resend-email-text'>{'Please check your email and confirm your identity'}</div>


            <div className='signup-create-account-container resend-email'>

              <div className='signup-create-account-button'>
                <button disabled={this.validateInputs} onClick={this.resendEmail} className='active'>
                  {'Resend Email'}
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

const mapStateToProps = ({ networkError  }) => ({
  networkError,
});

const actions = {
  // _createNewUser,
};

export default connect(mapStateToProps, actions)(ResendEmail);
