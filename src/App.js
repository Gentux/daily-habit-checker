import React, { Component } from 'react';

import Day from './components/Day.js';
import Stat from './components/Stat.js';
import './App.css';

import { uuidv4, initLocalStorage, dateToString } from 'utils/utils.js'

initLocalStorage();

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

  updateState() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = new Date();

    let days = {}
    for (let i = 0; i < 5; i++) {
      const date = new Date(today - oneDay * i);
      const localStorageKey = "history-" + dateToString(date);
      const history = localStorage.getItem(localStorageKey) !== undefined ? JSON.parse(localStorage.getItem(localStorageKey)) : []

      let dayOfTheWeek = weekday[date.getDay()]
      if ( i === 0 )
        dayOfTheWeek = "Today"
      if ( i === 1 )
        dayOfTheWeek = "Yesterday"

      days[i] = {
        "day": dayOfTheWeek,
        "id": uuidv4(),
        "icons": []
      }

      for (const history_id in history) {
        days[i].icons.push(JSON.parse(localStorage.habits)[history[history_id].habit_id])
      }
    }
    this.setState({days: days})
  }

  componentDidMount() {
    this.updateState();
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

        <Stat updateFct={this.updateState.bind(this)} />
      </div>
    );
  }
}

export default App;
