import React, { Component } from 'react';

class Image extends Component {

  state = {
    description: this.props.description || '',
  }

  setInputData = (event) => {
    if (event.target.name === 'imageDescription') {
      this.setState({ description: event.target.value });
    }
  }

  saveImgDescription = () => {
    this.props.saveImageDescription(this.props.image_id, this.state.description);
  }

  render() {

    return (
      <div className='image-input-description'>
        <input type="text" id={this.props.image_id} name="imageDescription" value={this.state.description} placeholder='Enter Description'
        maxLength='80'
        onChange={this.setInputData} />
        <button onClick={this.saveImgDescription}>{'SAVE'}</button>
      </div>
    );
  }
}

export default Image;
