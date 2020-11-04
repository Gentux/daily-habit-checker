import React, { Component } from 'react';

import SvgIcon from './SvgIcon.js'

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: props.icons.map((icon) =>
        <SvgIcon icon={icon.icon} name={icon.name} key={icon.name} popover={true} />
      ),
      completion: Math.trunc(props.icons.length * 100 / 3)
    };

    if (props.day === "Today")
      this.state.color = "primary";
    else if (this.state.completion === 100)
      this.state.color = "success"; // Green, all good
    else if (this.state.completion >= 50)
      this.state.color = "secondary"; // Gray, not good
    else
      this.state.color = "danger"; // Red, very bad

    this.state.classes = "card text-white bg-" + this.state.color + " m-2";
  }

  render() {
    return(
      <div className={this.state.classes}>
        <div className="card-body">
          <h5 className="card-title">{this.props.day}</h5>
          <p className="card-text">
            {this.state.icons}

            <span className="float-right">{this.state.completion} %</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Day;
