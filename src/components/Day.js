import React, { Component } from 'react';

import SvgIcon from 'components/SvgIcon.js'
import { uuidv4, dateToString } from 'utils/utils.js'

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
        <button className={"btn btn-" + this.state.color} key={icon.habit_id + " - " + uuidv4()} onClick={this.removeIcon.bind(this, icon)} >
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
    const localStorageKey = "history-" + dateToString(new Date());
    const history = localStorage.getItem(localStorageKey) !== null ? JSON.parse(localStorage.getItem(localStorageKey)) : []

    // Remove graphically your icon
    let new_icons = [];
    for (const icon_index in this.state.icons) {
      if (parseInt(this.state.icons[icon_index].key.split(" ")[0]) !== icon_clicked.habit_id) {
        new_icons.push(this.state.icons[icon_index]);
      }
    }

    // Remove from localStorage your icon
    let new_history = []
    for (const history_id in history) {
      if (history[history_id].habit_id !== icon_clicked.habit_id) {
        new_history.push(history[history_id])
      }
    }
    localStorage.setItem(localStorageKey, JSON.stringify(new_history))

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
