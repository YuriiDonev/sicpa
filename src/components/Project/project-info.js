import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
// import moment from 'moment';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import Lightbox from 'react-images';
import SweetAlert from 'react-bootstrap-sweetalert';

// import Viewer from 'react-viewer';
// import 'react-viewer/dist/index.css';

import ProjectInfoUser from './UserRoleView/project-info-user.js';
import NoProjectsPlaceholder from '../Project/UserRoleView/no-projects.js';
import { GeneralNotesInfo } from './general-notes-info.js';

import {
  getProjectInfoById as _getProjectInfoById,
  deleteImgFromProject as _deleteImgFromProject,
  updateProjectInfo as _updateProjectInfo,
  editProjectImgDescription as _editProjectImgDescription,
} from '../../actions/projects-actions.js';

import { timezones } from '../../mock-data/timezones.js';
import { countriesList } from '../../mock-data/countries';

import { HOST_NAME } from '../../mock-data/host-name.js';
import { getTokenForImages } from '../../service/token.js';

import { FIELDS_ERROR } from '../../mock-data/error-messages.js';
import { detectIE } from '../../helpers/detectIE.js';

class ProjectInfo extends Component {

  state = {
    accepted: [],
    acceptedProjectImgs: [],
    acceptedDescr: [],
    project_id: this.props.projectInfo.id || '',
    country: this.props.projectInfo.country || '',
    projectName: this.props.projectInfo.name || '',
    projectAddress: this.props.projectInfo.address || '',
    projectCity: this.props.projectInfo.city || '',
    projectProvince: this.props.projectInfo.state || '',
    postal: this.props.projectInfo.postal || '',
    projectDescription: this.props.projectInfo.description || '',
    generalNotes: this.props.projectInfo.general_notes || '',
    timezone: this.props.projectInfo.timezone || '',
    projectNameError: '',
    projectAddressError: '',
    projectCityError: '',
    projectProvinceError: '',
    projectDescriptionError: '',
    countryError: '',
    postalError: '',
    timezoneError: '',
    updateButtonIsActive: true,
    isAddNewProject: false,

    coverImage: this.props.projectInfo.icon_url || '',
    isCoverImgEdit: false,

    editImgDescription: null,
    editNewImgDescription: null,

    isEditExistImageDescription: null,
    existImageDescription: '',

    projectImages: (this.props.projectInfo.images) ? this.props.projectInfo.images.map(img => Object.assign({}, img)) : null,

    // lightboxIsOpen: false,
    // currentImage: 0,

    showLargeImgAlert: false,
    showGeneralNotesInfo: false,

    // visibleViewer: false,
    // activeImage: null,
  }

  setInputData = (event) => {
    if (event.target.name === 'projectName') {
      (event.target.value === '') ? this.setState({ projectNameError: FIELDS_ERROR }) : this.setState({ projectNameError: '' });
      this.setState({ projectName: event.target.value });
    } else if (event.target.name === 'projectAddress') {
      (event.target.value === '') ? this.setState({ projectAddressError: FIELDS_ERROR }) : this.setState({ projectAddressError: '' });
      this.setState({ projectAddress: event.target.value });
    } else if (event.target.name === 'postal') {
      (event.target.value === '') ? this.setState({ postalError: FIELDS_ERROR }) : this.setState({ postalError: '' });
      this.setState({ postal: event.target.value });
    } else if (event.target.name === 'projectCity') {
      (event.target.value === '') ? this.setState({ projectCityError: FIELDS_ERROR }) : this.setState({ projectCityError: '' });
      this.setState({ projectCity: event.target.value });
    } else if (event.target.name === 'projectDescription') {
      (event.target.value === '') ? this.setState({ projectDescriptionError: FIELDS_ERROR }) : this.setState({ projectDescriptionError: '' });
      this.setState({ projectDescription: event.target.value });
    } else if (event.target.name === 'generalNotes') {
      this.setState({ generalNotes: event.target.value });
    } else if (event.target.name === 'projectProvince') {
      (event.target.value === '') ? this.setState({ projectProvinceError: FIELDS_ERROR }) : this.setState({ projectProvinceError: '' });
      this.setState({ projectProvince: event.target.value });
    } else if (event.target.name === 'imageDescription') {
      const imgDescr = this.state.projectImages.map(img => Object.assign({}, img));
      imgDescr[+event.target.id].description = event.target.value;
      this.setState({ projectImages: imgDescr });
    } else if (event.target.name === 'existImageDescription') {
      this.setState({ existImageDescription: event.target.value });
    } else if (event.target.name === 'newImageDescription') {
      const newImgDescr = this.state.acceptedDescr.map(img => Object.assign({}, img));
      newImgDescr[+event.target.id].description = event.target.value;
      this.setState({ acceptedDescr: newImgDescr });
    } else {
      return;
    }
  }

  componentDidMount () {
    if (this.props.location.pathname === '/project/add') {
      this.switchToAddProject();
    } else {
      if (this.props.currentProject.id) {
        this.props._getProjectInfoById(this.props.currentProject.id);
      }
    }
  }

  switchToAddProject = () => {
    this.setState({ isAddNewProject: true,
      accepted: [],
      acceptedProjectImgs: [],
      acceptedDescr: [],
      project_id: '',
      country: '',
      projectName: '',
      projectAddress: '',
      projectCity: '',
      projectProvince: '',
      postal: '',
      projectDescription: '',
      generalNotes: '',
      timezone: '',
      projectNameError: '',
      projectAddressError: '',
      projectCityError: '',
      projectProvinceError: '',
      projectDescriptionError: '',
      countryError: '',
      postalError: '',
      timezoneError: '',
      updateButtonIsActive: true,
      editImgDescription: null,
      projectImages: null,
      coverImage: '',
     });
    return;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      if (nextProps.location.pathname === '/project/add') {
        this.switchToAddProject();
      } else if (nextProps.location.pathname === '/project/info') {
        if (this.props.currentProject.id) {
          this.props._getProjectInfoById(this.props.currentProject.id);
          this.setState({
            accepted: [],
            acceptedProjectImgs: [],
            acceptedDescr: [],
            country: this.props.projectInfo.country || '',
            project_id: this.props.projectInfo.id || '',
            projectName: this.props.projectInfo.name || '',
            projectAddress: this.props.projectInfo.address || '',
            projectCity: this.props.projectInfo.city || '',
            projectProvince: this.props.projectInfo.state || '',
            postal: this.props.projectInfo.postal || '',
            projectDescription: this.props.projectInfo.description || '',
            generalNotes: this.props.projectInfo.general_notes || '',
            timezone: this.props.projectInfo.timezone || '',
            projectNameError: '',
            projectAddressError: '',
            projectCityError: '',
            projectProvinceError: '',
            projectDescriptionError: '',
            countryError: '',
            postalError: '',
            timezoneError: '',
            updateButtonIsActive: true,
            coverImage: this.props.projectInfo.icon_url || '',
            isCoverImgEdit: false,
            editImgDescription: null,
            projectImages: (this.props.projectInfo.images) ? this.props.projectInfo.images.map(img => Object.assign({}, img)) : [],
            isAddNewProject: false,
          });
        }
      }
    }
    if (this.props.currentProject.id !== nextProps.currentProject.id) {
      const projectId = nextProps.currentProject.id;
      this.props._getProjectInfoById(projectId);
    }
    if (!_.isEqual(this.props.projectInfo, nextProps.projectInfo)) {
      this.setState({
        accepted: [],
        acceptedProjectImgs: [],
        acceptedDescr: [],
        project_id: nextProps.projectInfo.id || '',
        projectName: nextProps.projectInfo.name || '',
        projectAddress: nextProps.projectInfo.address || '',
        projectCity: nextProps.projectInfo.city || '',
        projectProvince: nextProps.projectInfo.state || '',
        country: nextProps.projectInfo.country || '',
        postal: nextProps.projectInfo.postal || '',
        projectDescription: nextProps.projectInfo.description || '',
        generalNotes: nextProps.projectInfo.general_notes || '',
        timezone: nextProps.projectInfo.timezone || '',
        projectImages: (nextProps.projectInfo.images) ? nextProps.projectInfo.images.map(img => Object.assign({}, img)) : [],
        coverImage: nextProps.projectInfo.icon_url,
        isCoverImgEdit: false,
        isAddNewProject: false
      });
    }
    if (this.props.location.pathname === '/project/add' && this.props.currentProject.id !== nextProps.currentProject.id) {
      this.props.history.push('/project/info');
      const projectId = nextProps.currentProject.id;
      this.props._getProjectInfoById(projectId);
    }
  }

  saveCoverImage = (accepted, rejected) => {
    if (accepted && !_.isEmpty(accepted)) {
      this.setState({ accepted });
    } else {
      this.setState({showLargeImgAlert: true});
    }
  }

  saveProjectImage = (acceptedProjectImg, rejected) => {
    if (acceptedProjectImg && !_.isEmpty(acceptedProjectImg)) {
      this.setState({
        acceptedProjectImgs: [...this.state.acceptedProjectImgs, acceptedProjectImg[0]],
        acceptedDescr: [...this.state.acceptedDescr, { preview: acceptedProjectImg[0].preview, description: ''}]
       });
    } else {
      this.setState({showLargeImgAlert: true});
    }
  }

  chooseCountry = (country) => {
    (country === null) ? this.setState({ countryError: FIELDS_ERROR }) : this.setState({ countryError: '' });
    this.setState({ country });
  }

  chooseTimezone = (timezone) => {
    (timezone === null) ? this.setState({ timezoneError: FIELDS_ERROR }) : this.setState({ timezoneError: '' });
    this.setState({ timezone });
  }

  editNewImageDescription = (preview) => {
    if (this.state.editNewImgDescription !== null) return;
    this.setState({ editNewImgDescription: preview });
  }

  saveNewImgDescription = () => {
    this.setState({ editNewImgDescription: null});
  }

  deleteNewImage = (preview) => {
    if (_.isEmpty(this.state.acceptedProjectImgs)) return;
    const newAcceptedProjectImgs = this.state.acceptedProjectImgs.filter((file) => { if (file.preview !== preview) return file; });
    const newAcceptedDescr = this.state.acceptedDescr.filter((descr) => { if (descr.preview !== preview) return descr; });
    this.setState({
      acceptedProjectImgs: newAcceptedProjectImgs,
      acceptedDescr: newAcceptedDescr,
      editNewImgDescription: null
    });
  }

  deleteImage = (img_url) => {
    this.props._deleteImgFromProject({
      project_id: this.props.currentProject.id,
      urls: [img_url]
    });
    this.setState({ editNewImgDescription: null });
  }

  editCoverImg = () => {
    if (this.state.isCoverImgEdit) {
      this.setState({ isCoverImgEdit: false, accepted: [] });
    } else {
      this.setState({ isCoverImgEdit: true });
    }
  }

  createFormData = (update) => {
    const formdata = new FormData();
    if (update) {
      formdata.append('id', this.state.project_id);
    }
    formdata.append('name', this.state.projectName);
    formdata.append('address', this.state.projectAddress);
    formdata.append('state', this.state.projectProvince);
    formdata.append('city', this.state.projectCity);
    formdata.append('country', this.state.country);
    formdata.append('postal', this.state.postal);
    formdata.append('description', this.state.projectDescription);
    formdata.append('timezone', this.state.timezone);
    formdata.append('general_notes', this.state.generalNotes);
    if (!_.isEmpty(this.state.accepted)) {
      formdata.append('icon', this.state.accepted[0]);
    }
    if (!_.isEmpty(this.state.acceptedProjectImgs)) {
      this.state.acceptedProjectImgs.forEach((img) => {
        formdata.append('images', img);
        if (!_.isEmpty(this.state.acceptedDescr)) {
          const imgDsc = _.find(this.state.acceptedDescr, (descr) => img.preview === descr.preview);
          if (imgDsc) {
            formdata.append('image_descriptions', imgDsc.description);
          }
        }
      });
    }
    this.props._updateProjectInfo(formdata);
  }

  updateProjectInfo = () => {
    this.createFormData(true);
  }

  addNewProject = () => {
    this.createFormData();
  }

  get isSame() {
    if ((this.state.country === this.props.projectInfo.country &&
    this.state.timezone === this.props.projectInfo.timezone &&
    this.state.projectName === this.props.projectInfo.name &&
    this.state.projectAddress === this.props.projectInfo.address &&
    this.state.projectCity === this.props.projectInfo.city &&
    this.state.projectProvince === this.props.projectInfo.state &&
    this.state.projectDescription === this.props.projectInfo.description &&

    (this.state.generalNotes === this.props.projectInfo.general_notes || this.props.projectInfo.general_notes === null && this.state.generalNotes === '') &&

    this.state.postal === this.props.projectInfo.postal &&
    // _.isEqual(this.state.projectImages, this.props.projectInfo.images) &&

    ((_.isEmpty(this.state.projectImages) && this.props.projectInfo.images === null) ||
       (_.isEqual(this.state.projectImages, this.props.projectInfo.images))) &&

    _.isEmpty(this.state.accepted) &&
    _.isEmpty(this.state.acceptedProjectImgs)
    ) || (
      this.state.projectNameError !== '' ||
      this.state.projectAddressError !== '' ||
      this.state.projectCityError !== '' ||
      this.state.projectProvinceError !== '' ||
      this.state.projectDescriptionError !== '' ||
      this.state.countryError !== '' ||
      this.state.timezoneError !== '' ||
      this.state.postalError !== '' )) {
      return true;
    } else {
      return false;
    }
  }

  get isValid() {
    if ((
      this.state.projectNameError !== '' ||
      this.state.projectAddressError !== '' ||
      this.state.projectCityError !== '' ||
      this.state.projectProvinceError !== '' ||
      this.state.projectDescriptionError !== '' ||
      this.state.countryError !== '' ||
      this.state.timezoneError !== '' ||
      this.state.postalError !== ''
    ) || (
      this.state.country === '' ||
      this.state.timezone === '' ||
      this.state.projectName === '' ||
      this.state.projectAddress === '' ||
      this.state.projectCity === '' ||
      this.state.projectProvince === '' ||
      this.state.projectDescription === '' ||
      this.state.postal === ''))
    {
      return true;
    } else {
      return false;
    }
  }

  hideAlert = () => {
    this.setState({showLargeImgAlert: false});
  }

  openGeneralNotesInfo = () => {
    if (this.state.showGeneralNotesInfo) {
      this.setState({ showGeneralNotesInfo: false });
    } else {
      this.setState({ showGeneralNotesInfo: true });
    }
  }

  editExistImageDescription = (img) => {
    if (this.state.isEditExistImageDescription || this.state.editNewImgDescription) return;
    this.setState({ existImageDescription: img.description, isEditExistImageDescription: img.url });
  }

  saveExistImgDescription = () => {
    this.props._editProjectImgDescription({
      project_id: this.state.project_id,
      img_url: this.state.isEditExistImageDescription,
      description: this.state.existImageDescription
    });
    this.setState({ existImageDescription: '', isEditExistImageDescription: null });
  }

  cancelExistImgDescriptionEdit = () => {
    this.setState({ existImageDescription: '', isEditExistImageDescription: null });
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

    const ie = detectIE();

    let options = countriesList.map((country, i) => ({value: country.name, label: country.name}));
    const token = getTokenForImages();

    const lightboxImages = (this.props.projectInfo.images && !_.isEmpty(this.props.projectInfo.images)) ? this.props.projectInfo.images.map((img, i) => ({
      src: `${HOST_NAME}${img.url}?access_token=${token}`,
      caption: img.description
    })) : [];

    if (_.isEmpty(this.props.projects)) { return <NoProjectsPlaceholder />; } else {
      return (
        <div className="main-content">
          {
            (this.state.showLargeImgAlert) ?
            <SweetAlert
              title={''}
              style={{display: "block", marginTop: "-100px", fontSize: '16px'}}
              onConfirm={this.hideAlert}>
                {'The image you are trying to upload is too big (maximum size is 30 Mb), please resize and try again'}
            </SweetAlert> : null
          }
          {
          (this.props.currentProject.role !== 'admin') ? <ProjectInfoUser /> :

          <div>

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
              (this.state.showGeneralNotesInfo) ? <GeneralNotesInfo closeGeneralNotesInfo={this.openGeneralNotesInfo} /> :
            <div className='project-info-container'>
              <div className='project-address-img'>
                <div className='project-address'>
                  <div className='project-name-address-container'>
                    <div className='project-name'>
                      <div className='project-name-title'>{'PROJECT NAME*'}</div>
                      <input type="text" id="project" name="projectName" value={this.state.projectName} placeholder={'Enter project name'}
                      maxLength='30'
                      onChange={this.setInputData} />
                      {
                        (this.state.projectNameError) ? <div className='input-error'>{this.state.projectNameError}</div> : null
                      }
                    </div>

                    <div className='project-address-input'>
                      <div className='project-address-title'>{'ADDRESS*'}</div>
                      <input type="text" id="address" name="projectAddress" value={this.state.projectAddress} placeholder={'Enter project address'}
                      maxLength='60'
                      onChange={this.setInputData} />
                      {
                        (this.state.projectAddressError) ? <div className='input-error'>{this.state.projectAddressError}</div> : null
                      }
                    </div>
                  </div>

                  <div className='project-name-address-container'>
                    <div className='project-name'>
                      <div className='project-name-title'>{'POSTAL CODE*'}</div>
                      <input type="text" id="project" name="postal" value={this.state.postal} placeholder={'Enter postal'}
                      maxLength='30'
                      onChange={this.setInputData} />
                      {
                        (this.state.postalError) ? <div className='input-error'>{this.state.postalError}</div> : null
                      }
                    </div>

                    <div className='project-address-input-tz'>
                      <div className='project-address-title'>{'TIME ZONE*'}</div>

                        <Select
                          placeholder={'Select Time Zone'}
                          options={timezones.map((tz) => ({value: tz, label: tz}))}
                          simpleValue
                          clearable={true}
                          value={(this.state.timezone !== '') ? this.state.timezone : undefined}
                          onChange={this.chooseTimezone}
                          searchable={true}
                        />

                      {
                        (this.state.timezoneError) ? <div className='input-error'>{this.state.timezoneError}</div> : null
                      }
                    </div>
                  </div>

                </div>

                <div className='project-cover-img'>

                  <div className='project-cover-img-title'>
                    {
                      (this.state.coverImage && !this.state.isCoverImgEdit) ?
                      <div>{'COVER IMAGE'}<span onClick={this.editCoverImg} className='edit-cover-image'>{'edit image'}</span></div> :
                      <div>{'COVER IMAGE'}
                        {
                          (this.state.isCoverImgEdit) ?
                          <span onClick={this.editCoverImg} className='edit-cover-image'>{'cancel edit image'}</span> : null
                        }
                      </div>
                    }
                  </div>

                  <div className={`dropzone-container ${ie}`}>
                    {
                      (this.state.coverImage && !this.state.isCoverImgEdit) ?
                      <img className={ie} src={`${HOST_NAME}${this.state.coverImage}?access_token=${token}`} alt='' /> :
                      <div>
                        {
                          (!_.isEmpty(this.state.accepted)) ? <img className={ie} src={this.state.accepted[0].preview} alt='' /> :
                          <Dropzone
                            className='dropzone'
                            multiple={false}
                            accept="image/jpeg, image/png"
                            maxSize={30000000}
                            onDrop={this.saveCoverImage}
                          >
                          <div className='upload'>
                            <div className='camera'><i className="pe-7s-camera"></i></div>
                            <div className='upload-picture'>{'Upload Picture'}</div>
                          </div>
                          </Dropzone>
                        }
                      </div>
                    }
                  </div>
                </div>

              </div>

              <div className='city-province-country'>
                <div className='city'>
                  <div className='city-title'>{'CITY*'}</div>
                  <input type="text" id="city" name="projectCity" value={this.state.projectCity} placeholder='Enter City'
                  maxLength='30'
                  onChange={this.setInputData} />
                  {
                    (this.state.projectCityError) ? <div className='input-error'>{this.state.projectCityError}</div> : null
                  }
                </div>
                <div className='province'>
                  <div className='province-title'>{'STATE/PROVINCE*'}</div>
                  <input type="text" id="province" name="projectProvince" value={this.state.projectProvince} placeholder='Enter Province'
                  maxLength='30'
                  onChange={this.setInputData} />
                  {
                    (this.state.projectProvinceError) ? <div className='input-error'>{this.state.projectProvinceError}</div> : null
                  }
                </div>
                <div className='country'>
                  <div className='country-title'>{'COUNTRY*'}</div>
                  <Select
                    id="country-select"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    placeholder={'Select Country'}
                    options={options}
                    simpleValue
                    clearable={true}
                    name="selected-state"
                    disabled={false}
                    value={(this.state.country !== '') ? this.state.country : undefined}
                    onChange={this.chooseCountry}
                    rtl={false}
                    searchable={true}
                  />
                  {
                    (this.state.countryError) ? <div className='input-error'>{this.state.countryError}</div> : null
                  }
                </div>
              </div>
              <div className='project-description'>
                <div className='project-description-title'>{'PROJECT DESCRIPTION*'}</div>
                <textarea rows="3" name="projectDescription" value={this.state.projectDescription}
                placeholder='Enter Project Description'
                maxLength="500" onChange={this.setInputData}></textarea>
              </div>
              {
                (this.state.projectDescriptionError) ? <div className='input-error'>{this.state.projectDescriptionError}</div> : null
              }

              <div className='project-description'>
                <div className='project-description-title general-notes'>

                  <div className='general-notes-title-container'>
                    <div>{'GENERAL NOTES'}</div>
                    <div className='general-notes-prompt'>{'(General Notes will be added to the booking request confirmation)'}</div>
                  </div>
                  <div className='general-notes-sign'><i className="pe-7s-info" onClick={this.openGeneralNotesInfo}></i></div>

                </div>
                <textarea rows="4" name="generalNotes" value={this.state.generalNotes}
                placeholder='Enter General Notes'
                maxLength="1000" onChange={this.setInputData}></textarea>
              </div>

              <div className='images'>
                <div className='images-title'>{'IMAGES'}</div>
                <div className='images-list'>
                  {
                    (_.isEmpty(this.state.projectImages)) ? null : this.state.projectImages.map((img, i) => {
                    return <div key={i} className='image-item-container'>
                      <div className='image-item'>
                        <div className='close-cross'><i className="pe-7s-close" onClick={() => this.deleteImage(img.url)}></i></div>

                        <div className='info-image-description-edit'>

                          <div className='info-add-image-container' onClick={() => this.openCloseLightBox(i)}>
                            <img className={ie} src={`${HOST_NAME}${img.url}?access_token=${token}`} alt='' />
                          </div>

                          <div className='image-description-container'>
                            {
                              (this.state.isEditExistImageDescription && this.state.isEditExistImageDescription === img.url) ?
                              <div className='image-input-description'>
                                <input type="text" id={i} name="existImageDescription"
                                value={this.state.existImageDescription}
                                placeholder='Enter Description'
                                maxLength='80'
                                onChange={this.setInputData} />
                                <div className='exist-image-description-edit-buttons'>
                                  <button onClick={this.saveExistImgDescription}>{'Save'}</button>
                                  <button className='cancel' onClick={this.cancelExistImgDescriptionEdit}>{'Cancel'}</button>
                                </div>
                              </div> :
                              <div className='image-description'>{img.description}</div>
                            }
                          </div>
                          {
                            (this.state.isEditExistImageDescription && this.state.isEditExistImageDescription === img.url) ? null :
                            <div className='edit-icon'><i className="pe-7s-note" onClick={() => this.editExistImageDescription(img)}></i></div>
                          }
                        </div>

                      </div>

                      <div className='image-item-line'></div>
                    </div> })
                  }

                  {
                    (_.isEmpty(this.state.acceptedProjectImgs)) ? null : this.state.acceptedProjectImgs.map((img, i) => {
                    return <div key={i} className='image-item-container'>
                      <div className='image-item'>
                        <div className='close-cross'><i className="pe-7s-close" onClick={() => this.deleteNewImage(img.preview)}></i></div>

                        <div className='info-image-description-edit'>

                          <div className='info-add-image-container'><img className={ie} src={img.preview} alt='' /></div>
                          <div className='image-description-container'>
                          {
                            (this.state.editNewImgDescription === img.preview) ? <div className='image-input-description'>
                              <input type="text" id={i} name="newImageDescription"
                              value={this.state.acceptedDescr[i].description}
                              placeholder='Enter Description'
                              maxLength='80'
                              onChange={this.setInputData} />
                              <div className='exist-image-description-edit-buttons'>
                                <button onClick={this.saveNewImgDescription}>{'Save'}</button>
                              </div>
                            </div> : <div className='image-description'>
                              {
                                (this.state.acceptedDescr[i].description) ? <div>{this.state.acceptedDescr[i].description}</div> :
                                <div className='image-description-placeholder'>{'Enter image description'}</div>
                              }
                            </div>
                          }
                          </div>
                          {
                            (this.state.editNewImgDescription ===  img.preview) ? null :
                            <div className='edit-icon'><i className="pe-7s-note" onClick={() => this.editNewImageDescription(img.preview)}></i></div>
                          }
                        </div>
                      </div>
                      <div className='image-item-line'></div>
                    </div> })
                  }

                  <div className='dropzone-project-inner-container'>
                    <Dropzone
                      className='dropzone project-inner-image'
                      multiple={false}
                      accept="image/jpeg, image/png"
                      maxSize={30000000}
                      onDrop={this.saveProjectImage}
                    >
                    <div className='upload'>
                      <div className='camera'><i className="pe-7s-camera"></i></div>
                      <div className='upload-picture'>{'Upload Picture'}</div>
                    </div>
                    </Dropzone>
                  </div>

                </div>
              </div>
              <div className='update-project-info'>
                <div className='update-project-info-button'>
                  {
                    (this.state.isAddNewProject) ?
                      <button onClick={this.addNewProject} className={(!this.isValid) ? 'active' : ''}
                        disabled={this.isValid}>{'Add new project'}</button> :
                      <button onClick={this.updateProjectInfo} className={(!this.isSame) ? 'active' : ''}
                        disabled={this.isSame}>{'Update Project Info'}</button>
                  }
                </div>
              </div>
            </div>
            }
          </div>
          }
        </div>
      );
    }
  }
}


const mapStateToProps = ({ projectInfo, currentProject, projects }) => ({
  projectInfo,
  currentProject,
  // user,
  projects,
});

const actions = {
  _getProjectInfoById,
  _deleteImgFromProject,
  _updateProjectInfo,
  _editProjectImgDescription,
};

export default connect(mapStateToProps, actions)(ProjectInfo);
