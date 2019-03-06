import React, { Component } from 'react'

class Player extends Component {
  state = {
    username: ''
  }

  myTurn = () => {
    if (!this.props.username || this.props.player !== this.props.turn.player) return ''
    return ' myTurn'
  }

  phaseMessage = () => {
    if(!this.myTurn()) return null

    switch (this.props.turn.phase) {
      case 'buy':
        return 'Buy Phase'
        break
      case 'move':
        return 'Move Phase'
        break
      case 'attack':
        return 'Attack Phase'
        break
      default:
      return null
    }
  }

  instructionMessage = () => {
    if (!this.phaseMessage) return null

    switch (this.phaseMessage()) {
      case 'Buy Phase':
        return (
          <div>
            <p>Buy a tile from the pool</p>
            <p>The cost will be deducted from your money</p>
          </div>
        )
        break
      case 'Move Phase':
        return (
          <div>
            <p>Move one tile</p>
            <p>Attack if you end adjacent or diagonal to an enemy tile</p>
            <p>Gain money for each tile on the opponent's side at turn's end</p>
            <p>You can't desellect a tile. Once you click it you must move it</p>
          </div>
        )
        break
      case 'Attack Phase':
        return (
          <div>
            <p>Attack an opponent or click your tile to pass</p>
            <p>ROCK PAPER SCISSORS!</p>
            <p>Loser takes 1 damage</p>
            <p>Winner takes 3 damage</p>
            <p>Both take 2 in a tie</p>
          </div>
        )
        break
        default:
        return null
    }
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  render() {
    return(
      <div id={'player' + this.props.player} className={'player' + this.myTurn()}>
        {this.props.username ?
          <h1 className={'playerName'}>{this.props.username}</h1>
          :
          <form onSubmit={(event) => this.props.logIn(event, this.state.username, this.props.player)}>
            <input type={'text'} name={'username'} className={'usernameForm'} onChange={(event) => this.handleChange(event)} value={this.state.username} />
          </form>
        }

        <div>Money:</div>
        <div className={'playerMoney'}>{this.props.money}</div>
        <h3 className={'phaseMessage'}>{this.phaseMessage()}</h3>
        <div className={'instructionMessage'}>{this.instructionMessage()}</div>
      </div>
    )
  }
}

export default Player
