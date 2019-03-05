import React, { Component } from 'react'
import Board from './Board'
import Pool from './Pool'
import Player from './Player'

// new Array(7).fill(new Array(7).fill(null))

function startBoard() {
  return (
    [
      [null,null,null,null,null,null,null],
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
    pool: [],
    selected: null,
    turn: {
      player: 1,
      phase: 'buy',
      count: 1
    },
    money: {
      player1: 20,
      player2: 20
    }
  }

  setPhase = (isEnd=false) => {
    let phase
    let nextTurn = false

    switch (this.state.turn.phase) {
      case 'buy':
        phase = 'move'
        break;
      case 'move':
        if (this.validTargetExists()) {
          phase = 'attack'
        } else {
          isEnd = 'end'
        }
        break;
      case 'attack':
        isEnd = 'end'
        break;
    }
    if (isEnd === 'end') {
      phase = 'buy'
      nextTurn = true
    }

    const newTurn = {...this.state.turn, phase: phase}

    if (nextTurn) {
      this.loot()
      newTurn.player = !(newTurn.player - 1) + 1
      if (newTurn.player === 1) newTurn.count += 1
    }

    let newSelected = (phase === "attack" ? this.state.selected : null)

    this.setState({
      turn: newTurn,
      selected: newSelected
    })
  }

  loot = () => {
    const opponentSide = (cind) => {
      if (this.state.turn.player === 1) return cind > 3
      if (this.state.turn.player === 2) return cind < 3
    }

    let newMoney = {...this.state.money}

    this.state.board.forEach(row => {
      row.forEach((cell, cind) => {
        if (opponentSide(cind) && cell && cell.owner === this.state.turn.player) {
          newMoney['player' + this.state.turn.player] += 1
        }
      })
    })

    this.setState({money: newMoney})
  }

  fillPool = () => {
    let newPool = [...this.state.pool]

    if (newPool.length >= 7) return
    const newTile = {
      strength: Math.floor(Math.random() * 3 + 1),
      attack: ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)],
      move: Math.floor(Math.random() * 3 + 1),
      owner: null
    }
    newPool.push(newTile)
    this.setState({pool: newPool})


  }

  buyTile = (cell) => {
    const player = 'player' + this.state.turn.player
    const cost = this.state.pool[cell].strength + this.state.pool[cell].move
    const newMoney = {...this.state.money, [player]: this.state.money[player] - cost}

    this.setState({money: newMoney})
  }

  selectTile = (row, cell) => {
    let tile
    if (row === 'pool') {
      tile = this.state.pool[cell]
    } else {
      tile = this.state.board[row][cell]
    }

    if (!tile || tile.owner !== this.state.turn.player) return
    this.setState({
      selected: {
        tile: tile,
        row: row,
        cell: cell
      }
    })
  }

  validPlacement = (row, cell) => {
    if (this.state.board[row][cell]) return false

    if (!this.state.selected) return false


    if (this.state.selected.row === 'pool') {
      if (this.state.turn.player === 1) {
        return cell === 0
      } else {
        return cell === 6
      }
    }

    // row and cell are clicked spot
    let openPath = false
    let count = this.state.selected.tile.move
    const noJumps = (row, cell, count) => {
      if (count < 0) return
      if (this.state.selected.row === row && this.state.selected.cell === cell) {
        openPath = true
        return
      }
      if (this.state.board[row][cell]) return
      let newCell
      let newRow
      if (row !== this.state.selected.row) {
        if (row > this.state.selected.row) {newRow = row-1}
        if (row < this.state.selected.row) {newRow = row+1}
        noJumps(newRow, cell, count-1)
      }
      if (cell !== this.state.selected.cell) {
        if (cell > this.state.selected.cell) newCell = cell-1
        if (cell < this.state.selected.cell) newCell = cell+1
        noJumps(row, newCell, count-1)
      }
    }

    noJumps(row, cell, count)
    return openPath
  }

  validTargetExists = () => {
    let res = false
    this.state.board.forEach((row, rind) => {
      row.forEach((cell, cind) => {
        if(this.validTarget(rind, cind, cell)) res = true
      })
    })
    return res
  }

  validTarget = (row, cell, tile) => {
    if (this.state.selected.row === "pool") return
    return (Math.abs(row - this.state.selected.row) <= 1 && Math.abs(cell - this.state.selected.cell) <= 1) && tile && tile.owner !== this.state.selected.tile.owner
  }

  placeTile = (row, cell) => {

    if (!(this.state.selected.row === row && this.state.selected.cell === cell) && !this.validPlacement(row, cell)) return

    const newBoard = [...this.state.board]
    const newPool = [...this.state.pool]
    let newSelected

    if (this.state.selected.row === 'pool') {
      newPool.splice([this.state.selected.cell], 1)
    } else {
      newBoard[this.state.selected.row][this.state.selected.cell] = null
      newSelected = {...this.state.selected, row: row, cell: cell}
    }

    newBoard[row][cell] = this.state.selected.tile

    this.setState({
      board: newBoard,
      pool: newPool,
      selected: newSelected
    }, this.setPhase)
  }

  // choosePhase = () => {
  //   if (this.state.turn.phase === 'buy') {
  //     this.setPhase('move')
  //   } else if (this.s) {
  //     this.setPhase('attack')
  //   }
  // }

  boardClick = (row, cell) => {
    const selected = this.state.selected
    const tile = this.state.board[row][cell]

    switch (this.state.turn.phase) {
      case "buy":
        if (!this.state.selected) return
        this.placeTile(row, cell)
        break
      case "move":
        if (selected) {
          this.placeTile(row, cell)
        } else {
          this.selectTile(row, cell)
        }
        break
      case "attack":
        if (row === this.state.selected.row && cell === this.state.selected.cell) {
          this.setPhase('end')
          return
        }

        if (!this.validTarget(row, cell, tile)) return

        this.fight(row, cell)
        this.setPhase()
        break
    }
  }

  fight = (row, cell) => {
    const eff = {
      rock: {rock: 2, paper: 3, scissors: 1},
      paper: {paper: 2, rock: 1, scissors: 3},
      scissors: {scissors: 2, rock: 3, paper: 1}
    }

    const newBoard = [...this.state.board]
    let defender = newBoard[row][cell]
    let attacker = newBoard[this.state.selected.row][this.state.selected.cell]

    defender.strength -= eff[defender.attack][attacker.attack]
    attacker.strength -= eff[attacker.attack][defender.attack]

    if (defender.strength <= 0) defender = null
    if (attacker.strength <= 0) attacker = null

    newBoard[row][cell] = defender
    newBoard[this.state.selected.row][this.state.selected.cell] = attacker

    this.setState({
      board: newBoard,
    })
  }



  poolClick = (row, cell) => {
    if (this.state.turn.phase !== "buy" || this.state.selected) return
    if ((this.state.pool[cell].strength + this.state.pool[cell].move) > this.state.money['player' + this.state.turn.player]) return

    this.buyTile(cell)

    const newPool = [...this.state.pool]
    newPool[cell] = {...newPool[cell], owner: this.state.turn.player}

    this.setState({pool: newPool}, () => this.selectTile(row,cell))
  }



  render() {
    return(
      <div>
        <Player id='1' username={'sunny'} money={this.state.money.player1} />
        <Player id='2' username={'arthur'} money={this.state.money.player2} />

        <Board
        board={this.state.board}
        selected={this.state.selected}
        handleClick={this.boardClick}
        validPlacement={this.validPlacement}
        turn={this.state.turn}
        validTarget={this.validTarget}
        />

        <Pool
        pool={this.state.pool}
        fillPool={this.fillPool}
        selected={this.state.selected}
        handleClick={this.poolClick}
        // turn={this.state.turn}
        />

        <button onClick={() => {this.setPhase('end')}}>Next Turn</button>

        <div>
          <div> Player: {this.state.turn.player} </div>
          <div> Phase: {this.state.turn.phase} </div>
          <div> Turn: {this.state.turn.count} </div>
        </div>
      </div>
    )
  }
}

export default Game
