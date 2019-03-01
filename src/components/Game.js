import React, { Component } from 'react'
import Board from './Board'

// new Array(7).fill(new Array(7).fill(null))
// board: [[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]

function startBoard() {
  return (
    [
      [{strength: 3, attack: 'scissors', move: 2},null,null,null,null,null,null],
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
        row: row,
        cell: cell
      }
    })
  }

  placeTile = (row, cell) => {
    const newBoard = [...this.state.board]
    const selectedTile = this.state.board[this.state.selected.row][this.state.selected.cell]

    newBoard[row][cell] = selectedTile
    newBoard[this.state.selected.row][this.state.selected.cell] = null

    this.setState({
      board: newBoard,
      selected: null
    })
  }

  handleClick = (row, cell) => {
    const selected = this.state.selected
    if (selected) {
      if (row === selected.row && cell === selected.cell) return
      this.placeTile(row, cell)
    } else {
      this.selectTile(row, cell)
    }
  }

  render() {
    return(
      <Board board={this.state.board} handleClick={this.handleClick} />
    )
  }
}

export default Game
