import React, {Component} from 'react'

class Tile extends Component {
  constructor(props) {
    super(props)

    this.move = Math.floor(Math.random() * 3 + 1)
    this.attack = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]

    this.state = {
      strength: Math.floor(Math.random() * 3 + 1)
    }
  }

  render() {
    return(
      <div className={"tile"}>
        <div>{this.state.strength}</div>
        <div>{this.attack}</div>
        <div>{this.move}</div>
      </div>
    )
  }
}

export default Tile
