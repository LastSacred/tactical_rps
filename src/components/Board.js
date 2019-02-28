import React, {Component} from 'react'
// import ReactBoard from 'react-board'
import Grid from 'semantic-ui-react'
import Square from './Square'

class Board extends Component {
  state = {
    board: new Array(8).fill(new Array(8).fill('hello'))
  }

  clickHandler = ({col, row, cellName, cellValue}) => {
    console.log(`${col} ${row} ${cellName} ${cellValue}`);
  }

  createCells = () => {
    return this.state.board.map((row, index) => {
      return <Grid>{row.map((cell, index) => <Grid.Column>X</Grid.Column>)}</Grid>
      })
    }


  render() {
    return (
      <div className={"game-board"}>
        {this.createCells()}
      </div>
    )
  }

}

// <ReactBoard
//   size={8}
//   values={this.state.board}
//   highlight={[[0,0]]}
//   clickHandler={this.clickHandler}
// />

export default Board
