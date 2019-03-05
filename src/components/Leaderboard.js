import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Leaderboard extends Component {

  state = {
    leaderboard: []
  }

  render() {

    const showLeaders = () => {
      return this.state.leaderboard.map((leader) => {
        return <h3>{leader.username}: {leader.wins}-{leader.losses}</h3>
      })
    }

    return(
    <div>
    <Link to='/'>Back to Game</Link>
    <h1> Player: W-L </h1>
      {showLeaders()}
    </div>
    )
  }


  componentDidMount() {
    fetch('http://localhost:3000/leaderboard').then(res => res.json()).then(data => {
      this.setState({
        leaderboard: data
      })
    })
  }

}

export default Leaderboard;
