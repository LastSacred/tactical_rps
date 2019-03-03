import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import Square from './Square'


class Pool extends Component {
  componentDidMount() {
    this.props.fillPool()
  }

  componentDidUpdate() {
    this.props.fillPool()
  }

  createCells() {
    return (
        <Grid.Row>
          {this.props.pool.map((cell, cind) => <Square
            key={'pool' + cind}
            row={'pool'}
            cell={cind}
            tile={cell}
            selected={this.props.selected}
            handleClick={this.props.handleClick}
          />)}
        </Grid.Row>
    )
  }

  showCost() {
    return(
      <Grid.Row>
        {this.props.pool.map((cell, cind) => <Grid.Column key={'cost' + cind} className={'cost'}><div>{cell.move + cell.strength}</div></Grid.Column>)}
      </Grid.Row>
    )
  }

  render() {

    return(
      <div>
        <Grid className={"pool board"}>
          {this.createCells()}
          {this.showCost()}
        </Grid>
      </div>
    )
  }
}

export default Pool
