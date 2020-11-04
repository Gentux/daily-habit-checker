import React, { Component } from 'react';

class SvgIcon extends Component {
  render() {
    return (
       <svg className={"bi" + this.props.popover ? " mx-1" : ""} width="32" height="32" fill="currentColor">
          <use xlinkHref={this.props.icon}/>
        </svg>
    );
  }
}

export default SvgIcon;
