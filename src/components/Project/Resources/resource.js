
import React, { Component } from 'react';

import { HOST_NAME } from '../../../mock-data/host-name.js';
import { getTokenForImages } from '../../../service/token.js';

class Resource extends Component {

  redirectToEditResource = () => {
    this.props.editResource(this.props.id);
  }

  bookResource = () => {
    this.props.book(this.props.id);
  }

  deleteResource = () => {
    this.props.delResource(this.props.id);
  }

  render() {

    const token = getTokenForImages();

    return (
      <div className='contact-container'>
        <div className='resource-item'>
          {
            (this.props.userRole === 'admin') ?
            <div className='resource-close-cross'><i className="pe-7s-close" onClick={this.deleteResource}></i></div> : null
          }
          <div className='resource-image-container'>
            {
              (this.props.img) ? <img src={`${HOST_NAME}${this.props.img}?access_token=${token}`} alt='' /> : <div className='img-resource-placeholder'>{'No image'}</div>
            }
          </div>
          <div className='resource-name'>{this.props.name}</div>

          {
            (this.props.userRole === 'admin') ?
            <div className='edit-icon'>
              <div className='edit-view-details' onClick={this.redirectToEditResource}>
                <i className="pe-7s-note"></i>
                <div>{'Edit/View Details'}</div>
              </div>
            </div> :
            <div className='user-role-edit-icon-container'>
              <div className='edit-icon'>
                <div className='edit-view-details' onClick={this.bookResource}>
                  <i className="pe-7s-date"></i>
                  <div>{'Book Resource'}</div>
                </div>
              </div>
              <div className='edit-icon'>
                <div className='edit-view-details' onClick={this.redirectToEditResource}>
                  <i className="pe-7s-look"></i>
                  <div>{'View Details'}</div>
                </div>
              </div>
            </div>
          }
          {
            (this.props.userRole === 'admin') ? <div className='contact-empty-filler'></div> : null
          }
        </div>
        <div className='contact-item-line'></div>
      </div>
    );
  }
}

export default Resource;
