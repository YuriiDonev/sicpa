
import React from 'react';
import _ from 'lodash';

import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={props.selectProps.menuIsOpen ? faAngleUp : faAngleDown}/>
      </components.DropdownIndicator>
    )
  );
};

const customStyles = {
  indicatorSeparator: base => {
    // console.log('indicatorSeparator ', base);
    return {
      display: 'none',
    };
  },
  // option: (base, state) => ({
  //   ...base,
  //   borderBottom: '1px dotted pink',
  //   color: state.isFullscreen ? 'red' : 'blue',
  //   padding: 20,
  // }),
  control: (base, state) => {
    return {
      display: 'flex',
      flexDirection: 'row',
      borderBottom: `1px solid ${state.isFocused ? '#000000' : '#D3D3D3'}`,
      width: '100%'
    };
  },
  dropdownIndicator: (base, state) => {
    return {
      color: `${state.selectProps.menuIsOpen ? '#000000' : '#8086A9'}`,
    };
  },
};

const createOptions = (menuItems) => {
  return menuItems.map(item => ({
    value: item,
    label: item,
  }));
}

const SelectComponent = (props) => {
  console.log('SelectComponent props ', props);
  return (
    <Select
      styles={customStyles}
      components={{ DropdownIndicator }}
      placeholder={props.placeholder}
      options={createOptions(props.options)}
      clearable={false}
      value={props.value}
      onChange={(item) => props.setSelectedItem(props.id, item)}
      searchable={true}
    />
  );
};

export default SelectComponent;
