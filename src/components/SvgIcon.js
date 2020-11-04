import React, { Component } from 'react';

class SvgIcon extends Component {
  render() {
    let classes = this.props.popover ? "bi mx-1 popup" : "bi mx-1"
    return (
       <svg className={classes} width="32" height="32" fill="currentColor" data-container="body" data-toggle="popover" data-placement="top" data-content={this.props.name}>
          <use xlinkHref={this.props.icon}/>
        </svg>
    );
  }
}

export default SvgIcon;
