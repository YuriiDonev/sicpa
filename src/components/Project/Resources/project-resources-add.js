//
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import _ from 'lodash';
// import Dropzone from 'react-dropzone';
// import Select from 'react-select';
//
// import Lightbox from 'react-images';
//
// import SweetAlert from 'react-bootstrap-sweetalert';
//
// // import Viewer from 'react-viewer';
// // import 'react-viewer/dist/index.css';
//
//
// import ResourceDetailedUser from '../UserRoleView/resource-detailed-user.js';
//
// import {
// 	getResourceDetails as _getResourceDetails,
// 	updateResource as _updateResource,
// 	deleteResourceImg as _deleteResourceImg,
// 	createNewResource as _createNewResource,
// 	deleteImgFromResource as _deleteImgFromResource,
// 	editResourceImgDescription as _editResourceImgDescription,
// } from '../../../actions/resources-actions.js';
// import { resourcesTypes } from '../../../mock-data/resource-types.js';
// import { getContactsForProjectEnd } from '../../../service/endPoint.js';
//
// import { HOST_NAME } from '../../../mock-data/host-name.js';
// import { FIELDS_ERROR } from '../../../mock-data/error-messages.js';
//
// import { getTokenForImages } from '../../../service/token.js';
//
// import Schedule from './schedule.js';
//
// class ProjectResourcesAdd extends Component {
//
// 	state = {
// 		accepted: [],
// 		resource_id: this.props.resourceDetailed.id || '',
// 		resourceName: this.props.resourceDetailed.name || '',
// 		type: this.props.resourceDetailed.type || '',
//
// 		ownerId: (!_.isEmpty(this.props.resourceDetailed)) ? ((typeof this.props.resourceDetailed.contact === 'object') ?
// 		this.props.resourceDetailed.contact.id : this.props.resourceDetailed.contact) : '',
//
// 		owner: (typeof this.props.resourceDetailed.contact === 'object') ?
// 		this.props.resourceDetailed.contact.first_name + ' ' + this.props.resourceDetailed.contact.last_name : '',
//
// 		description: this.props.resourceDetailed.description || '',
//
// 		listing_img: this.props.resourceDetailed.listing_img || '',
// 		isListingImageEdit: false,
//
// 		resourceNameError: '',
// 		// descriptionError: '',
// 		typeError: '',
// 		ownerError: '',
//
// 		isScheduleChange: false,
// 		schedule: '',
// 		scheduleError: '',
//
// 		resourceImages: (this.props.resourceDetailed.images) ? this.props.resourceDetailed.images.map(img => Object.assign({}, img)) : [],
//
// 		editImgDescription: null,
// 		editNewImgDescription: null,
//
// 		acceptedResourceImgs: [],
// 		acceptedDescr: [],
//
// 		lightboxIsOpen: false,
// 		currentImage: 0,
//
// 		showLargeImgAlert: false,
//
// 		existResourceImgDescription: '',
// 		isEditExistResourceImgDescription: null,
//
// 		// visibleViewer: false,
// 		// activeImage: null,
// 	}
//
// 	componentDidMount () {
// 		if (this.props.location.pathname !== '/project/resources/add') {
// 			if (this.props.match.params.resource_id) {
// 				this.props._getResourceDetails(this.props.match.params.resource_id);
// 			}
// 			// this.props._getResourceDetails(this.props.location.pathname.slice(23));
// 		} else {
// 			this.setState({
// 				resource_id: '',
// 				resourceName: '',
// 				type: '',
// 				ownerId: '',
// 				owner: '',
// 				description: '',
// 				listing_img: '',
// 				resourceImages: [],
// 				// schedule: '',
// 				isScheduleChange: false,
// 				accepted: [],
// 				isListingImageEdit: false,
// 			});
// 		}
// 	}
//
// 	findOwner = (contact) => {
// 		const owner = _.find(this.props.projectContacts, (cont) => { return cont.id === contact; });
// 		return owner.first_name + ' ' + owner.last_name;
// 	}
//
// 	componentWillReceiveProps(nextProps) {
// 		if (!_.isEqual(this.props.resourceDetailed, nextProps.resourceDetailed)) {
// 			this.setState({
// 				resource_id: nextProps.resourceDetailed.id,
// 				resourceName: nextProps.resourceDetailed.name,
// 				listing_img: nextProps.resourceDetailed.listing_img,
// 				type: nextProps.resourceDetailed.type,
// 				ownerId: (typeof nextProps.resourceDetailed.contact === 'object') ? nextProps.resourceDetailed.contact.id : nextProps.resourceDetailed.contact,
// 				owner: (typeof nextProps.resourceDetailed.contact === 'object') ?
// 				nextProps.resourceDetailed.contact.first_name + ' ' + nextProps.resourceDetailed.contact.last_name :
// 				this.findOwner(nextProps.resourceDetailed.contact),
// 				description: nextProps.resourceDetailed.description || '',
// 				resourceImages: (nextProps.resourceDetailed.images) ? nextProps.resourceDetailed.images.map(img => Object.assign({}, img)) : [],
// 				isScheduleChange: false,
// 				editImgDescription: null,
// 				editNewImgDescription: null,
// 				accepted: [],
// 				acceptedResourceImgs: [],
// 				acceptedDescr: [],
// 				isListingImageEdit: false,
// 			 });
// 		}
// 		if (this.props.currentProject.id !== nextProps.currentProject.id) {
// 			this.props.history.push('/project/resources');
// 		}
// 	}
//
// 	setInputData = (event) => {
// 		if (event.target.name === 'resource-name') {
// 			(event.target.value === '') ? this.setState({ resourceNameError: FIELDS_ERROR }) : this.setState({ resourceNameError: '' });
// 			this.setState({ resourceName: event.target.value });
// 		} else if (event.target.name === 'resource-description') {
// 			this.setState({ description: event.target.value });
// 		} else if (event.target.name === 'existResourceImageDescription') {
// 			this.setState({ existResourceImgDescription: event.target.value });
// 		} else if (event.target.name === 'newImageDescription') {
//       const newImgDescr = this.state.acceptedDescr.map(img => Object.assign({}, img));
//       newImgDescr[+event.target.id].description = event.target.value;
//       this.setState({ acceptedDescr: newImgDescr });
//     } else {
//       return;
//     }
// 	}
//
// 	chooseType = (type) => {
// 		(type === null) ? this.setState({ typeError: FIELDS_ERROR }) : this.setState({ typeError: '' });
// 		this.setState({ type });
// 	}
//
// 	getProjectContacts = (project_id) => {
// 		if (!project_id) return;
// 		return getContactsForProjectEnd(project_id)
// 			.then(contacts => ({
// 				options: contacts.map(contact => ({
// 					value: `${contact.first_name} ${contact.last_name}`,
// 					label: `${contact.first_name} ${contact.last_name}`,
// 					id: contact.id,
// 				})),
// 			})
// 		);
// 	}
//
// 	chooseOwner = (owner) => {
// 		(owner === null) ? this.setState({ ownerError: FIELDS_ERROR, owner: '', ownerId: '' }) :
// 		this.setState({ ownerError: '', owner: owner.value, ownerId: owner.id });
// 	}
//
// 	editImageDescription = (event) => {
// 		if (this.state.editImgDescription !== null) return;
// 		this.setState({ editImgDescription: +event.target.dataset.id });
// 	}
//
// 	saveImgDescription = (id, descr) => {
// 		const imgDescr = this.state.resourceImages.map(img => Object.assign({}, img));
// 		imgDescr[id].description = descr;
// 		this.setState({ resourceImages: imgDescr, editImgDescription: null });
// 	}
//
// 	deleteExistImage = (img_url) => {
// 		this.props._deleteImgFromResource({
// 			resource_id: this.state.resource_id,
// 			urls: [img_url]
// 		});
// 		this.setState({ editNewImgDescription: null });
// 	}
//
// 	saveResourceImage = (acceptedResourceImg, rejected) => {
// 		if (acceptedResourceImg && !_.isEmpty(acceptedResourceImg)) {
// 			this.setState({
// 				acceptedResourceImgs: [...this.state.acceptedResourceImgs, acceptedResourceImg[0]],
// 				acceptedDescr: [...this.state.acceptedDescr, { preview: acceptedResourceImg[0].preview, description: ''}]
// 			 });
// 		} else {
// 			this.setState({showLargeImgAlert: true});
// 		}
// 	}
//
// 	createFormData = (update) => {
// 		const formdata = new FormData();
// 		if (update) {
// 			formdata.append('id', this.state.resource_id);
// 		}
// 		formdata.append('project_id', this.props.currentProject.id);
// 		formdata.append('name', this.state.resourceName);
// 		formdata.append('type', this.state.type);
// 		if (this.state.description) {
// 			formdata.append('description', this.state.description);
// 		}
// 		formdata.append('contact', this.state.ownerId);
// 		if (this.state.schedule !== '') {
// 			formdata.append('schedule', this.state.schedule);
// 		} else {
// 			if (this.props.location.pathname !== '/project/resources/add') {
// 				if (this.props.resourceDetailed.schedule) {
// 					formdata.append('schedule', JSON.stringify(this.props.resourceDetailed.schedule));
// 				}
// 			}
// 		}
// 		if (!_.isEmpty(this.state.accepted)) {
// 			formdata.append('listing_img', this.state.accepted[0]);
// 		}
// 		if (!_.isEmpty(this.state.acceptedResourceImgs)) {
// 			this.state.acceptedResourceImgs.forEach((img) => {
// 				formdata.append('images', img);
// 				if (!_.isEmpty(this.state.acceptedDescr)) {
// 					const imgDsc = _.find(this.state.acceptedDescr, (descr) => img.preview === descr.preview);
// 					if (imgDsc) {
// 						formdata.append('image_descriptions', imgDsc.description);
// 					}
// 				}
// 			});
// 		}
// 		if (update) {
// 			this.props._updateResource(formdata);
// 		} else {
// 			this.props._createNewResource(formdata);
// 		}
// 	}
//
// 	updateResource = () => {
// 		this.createFormData(true);
// 	}
//
// 	createResource = () => {
// 		this.createFormData();
// 		this.props.history.push('/project/resources');
// 	}
//
// 	deleteImg = (img_url) => {
// 		this.props._deleteResourceImg({
// 			resource_id: this.state.resource_id,
// 			urls: [img_url]
// 		});
// 	}
//
// 	cancelSaveResource = () => {
// 		this.props.history.push('/project/resources');
// 	}
//
// 	saveListingImage = (accepted, rejected) => {
// 		if (accepted && !_.isEmpty(accepted)) {
// 			this.setState({ accepted });
// 		} else {
// 			this.setState({showLargeImgAlert: true});
// 		}
// 	}
//
// 	editListingImg = () => {
// 		if (this.state.isListingImageEdit) {
// 			this.setState({ isListingImageEdit: false, accepted: [] });
// 		} else {
// 			this.setState({ isListingImageEdit: true });
// 		}
// 	}
//
// 	get isSame() {
// 		if ((
// 			this.state.resourceName === this.props.resourceDetailed.name &&
// 			this.state.type === this.props.resourceDetailed.type &&
// 			(this.state.ownerId === this.props.resourceDetailed.contact ||
// 				this.state.ownerId === this.props.resourceDetailed.contact.id) &&
// 			(this.state.description === '' && this.props.resourceDetailed.description === null ||
// 				this.state.description === this.props.resourceDetailed.description) &&
// 			this.state.isScheduleChange === false &&
//
// 			((_.isEmpty(this.state.resourceImages) && this.props.resourceDetailed.images === null) ||
// 				 (_.isEqual(this.state.resourceImages, this.props.resourceDetailed.images))) &&
//
// 			_.isEmpty(this.state.accepted) &&
// 			_.isEmpty(this.state.acceptedResourceImgs)
//
// 		) || (
// 			this.state.resourceNameError !== '' ||
// 			this.state.typeError !== '' ||
// 			this.state.ownerError !== ''
// 		)) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}
//
// 	get isValid() {
// 		if ((
// 			this.state.resourceNameError !== '' ||
// 			this.state.typeError !== '' ||
// 			this.state.ownerError !== '' ||
// 			this.state.scheduleError !== ''
// 		) || (
// 			this.state.resourceName === '' ||
// 			this.state.type === '' ||
// 			this.state.owner === ''
// 		)) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}
//
// 	takeScheduleState = (isChanged, newSchedule, isNewResource) => {
// 		if (isNewResource && !isChanged) {
// 			this.setState({scheduleError: 'Start and End times are required'});
// 		} else {
// 			this.setState({scheduleError: ''});
// 		}
//
// 		if (isChanged) {
// 			this.setState({isScheduleChange: true, schedule: newSchedule});
// 		} else {
// 			this.setState({isScheduleChange: false, schedule: ''});
// 		}
// 	}
//
// 	editNewImageDescription = (preview) => {
// 		if (this.state.editNewImgDescription !== null || this.state.isEditExistResourceImgDescription !== null) return;
// 		this.setState({ editNewImgDescription: preview });
// 	}
//
// 	saveNewImgDescription = () => {
// 		this.setState({ editNewImgDescription: null});
// 	}
//
// 	deleteNewImage = (preview) => {
// 		if (_.isEmpty(this.state.acceptedResourceImgs)) return;
// 		const newAcceptedResourceImgs = this.state.acceptedResourceImgs.filter((file) => { if (file.preview !== preview) return file; });
// 		const newAcceptedDescr = this.state.acceptedDescr.filter((descr) => { if (descr.preview !== preview) return descr; });
// 		this.setState({
// 			acceptedResourceImgs: newAcceptedResourceImgs,
// 			acceptedDescr: newAcceptedDescr,
// 			editNewImgDescription: null
// 		});
// 	}
//
// 	hideAlert = () => {
// 		this.setState({showLargeImgAlert: false});
// 	}
//
// 	editExistResourceImgDescription = (img) => {
// 		if (this.state.isEditExistResourceImgDescription || this.state.editNewImgDescription) return;
// 		this.setState({ existResourceImgDescription: img.description, isEditExistResourceImgDescription: img.url });
// 	}
//
// 	saveExistResourceImgDescription = () => {
// 		this.props._editResourceImgDescription({
// 			resource_id: this.state.resource_id,
// 			img_url: this.state.isEditExistResourceImgDescription,
// 			description: this.state.existResourceImgDescription
// 		});
// 		this.setState({ existResourceImgDescription: '', isEditExistResourceImgDescription: null });
// 	}
//
// 	cancelExistResourceImgDescriptionEdit = () => {
// 		this.setState({ existResourceImgDescription: '', isEditExistResourceImgDescription: null });
// 	}
//
// 	// openViewer = (index) => {
// 	// 	if (this.state.visibleViewer) {
// 	// 		this.setState({ visibleViewer: false, activeImage: null });
// 	// 	} else {
// 	// 		this.setState({ visibleViewer: true, activeImage: index });
// 	// 	}
// 	// }
//
// 	openCloseLightBox = (img_index) => {
// 		if (this.state.lightboxIsOpen) {
// 			this.setState({ lightboxIsOpen: false });
// 		} else {
// 			this.setState({ lightboxIsOpen: true, currentImage: img_index });
// 		}
// 	}
// 	clickThumbnail = (img_index) => {
// 		this.setState({ currentImage: img_index });
// 	}
// 	gotoPrevious = () => {
// 		this.setState((prevState, props) => (
// 			{currentImage: prevState.currentImage - 1}
// 		));
// 	}
// 	gotoNext = () => {
// 		this.setState((prevState, props) => (
// 			{currentImage: prevState.currentImage + 1}
// 		));
// 	}
//
// 	render() {
//
// 		const token = getTokenForImages();
//
// 		// const lightboxImages = (this.props.resourceDetailed.images && !_.isEmpty(this.props.resourceDetailed.images)) ?
// 		// 	this.props.resourceDetailed.images.map((img, i) => ({
// 		// 	src: `${HOST_NAME}${img.url}?access_token=${token}`,
// 		// 	caption: img.description
// 		// })) : [];
//
// 		const lightboxImages = (this.props.resourceDetailed.images && !_.isEmpty(this.props.resourceDetailed.images)) ?
// 			this.props.resourceDetailed.images.map((img, i) => ({
// 			src: `${HOST_NAME}${img.url}?access_token=${token}`,
// 			caption: img.description
// 		})) : [];
//
// 		return (
// 				<div className="main-content">
// 					{
// 						(this.state.showLargeImgAlert) ?
// 						<SweetAlert
// 							title={''}
// 							style={{display: "block", marginTop: "-100px", fontSize: '16px'}}
// 							onConfirm={this.hideAlert}>
// 								{'The image you are trying to upload is too big (maximum size is 30 Mb), please resize and try again'}
// 						</SweetAlert> : null
// 					}
// 					{
// 						(this.props.currentProject.role !== 'admin') ? <ResourceDetailedUser /> :
// 						<div className='project-add-resource-container-wrapper'>
//
// 							<div>
// 								<Lightbox
// 									images={lightboxImages}
// 									showThumbnails={true}
// 									currentImage={this.state.currentImage}
// 									isOpen={this.state.lightboxIsOpen}
// 									onClose={this.openCloseLightBox}
// 									onClickPrev={this.gotoPrevious}
// 									onClickNext={this.gotoNext}
// 									onClickThumbnail={this.clickThumbnail}
// 								/>
// 							</div>
//
//
// 							<div className='project-add-resource-container'>
// 							<div className='resource-name-type-owner-description'>
// 							<div className='resource-name-type-owner'>
//
// 								<div className='resource-listing-image'>
// 									<div className='resource-cover-img-title'>
// 										{
// 											(this.state.listing_img && !this.state.isListingImageEdit) ?
// 											<div>{'COVER IMAGE'}<span onClick={this.editListingImg} className='edit-cover-image'>{'edit image'}</span></div> :
// 											<div>{'COVER IMAGE'}
// 												{
// 													(this.state.isListingImageEdit) ?
// 													<span onClick={this.editListingImg} className='edit-cover-image'>{'cancel edit image'}</span> : null
// 												}
// 											</div>
// 										}
// 									</div>
// 									<div className='resource-listing-dropzone-container'>
// 										{
// 											(this.state.listing_img && !this.state.isListingImageEdit) ?
// 											<img src={`${HOST_NAME}${this.state.listing_img}?access_token=${token}`} alt='' /> :
// 											<div>
// 												{
// 													(!_.isEmpty(this.state.accepted)) ? <img src={this.state.accepted[0].preview} alt='' /> :
// 													<Dropzone
// 														className='dropzone'
// 														multiple={false}
// 														accept="image/jpeg, image/png"
// 														maxSize={30000000}
// 														onDrop={this.saveListingImage}
// 													>
// 													<div className='upload'>
// 														<div className='camera'><i className="pe-7s-camera"></i></div>
// 														<div className='upload-picture'>{'Upload Picture'}</div>
// 													</div>
// 													</Dropzone>
// 												}
// 											</div>
// 										}
// 									</div>
// 								</div>
// 								<div className='name-type-owner'>
// 									<div className='resource-name-input-container'>
// 										<div className='resource-name-title'>{'RESOURCE NAME*'}</div>
// 										<input type="text" name="resource-name" value={this.state.resourceName} placeholder='Enter Resource Name'
// 											maxLength='30'
// 											onChange={this.setInputData} />
// 										{
// 											(this.state.resourceNameError) ? <div className='input-error'>{this.state.resourceNameError}</div> : null
// 										}
// 									</div>
// 									<div className='resource-type-owner-container'>
// 										<div className='resource-type-container'>
// 											<div className='resource-name-title'>{'TYPE*'}</div>
// 												<Select
// 													id="resource-type-select"
// 													placeholder={'Select Type'}
// 													options={resourcesTypes.map((resource) => ({value: resource, label: resource}))}
// 													simpleValue
// 													clearable={true}
// 													value={(this.state.type !== '') ? this.state.type : undefined}
// 													onChange={this.chooseType}
// 													searchable={true}
// 												/>
// 												{
// 													(this.state.typeError) ? <div className='input-error'>{this.state.typeError}</div> : null
// 												}
// 										</div>
// 										<div className='resource-owner-container'>
// 											<div className='resource-name-title'>{'RESOURCE CONTACT*'}</div>
// 												<Select.Async
// 													clearable={true}
// 													loadOptions={() => this.getProjectContacts(this.props.currentProject.id)}
// 													autoload={true}
// 													onChange={this.chooseOwner}
// 													value={this.state.owner}
// 													placeholder={'Select Resource Contact'}
// 												/>
// 												{
// 													(this.state.ownerError) ? <div className='input-error'>{this.state.ownerError}</div> : null
// 												}
// 										</div>
// 									</div>
// 								</div>
// 							</div>
//
// 								<div className='resource-description'>
// 									<div className='resource-description-title'>{'RESOURCE DESCRIPTION'}</div>
// 										<textarea rows="4" name="resource-description" value={this.state.description}
// 											placeholder='Enter Resource Description'
// 											maxLength="500" onChange={this.setInputData}></textarea>
// 								</div>
// 								<div className='resource-images'>
// 									<div className='resource-name-title'>{'IMAGES'}</div>
// 									<div className='images'>
// 										<div className='images-list'>
//
// 										{
// 											(_.isEmpty(this.state.resourceImages)) ? null : this.state.resourceImages.map((img, i) => {
// 											return <div key={i} className='image-item-container'>
// 												<div className='image-item'>
// 													<div className='close-cross'><i className="pe-7s-close" onClick={() => this.deleteExistImage(img.url)}></i></div>
//
// 													<div className='resource-image-description-edit'>
// 														<div className='resource-add-image-container' onClick={() => this.openCloseLightBox(i)}>
// 															<img src={`${HOST_NAME}${img.url}?access_token=${token}`} alt='' />
// 														</div>
//
// 														<div className={`image-description-container ${(this.state.isEditExistResourceImgDescription &&
// 															this.state.isEditExistResourceImgDescription === img.url) ? 'full-width' : ''}`}>
// 														{
// 															(this.state.isEditExistResourceImgDescription && this.state.isEditExistResourceImgDescription === img.url) ?
// 															<div className='image-input-description'>
// 																<input type="text" id={i} name="existResourceImageDescription"
// 																value={this.state.existResourceImgDescription}
// 																placeholder='Enter Description'
// 																maxLength='80'
// 																onChange={this.setInputData} />
// 																<div className='exist-image-description-edit-buttons'>
// 																	<button onClick={this.saveExistResourceImgDescription}>{'Save'}</button>
// 																	<button className='cancel' onClick={this.cancelExistResourceImgDescriptionEdit}>{'Cancel'}</button>
// 																</div>
// 															</div> :
// 															<div className='image-description'>{img.description}</div>
// 														}
//
// 														</div>
//
// 														{
// 															(this.state.isEditExistResourceImgDescription && this.state.isEditExistResourceImgDescription === img.url) ? null :
// 															<div className='edit-icon'><i className="pe-7s-note" onClick={() => this.editExistResourceImgDescription(img)}></i></div>
// 														}
//
// 													</div>
//
// 												</div>
// 												<div className='image-item-line'></div>
// 											</div> })
// 										}
//
// 										{
// 											(_.isEmpty(this.state.acceptedResourceImgs)) ? null : this.state.acceptedResourceImgs.map((img, i) => {
// 											return <div key={i} className='image-item-container'>
// 												<div className='image-item'>
// 													<div className='close-cross'><i className="pe-7s-close" onClick={() => this.deleteNewImage(img.preview)}></i></div>
//
// 													<div className='resource-image-description-edit'>
//
// 														<div className='resource-add-image-container'><img src={img.preview} alt='' /></div>
//
// 														<div className={`image-description-container ${(this.state.editNewImgDescription ===  img.preview) ? 'full-width' : ''}`}>
// 														{
// 															(this.state.editNewImgDescription === img.preview) ? <div className='image-input-description'>
// 																<input type="text" id={i} name="newImageDescription"
// 																value={this.state.acceptedDescr[i].description}
// 																placeholder='Enter Description'
// 																maxLength='80'
// 																onChange={this.setInputData} />
// 																<div className='exist-image-description-edit-buttons'>
// 																	<button onClick={this.saveNewImgDescription}>{'Save'}</button>
// 																</div>
// 															</div> : <div className='image-description'>
// 																{
// 																	(this.state.acceptedDescr[i].description) ? <div>{this.state.acceptedDescr[i].description}</div> :
// 																	<div className='image-description-placeholder'>{'Enter image description'}</div>
// 																}
// 															</div>
// 														}
// 														</div>
// 														{
// 															(this.state.editNewImgDescription ===  img.preview) ? null :
// 															<div className='edit-icon'><i className="pe-7s-note" onClick={() => this.editNewImageDescription(img.preview)}></i></div>
// 														}
// 													</div>
// 												</div>
// 												<div className='image-item-line'></div>
// 											</div> })
// 										}
//
// 											<div className='dropzone-project-inner-container'>
// 												<Dropzone
// 													className='dropzone project-inner-image'
// 													multiple={false}
// 													accept="image/jpeg, image/png"
// 													maxSize={30000000}
// 													onDrop={this.saveResourceImage}
// 												>
// 												<div className='upload'>
// 													<div className='camera'><i className="pe-7s-camera"></i></div>
// 													<div className='upload-picture'>{'Upload Picture'}</div>
// 												</div>
// 												</Dropzone>
// 											</div>
//
//
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 							<div className='timezone-schedule'>
//
// 								<div className='resource-schedule-title'>{'RESOURCE SCHEDULE'}</div>
//
// 								<div className='schedule-settings-wrapper'>
// 									<div className='schedule-settings'>
// 										<div className='schedule-settings-header'>
// 											<div className='schedule-settings-header-1'></div>
// 											<div className='schedule-settings-header-2'>{'OPEN'}</div>
// 											<div className='schedule-settings-header-3'>{'START TIME'}</div>
// 											<div className='schedule-settings-header-4'>{'END TIME'}</div>
// 											<div className='schedule-settings-header-5'>{'24H'}</div>
// 										</div>
//
// 										<Schedule takeState={this.takeScheduleState} path={this.props.location.pathname} />
//
// 									</div>
// 								</div>
//
// 								{
// 									(this.state.scheduleError) ? <div className='input-error'>{this.state.scheduleError}</div> : null
// 								}
//
// 							</div>
// 							</div>
// 								<div className='save-button-container'>
// 								{
// 									(this.props.location.pathname !== '/project/resources/add') ?
// 									<div className='save-cancel-button-container'>
// 									<button
// 										onClick={this.updateResource} className={`update ${(!this.isSame) ? 'active' : ''}`}
// 										disabled={this.isSame}>{'Update Resource'}</button></div> :
//
// 									<div className='save-cancel-button-container'>
// 										<button className='cancel' onClick={this.cancelSaveResource}>{'Cancel'}</button>
// 										<button disabled={this.isValid} className={`save ${(!this.isValid) ? 'active' : ''}`} onClick={this.createResource}>{'Save'}</button>
// 									</div>
// 								}
// 								</div>
// 							</div>
// 					}
// 				</div>
// 		);
// 	}
// }
//
//
// const mapStateToProps = ({ currentUser, currentProject, resources, resourceDetailed, projectContacts }) => ({
// 	currentUser,
//   currentProject,
// 	resources,
// 	resourceDetailed,
// 	projectContacts,
// });
//
// const actions = {
// 	_getResourceDetails,
// 	_updateResource,
// 	_deleteResourceImg,
// 	_createNewResource,
// 	_deleteImgFromResource,
// 	_editResourceImgDescription,
// };
//
// export default connect(mapStateToProps, actions)(ProjectResourcesAdd);
