import React, { Component } from 'react';

import SvgIcon from './SvgIcon.js'
import { uuidv4, dateToString } from 'utils/utils.js'

class CheckHabitButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habits: [],
      updateFct: props.updateFct
    }
  }

  updateHabit() {
    const localStorageKey = "history-" + dateToString(new Date());
    const history = localStorage.getItem(localStorageKey) !== null ? JSON.parse(localStorage.getItem(localStorageKey)) : []

    let habits = {}
    if (localStorage.habits !== null) {
      habits = JSON.parse(localStorage.habits)
    }

    let today_checked = [];
    for (const history_id in history) {
      today_checked.push(history[history_id].habit_id)
    }

    let new_habits = []
    for (const habit_id in habits) {
      if (today_checked.includes(parseInt(habit_id)) === false) {
        new_habits.push(
          <button type="button" className="btn btn-secondary" key={habit_id + " - " + uuidv4()} onClick={this.checkHabit.bind(this, habit_id)}>
            <SvgIcon icon={habits[habit_id].icon} name={habits[habit_id].name}/>
          </button>
        );
      }
    }

    this.setState({habits: new_habits});
  }

  checkHabit(habit_id) {
    const localStorageKey = "history-" + dateToString(new Date());
    const history = localStorage.getItem(localStorageKey) !== null ? JSON.parse(localStorage.getItem(localStorageKey)) : []

    history.push(
      { "id": uuidv4(), "user_id": 1, "habit_id": parseInt(habit_id) }
    );
    localStorage.setItem(localStorageKey, JSON.stringify(history))

    let new_habits = [];
    for (const habit in this.state.habits) {
      if (this.state.habits[habit].key.split(" ")[0] !== habit_id) {
        new_habits.push(this.state.habits[habit]);
      }
    }
    this.setState({habits: new_habits});
    this.state.updateFct()
  }

  componentDidMount() {
    this.updateHabit();
  }

  render() {
    return(
      <div>
        <button type="button" className="btn btn-primary" onClick={this.updateHabit.bind(this)} data-toggle="modal" data-target="#checkModal">
          Check
        </button>
        <div className="modal fade" id="checkModal" tabIndex="-1" role="dialog" aria-labelledby="checkModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="checkModalLabel">Check some stuff</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.habits.length > 0 ? this.state.habits : "All sets, GG !"}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckHabitButton;
