import React, { Component } from 'react'
import Board from './Board'
import Pool from './Pool'

// new Array(7).fill(new Array(7).fill(null))

function startBoard() {
  return (
    [
      [{strength: 3, attack: 'scissors', move: 2, owner:1},null,{strength: 2, attack: 'paper', move: 1, owner:2},null,null,null,null],
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
      phase: 'buy'
    }
  }

  nextPhase = () => {
    const phaseOrder = ['buy', 'move', 'fight']
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

  placeTile = (row, cell) => {
    const newBoard = [...this.state.board]
    const newPool = [...this.state.pool]

    if (!this.validPlacement(row, cell)) return

    newBoard[row][cell] = this.state.selected.tile
    if (this.state.selected.row === 'pool') {
      newPool.splice([this.state.selected.cell], 1)
    } else {
      newBoard[this.state.selected.row][this.state.selected.cell] = null
    }

    this.setState({
      board: newBoard,
      pool: newPool,
      selected: null
    })
  }

  boardClick = (row, cell) => {
    const selected = this.state.selected

    if (selected) {
      if (row === selected.row && cell === selected.cell) {
        this.setState({selected: null})
      } else {
        this.placeTile(row, cell)
      }
    } else {
      this.selectTile(row, cell)
    }
  }

  poolClick = (row, cell) => {
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
        />

        <Pool
        pool={this.state.pool}
        fillPool={this.fillPool}
        selected={this.state.selected}
        handleClick={this.poolClick}
        />
      </div>
    )
  }
}

export default Game
