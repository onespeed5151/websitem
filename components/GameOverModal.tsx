
import React from 'react';
import { Player } from '../types';

interface GameOverModalProps {
  isOpen: boolean;
  winner: Player | 'Draw' | null;
  player1Score: number;
  player2Score: number;
  onPlayAgain: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, winner, player1Score, player2Score, onPlayAgain }) => {
  if (!isOpen) return null;

  let message = '';
  if (winner === 'Draw') {
    message = 'Oyun berabere bitti!';
  } else if (winner) {
    message = `${winner} kazandı! Tebrikler!`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 p-6 sm:p-10 rounded-xl shadow-2xl text-white text-center w-full max-w-md">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-sky-400">Oyun Bitti!</h2>
        {message && <p className="text-xl sm:text-2xl mb-4">{message}</p>}
        <div className="mb-6 text-lg sm:text-xl">
          <p>{Player.Player1} Puanı: <span className="font-bold text-yellow-400">{player1Score}</span></p>
          <p>{Player.Player2} Puanı: <span className="font-bold text-yellow-400">{player2Score}</span></p>
        </div>
        <button
          onClick={onPlayAgain}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Tekrar Oyna
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
