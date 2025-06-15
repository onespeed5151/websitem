
import React from 'react';
import { GameState } from '../types';

interface GameControlsProps {
  gameState: GameState;
  onNextQuestion: () => void;
  onRestartGame: () => void;
  isGameOverByNoMoreQuestions: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ gameState, onNextQuestion, onRestartGame, isGameOverByNoMoreQuestions }) => {
  if (gameState === GameState.Playing) {
    return (
      <div className="mt-6 sm:mt-8 text-center text-slate-400 italic">
        Oyuncuların cevap vermesi bekleniyor...
      </div>
    );
  }

  if (gameState === GameState.RoundOver) {
    return (
      <div className="mt-6 sm:mt-8 text-center">
        <button
          onClick={onNextQuestion}
          className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          {isGameOverByNoMoreQuestions ? "Sonuçları Gör" : "Sıradaki Soru"}
        </button>
      </div>
    );
  }
  
  // GameOver state is handled by Modal, but a restart button could be here too if not in modal
  // For now, this component doesn't render anything in GameOver, assuming Modal handles it.
  return null;
};

export default GameControls;
