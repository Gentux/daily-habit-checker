import React, { Component } from 'react';

import SvgIcon from './SvgIcon.js'

class Day extends Component {
  constructor(props) {
    super(props);

    const habitsCount = Object.keys(JSON.parse(localStorage.habits)).length;

    this.state = {
      completion: Math.trunc(props.icons.length * 100 / habitsCount),
      color: "danger", // red, very bad
      day: props.day
    }

    if (props.day === "Today")
      this.state.color = "primary";
    else if (this.state.completion === 100)
      this.state.color = "success"; // Green, all good
    else if (this.state.completion >= 50)
      this.state.color = "secondary"; // Gray, not good

    if (this.state.day === "Today") {
      this.state.icons = props.icons.map((icon) =>
        <button className={"btn btn-" + this.state.color} key={icon.icon} onClick={this.removeIcon.bind(this, icon)} >
          <SvgIcon icon={icon.icon} name={icon.name} />
        </button>
      );
    } else {
      this.state.icons = props.icons.map((icon) =>
        <SvgIcon key={icon.icon} icon={icon.icon} name={icon.name} popover={true} />
      );
    }

    this.state.classes = "card text-white bg-" + this.state.color + " m-2";
  }

  removeIcon(icon_clicked) {
    // Remove graphically your icon
    let new_icons = [];
    for (const icon_index in this.state.icons) {
      if ( this.state.icons[icon_index].key !== icon_clicked.icon ) {
        new_icons.push(this.state.icons[icon_index]);
      }
    }

    // Remove from localStorage your icon
    let new_history = []
    let old_history = JSON.parse(localStorage.history)
    for (const history_id in old_history) {
      let raw_date = new Date(old_history[history_id].date);
      let short_date = "" + raw_date.getFullYear() + raw_date.getMonth() + raw_date.getDate();
      let today = new Date();
      let today_short_date = "" + today.getFullYear() + today.getMonth() + today.getDate();

      if (old_history[history_id].habit_id !== icon_clicked.habit_id || short_date !== today_short_date) {
        new_history.push(old_history[history_id])
      }
    }
    localStorage.history = JSON.stringify(new_history)

    const habitsCount = Object.keys(JSON.parse(localStorage.habits)).length;
    this.setState({
      icons: new_icons,
      completion: Math.trunc((this.state.icons.length - 1) * 100 / habitsCount)
    })
  }

  render() {
    return(
      <div className={this.state.classes}>
        <div className="card-body">
          <h5 className="card-title">{this.state.day}</h5>
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
