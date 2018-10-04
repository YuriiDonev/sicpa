// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
//
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import moment from 'moment';
// import _ from 'lodash';
// import Dropzone from 'react-dropzone';
//
// import { Grid, Col, Row } from 'react-bootstrap';
// import Card from '../Card/Card.jsx';
// // import Tasks from './Tasks/Tasks.jsx';
//
// import { getContactDetails as _getContactDetails,
//   createNewContact as _createNewContact,
//   updateContact as _updateContact,
//  } from '../../actions/contacts-actions.js';
//
//  import { HOST_NAME } from '../../mock-data/host-name.js';
//  import { getTokenForImages } from '../../service/token.js';
//
// class ProjectContactsAdd extends Component {
//
//   state = {
//
//     accepted: [],
//
//     contact_id: '',
//     first_name: '',
//     last_name: '',
//     company: '',
//     title: '',
//     phone: '',
//     mobile: '',
//     email: '',
//     img_url: '',
//
//     first_nameError: '',
//     last_nameError: '',
//     companyError: '',
//     titleError: '',
//     phoneError: '',
//     mobileError: '',
//     emailError: '',
//
//     isContactImgEdit: false,
//   }
//
//   // componentDidMount() {
//   //   if (this.props.location.pathname !== '/project/contacts/add') {
//   //     const contact_id = this.props.location.pathname.slice(22);
//   //     this.setState({ contact_id });
//   //     const contact = _.find(this.props.projectContacts, (contact) => { return contact.id === contact_id });
//   //     if (contact) {
//   //       this.setState({
//   //         first_name: contact.first_name,
//   //         last_name: contact.last_name,
//   //         company: contact.company,
//   //         title: contact.title,
//   //         phone: contact.phone,
//   //         mobile: contact.mobile,
//   //         email: contact.email,
//   //         img_url: contact.img_url
//   //       });
//   //     }
//   //   }
//   // }
//
//   componentDidMount() {
//     if (this.props.location.pathname !== '/project/contacts/add') {
//       console.log('this.props.match.params.contact_id ', this.props.match.params.contact_id);
//       if (this.props.match.params.contact_id) {
//         this.props._getContactDetails(this.props.match.params.contact_id);
//       }
//     }
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (this.props.currentProject.id !== nextProps.currentProject.id) {
//       this.props.history.push('/project/contacts');
//     }
//     if (_.isEqual(this.props.contactDetailed, nextProps.contactDetailed)) {
//       this.setState({
//         contact_id: this.props.contactDetailed.id || '',
//         first_name: this.props.contactDetailed.first_name || '',
//         last_name: this.props.contactDetailed.last_name || '',
//         company: this.props.contactDetailed.company || '',
//         title: this.props.contactDetailed.title || '',
//         phone: this.props.contactDetailed.phone || '',
//         mobile: this.props.contactDetailed.mobile || '',
//         email: this.props.contactDetailed.email || '',
//         img_url: this.props.contactDetailed.img_url || '',
//       });
//     }
//   }
//
//   saveFile = (accepted, rejected) => {
//     if (accepted && !_.isEmpty(accepted)) {
//       this.setState({ accepted });
//     } else {
//       alert('Not required size or photo type');
//     }
//   }
//
//   setInputData = (event) => {
//     if (event.target.name === 'first_name') {
//       (event.target.value === '') ? this.setState({ first_nameError: 'First Name shouldn`t be emty' }) : this.setState({ first_nameError: '' });
//       this.setState({ first_name: event.target.value });
//     } else if (event.target.name === 'last_name') {
//       (event.target.value === '') ? this.setState({ last_nameError: 'Last Name shouldn`t be emty' }) : this.setState({ last_nameError: '' });
//       this.setState({ last_name: event.target.value });
//     } else if (event.target.name === 'company_name') {
//       (event.target.value === '') ? this.setState({ companyError: 'Company Name shouldn`t be emty' }) : this.setState({ companyError: '' });
//       this.setState({ company: event.target.value });
//     } else if (event.target.name === 'title_name') {
//       (event.target.value === '') ? this.setState({ titleError: 'Title shouldn`t be emty' }) : this.setState({ titleError: '' });
//       this.setState({ title: event.target.value });
//     } else if (event.target.name === 'phone_number') {
//       (event.target.value === '') ? this.setState({ phoneError: 'Phone number shouldn`t be emty' }) : this.setState({ phoneError: '' });
//       this.setState({ phone: event.target.value });
//     } else if (event.target.name === 'mobile_phone_number') {
//       (event.target.value === '') ? this.setState({ mobileError: 'Mobile number shouldn`t be emty' }) : this.setState({ mobileError: '' });
//       this.setState({ mobile: event.target.value });
//     } else if (event.target.name === 'email') {
//       var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//       re.test(event.target.value) === false ? this.setState({ emailError: 'Email is required and format should be john@doe.com' }) : this.setState({ emailError: '' });
//       this.setState({ email: event.target.value });
//     }
//   }
//
//   cancelSaveContact = () => {
//     this.props.history.push('/project/contacts');
//   }
//
//   get isValid() {
//     if ((
//       this.state.first_nameError !== '' ||
//       this.state.last_nameError !== '' ||
//       this.state.companyError !== '' ||
//       this.state.titleError !== '' ||
//       this.state.phoneError !== '' ||
//       this.state.mobileError !== '' ||
//       this.state.emailError !== '') || (
//         this.state.first_name === '' ||
//         this.state.last_name === '' ||
//         this.state.company === '' ||
//         this.state.title === '' ||
//         this.state.phone === '' ||
//         this.state.mobile === '' ||
//         this.state.email === '')
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//
//   get isSame() {
//     if ((this.state.first_name === this.props.contactDetailed.first_name &&
//     this.state.last_name === this.props.contactDetailed.last_name &&
//     this.state.company === this.props.contactDetailed.company &&
//     this.state.title === this.props.contactDetailed.title &&
//     this.state.phone === this.props.contactDetailed.phone &&
//     this.state.mobile === this.props.contactDetailed.mobile &&
//     this.state.email === this.props.contactDetailed.email &&
//     _.isEmpty(this.state.accepted)
//     ) || (
//       this.state.first_nameError !== '' ||
//       this.state.last_nameError !== '' ||
//       this.state.companyError !== '' ||
//       this.state.titleError !== '' ||
//       this.state.phoneError !== '' ||
//       this.state.mobileError !== '' ||
//       this.state.emailError !== '' )) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//
//   createFormData = (updateContact) => {
//     const formdata = new FormData();
//     if (updateContact) formdata.append('id', this.state.contact_id);
//     formdata.append('project_id', this.props.currentProject.id);
//     formdata.append('first_name', this.state.first_name);
//     formdata.append('last_name', this.state.last_name);
//     formdata.append('company', this.state.company);
//     formdata.append('title', this.state.title);
//     formdata.append('phone', this.state.phone);
//     formdata.append('mobile', this.state.mobile);
//     formdata.append('email', this.state.email);
//     if (!_.isEmpty(this.state.accepted)) formdata.append('avatar', this.state.accepted[0]);
//     if (updateContact) {
//       this.props._updateContact(formdata);
//       this.setState({accepted: [], isContactImgEdit: false});
//     } else {
//       this.props._createNewContact(formdata);
//     }
//   }
//
//   saveNewContact = () => {
//     if (this.props.currentProject.id) {
//       this.createFormData();
//       this.props.history.push('/project/contacts');
//     }
//   }
//
//   updateContact = () => {
//     if (this.props.currentProject.id) {
//       this.createFormData(true);
//     }
//   }
//
//   editContactImg = () => {
//     if (this.state.isContactImgEdit) {
//       this.setState({ isContactImgEdit: false, accepted: [] });
//     } else {
//       this.setState({ isContactImgEdit: true });
//     }
//   }
//
//   render() {
//
//     console.log('Project Add Contacts  ', this.props);
//     console.log('this.state  ', this.state);
//
//     const token = getTokenForImages();
//
//     return (
//         <div className="main-content">
//
//           <Grid fluid>
//             <Row>
//               <Col md={12}>
//                 <Card
//                   content = {
//                     <Row>
//                       <div className='project-add-create-contacts-container'>
//
//                         <div className='dropzone-container'>
//                           {
//                             (this.state.img_url && !this.state.isContactImgEdit) ?
//                             <div>
//                               <img src={`${HOST_NAME}${this.state.img_url}?access_token=${token}`} />
//                               <div className='edit-contact-image'><span onClick={this.editContactImg} className='edit'>{'edit image'}</span></div>
//                             </div> :
//                             <div>
//                               {
//                                 (!_.isEmpty(this.state.accepted)) ? <img src={this.state.accepted[0].preview} /> :
//                                 <Dropzone
//                                   className='dropzone'
//                                   multiple={false}
//                                   accept="image/jpeg, image/png"
//                                   maxSize={200000}
//                                   onDrop={this.saveFile}
//                                 >
//                                 <div className='upload'>
//                                   <div className='camera'><i className="pe-7s-camera"></i></div>
//                                   <div>{'Upload'}</div>
//                                   <div>{'Picture'}</div>
//                                 </div>
//                                 </Dropzone>
//                               }
//                               {
//                                 (this.state.img_url) ? <div className='edit-contact-image'>
//                                   <span onClick={this.editContactImg}>{'cancel edit image'}</span>
//                                 </div> : null
//                               }
//                             </div>
//                           }
//                         </div>
//
//                         <div className='forms-container'>
//                           <div className='first-last-name-container'>
//                             <div className='first-name'>
//                               <div className='first-name-title'>{'FIRST NAME*'}</div>
//                               <input type="text" id="first_name" name="first_name" value={this.state.first_name} placeholder='Enter First Name'
//                                 maxLength='30'
//                                 onChange={this.setInputData} />
//                               {
//                                 (this.state.first_nameError) ? <div className='input-error'>{this.state.first_nameError}</div> : null
//                               }
//                             </div>
//                             <div className='last-name'>
//                               <div className='last-name-title'>{'LAST NAME*'}</div>
//                               <input type="text" id="last_name" name="last_name" value={this.state.last_name} placeholder='Enter Last Name'
//                                 maxLength='30'
//                                 onChange={this.setInputData} />
//                               {
//                                 (this.state.last_nameError) ? <div className='input-error'>{this.state.last_nameError}</div> : null
//                               }
//                             </div>
//                           </div>
//
//                           <div className='company-title-container'>
//                             <div className='company-name'>
//                               <div className='company-name-title'>{'COMPANY*'}</div>
//                               <input type="text" id="company_name" name="company_name" value={this.state.company} placeholder='Enter Company Name'
//                                 maxLength='30'
//                                 onChange={this.setInputData} />
//                               {
//                                 (this.state.companyError) ? <div className='input-error'>{this.state.companyError}</div> : null
//                               }
//                             </div>
//                             <div className='title-name'>
//                               <div className='title-name-title'>{'TITLE*'}</div>
//                               <input type="text" id="title_name" name="title_name" value={this.state.title} placeholder='Enter Title'
//                                 maxLength='30'
//                                 onChange={this.setInputData} />
//                               {
//                                 (this.state.titleError) ? <div className='input-error'>{this.state.titleError}</div> : null
//                               }
//                             </div>
//                           </div>
//
//                           <div className='phone-number-container'>
//                             <div className='phone'>
//                               <div className='phone-number-title'>{'PHONE NUMBER*'}</div>
//                               <input type="text" id="phone_number" name="phone_number" value={this.state.phone} placeholder='Enter Phone Number'
//                                 maxLength='16'
//                                 onChange={this.setInputData} />
//                               {
//                                 (this.state.phoneError) ? <div className='input-error'>{this.state.phoneError}</div> : null
//                               }
//                             </div>
//                             <div className='mobile-phone'>
//                               <div className='mobile-phone-number-title'>{'MOBILE PHONE NUMBER*'}</div>
//                               <input type="text" id="mobile_phone_number" name="mobile_phone_number" value={this.state.mobile} placeholder='Enter Mobile Phone Number'
//                                 maxLength='16'
//                                 onChange={this.setInputData} />
//                               {
//                                 (this.state.mobileError) ? <div className='input-error'>{this.state.mobileError}</div> : null
//                               }
//                             </div>
//                           </div>
//
//                           <div className='email-container'>
//                             <div className='email'>
//                               <div className='email-title'>{'EMAIL*'}</div>
//                               <input type="text" id="email" name="email" value={this.state.email} placeholder='Enter Email'
//                                 maxLength='30'
//                                 onChange={this.setInputData} />
//                               {
//                                 (this.state.emailError) ? <div className='input-error'>{this.state.emailError}</div> : null
//                               }
//                             </div>
//                           </div>
//                         </div>
//
//                         <div className='save-cancel-button'>
//                           {
//                             (this.props.location.pathname === '/project/contacts/add') ?
//                             <div className='save-cancel-block'>
//                               <button className='cancel-button' onClick={this.cancelSaveContact}>{'Cancel'}</button>
//                               <button disabled={this.isValid} className={(!this.isValid) ? 'active' : ''}
//                               onClick={this.saveNewContact}>{'Save'}</button>
//                             </div> :
//                             <div className='save-cancel-block'>
//                               <button className={(!this.isSame) ? 'active' : ''}
//                                 disabled={this.isSame}
//                                 onClick={this.updateContact}>{'Update Contact'}</button>
//                             </div>
//                           }
//                         </div>
//
//                       </div>
//                     </Row>
//                   }
//                 />
//               </Col>
//             </Row>
//           </Grid>
//         </div>
//     );
//   }
// }
//
//
// const mapStateToProps = ({ currentProject, contactDetailed }) => ({
//   currentProject,
//   contactDetailed,
// });
//
// const actions = {
//   _getContactDetails,
//   _createNewContact,
//   _updateContact,
// };
//
// export default connect(mapStateToProps, actions)(ProjectContactsAdd);
