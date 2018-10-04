
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import moment from 'moment';
import _ from 'lodash';
// import Dropzone from 'react-dropzone';
import SweetAlert from 'react-bootstrap-sweetalert';

import NoProjectsPlaceholder from '../UserRoleView/no-projects.js';
import Resource from './resource.js';

import { getContactsForProject as _getContactsForProject } from '../../../actions/contacts-actions.js';

import {
	getResourcesNotSorted as _getResourcesNotSorted,
	getResourcesSortedByType as _getResourcesSortedByType,
	deleteResource as _deleteResource,
} from '../../../actions/resources-actions.js';


class ProjectResources extends Component {

  state = {
    sortedByType: _.isEmpty(this.props.resources) ? false : this.props.resources.sorted,
		_loading: _.isEmpty(this.props.resources),
		openItems: [],

		resourceToDelete: '',
		showDeleteResourceAlert: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentProject.id !== nextProps.currentProject.id) {
      const projectId = nextProps.currentProject.id;
			if (this.state.sortedByType) {
				this.props._getResourcesSortedByType(projectId);
			} else {
				this.props._getResourcesNotSorted(projectId);
			}
    }
		if (!_.isEqual(this.props.resources, nextProps.resources)) {
			this.setState({ _loading: false });
		}
  }

  componentDidMount() {
		if (this.props.currentProject.id) {
			this.props._getResourcesNotSorted(this.props.currentProject.id);
			// this.props._getResourcesSortedByType(this.props.currentProject.id);
			// this.setState({ sortedByType: true });
			this.setState({ sortedByType: false });
		}
		// this.props._getResourcesSortedByType(this.props.currentProject.id);
		// this.setState({ sortedByType: true });
  }

	redirectToEditResource = (resource_id) => {
		if (this.props.currentProject.id) {
			this.props._getContactsForProject(this.props.currentProject.id);
		}
		this.props.history.push(`/project/resources/add/${resource_id}`);
	}

	toggleSortingResources = (event) => {
		if (event.target.value === 'false') {
			this.setState({ sortedByType: true });
			this.props._getResourcesSortedByType(this.props.currentProject.id);
			this.setState({ _loading: true });
		} else {
			this.setState({ sortedByType: false });
			this.props._getResourcesNotSorted(this.props.currentProject.id);
			this.setState({ _loading: true });
		}
	}

	openItemsList = (resource_type) => {
		if (this.state.openItems.indexOf(resource_type) !== -1) {
			let arr = this.state.openItems.slice();
			const index = _.findIndex(arr, (item) => { return item === resource_type; });
			arr.splice(index, 1);
			this.setState({ openItems: arr });
		} else {
			this.setState({ openItems: [...this.state.openItems, resource_type] });
		}
	}

	bookResourceCalendar = (resource_id) => {
		// console.log('bookResourceCalendar ', resource_id);
		this.props.history.push(`/calendar/${resource_id}`);
	}

	deleteResource = (resource_id) => {
		this.setState({showDeleteResourceAlert: true, resourceToDelete: resource_id});
		// this.props._deleteResource({resource_id});
	}

	renderResourcesNotSorted = () => {
		if (this.props.resources.sorted === true) return;
		return <div className='project-contacts-list'> { this.props.resources.resources.map((resource, i) => {
				return <Resource key={i} id={resource.id} img={resource.listing_img} name={resource.name} editResource={this.redirectToEditResource}
					userRole={this.props.currentProject.role} book={this.bookResourceCalendar}
					delResource={this.deleteResource}
					/> }) }
			</div>
	}

	renderResourcesSorted = () => {
		if (this.props.resources.sorted === false) return;
		return <div> { this.props.resources.resources.map((resource, i) => {
				return <div className='resource-sorted-header-container' key={i}>
					<div className='resource-sorted-header' onClick={this.openItemsList.bind(this, resource.type)}>
						<div className='resource-sorted-header-title'>{resource.type.toLowerCase()}</div>
						<div className='resource-sorted-header-length'>{(!resource.items) ? null : `(${resource.items.length} items)`}</div>
						<div className='resource-sorted-header-caret'><span className={`caret ${(this.state.openItems.indexOf(resource.type) === -1) ? '' : 'up'}`}></span></div>
					</div>
					<div className='resource-item-line'></div>
					{ (this.state.openItems.indexOf(resource.type) !== -1) ?
						<div className='project-contacts-list sorted'>
							<div className='contact-container'> {
								resource.items.map((item, i) => {
									return <Resource key={i} id={item.id} img={item.listing_img} name={item.name} editResource={this.redirectToEditResource}
										userRole={this.props.currentProject.role} book={this.bookResourceCalendar}
										delResource={this.deleteResource}
										/> }) }
								</div>
							</div> : null
					}
				</div> }) }
			</div>
	}


	confirmResourceDelete = () => {
		this.props._deleteResource({resource_id: this.state.resourceToDelete});
		this.setState({showDeleteResourceAlert: false, resourceToDelete: ''});
	}

	cancelResourceDelete = () => {
		this.setState({showDeleteResourceAlert: false, resourceToDelete: ''});
	}

  render() {
    // console.log('ProjectResources ', this.props);
		// console.log('this.state ', this.state);
    const { resources } = this.props;

		if (_.isEmpty(this.props.projects)) { return <NoProjectsPlaceholder />; } else {
			return (
				<div className="main-content">
					<div className="project-resources-wrapper">
					{
						(this.state.showDeleteResourceAlert) ?
						<SweetAlert
							warning
							style={{display: "block",marginTop: "-100px"}}
							showCancel
							confirmBtnText="Yes, delete it!"
							confirmBtnBsStyle="warning"
							cancelBtnBsStyle="info"
							title="Are you sure?"
							onConfirm={this.confirmResourceDelete}
							onCancel={this.cancelResourceDelete}
						>
							{'This resource will be deleted from the project'}
						</SweetAlert> : null
					}

					{
						(_.isEmpty(this.props.projects)) ? null :
						(this.props.currentProject.role === 'admin') ?
						<div className='add-project'>
							<div className='add-project-button'>
								<Link to={'/project/resources/add'}><button><div className='plus-icon'>{'+'}</div><div>{'ADD RESOURCE'}</div></button></Link>
							</div>
						</div> : null
					}
					{
						(_.isEmpty(resources.resources)) ? <div>{'You currently do not have any resources for this project'}</div> :
						<div className='project-resources-container'>
							<div className='sort-resources-by-type-toggler'>
								<label className="switch">
									<input type="checkbox"
										checked={this.state.sortedByType}
										disabled={this.state._loading}
										name={'sort'}
										id={'active'}
										value={this.state.sortedByType}
										onChange={this.toggleSortingResources}
									/>
									<span className="slider round"></span>
								</label>
								<div className='switch-title'>{'Sort by resource type'}</div>
							</div>

							<div className='project-contacts'>
								{
									(this.state._loading) ? <div>Loading...</div> :
										(this.state.sortedByType) ? this.renderResourcesSorted() : this.renderResourcesNotSorted()
								}
							</div>
						</div>
					}
					</div>
				</div>
			);
		}
  }
}


const mapStateToProps = ({ currentProject, resources, projects }) => ({
	currentProject,
	resources,
	projects,
});

const actions = {
	_getResourcesNotSorted,
	_getResourcesSortedByType,
	_deleteResource,
	_getContactsForProject,
};

export default connect(mapStateToProps, actions)(ProjectResources);
