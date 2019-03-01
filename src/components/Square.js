import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'

class Square extends Component {
  isSelected = () => {
    return this.props.selected.row === this.props.row && this.props.selected.cell === this.props.cell
  }

  getCssClass = () => {
    let cssClass = 'square'

    if (this.props.tile) {
      cssClass += ' tile'

      if (this.props.tile.owner === 1) cssClass += ' player1'
      if (this.props.tile.owner === 2) cssClass += ' player2'
    }

    if (this.props.selected) {
      if (this.isSelected()) {
        cssClass += ' selected'
      } else {
        const distance = Math.abs(this.props.row - this.props.selected.row) + Math.abs(this.props.cell - this.props.selected.cell)
        if (distance <= this.props.selected.tile.move) cssClass += ' inRange'
      }

    }


    return cssClass
  }

  showContents = () => {
    if (this.props.tile) {
      return(
        [
          <div key={'str'}>{this.props.tile.strength}</div>,
          <div key={'atk'}>{this.props.tile.attack}</div>,
          <div key={'mov'}>{this.props.tile.move}</div>
        ]
      )
    } else {
      return(
        null
      )
    }
  }

  render() {
    return(
      <Grid.Column className={this.getCssClass()} onClick={() => this.props.handleClick(this.props.row, this.props.cell)}>
        {this.showContents()}
      </Grid.Column>
    )
  }

}

export default Square