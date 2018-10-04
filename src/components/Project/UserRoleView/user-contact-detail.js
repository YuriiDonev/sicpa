import React from 'react';

export const UserContactDetailed = props => {
  const showContactDetail = () => {
    props.showContact();
  }

  return (
    <div className='show-contact-detail-popup'>
      <div className='show-contact-close-circle' onClick={showContactDetail}><i className="pe-7s-close-circle"></i></div>
      <div className='show-contact-img-container'>
        {
          (props.contact.img_url) ? <img src={`${props.host}${props.contact.img_url}?access_token=${props.tok}`} alt='' /> :
          <div className='contact-img-placeholder'>{'No image'}</div>
        }
      </div>
      <div className='show-contact-name'>{`${props.contact.first_name} ${props.contact.last_name}`}</div>
      <div className='show-contact-company'>{props.contact.company}</div>
      <div className='show-contact-job-position'>{props.contact.title}</div>
      <div className='show-contact-phone'>{`T: ${props.contact.phone}`}</div>
      <div className='show-contact-mobile'>{`M: ${props.contact.mobile}`}</div>
      <div className='show-contact-email'>{props.contact.email}</div>
    </div>
  );
};
