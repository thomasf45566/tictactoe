import React from 'react';
import Board from './Board';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      turn: 1
    }
    this.placePiece = this.placePiece.bind(this);
    this.lines = {
      vertLeft: 0,
      vertMid: 0,
      vertRight: 0,
      horiTop: 0,
      horiMid: 0,
      horiBtm: 0,
      diagLeft: 0,
      diagRight: 0
    };
    this.gridToLine = {
      '[0, 0]': ['vertLeft', 'horiTop', 'diagLeft'],
      '[0, 1]': ['vertMid', 'horiTop'],
      '[0, 2]': ['vertRight', 'horiTop', 'diagRight'],
      '[1, 0]': ['vertLeft', 'horiMid'],
      '[1, 1]': ['vertMid', 'horiMid', 'diagLeft', 'diagRight'],
      '[1, 2]': ['vertRight', 'horiMid'],
      '[2, 0]': ['vertLeft', 'horiBtm', 'diagRight'],
      '[2, 1]': ['vertMid', 'horiBtm'],
      '[2, 2]': ['vertRight', 'horiBtm', 'diagLeft'],
    };
  }
  
  placePiece(i, j) {
    if (this.state.board[i][j]) return;
    console.log(`Placed on: [${i}, ${j}]`);
    let board = this.state.board.slice();
    board[i][j] = this.state.turn;
    this.setState({ board });
    for (let line of this.gridToLine[`[${i}, ${j}]`]) {
      this.lines[line] += this.state.turn;
      this.checkWin(line);
    }
    this.setState({ turn: -this.state.turn });
  }
  checkWin(line) {
    if (this.lines[line] === 3) {
      alert('O won!');
    } else if (this.lines[line] === -3) {
      alert('X won!');
    }
  }
  render() {
    return (
      <div>
        <h1>Turn Player: {this.state.turn === 1 ? 'O' : 'X'}</h1>
        <Board board={this.state.board} placePiece={this.placePiece}/>
      </div>
    );
  }
};

export default App;