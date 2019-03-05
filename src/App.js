import React, { Component } from 'react';
import './App.css';
import Leaderboard from './components/Leaderboard'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Game from './components/Game'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Link to='/leaderboard'>} */}
        <Switch>
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/" component={Game} />
        </Switch>
      </div>
    );
  }
}

export default App;
