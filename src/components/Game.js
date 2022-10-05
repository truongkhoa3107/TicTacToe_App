/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winnerLocation: [a,b,c],
        winnerPlayer: squares[a]
      };
    }
  }
  return null;
}

class Game extends React.Component{
  constructor() {
    super();
    const square = 3;
    this.state = {
      history: [{
        squares: Array(square * square).fill(null),
        moveLocation: '',
      }],
      xIsNext: true,
      stepNumber: 0,
      isReverse: false,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }

    const matrixSize = Math.sqrt(history[0].squares.length);
    const moveLocation = [Math.floor(i / matrixSize) + 1, (i % matrixSize) + 1].join(", ");
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        moveLocation: moveLocation,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(move){
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) ? false : true,
    });
  }

  changeReverse(isReverse){
    this.setState({
      isReverse: !isReverse
    });
  }

  render(){
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;
    const winner = calculateWinner(squares);

    let status;
    if(winner){
      status = "Winner is: " + winner.winnerPlayer;
    }else if(this.state.stepNumber === 9){
      status = "DRAW!!!";
    }else{
      status = "Next player is: " + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const description = move ? `Move #${move} (${step.moveLocation})` : 'Game start';
      return <li key={move}><a href="#" onClick={() => this.jumpTo(move)}>{description}</a></li>
    });

    return(
      <div>
        <div className="game">
          <Board squares={squares} onClick={i => this.handleClick(i)} winner={winner && winner.winnerLocation}/>
        </div>
        <div className="game-info">
          <h1>{status}</h1>
          <ol reversed={this.state.isReverse ? 'reverse' :''}>{this.state.isReverse ? moves.reverse() : moves}</ol>
          <button onClick={() => this.changeReverse(this.state.isReverse)}>Reverse list</button>
        </div>
      </div>
    );
  }
  
}

export default Game;
