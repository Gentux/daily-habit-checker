import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: props.route
    }
  }

  navigateTo(route) {
    this.setState({route: route});
    this.props.routeFct.bind(this, route)()
  }

  render() {
    const currentPage = <span className="sr-only">(current)</span>

    return(
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Daily Habit Checker</span>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={this.state.route === "dailychecker" ? "nav-item active" : "nav-item"}>
              <a className="nav-link" href="/#dailychecker" onClick={this.navigateTo.bind(this, "dailychecker")}>Daily Checker {this.state.route === "dailychecker" ? currentPage : ""}</a>
            </li>
            <li className={this.state.route === "tomorrow" ? "nav-item active" : "nav-item"}>
              <a className="nav-link" href="/#tomorrow" onClick={this.navigateTo.bind(this, "tomorrow")}>Tomorrow {this.state.route === "tomorrow" ? currentPage : ""}</a>
            </li>
            <li className={this.state.route === "settings" ? "nav-item active" : "nav-item"}>
              <a className="nav-link" href="/#settings" onClick={this.navigateTo.bind(this, "settings")}>Settings {this.state.route === "settings" ? currentPage : ""}</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
