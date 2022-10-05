/* eslint-disable no-unused-vars */
import React from 'react';
import Square from './Square';

class Board extends React.Component{
  renderSquare(i){
    const winner = this.props.winner;
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} winner={winner && winner.includes(i) ? 'winner' : ''}/>
  }

  renderAllSquares(){
    const matrixSize = Math.sqrt(this.props.squares.length);
    const board = Array(matrixSize).fill(null);
    for(let i = 0; i < matrixSize; i++){
        const squares = Array(matrixSize).fill(null);
        for(let j = 0; j < matrixSize; j++){
            var squareKey = i * matrixSize + j;
            squares.push(<span key={squareKey}>{this.renderSquare(squareKey)}</span>);
        }
        board.push(<div key={i}>{squares}</div>);
    }
    return board;
  }

  render(){
    return(
      <div>
        <div>Board</div>
        <div>{this.renderAllSquares()}</div>
      </div>
    );
  }
}

export default Board;



// import React, { useState } from 'react';
// import Square from './Square';

// function Board (props) {
//   const renderSquare = i => {
//     const winner = props.winner;
//     return <Square value={props.squares[i]} onClick={() => props.onClick(i)} winner={winner && winner.includes(i) ? 'winner' : ''}/>
//   }

//   const renderAllSquares = () => {
//     const matrixSize = Math.sqrt(props.squares.length);
//     const board = Array(matrixSize).fill(null);
//     for(let i = 0; i < matrixSize; i++){
//         const squares = Array(matrixSize).fill(null);
//         for(let j = 0; j < matrixSize; j++){
//             var squareKey = i * matrixSize + j;
//             squares.push(<span key={squareKey}>{renderSquare(squareKey)}</span>);
//         }
//         board.push(<div key={i}>{squares}</div>);
//     }
//     return board;
//   }

//   return(
//     <div>
//       <div>Board</div>
//       <div>{renderAllSquares()}</div>
//     </div>
//   );
// }

// export default Board;
