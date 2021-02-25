import React, { Component } from 'react';

import CheckHabitButton from './components/CheckHabitButton.js';
import Day from './components/Day.js';
import Header from './components/Header.js';
import Settings from './components/Settings.js';
import Tomorrow from './components/Tomorrow.js';
import './App.css';

import initLocalStorage from 'utils/data.js'
import { uuidv4, dateToString } from 'utils/utils.js'

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
      days: {},
      route: "dailychecker",
    };
  }

  updateState() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const threeHour = 3 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = new Date();

    let days = {}
    for (let i = 0; i < 5; i++) {
      const date = new Date(today - threeHour - oneDay * i);
      const localStorageKey = "history-" + dateToString(date);
      const history = localStorage.getItem(localStorageKey) !== undefined ? JSON.parse(localStorage.getItem(localStorageKey)) : []

      let dayOfTheWeek = weekday[date.getDay()]
      if ( i === 0 )
        dayOfTheWeek = "Today"
      if ( i === 1 )
        dayOfTheWeek = "Yesterday"

      days[i] = {
        "date": date,
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

  togglePage(route, e) {
    if (route === undefined) {
      this.setState({route: "dailychecker"})
    } else {
      this.setState({route: route})
    }
  }

  render() {
    let days = [];
    for (const day in this.state.days) {
      days.unshift(
        <Day key={this.state.days[day].id} date={this.state.days[day].date} day={this.state.days[day].day} icons={this.state.days[day].icons} />
      )
    }

    return (
      <div className="content">
        <Header route={this.state.route} routeFct={this.togglePage.bind(this)}/>

        <div key="dailychecker" id="dailychecker" style={{display: this.state.route === "dailychecker" ? "inherit" : "none"}}>
          { days }
          <CheckHabitButton updateFct={this.updateState.bind(this)} />
        </div>
        <div key="tomorrow" id="tomorrow" style={{display: this.state.route === "tomorrow" ? "inherit" : "none"}}>
          <Tomorrow />
        </div>
        <div key="settings" id="settings" style={{display: this.state.route === "settings" ? "inherit" : "none"}}>
          <Settings />
        </div>
      </div>
    );
  }
}

export default App;
