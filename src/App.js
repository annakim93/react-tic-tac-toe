import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [player, setPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(false);

  const updateSquares = (id) => {
    const squareCopy = [];
    let currentId = 0;
    for (let row = 0; row < 3; row += 1) {
      squareCopy.push([]);
      for (let col = 0; col < 3; col += 1) {
        if (winner === false && currentId === id && squares[row][col].value === '') {
          squareCopy[row].push({
            id: currentId,
            value: player,
          });

          if (player === PLAYER_1) {
            setPlayer(PLAYER_2)
          } else {
            setPlayer(PLAYER_1)
          }

        } else {
          squareCopy[row].push(squares[row][col]);
        }
        currentId += 1;
      }
    }
    
    setSquares(squareCopy);
    let newWinner = checkForWinner(squareCopy);
    if (newWinner !== false) {
      setWinner(newWinner);
    }
  }

  const checkForWinner = (squares) => {
    // First check rows:
    for (let row of squares) {
      if (row.every(obj => obj.value ==='X')) {
        return PLAYER_1;
      } else if (row.every(obj => obj.value ==='O')) {
        return PLAYER_2;
      }
    }

    // Check cols:
    for (let col = 0; col < 3; col += 1) {
      if (squares[0][col].value === 'X' && 
          squares[0][col].value === squares[1][col].value && 
          squares[1][col].value === squares[2][col].value) {
        return PLAYER_1;
      } else if (squares[0][col].value === 'O' && 
      squares[0][col].value === squares[1][col].value && 
      squares[1][col].value === squares[2][col].value) {
        return PLAYER_2;
      }
    }

    // Check diagonals:
    if (squares[0][0].value === 'X' && 
        squares[0][0].value === squares[1][1].value && 
        squares[1][1].value === squares[2][2].value) {
      return PLAYER_1;
    } else if (squares[0][0].value === 'O' && 
               squares[0][0].value === squares[1][1].value && 
               squares[1][1].value === squares[2][2].value) {
      return PLAYER_2;
    } else if (squares[0][2].value === 'X' && 
               squares[0][2].value === squares[1][1].value && 
               squares[1][1].value === squares[2][0].value) {
      return PLAYER_1;
    } else if (squares[0][2].value === 'O' && 
               squares[0][2].value === squares[1][1].value && 
               squares[1][1].value === squares[2][0].value) {
      return PLAYER_2;
    }

    return false;
  }

  const resetGame = () => {
    // Complete in Wave 4
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{winner === false ? '' : `Winner is ${winner}`}</h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquares} />
      </main>
    </div>
  );
}

export default App;
