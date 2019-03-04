import React, { Component } from 'react'
import Board from './Board'
import Pool from './Pool'

// new Array(7).fill(new Array(7).fill(null))

function startBoard() {
  return (
    [
      [{strength: 3, attack: 'scissors', move: 2, owner:1},{strength: 2, attack: 'paper', move: 1, owner:2},null,null,null,null,null],
      [null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null]
    ]
  )
}

class Game extends Component {
  state = {
    board: startBoard(),
    pool: [],
    selected: null,
    turn: {
      player: 1,
      phase: 'buy',
      count: 0
    }
  }

  setPhase = (phase, nextTurn=false) => {
    // const phaseOrder = ['buy', 'move', 'attack']
    if ((phase === "attack") && (!this.state.selected || !this.validTargetExists())) phase = "move"

    const newTurn = {...this.state.turn, phase: phase}
    if (nextTurn) {
      newTurn.player = !(newTurn.player - 1) + 1
      newTurn.count += 1
    }
    let newSelected = (phase === "attack" ? this.state.selected : null)
    this.setState({
      turn: newTurn,
      selected: newSelected
    })
  }

  fillPool = () => {
    let newPool = [...this.state.pool]

    if (newPool.length >= 7) return
    const newTile = {
      strength: Math.floor(Math.random() * 3 + 1),
      attack: ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)],
      move: Math.floor(Math.random() * 3 + 1),
      owner: null
    }
    newPool.push(newTile)
    this.setState({pool: newPool})


  }

  buyTile = (cell) => {
    // take money from player

    const newPool = [...this.state.pool]
    newPool[cell].owner = this.state.turn.player
  }

  selectTile = (row, cell) => {
    let tile
    if (row === 'pool') {
      tile = this.state.pool[cell]
    } else {
      tile = this.state.board[row][cell]
    }

    if (!tile) return
    this.setState({
      selected: {
        tile: tile,
        row: row,
        cell: cell
      }
    })
  }

  validPlacement = (row, cell) => {
    if (this.state.board[row][cell]) return false

    if (this.state.selected.row === 'pool') {
      if (this.state.turn.player === 1) {
        return cell === 0
      } else {
        return cell === 6
      }
    }

    // TODO: prevent jumping over enemy squares

    const distance = Math.abs(row - this.state.selected.row) + Math.abs(cell - this.state.selected.cell)
    return distance <= this.state.selected.tile.move
  }

  validTargetExists = () => {
    let res = false
    this.state.board.forEach((row, rind) => {
      row.forEach((cell, cind) => {
        if(this.validTarget(rind, cind, cell)) res = true
      })
    })
    return res
  }

  validTarget = (row, cell, tile) => {
    if (this.state.selected.row === "pool") return
    return (Math.abs(row - this.state.selected.row) <= 1 && Math.abs(cell - this.state.selected.cell) <= 1) && tile && tile.owner !== this.state.selected.tile.owner
  }

  placeTile = (row, cell) => {
    const newBoard = [...this.state.board]
    const newPool = [...this.state.pool]

    if (!this.validPlacement(row, cell)) return

    newBoard[row][cell] = this.state.selected.tile
    let newSelected
    if (this.state.selected.row === 'pool') {
      newPool.splice([this.state.selected.cell], 1)
    } else {
      newBoard[this.state.selected.row][this.state.selected.cell] = null
      newSelected = {...this.state.selected, row: row, cell: cell}
    }

    // call valid attack?
    // break up setState

    this.setState({
      board: newBoard,
      pool: newPool,
      selected: newSelected
    }, () => this.setPhase('attack'))
  }

  boardClick = (row, cell) => {
    const selected = this.state.selected
    const tile = this.state.board[row][cell]

    switch (this.state.turn.phase) {
      case "buy":
        if (!this.state.selected) return
        this.placeTile(row, cell)
        break
      case "move":
        // if (!this.state.selected) {
        //   this.selectTile(row, cell)
        //   return
        // }
        // break
        if (selected) {
          if (row === selected.row && cell === selected.cell) {
            this.setState({selected: null})
          } else {
            this.placeTile(row, cell)
          }
        } else {
          this.selectTile(row, cell)
        }
        // this.setPhase("attack")
        break
      case "attack":
        // const tile = this.state.board[row][cell]
        if (row === this.state.selected.row && cell === this.state.selected.cell) {
          this.setPhase('move')
          return
        }

        if (!this.validTarget(row, cell, tile)) return

        // if (!this.validTarget) return
        this.fight(row, cell)
        this.setPhase("move")
        break
    }

    // if (selected) {
    //   if (row === selected.row && cell === selected.cell) {
    //     this.setState({selected: null})
    //   } else {
    //     this.placeTile(row, cell)
    //   }
    // } else {
    //   this.selectTile(row, cell)
    // }
  }

  fight = (row, cell) => {
    const eff = {
      rock: {rock: 2, paper: 3, scissors: 1},
      paper: {paper: 2, rock: 1, scissors: 3},
      scissors: {scissors: 2, rock: 3, paper: 1}
    }

    const newBoard = [...this.state.board]
    let defender = newBoard[row][cell]
    let attacker = newBoard[this.state.selected.row][this.state.selected.cell]

    defender.strength -= eff[defender.attack][attacker.attack]
    attacker.strength -= eff[attacker.attack][defender.attack]

    if (defender.strength <= 0) defender = null
    if (attacker.strength <= 0) attacker = null

    newBoard[row][cell] = defender
    newBoard[this.state.selected.row][this.state.selected.cell] = attacker

    this.setState({
      board: newBoard,
    })
  }



  poolClick = (row, cell) => {
    if (this.state.turn.phase !== "buy") return
    if (this.state.selected) return
    this.buyTile(cell)
    this.selectTile(row,cell)
  }



  render() {
    return(
      <div>
        <Board
        board={this.state.board}
        selected={this.state.selected}
        handleClick={this.boardClick}
        validPlacement={this.validPlacement}
        turn={this.state.turn}
        validTarget={this.validTarget}
        />

        <Pool
        pool={this.state.pool}
        fillPool={this.fillPool}
        selected={this.state.selected}
        handleClick={this.poolClick}
        // turn={this.state.turn}
        />

        <button onClick={() => {this.setPhase('buy', true)}}>Next Turn</button>
      </div>
    )
  }
}

export default Game
