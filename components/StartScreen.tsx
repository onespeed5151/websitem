
import React from 'react';

interface StartScreenProps {
  onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 mb-8">İki Kişilik Bilgi Yarışması</h1>
      <p className="text-lg sm:text-xl text-slate-300 mb-12">
        Arkadaşınla yarışmaya hazır mısın? Soruları doğru cevapla, 100 puana ilk ulaşan sen ol!
      </p>
      <button
        onClick={onStartGame}
        className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white text-xl font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Oyuna Başla
      </button>
    </div>
  );
};

export default StartScreen;
