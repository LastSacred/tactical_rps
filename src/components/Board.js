import React, {Component} from 'react'
import ReactBoard from 'react-board'
import Square from './Square'

class Board extends Component {
  state = {
    board: new Array(8).fill(new Array(8).fill('hello'))
  }

  clickHandler = ({col, row, cellName, cellValue}) => {
    console.log(`${col} ${row} ${cellName} ${cellValue}`);
  }

  render() {
    return (
      <ReactBoard
        size={8}
        values={this.state.board}
        highlight={[[0,0]]}
        clickHandler={this.clickHandler}
      />
    )
  }

}

export default Board
