import React, { Component } from 'react';

import Day from './components/Day.js';
import Stat from './components/Stat.js';
import './App.css';

localStorage.removeItem('users')
localStorage.removeItem('habits')
localStorage.removeItem('history')

if (localStorage.users === undefined) {
    localStorage.users = JSON.stringify({
      1: {
        "name": "Caroline",
        "email": "carchemin@gmail.com",
        "currentStrike": 2
      },
      2: {
        "name": "Romain",
        "email": "romain@soufflet.io",
        "currentStrike": 24
      }
    });
}
if (localStorage.habits === undefined) {
    localStorage.habits = JSON.stringify({
      1: {
        "name": "Yoga",
        "icon": "yoga.svg#yoga"
      },
      2: {
        "name": "Read",
        "icon": "bootstrap-icons.svg#book"
      },
      3: {
        "name": "Plants care",
        "icon": "bootstrap-icons.svg#flower2"
      }
    });
}
if (localStorage.history === undefined) {
    localStorage.history = JSON.stringify([
      { "id": uuidv4(), "date": new Date(2020, 9, 29), "user_id": 1, "habit_id": 1 },
      { "id": uuidv4(), "date": new Date(2020, 9, 29), "user_id": 1, "habit_id": 3 },
      { "id": uuidv4(), "date": new Date(2020, 9, 30), "user_id": 1, "habit_id": 1 },
      { "id": uuidv4(), "date": new Date(2020, 9, 31), "user_id": 1, "habit_id": 1 },
      { "id": uuidv4(), "date": new Date(2020, 9, 31), "user_id": 1, "habit_id": 2 },
      { "id": uuidv4(), "date": new Date(2020, 9, 31), "user_id": 1, "habit_id": 3 },
      { "id": uuidv4(), "date": new Date(2020, 10, 1), "user_id": 1, "habit_id": 1 },
      { "id": uuidv4(), "date": new Date(2020, 10, 1), "user_id": 1, "habit_id": 2 },
      { "id": uuidv4(), "date": new Date(2020, 10, 1), "user_id": 1, "habit_id": 3 },
      { "id": uuidv4(), "date": new Date(2020, 10, 2), "user_id": 1, "habit_id": 1 },
      { "id": uuidv4(), "date": new Date(2020, 10, 2), "user_id": 1, "habit_id": 2 },
      { "id": uuidv4(), "date": new Date(2020, 10, 2), "user_id": 1, "habit_id": 3 },
      { "id": uuidv4(), "date": new Date(2020, 10, 3), "user_id": 1, "habit_id": 2 }
    ]);
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0
    return r.toString(16);
  });
}

const weekday = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: {}
    };
  }

  localStorageUpdated() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = new Date();
    const history = JSON.parse(localStorage.history)

    let days = {
      1: {
        "day": "Today",
        "id": uuidv4(),
        "icons": []
      }
    }

    for (const history_id in history) {
      let raw_date = new Date(history[history_id].date)
      let element_date = new Date(raw_date.getFullYear(), raw_date.getMonth(), raw_date.getDate())

      let diffDays = Math.round(Math.abs((today - element_date) / oneDay));
      if ( diffDays > 5 )
        continue

      let dayOfTheWeek = weekday[element_date.getDay()]
      if ( diffDays === 1 )
        dayOfTheWeek = "Today"
      if ( diffDays === 2 )
        dayOfTheWeek = "Yesterday"

      let icon = JSON.parse(localStorage.habits)[history[history_id].habit_id]
      if (days[diffDays] === undefined) {
        days[diffDays] = {
          "day": dayOfTheWeek,
          "id": uuidv4(),
          "icons": []
        }
      }

      days[diffDays].icons.push(icon)
    }

    this.setState({days: days})
  }

  componentDidMount() {
    this.localStorageUpdated();
  }

  render() {
    let days = [];
    for (const day in this.state.days) {
      days.unshift(
        <Day key={this.state.days[day].id} day={this.state.days[day].day} icons={this.state.days[day].icons} />
      )
    }

    return (
      <div className="content">
        { days }

        <Stat updateFct={this.localStorageUpdated.bind(this)} />
      </div>
    );
  }
}

export default App;
