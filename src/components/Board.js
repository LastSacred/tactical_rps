import React, {Component} from 'react'
// import ReactBoard from 'react-board'
import Semantic, { Grid } from 'semantic-ui-react'
import Square from './Square'
import Tile from './Tile'

class Board extends Component {
  state = {
    board: new Array(7).fill(new Array(7).fill(<Tile />))
  }

  handleClick = (event) => {
    console.log(event.target)
  }

  createCells = () => {
    return this.state.board.map((row, rind) => {
      return <Grid.Row>{row.map((cell, cind) => <Grid.Column id={'cell-' + rind + cind} className={'board-cell'}>{cell}</Grid.Column>)}</Grid.Row>
      })
    }


  render() {
    return (
      <Grid className={"game-board"} onClick={this.handleClick}>
        {this.createCells()}
      </Grid>
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
