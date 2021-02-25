import React, { Component } from 'react';

import SvgIcon from './SvgIcon.js'

class Tomorrow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
    }
  }

  updateImage(e) {
    const element = e.target;
    const files = element.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')){ continue }

      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({photo: e.target.result});
      }
      reader.readAsDataURL(file);
    }
  }

  clickInput(e) {
    document.querySelector("#imageFile").click();
  }

  render() {
    return(
      <div>
        <h1>Tomorrow</h1>

        <button type="button" className="btn btn-secondary" onClick={ this.clickInput }>
          <SvgIcon icon="bootstrap-icons.svg#camera" name="camera" />
        </button>

        <input type="file" id="imageFile" capture="user" accept="image/*" onChange={ this.updateImage.bind(this) } style={{"opacity": 0}} />

        <div id="preview">
          <img id="photoPreview" alt="truc" src={ this.state.photo } style={{"maxWidth": "100%"}} />
        </div>
      </div>
    );
  }
}

export default Tomorrow;
