"use client";

import React, { useState, useEffect } from "react";
import { Monoton, Indie_Flower, Alegreya } from "next/font/google";

// Definir os tipos para os idiomas
type LanguageType = "EN" | "PT";

// Importação das fontes
const monoton = Monoton({ subsets: ["latin"], weight: "400" });
const indieFlower = Indie_Flower({ subsets: ["latin"], weight: "400" });
const alegreya = Alegreya({ subsets: ["latin"], weight: "400" });

const GameGalo = ({ onWin, onSkip, language }: { onWin: () => void; onSkip: () => void; language: LanguageType }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  // Mensagens traduzidas
  const text: Record<LanguageType, { title: string; description: string; smallText: string; win: string; lose: string; draw: string; skip: string }> = {
    EN: {
      title: "Let's uncover the journey of ... ✈︎",
      description: "Your adventure begins now! But first, there's a challenge: win the tic-tac-toe game to proceed!",
      smallText: "Or the mystery will remain hidden forever...",
      win: "🥳 Congratulations! You won! Let's find out the journey of Paula Rodrigues!",
      lose: "😢 Oh no! Try again!",
      draw: "🤝 It's a draw! Let's try again!",
      skip: "Skip Game",
    },
    PT: {
      title: "Vamos descobrir a jornada da ... ✈︎",
      description: "A tua aventura começa agora! Mas há um desafio: vence o jogo da velha para continuar!",
      smallText: "Ou o mistério permanecerá oculto para sempre...",
      win: "🥳 Parabéns! Ganhaste! Vamos conhecer a jornada da Paula Rodrigues!",
      lose: "😢 Oh não! Tenta novamente!",
      draw: "🤝 Empate! Vamos tentar outra vez!",
      skip: "Avançar o Jogo",
    },
  };

  // Verificar vencedor
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

  // Verificar empate
  const checkDraw = (newBoard: string[]) => {
    return newBoard.every((cell) => cell !== null) && !checkWinner(newBoard);
  };

  // Reiniciar jogo automaticamente após 2.5s se for empate ou derrota
  useEffect(() => {
    if (winner === "lose" || winner === "draw") {
      setTimeout(() => {
        setBoard(Array(9).fill(null));
        setIsXTurn(true);
        setGameOver(false);
        setWinner(null);
        setAttempts(0);
      }, 2500);
    } else if (winner === "win") {
      setTimeout(() => {
        onWin(); // Avança para o menu do CV ao ganhar
      }, 2500);
    }
  }, [winner, onWin]);

  // IA tenta jogar inteligentemente
  const aiMove = (newBoard: string[]) => {
    const availableMoves = newBoard.map((cell, index) => (cell === null ? index : null)).filter((val) => val !== null);

    if (availableMoves.length === 0) return;

    // 1️⃣ Tentar ganhar
    for (let move of availableMoves) {
      let testBoard = [...newBoard];
      testBoard[move] = "O";
      if (checkWinner(testBoard) === "O") {
        newBoard[move] = "O";
        setBoard([...newBoard]);
        setGameOver(true);
        setWinner("lose");
        return;
      }
    }

    // 2️⃣ Bloquear o jogador
    for (let move of availableMoves) {
      let testBoard = [...newBoard];
      testBoard[move] = "X";
      if (checkWinner(testBoard) === "X") {
        newBoard[move] = "O";
        setBoard([...newBoard]);
        return;
      }
    }

    // 3️⃣ Jogar aleatoriamente
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    newBoard[randomMove] = "O";
    setBoard([...newBoard]);

    // Verificar empate
    if (checkDraw(newBoard)) {
      setGameOver(true);
      setWinner("draw");
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
      setWinner("win");
      return;
    }

    if (checkDraw(newBoard)) {
      setGameOver(true);
      setWinner("draw");
      return;
    }

    // IA joga após um pequeno atraso
    setTimeout(() => {
      aiMove(newBoard);
      setIsXTurn(true);
    }, 500);
  };

  return (
    <div
      className="w-screen h-auto min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: "url('/images/capa.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Banner de vitória/derrota/empate sobre o jogo */}
      {/* Mensagem de vitória, derrota ou empate */}
      {winner && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      bg-white text-black border-15 border-blue-800 rounded-xl shadow-2xl 
      px-16 py-12 max-w-sm md:max-w-lg lg:max-w-xl flex flex-col items-center justify-center text-xl font-semibold text-justify">

          {/* Mensagem de vitória com destaque para "Paula Rodrigues" */}
          {winner === "win" ? (
            <p className="leading-relaxed">
              {text[language].win.split("Paula Rodrigues")[0]}
              <span className={`text-blue-600 font-extrabold text-2xl ${alegreya.className}`}> Paula Rodrigues </span>
              {text[language].win.split("Paula Rodrigues")[1]}
            </p>
          ) : (
            <p className="leading-relaxed">
              {text[language][winner as "lose" | "draw"]}
            </p>
          )}
        </div>
      )}

      {/* Texto inicial */}
      <h1 className={`text-lg sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-yellow-500 text-center px-4 ${alegreya.className}`}>
        {text[language].title}
      </h1>
      <p className={`text-lg sm:text-xl md:text-2xl mb-2 text-white ${alegreya.className}`}>
        {text[language].description}
      </p>
      <p className="text-sm text-gray-400">{text[language].smallText}</p>

      {/* Tabuleiro */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 border-4 border-white p-2 sm:p-4 mt-6 max-w-xs sm:max-w-md">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow-lg rounded-lg"
            onClick={() => handleClick(index)}
          >
            {cell && (
              <span className={`text-4xl sm:text-5xl md:text-6xl ${cell === "X" ? "text-blue-500" : "text-red-500"} ${monoton.className}`}>
                {cell}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Opção para pular o jogo */}
      <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-4">        {language === "EN" ? "If you don't want to play, " : "Caso não queira jogar, "}
        <span
          className="text-blue-400 cursor-pointer hover:underline"
          onClick={onSkip}
        >
          {language === "EN" ? "click here to skip." : "clica aqui para avançar."}
        </span>
      </p>
    </div>
  );
};

export default GameGalo;
