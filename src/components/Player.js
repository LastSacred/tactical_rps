import React, { Component } from 'react'

class Player extends Component {

  constructor(props) {
    super(props)

    this.state = {
      money: 20,
      id: props.id,
      username: props.username
    }
  }



  render() {
    return(
      <div>
      <div>{this.state.username}</div>
      <div>{this.state.money}</div>
      </div>
    )
  }
}

export default Player
