import React from 'react';

export const LoginFooter = () => {
  return (
    <div className='login-footer-wrapper'>
      <div className='login-footer'>
        <div><a href="https://dockmasters.ca/terms.html" target='_blank' rel="noopener noreferrer">{'Terms'}</a></div>
        <div>&#183;</div>
        <div><a href="https://dockmasters.ca/privacy.html" target='_blank' rel="noopener noreferrer">{'Privacy Policy'}</a></div>
        <div>&#183;</div>
        <div><a href="mailto:info@interfaced.ca">{'Contact us'}</a></div>
      </div>
    </div>
  );
};
