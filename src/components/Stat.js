import React, { Component } from 'react';

import CheckHabitButton from 'components/CheckHabitButton.js'

class Stat extends Component {
  constructor(props) {
    super(props);

    if (localStorage.users === undefined) {
      this.state = {
        strike: 0
      };
    } else {
      this.state = {
        strike: JSON.parse(localStorage.users)[1].currentStrike
      };
    }
  }

  render() {
    return(
      <div className="alert alert-info">
        <h5 className="alert-heading">{this.state.strike} jours en succées</h5>
        <CheckHabitButton updateFct={this.props.updateFct} />
      </div>
    );
  }
}

export default Stat;
