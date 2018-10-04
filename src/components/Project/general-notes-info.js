import React, { Component } from 'react';
import EmailPreviewImage from '../../assets/img/Comments.png';

export const GeneralNotesInfo = props => {
    const closeInfo = () => {
      props.closeGeneralNotesInfo();
    }

    return (
      <div className='general-notes-info-image-wrapper'>
        <div className='show-general-notes-close-circle'><i className="pe-7s-close-circle" onClick={closeInfo}></i></div>
        <div className='general-notes-info-image-container'>
          <div className='general-notes-image-container'><img src={EmailPreviewImage} alt='' /></div>
        </div>
      </div>
    );
};
