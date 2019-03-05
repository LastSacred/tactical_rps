import React, { Component } from 'react'

class Player extends Component {
  myTurn = () => {
    if (this.props.player !== this.props.turn.player) return ''
    return ' myTurn'
  }

  phaseMessage = () => {
    if(this.props.player !== this.props.turn.player) return null

    switch (this.props.turn.phase) {
      case 'buy':
        return 'Buy Phase'
        break;
      case 'move':
        return 'Move Phase'
        break;
      case 'attack':
        return 'Attack Phase'
        break;
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
        break;
      case 'Move Phase':
        return (
          <div>
            <p>Move one tile</p>
            <p>Attack if you end adjacent or diagonal to an enemy tile</p>
            <p>Gain money for each tile on the opponent's side at turn's end</p>
          </div>
        )
        break;
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
        break;
    }
  }

  render() {
    return(
      <div id={'player' + this.props.player} className={'player' + this.myTurn()}>
        <h1 className={'playerName'}>{this.props.username}</h1>
        <div>Money:</div>
        <div className={'playerMoney'}>{this.props.money}</div>
        <h3 className={'phaseMessage'}>{this.phaseMessage()}</h3>
        <div className={'instructionMessage'}>{this.instructionMessage()}</div>
      </div>
    )
  }
}

export default Player
