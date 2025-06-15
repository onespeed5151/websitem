
import React, { useState, useEffect, useCallback } from 'react';
import { Question, Player, GameState } from './types';
import { QUESTIONS_DATA } from './data/questions';
import { WINNING_SCORE, POINTS_PER_CORRECT_ANSWER } from './constants';
import { shuffleArray } from './utils/shuffleArray';
import StartScreen from './components/StartScreen';
import QuestionDisplay from './components/QuestionDisplay';
import PlayerColumn from './components/PlayerColumn';
import GameControls from './components/GameControls';
import GameOverModal from './components/GameOverModal';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.StartScreen);
  const [questions, setQuestions] = useState<Question[]>(() => shuffleArray(QUESTIONS_DATA));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [player1SelectedOption, setPlayer1SelectedOption] = useState<number | null>(null);
  const [player2SelectedOption, setPlayer2SelectedOption] = useState<number | null>(null);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (player1SelectedOption !== null && player2SelectedOption !== null && gameState === GameState.Playing) {
      const currentQ = questions[currentQuestionIndex];
      let roundPointsP1 = 0;
      let roundPointsP2 = 0;

      if (player1SelectedOption === currentQ.correctAnswerIndex) {
        roundPointsP1 = POINTS_PER_CORRECT_ANSWER;
      }
      if (player2SelectedOption === currentQ.correctAnswerIndex) {
        roundPointsP2 = POINTS_PER_CORRECT_ANSWER;
      }
      
      setPlayer1Score(prevScore => prevScore + roundPointsP1);
      setPlayer2Score(prevScore => prevScore + roundPointsP2);
      setGameState(GameState.RoundOver);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player1SelectedOption, player2SelectedOption, gameState, questions, currentQuestionIndex]);


  const handleAnswerSelect = useCallback((player: Player, optionIndex: number) => {
    if (gameState !== GameState.Playing) return;

    if (player === Player.Player1 && player1SelectedOption === null) {
      setPlayer1SelectedOption(optionIndex);
    } else if (player === Player.Player2 && player2SelectedOption === null) {
      setPlayer2SelectedOption(optionIndex);
    }
  }, [gameState, player1SelectedOption, player2SelectedOption]);

  const handleNextQuestion = useCallback(() => {
    // Check for win by score threshold first, even if there are more questions
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        const p1WinsByThreshold = player1Score >= WINNING_SCORE;
        const p2WinsByThreshold = player2Score >= WINNING_SCORE;

        if (p1WinsByThreshold && p2WinsByThreshold) { // Both reach/exceed 100
             setWinner(player1Score > player2Score ? Player.Player1 : (player2Score > player1Score ? Player.Player2 : 'Draw'));
        } else if (p1WinsByThreshold) {
            setWinner(Player.Player1);
        } else if (p2WinsByThreshold) {
            setWinner(Player.Player2);
        } else { 
            // This case should ideally not be hit if one score is >= WINNING_SCORE,
            // but as a fallback, compare scores if the logic above had a gap.
             setWinner(player1Score > player2Score ? Player.Player1 : Player.Player2);
        }
        setGameState(GameState.GameOver);
        return;
    }

    const nextQuestionIdx = currentQuestionIndex + 1;
    if (nextQuestionIdx < questions.length) {
      setCurrentQuestionIndex(nextQuestionIdx);
      setPlayer1SelectedOption(null);
      setPlayer2SelectedOption(null);
      setGameState(GameState.Playing);
    } else {
      // All questions answered, no one reached WINNING_SCORE yet. Determine winner by current score.
      if (player1Score > player2Score) setWinner(Player.Player1);
      else if (player2Score > player1Score) setWinner(Player.Player2);
      else setWinner('Draw'); // Scores are equal
      setGameState(GameState.GameOver);
    }
  }, [player1Score, player2Score, currentQuestionIndex, questions.length]);

  const handleRestartGame = useCallback(() => {
    setQuestions(shuffleArray(QUESTIONS_DATA));
    setCurrentQuestionIndex(0);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1SelectedOption(null);
    setPlayer2SelectedOption(null);
    setWinner(null);
    setGameState(GameState.Playing);
  }, []);
  
  const handleStartGame = useCallback(() => {
    handleRestartGame(); // Resets and starts
    setGameState(GameState.Playing);
  }, [handleRestartGame]);


  if (gameState === GameState.StartScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-4 font-sans">
        <StartScreen onStartGame={handleStartGame} />
      </div>
    );
  }
  
  if (!currentQuestion) {
    // Should not happen if questions array is not empty and indexes are managed.
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">Yükleniyor...</div>;
  }

  const isPlayer1Disabled = player1SelectedOption !== null || gameState === GameState.RoundOver || gameState === GameState.GameOver;
  const isPlayer2Disabled = player2SelectedOption !== null || gameState === GameState.RoundOver || gameState === GameState.GameOver;
  const isGameOverByNoMoreQuestions = currentQuestionIndex + 1 >= questions.length && (player1Score < WINNING_SCORE && player2Score < WINNING_SCORE);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-2 sm:p-4 font-sans">
      <div className="bg-slate-800/50 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-5xl">
        <QuestionDisplay questionText={currentQuestion.text} />
        
        <div className="flex flex-col sm:flex-row justify-around gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          <PlayerColumn
            player={Player.Player1}
            score={player1Score}
            questionData={currentQuestion}
            selectedOptionIndex={player1SelectedOption}
            onAnswerSelect={(index) => handleAnswerSelect(Player.Player1, index)}
            isRoundOver={gameState === GameState.RoundOver}
            isPlayerDisabled={isPlayer1Disabled}
          />
          <PlayerColumn
            player={Player.Player2}
            score={player2Score}
            questionData={currentQuestion}
            selectedOptionIndex={player2SelectedOption}
            onAnswerSelect={(index) => handleAnswerSelect(Player.Player2, index)}
            isRoundOver={gameState === GameState.RoundOver}
            isPlayerDisabled={isPlayer2Disabled}
          />
        </div>

        <GameControls
          gameState={gameState}
          onNextQuestion={handleNextQuestion}
          onRestartGame={handleRestartGame} 
          isGameOverByNoMoreQuestions={isGameOverByNoMoreQuestions && gameState === GameState.RoundOver}
        />
      </div>
      <GameOverModal
        isOpen={gameState === GameState.GameOver}
        winner={winner}
        player1Score={player1Score}
        player2Score={player2Score}
        onPlayAgain={handleRestartGame}
      />
    </div>
  );
};

export default App;
