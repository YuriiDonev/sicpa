
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
// import moment from 'moment';
// import _ from 'lodash';
import Select from 'react-select';

import { getResourcesNotSortedEnd } from '../../service/endPoint.js';

// import { openSelect as _openSelect, selectResourceFilter as _selectResourceFilter } from '../../actions/calendar-actions.js';


class SelectResource extends Component {

  state = {
    resourceName: '',
    resourceId: '',
  }

  componentDidMount() {
    this.props._selectResourceFilter('');
  }

  selectResource = (resource) => {
    if (!resource) {
      this.setState({ resourceName: '', resourceId: '' });
      this.props._selectResourceFilter('');
      return;
    }
    this.setState({ resourceName: resource.label, resourceId: resource.id });
    this.props._selectResourceFilter(resource.id);
  }

  getResources = (project_id) => {
    return getResourcesNotSortedEnd(project_id)
      .then(resources => ({
        options: resources.map(resource => ({
          value: resource.name,
          label: resource.name,
          id: resource.id
        })),
      })
    );
  }

  openSelectMenu = () => {
    this.props._openSelect(true);
  }

  render () {
    console.log('SelectResource ', this.props);
    console.log('SelectResource this.state ', this.state);

    return (
      <Select.Async
        id="resource-select"
        onBlurResetsInput={false}
        onSelectResetsInput={false}
        clearable={true}
        name="selected-resource"
        loadOptions={() => this.getResources(this.props.currentProject.id)}
        autoload={true}
        onChange={this.selectResource}
        value={this.state.resourceName}
        placeholder={'Select Resource'}
        onOpen={this.openSelectMenu}
        onClose={() => this.props._openSelect(false)}
      />
    );
  }
}

const mapStateToProps = ({ projectInfo, currentProject, users }) => ({
  projectInfo,
  currentProject,
  users,
});

const actions = {
  // _openSelect,
  // _selectResourceFilter,
};

export default connect(mapStateToProps, actions)(SelectResource);

// <Select.Async
//   id="resource-select"
//   onBlurResetsInput={false}
//   onSelectResetsInput={false}
//   clearable={true}
//   name="selected-resource"
//   loadOptions={() => this.getResources(this.props.currentProject.id)}
//   autoload={false}
//   onChange={this.selectResource}
//   value={this.state.resourceName}
//   placeholder={'Select Resource'}
//   onOpen={() => this.props._openSelect(true)}
//   onClose={() => this.props._openSelect(false)}
// />
