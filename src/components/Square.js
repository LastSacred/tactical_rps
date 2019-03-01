import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'

class Square extends Component {

  showContents = () => {
    if (this.props.tile) {
      return(
        <Grid.Column className={'board-cell'} onClick={() => this.props.handleClick(this.props.row, this.props.cell, this.props.tile)}>
          <div>{this.props.tile.strength}</div>
          <div>{this.props.tile.attack}</div>
          <div>{this.props.tile.move}</div>
        </Grid.Column>
      )
    } else {
      return(
        <Grid.Column className={'board-cell'} onClick={() => this.props.handleClick(this.props.row, this.props.cell)}>
        </Grid.Column>
      )
    }
  }

  render() {
    return(
      this.showContents()
    )
  }

}

export default Square
