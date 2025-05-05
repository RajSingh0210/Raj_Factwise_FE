import React, { useState } from "react";
import "./App.css";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    for (let pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (board.every(Boolean)) {
      setWinner("Tie");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1>TIC-TAC-TOE</h1>
      <h2>
        {winner
          ? winner === "Tie"
            ? "It's a Tie!"
            : `Player ${winner} WON!`
          : `Player ${isXTurn ? "X" : "O"}'s Turn`}
      </h2>
      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${winner && WIN_PATTERNS.some(
              ([a, b, c]) =>
                board[a] === board[b] &&
                board[b] === board[c] &&
                board[a] === cell &&
                [a, b, c].includes(index)
            ) ? "win" : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="new-game" onClick={resetGame}>
        NEW GAME
      </button>
    </div>
  );
}
