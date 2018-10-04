
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import _ from 'lodash';

import Lightbox from 'react-images';

// import Viewer from 'react-viewer';
// import 'react-viewer/dist/index.css';

// import { Grid, Col, Row, NavDropdown, MenuItem } from 'react-bootstrap';
// import Card from '../../Card/Card.jsx';

import { HOST_NAME } from '../../../mock-data/host-name.js';
import { getTokenForImages } from '../../../service/token.js';
import { UserContactDetailed } from './user-contact-detail.js';

import { timeList } from '../../../mock-data/timezones.js';

class ResourceDetailedUser extends Component {

  state = {
    contactDetailed: false,

    schedule: [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
    ],

    // visibleViewer: false,
    // activeImage: null,

		lightboxIsOpen: false,
		currentImage: 0,
  }

  showContactDetail = () => {
    if (this.state.contactDetailed) {
      this.setState({ contactDetailed: false });
    } else {
      this.setState({ contactDetailed: true });
    }
  }

  renderScheduleForUser = () => {
    const renderSchedule = [];
    if (this.props.resourceDetailed.schedule) {
      this.state.schedule.forEach((day, i) => {
        if (this.props.resourceDetailed.schedule[day] !== undefined) {
          if (this.props.resourceDetailed.schedule[day].full_day) {
            renderSchedule.push(<div key={i} className='operation-hours-row'>
              <div className='operation-hours-container'>
                <div className='operation-hours-day'>{_.upperFirst(day)}</div>
                <div className='operation-hours-schedule'>{'OPEN 24H'}</div>
              </div>
              <div className='operation-hours-line'></div>
            </div>);
          } else {
            renderSchedule.push(<div key={i} className='operation-hours-row'>
              <div className='operation-hours-container'>
                <div className='operation-hours-day'>{_.upperFirst(day)}</div>
                <div className='operation-hours-schedule'>{`${_.find(timeList, (time) => time['24h'] === this.props.resourceDetailed.schedule[day].start_time)['12h']} - ${
                  _.find(timeList, (time) => time['24h'] === this.props.resourceDetailed.schedule[day].end_time)['12h']}`}</div>
              </div>
              <div className='operation-hours-line'></div>
            </div>);
          }
        } else {
          renderSchedule.push(<div key={i} className='operation-hours-row'>
            <div className='operation-hours-container'>
              <div className='operation-hours-day'>{_.upperFirst(day)}</div>
              <div className='operation-hours-schedule'>{'CLOSED'}</div>
            </div>
            <div className='operation-hours-line'></div>
          </div>);
        }
      });
    } else {
      this.state.schedule.forEach((day, i) => {
        renderSchedule.push(<div key={i} className='operation-hours-row'>
          <div className='operation-hours-container'>
            <div className='operation-hours-day'>{_.upperFirst(day)}</div>
            <div className='operation-hours-schedule'>{'CLOSED'}</div>
          </div>
          <div className='operation-hours-line'></div>
        </div>);
      });
    }
    return renderSchedule;
  }

  closeResourceInfo = () => {
    this.props.closeResourceInfo();
  }

  // openViewer = (index) => {
  //   if (this.state.visibleViewer) {
  //     this.setState({ visibleViewer: false, activeImage: null });
  //   } else {
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

    const lightboxImages = (this.props.resourceDetailed.images && !_.isEmpty(this.props.resourceDetailed.images)) ?
      this.props.resourceDetailed.images.map((img, i) => ({
      src: `${HOST_NAME}${img.url}?access_token=${token}`,
      caption: img.description
    })) : [];

    return (
      <div>
      {
        (this.state.contactDetailed) ?
        <UserContactDetailed
          contact={this.props.resourceDetailed.contact}
          showContact={this.showContactDetail}
          host={HOST_NAME}
          tok={token}
        /> :

        <div className='user-resorce-detail-wrapper-main'>

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

          {
            (!_.isEmpty(this.props.resourceDetailed)) ?
            <div className='user-resorce-detail-wrapper'>
              <div className='user-resorce-detail-container'>

                <div className='user-resorce-detail-name-description'>

                  <div className='user-resorce-detail-name'>
                    <div className='user-resorce-detail-name-title'>{'RESOURCE NAME'}</div>
                    <input type="text" name="resource-name" value={this.props.resourceDetailed.name} placeholder='Resource Name' disabled />
                  </div>

                  <div className='user-resorce-detail-description'>
                    <div className='user-resorce-detail-description-title'>{'RESOURCE DESCRIPTION'}</div>
                      <textarea rows="3" name="resource-description" value={this.props.resourceDetailed.description || ''}
                        placeholder='Resource Description' disabled></textarea>
                  </div>

                  <div className='user-resorce-detail-images-container'>
                    <div className='user-resorce-detail-images-title'>{'IMAGES'}</div>
                    {
                      (this.props.resourceDetailed.images && _.isEmpty(this.props.resourceDetailed.images)) ?
                      <div>{'Sorry, You don`t have any images yet'}</div> :
                      <div className='user-resorce-detail-images-wrapper'>
                      {
                        this.props.resourceDetailed.images.map((img, i) =>
                        <div key={i} className='user-resorce-detail-image-item-container'>
                          <div className='user-resorce-detail-image-item'>
                            <div className='user-resorce-detail-image-container' onClick={() => this.openCloseLightBox(i)}>
                              <img src={`${HOST_NAME}${img.url}?access_token=${token}`} alt='' />
                            </div>
                            <div className='user-resorce-detail-image-description'>{img.description}</div>
                          </div>
                          <div className='user-resorce-detail-item-line'></div>
                        </div>)
                      }
                    </div>
                    }
                  </div>

                </div>

                <div className='user-resorce-detail-contact-operation-hours'>

                  <div className='user-resorce-detail-contact'>
                    <div className='user-resorce-detail-contact-title'>{'RESOURCE CONTACT:'}</div>
                    <div className='user-resorce-detail-contact-name'>
                      <span onClick={this.showContactDetail}>
                        {`${this.props.resourceDetailed.contact.first_name} ${this.props.resourceDetailed.contact.last_name}`}
                      </span>
                    </div>
                  </div>

                  <div className='user-resorce-detail-operation-hours'>
                    <div className='user-resorce-detail-operation-hours-title'>
                      {'OPERATION HOURS'}
                    </div>
                    <div className='user-resorce-detail-operation-hours-schedule'>
                      {
                        this.renderScheduleForUser()
                      }
                    </div>
                  </div>

                </div>

              </div>

            </div> : null
          }

          {
            (this.props.closeResourceInfo) ?
            <div className='close-resource-info-button-container'>
              <button className='close-resource-info-button' onClick={this.closeResourceInfo}>{'OK'}</button>
            </div> : null
          }
          </div>


      }
      </div>
    );
  }
}

const mapStateToProps = ({ resourceDetailed }) => ({
	resourceDetailed,
});

const actions = {
};

export default connect(mapStateToProps, actions)(ResourceDetailedUser);
