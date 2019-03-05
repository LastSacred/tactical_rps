import React, { Component } from 'react'

class Player extends Component {
  render() {
    return(
      <div>
      <div>{this.props.username}</div>
      <div>{this.props.money}</div>
      </div>
    )
  }
}

export default Player
