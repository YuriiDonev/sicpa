import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ProjectContactsUser } from './UserRoleView/project-contacts-user.js';
import NoProjectsPlaceholder from './UserRoleView/no-projects.js';

import { getContactsForProjectWithoutAdmin as _getContactsForProjectWithoutAdmin,
  deleteProjectContact as _deleteProjectContact } from '../../actions/contacts-actions.js';
import { HOST_NAME } from '../../mock-data/host-name.js';
import { getTokenForImages } from '../../service/token.js';


class ProjectContacts extends Component {

  componentDidMount() {
    // this.props._logoutFromAppTokenError();

    if (this.props.currentProject.id) {
      // this.props._getContactsForProject(this.props.currentProject.id);
      this.props._getContactsForProjectWithoutAdmin(this.props.currentProject.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentProject.id !== nextProps.currentProject.id) {
      const project_id = nextProps.currentProject.id;
      // console.log('componentWillReceiveProps project_id ', project_id);
      // this.props.getProjectById(projectId);
      // this.props._getContactsForProject(project_id);
      this.props._getContactsForProjectWithoutAdmin(project_id);
    }
  }

  editContact = (contact_id) => {
    console.log('editContact ', contact_id);
    this.props.history.push(`/project/contacts/add/${contact_id}`);
  }

  deleteContact = (contact_id) => {
    this.props._deleteProjectContact({contact_id});
  }

  render() {
    // console.log('Project Contacts this.props ', this.props);

    const { projectContacts } = this.props;
    const token = getTokenForImages();

    if (_.isEmpty(this.props.projects)) { return <NoProjectsPlaceholder />; } else {
      return (
        <div className="main-content">
          <ProjectContactsUser _token={token} host={HOST_NAME} contacts={projectContacts} />
        </div>
      );
    }
  }
}


const mapStateToProps = ({ currentProject, projectContacts, projects }) => ({
  currentProject,
  projectContacts,
  projects,
});

const actions = {
  // _getContactsForProject,
  _deleteProjectContact,
  _getContactsForProjectWithoutAdmin,
};

export default connect(mapStateToProps, actions)(ProjectContacts);




// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import moment from 'moment';
// import _ from 'lodash';
// import Dropzone from 'react-dropzone';
//
// import { Grid, Col, Row } from 'react-bootstrap';
// import Card from '../Card/Card.jsx';
// // import Tasks from './Tasks/Tasks.jsx';
// import { ProjectContactsUser } from './UserRoleView/project-contacts-user.js';
// import NoProjectsPlaceholder from './UserRoleView/no-projects.js';
//
// import { getContactsForProject as _getContactsForProject,
//   deleteProjectContact as _deleteProjectContact } from '../../actions/contacts-actions.js';
// import { HOST_NAME } from '../../mock-data/host-name.js';
//
// class ProjectContacts extends Component {
//
//   componentDidMount() {
//     if (this.props.currentProject.id) {
//       this.props._getContactsForProject(this.props.currentProject.id);
//     }
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (this.props.currentProject.id !== nextProps.currentProject.id) {
//       const project_id = nextProps.currentProject.id;
//       // this.props.getProjectById(projectId);
//       this.props._getContactsForProject(project_id);
//     }
//   }
//
//   editContact = (contact_id) => {
//     console.log('editContact ', contact_id);
//     this.props.history.push(`/project/contacts/add/${contact_id}`);
//   }
//
//   deleteContact = (contact_id) => {
//     this.props._deleteProjectContact({contact_id});
//   }
//
//   render() {
//
//     console.log('Project Contacts this.props ', this.props);
//
//     const { projectContacts } = this.props;
      //const token = getTokenForImages();
//
//     return (
//       <div className="main-content">
//         {
//           (_.isEmpty(this.props.projects)) ?
//           <Grid fluid>
//             <Row>
//               <Col md={12}>
//                 <Card
//                   content = {
//                     <Row>
//                       <NoProjectsPlaceholder />
//                     </Row>
//                     }
//                   />
//                 </Col>
//               </Row>
//             </Grid> :
//           (this.props.currentProject.role === 'admin') ?
//           <div>
//           <div className='add-project'>
//             <div className='add-project-button'>
//               <Link to={'/project/contacts/add'}><button><i className="pe-7s-add-user"></i><div>{'ADD PROJECT CONTACT'}</div></button></Link>
//             </div>
//           </div>
//
//             <Grid fluid>
//               <Row>
//                 <Col md={12}>
//                   <Card
//                     content = {
//                       <Row>
//                         {
//                           (_.isEmpty(projectContacts)) ? <div>{'Sorry, You don`t have any contacts yet'}</div> :
//                           <div className='project-contacts-container'>
//                             <div className='project-contacts'>
//                               <div className='project-contacts-title'>{'Project Contacts'}</div>
//
//                               <div className='project-contacts-list'>
//                                 <div className='project-contacts-list-header'>
//                                   <div className='close-cross-header'></div>
//                                   <div className='image-container-header'></div>
//                                   <div className='first-name-header'>{'FIRST NAME'}</div>
//                                   <div className='last-name-header'>{'LAST NAME'}</div>
//                                   <div className='edit-icon-header'></div>
//                                   <div className='contact-empty-filler-header'></div>
//                                 </div>
//                                 {
//                                   (_.isEmpty(projectContacts)) ? null : projectContacts.map((contact, i) => {
//                                   return <div key={i} className='contact-container'>
//                                     <div className='contact-item'>
//                                       <div className='close-cross' onClick={() => this.deleteContact(contact.id)}><i className="pe-7s-close"></i></div>
//                                       <div className='image-container'>
//                                       {
//                                         (contact.img_url) ? <img src={`${HOST_NAME}${contact.img_url}?access_token=${token}`} /> :
//                                         <div className='img-placeholder'>{'No image'}</div>
//                                       }
//                                       </div>
//                                       <div className='contact-firstname'>{contact.first_name}</div>
//                                       <div className='contact-lastname'>{contact.last_name}</div>
//                                       <div className='edit-icon'>
//                                       {
//                                         (this.props.currentProject.role === 'admin') ?
//                                         <div className='edit-view-details' onClick={this.editContact.bind(this, contact.id)}>
//                                           <i className="pe-7s-note"></i>
//                                           <div>{'Edit/View Details'}</div>
//                                         </div> : null
//                                       }
//                                       </div>
//                                       <div className='contact-empty-filler'></div>
//                                     </div>
//                                     <div className='contact-item-line'></div>
//                                   </div> })
//                                 }
//                               </div>
//                             </div>
//                           </div>
//                         }
//                       </Row>
//                     }
//                   />
//                 </Col>
//               </Row>
//             </Grid>
//           </div> : <ProjectContactsUser _token={token} host={HOST_NAME} contacts={projectContacts} />
//         }
//         </div>
//     );
//   }
// }
//
//
// const mapStateToProps = ({ currentProject, projectContacts, projects }) => ({
//   currentProject,
//   projectContacts,
//   projects,
// });
//
// const actions = {
//   _getContactsForProject,
//   _deleteProjectContact,
// };
//
// export default connect(mapStateToProps, actions)(ProjectContacts);
