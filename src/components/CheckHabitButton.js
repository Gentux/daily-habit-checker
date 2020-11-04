import React, { Component } from 'react';

import SvgIcon from './SvgIcon.js'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0
    return r.toString(16);
  });
}

class CheckHabitButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habits: [],
      updateFct: props.updateFct
    }

    let habits = {}
    if (localStorage.habits !== undefined) {
      habits = JSON.parse(localStorage.habits)
    }

    for (const habit_id in habits) {
      this.state.habits.push(
        <button type="button" className="btn btn-secondary" key={habits[habit_id].name} onClick={this.checkHabit.bind(this, habit_id)}>
          <SvgIcon icon={habits[habit_id].icon} name={habits[habit_id].name}/>
        </button>
      );
    }
  }

  checkHabit(habit_id) {
    if (localStorage.history === undefined)
      return null;

    let history = JSON.parse(localStorage.history)
    history.push(
      { "id": uuidv4(), "date": new Date(), "user_id": 1, "habit_id": parseInt(habit_id) }
    );
    localStorage.history = JSON.stringify(history)

    this.state.updateFct()
  }

  render() {
    return(
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#checkModal">
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
                {this.state.habits}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckHabitButton;
