import React from 'react';
import _ from 'lodash';

export const ProjectContactsUser = (props) => {
  return (
    <div className='project-contacts-container-user'>
      <div className='project-contacts-user'>
          {
            (_.isEmpty(props.contacts)) ?
            <div>{'Sorry, You don`t have any contacts yet'}</div> :
            props.contacts.map((contact, i) => {
            return <div key={i} className='contact-container-user'>
              <div className='contact-item'>
                <div className='image-container'>
                {
                  (contact.img_url) ? <img src={`${props.host}${contact.img_url}?access_token=${props._token}`} alt='' /> :
                  <div className='img-placeholder'>{'No image'}</div>
                }
                </div>
                <div className='name-company-job-container'>
                  <div className='name'>{`${contact.first_name} ${contact.last_name}`}</div>
                  <div className='company'>{contact.company}</div>
                  <div className='job'>{contact.title}</div>
                </div>
                <div className='phones-email-container'>
                  <div className='phone'>{`T: ${contact.phone}`}</div>
                  <div className='mobile'>{`M: ${contact.mobile}`}</div>
                  <div className='email'>{contact.email}</div>
                </div>
                <div className='project-contacts-user-filler'></div>
              </div>
              <div className='contact-item-line'></div>
            </div> })
          }
      </div>
    </div>
  );
}
