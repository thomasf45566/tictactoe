import React from 'react';
import Board from './Board';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      turn: 1,
      oscore: 0,
      xscore: 0
    }
    this.initBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    this.initLines = {
      vertLeft: 0,
      vertMid: 0,
      vertRight: 0,
      horiTop: 0,
      horiMid: 0,
      horiBtm: 0,
      diagLeft: 0,
      diagRight: 0
    };
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
    this.placePiece = this.placePiece.bind(this);
  }

  init() {
    this.setState({
      board: this.initBoard.slice(),
      turn: 1
    });
    this.lines = Object.assign(this.initLines);
  }
  
  placePiece(i, j) {
    if (this.state.board[i][j]) return;
    console.log(`${this.state.turn === 1 ? 'O' : 'X'} Placed on: [${i}, ${j}]`);
    let board = this.state.board.slice();
    board[i][j] = this.state.turn;
    this.setState({ board });
    for (let line of this.gridToLine[`[${i}, ${j}]`]) {
      this.lines[line] += this.state.turn;
      if (this.checkWin(line)) return this.init();
    }
    this.setState({ turn: -this.state.turn });
  }
  checkWin(line) {
    if (this.lines[line] === 3) {
      alert('O won!');
      this.setState({oscore: this.state.oscore + 1});
      return true;
    } else if (this.lines[line] === -3) {
      alert('X won!');
      this.setState({xscore: this.state.xscore + 1});
      return true;
    }
  }
  render() {
    return (
      <div>
        <h1>Turn Player: {this.state.turn === 1 ? 'O' : 'X'}</h1>
        <Board board={this.state.board} placePiece={this.placePiece}/>
        <h3>O score: {this.state.oscore}</h3>
        <h3>X score: {this.state.xscore}</h3>
      </div>
    );
  }
};

export default App;