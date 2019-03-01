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
    selected: {
      onBoard: true,
      row: 0,
      cell: 0
    }
  }

  placeTile = (row, cell) => {
    const newBoard = [...this.state.board]
    const selectedTile = this.state.board[this.state.selected.row][this.state.selected.cell]

    newBoard[row][cell] = selectedTile
    newBoard[this.state.selected.row][this.state.selected.cell] = null


    this.setState({board: newBoard})
  }

  handleClick = (row, cell, tile) => {
    this.placeTile(row, cell)
  }

  render() {
    return(
      <Board board={this.state.board} handleClick={this.handleClick} />
    )
  }
}

export default Game
