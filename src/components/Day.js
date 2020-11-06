import React, { Component } from 'react';

import SvgIcon from 'components/SvgIcon.js'
import { uuidv4, dateToString } from 'utils/utils.js'
import { getCompletion } from 'utils/data.js'

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completion: getCompletion(props.icons),
      color: "danger", // red, very bad
      day: props.day
    }

    /* Default color is red (no data, no icon checked)
     *  0 - 40%   => red,    'danger' class
     *  40 - 70%  => yellow, 'warning' class
     *  70 - 100% => green,  'success' class
     * possible class:
     *  gray (secondary)
     */

    if (props.day === "Today")
      this.state.color = "primary";
    else if (this.state.completion >= 70)
      this.state.color = "success"; // Green, all good
    else if (this.state.completion >= 40)
      this.state.color = "warning"; // Gray, not good

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
    const habits = JSON.parse(localStorage.habits);

    // Remove graphically your icon
    let new_icons = [];
    for (const icon_index in this.state.icons) {
      if (parseInt(this.state.icons[icon_index].key.split(" ")[0]) !== icon_clicked.habit_id) {
        new_icons.push(this.state.icons[icon_index]);
      }
    }

    // Remove from localStorage your icon
    let new_history = []
    let new_habits = []
    for (const history_id in history) {
      if (history[history_id].habit_id !== icon_clicked.habit_id) {
        new_history.push(history[history_id])
        new_habits.push(habits[history[history_id].habit_id])
      }
    }
    localStorage.setItem(localStorageKey, JSON.stringify(new_history))

    this.setState({
      icons: new_icons,
      completion: getCompletion(new_habits)
    })
  }

  render() {
    return(
      <div className={this.state.classes}>
        <div className="card-body">
          <h5 className="card-title">{this.state.day} <span className="float-right">{this.state.completion} %</span></h5>
          <p className="card-text">
            {this.state.icons}
          </p>
        </div>
      </div>
    );
  }
}

export default Day;
