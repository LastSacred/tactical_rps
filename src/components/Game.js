import React, { Component } from 'react'
import Board from './Board'

// new Array(7).fill(new Array(7).fill(null))
// board: [[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]

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
    selected: null
  }

  selectTile = (row, cell) => {
    const tile = this.state.board[row][cell]

    if (!tile) return
    this.setState({
      selected: {
        onBoard: true,
        tile: tile,
        row: row,
        cell: cell
      }
    })
  }

  validPlacement = (row, cell) => {
    if (this.state.board[row][cell]) return false

    // TODO: prevent jumping over enemy squares

    const distance = Math.abs(row - this.state.selected.row) + Math.abs(cell - this.state.selected.cell)
    return distance <= this.state.selected.tile.move
  }

  placeTile = (row, cell) => {
    const newBoard = [...this.state.board]

    if (!this.validPlacement(row, cell)) return

    newBoard[row][cell] = this.state.selected.tile
    newBoard[this.state.selected.row][this.state.selected.cell] = null

    this.setState({
      board: newBoard,
      selected: null
    })
  }

  handleClick = (row, cell) => {
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

  render() {
    return(
      <Board board={this.state.board} selected={this.state.selected} handleClick={this.handleClick} />
    )
  }
}

export default Game
