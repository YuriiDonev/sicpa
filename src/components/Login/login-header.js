import React from 'react';

export const LoginHeader = (props) => {
  return (
    <div className='login-header'>
      <div className='login-header-image-wrapper'>
        <div className='login-header-image' style={{ backgroundImage: `url(${props.logo})` }}></div>
      </div>
      <div className='login-header-title'>{'DOCKMASTERS'}</div>
    </div>
  );
};
