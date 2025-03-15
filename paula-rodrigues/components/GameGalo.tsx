"use client";

import React, { useState } from "react";

// Definir o tipo para os idiomas
type LanguageType = "EN" | "PT";

const GameGalo = ({ onWin, onSkip, language }: { onWin: () => void; onSkip: () => void; language: LanguageType }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Texto traduzido
  const text: Record<LanguageType, { title: string; description: string; smallText: string }> = {
    EN: {
      title: "Welcome to this journey! 🚀",
      description: "Find out what awaits you... But there's a challenge: you must win the tic-tac-toe game!",
      smallText: "Otherwise, you'll never uncover the hidden secret!",
    },
    PT: {
      title: "Bem-vindo a esta jornada! 🚀",
      description: "Descobre o que te espera... Mas há um desafio: tens de vencer o jogo do galo!",
      smallText: "Caso contrário, nunca saberás o segredo escondido!",
    },
  };

  // Função para verificar vencedor
  const checkWinner = (newBoard: string[]) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  // IA escolhe uma posição aleatória
  const aiMove = (newBoard: string[]) => {
    const availableMoves = newBoard.map((cell, index) => (cell === null ? index : null)).filter((val) => val !== null);
    if (availableMoves.length === 0) return;

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    newBoard[randomMove] = "O";
    setBoard([...newBoard]);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameOver(true);
      setTimeout(() => {
        alert(`🎉 ${winner} venceu!`);
        onWin();
      }, 500);
    }
  };

  // Jogador faz a jogada
  const handleClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXTurn(false);
    setAttempts((prev) => prev + 1);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameOver(true);
      setTimeout(() => {
        alert(`🎉 ${winner} venceu!`);
        onWin();
      }, 500);
      return;
    }

    // Após um pequeno atraso, a IA joga
    setTimeout(() => {
      aiMove(newBoard);
      setIsXTurn(true);
    }, 500);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Texto inicial */}
      <h1 className="text-3xl font-bold mb-2">{text[language].title}</h1>
      <p className="text-xl">{text[language].description}</p>
      <p className="text-sm text-gray-400">{text[language].smallText}</p>

      {/* Tabuleiro */}
      <div className="grid grid-cols-3 gap-4 border-4 border-white p-4 mt-6">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow-lg rounded-lg"
            onClick={() => handleClick(index)}
          >
            {cell === "X" && <span className="text-5xl font-bold text-blue-400 animate-pulse">X</span>}
            {cell === "O" && <span className="text-5xl font-bold text-red-400 animate-bounce">O</span>}
          </button>
        ))}
      </div>

      {/* Botão de pular */}
      {attempts >= 3 && (
        <button
          onClick={onSkip}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-400 transition"
        >
          {language === "EN" ? "Skip Game" : "Pular Jogo"}
        </button>
      )}
    </div>
  );
};

export default GameGalo;
