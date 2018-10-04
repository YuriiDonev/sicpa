import React, { Component } from 'react';

class CustomRadio extends Component {
    render() {
        const { number, label, option, name,...rest } = this.props;

        return (
            <div className="radio">
                <input id={number} name={name} type="radio" value={option} {...rest} />
                <label htmlFor={number}>
                    {label}
                </label>
            </div>
        );
    }
}

export default CustomRadio;


// <input type="radio" id="ritema" name="ritem" value="date"
//   readOnly
//   disabled={false}
//   checked={ (currentType === 'date') ? true : false }
//   onClick={this.chooseBookingSorting}
// />
// <label htmlFor="ritema">{'Sort By Date'}</label>
