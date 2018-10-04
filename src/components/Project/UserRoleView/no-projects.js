import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoProjectsPlaceholder extends Component {

  render() {

    return (
      <div className='no-projects-placeholder'>

        {
          (this.props.userInfo.verified) ?
          <div className='no-projects-placeholder-container'>
            <div className='no-projects-placeholder-title'>
              <span>{'You currently do not have any projects assigned to you'}</span>
            </div>
            <div className='no-projects-placeholder-contact-us'>
              <a href="mailto:info@interfaced.ca">{'New to Dockmasters? Contact us for a free demo'}</a>
            </div>
          </div> :

          <div className='no-projects-placeholder-container unverified'>
            <div className='no-projects-placeholder-title'>
              <span>{'We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link'}</span>
            </div>
            <div className='no-projects-placeholder-contact-us unverified-contact-us'>
              <span>{'Please contact support at '}</span>
              <a href="mailto:info@interfaced.ca">{'info@interfaced.ca'}</a>
              <span>{' if you are having difficulties with the verification'}</span>
            </div>
          </div>
        }

      </div>
    );
  }
}

const mapStateToProps = ({ userInfo }) => ({
  userInfo
});

export default connect(mapStateToProps, null)(NoProjectsPlaceholder);
