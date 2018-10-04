
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
// import moment from 'moment';
import _ from 'lodash';
// import Dropzone from 'react-dropzone';
// import Select from 'react-select';

import Lightbox from 'react-images';
// import Viewer from 'react-viewer';
// import 'react-viewer/dist/index.css';

// import { Grid, Col, Row, NavDropdown, MenuItem } from 'react-bootstrap';
// import Card from '../../Card/Card.jsx';

import { UserContactDetailed } from './user-contact-detail.js';

import {
  // getProjectById as _getProjectById,
  getProjectInfoById as _getProjectInfoById,
} from '../../../actions/projects-actions.js';
import { getContactsForProject as _getContactsForProject } from '../../../actions/contacts-actions.js';

// import { countriesList } from '../../../mock-data/countries';

import { HOST_NAME } from '../../../mock-data/host-name.js';
import { getTokenForImages } from '../../../service/token.js';

class ProjectInfoUser extends Component {

  state = {
    showContactDetailed: false,
    contactDetailedId: '',

    // visibleViewer: false,
    // activeImage: null,

		lightboxIsOpen: false,
		currentImage: 0,
  }

  componentDidMount () {
    if (!this.props.currentProject.id) return;
    const projectId = this.props.currentProject.id;
    this.props._getProjectInfoById(projectId);
    this.props._getContactsForProject(projectId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentProject.id !== nextProps.currentProject.id) {
      this.props._getProjectInfoById(nextProps.currentProject.id);
      this.props._getContactsForProject(nextProps.currentProject.id);
    }
  }

  showContactDetail = (contact_id) => {
    if (this.state.showContactDetailed) {
      this.setState({ showContactDetailed: false, contactDetailedId: '' });
    } else {
      this.setState({ showContactDetailed: true, contactDetailedId: contact_id });
    }
  }

  // openViewer = (index) => {
  //   if (this.state.visibleViewer) {
  //     this.setState({ visibleViewer: false, activeImage: null });
  //   } else {
	//
  //     setTimeout(() => {
	//
  //       const viewer = document.getElementsByClassName('react-viewer-canvas');
  //       viewer[0].style.webkitTransform = 'translate3d(0,0,0)';
  //     }, 100);
	//
  //     this.setState({ visibleViewer: true, activeImage: index });
  //   }
  // }

	openCloseLightBox = (img_index) => {
		if (this.state.lightboxIsOpen) {
			this.setState({ lightboxIsOpen: false });
		} else {
			this.setState({ lightboxIsOpen: true, currentImage: img_index });
		}
	}
	clickThumbnail = (img_index) => {
		this.setState({ currentImage: img_index });
	}
	gotoPrevious = () => {
		this.setState((prevState, props) => (
			{currentImage: prevState.currentImage - 1}
		));
	}
	gotoNext = () => {
		this.setState((prevState, props) => (
			{currentImage: prevState.currentImage + 1}
		));
	}

  render() {
    const token = getTokenForImages();

    const lightboxImages = (this.props.projectInfo.images && !_.isEmpty(this.props.projectInfo.images)) ? this.props.projectInfo.images.map((img, i) => ({
      src: `${HOST_NAME}${img.url}?access_token=${token}`,
      caption: img.description
    })) : [];

    return (
      <div>
        {
          (this.state.showContactDetailed) ?
          <UserContactDetailed
            contact={_.find(this.props.projectInfo.contacts, (contact) => {return contact.id === this.state.contactDetailedId })}
            showContact={this.showContactDetail}
            host={HOST_NAME}
            tok={token}
          /> :
          <div className='project-info-user-container'>

						<div>
							<Lightbox
								images={lightboxImages}
								showThumbnails={true}
								currentImage={this.state.currentImage}
								isOpen={this.state.lightboxIsOpen}
								onClose={this.openCloseLightBox}
								onClickPrev={this.gotoPrevious}
								onClickNext={this.gotoNext}
								onClickThumbnail={this.clickThumbnail}
							/>
						</div>


            <div className='project-info-user-image-container'>
              {
                (this.props.projectInfo.icon_url) ?
                 <img src={`${HOST_NAME}${this.props.projectInfo.icon_url}?access_token=${token}`} alt='' /> : null
              }
            </div>
            <div className='project-info-user-data-container'>
              <div className='project-info-user-data-title'>
							{
								(this.props.projectInfo.name) ? this.props.projectInfo.name : null
							}
							</div>

              <div className='project-info-user-data-address'>
							{
								(this.props.projectInfo.address || this.props.projectInfo.country) ?
								`${this.props.projectInfo.address} ${this.props.projectInfo.country}` : null
							}
							</div>


            <div className='project-info-user-data-description'>{this.props.projectInfo.description}</div>
              {
                (_.isEmpty(this.props.projectInfo)) ? null : <div className='project-info-user-data-contact'>
                  <div className='project-info-user-data-contact-title'>{'PROJECT CONTACTS:'}</div>
                  <div className='project-info-user-data-contact-name'>
                  {
                    (_.isEmpty(this.props.projectContacts)) ? <div>{'No contacts'}</div> :
                    this.props.projectContacts.map((contact, i) => {
                      return <span key={i} onClick={() => this.showContactDetail(contact.id)}>
                        {`${contact.first_name} ${contact.last_name}`}
                      </span>
                    })
                  }
                  </div>
                </div>
              }
              <div className='project-info-user-images'>
                <div className='project-info-user-images-title'>{'IMAGES:'}</div>

                {
                  (_.isEmpty(this.props.projectInfo.images)) ? <div>{'Sorry, you currently do not have any images'}</div> : null
                }

                <div className='project-info-user-images-contaimer'>
                  {
                    (_.isEmpty(lightboxImages)) ? null : lightboxImages.map((img, i) =>
                      <div key={i} className='project-info-user-image' onClick={() => this.openCloseLightBox(i)}>
                        <img src={img.src} alt='' /></div>)
                  }
                </div>

              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}


const mapStateToProps = ({ currentUser, projectInfo, currentProject, user, projectContacts }) => ({
  currentUser,
  projectInfo,
  currentProject,
  user,
  projectContacts,
});

const actions = {
  _getProjectInfoById,
  _getContactsForProject,
};

export default connect(mapStateToProps, actions)(ProjectInfoUser);
