
import React from 'react';
import { Question, Player } from '../types'; // Ensure Player is imported

interface PlayerColumnProps {
  player: Player;
  score: number;
  questionData: Question;
  selectedOptionIndex: number | null;
  onAnswerSelect: (optionIndex: number) => void;
  isRoundOver: boolean;
  isPlayerDisabled: boolean; // True if player has answered or it's not their turn effectively
}

const PlayerColumn: React.FC<PlayerColumnProps> = ({
  player,
  score,
  questionData,
  selectedOptionIndex,
  onAnswerSelect,
  isRoundOver,
  isPlayerDisabled,
}) => {
  const getOptionClasses = (index: number): string => {
    let baseClasses = "block w-full text-left p-3 sm:p-4 mb-3 rounded-md transition-all duration-200 ease-in-out border-2 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-sky-400";

    if (isRoundOver) {
      if (index === questionData.correctAnswerIndex) {
        return `${baseClasses} bg-green-600 border-green-400 text-white shadow-md`;
      }
      if (index === selectedOptionIndex) { // Player selected this, and it's incorrect (correct case handled above)
        return `${baseClasses} bg-red-600 border-red-400 text-white shadow-md`;
      }
      return `${baseClasses} bg-slate-500 border-slate-400 text-slate-300 opacity-70`; // Unselected, incorrect option
    }

    if (selectedOptionIndex === index) {
      return `${baseClasses} bg-sky-600 border-sky-400 text-white shadow-md`;
    }
    
    if (isPlayerDisabled && selectedOptionIndex !== index) {
         return `${baseClasses} bg-slate-500 border-slate-600 text-slate-400 opacity-60 cursor-not-allowed`;
    }
    
    return `${baseClasses} bg-slate-600 hover:bg-slate-500 border-slate-500 hover:border-sky-500 text-white`;
  };

  return (
    <div className="flex-1 bg-slate-700 p-4 sm:p-6 rounded-xl shadow-xl min-w-[280px] sm:min-w-[320px]">
      <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-center text-sky-400">{player}</h3>
      <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center text-white">
        Puan: <span className="text-yellow-400">{score}</span>
      </p>
      <div className="space-y-2">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={getOptionClasses(index)}
            disabled={isPlayerDisabled || isRoundOver}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerColumn;
