import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import Square from './Square'

class Board extends Component {

  createCells = () => {
    return this.props.board.map((row, rind) => {
      return (
        <Grid.Row key={rind}>
          {row.map((cell, cind) => <Square
            key={rind + cind}
            row={rind}
            cell={cind}
            tile={cell}
            selected={this.props.selected}
            handleClick={this.props.handleClick}
            validPlacement={this.props.validPlacement}
            turn={this.props.turn}
            validTarget={this.props.validTarget}
          />)}
        </Grid.Row>
      )
    })
  }


  render() {
    return (
      <Grid className={"game board"}>
        {this.createCells()}
      </Grid>
    )
  }

}

export default Board
