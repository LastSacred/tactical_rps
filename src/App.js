import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './components/Board'
import Tile from './components/Tile'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
