
import React from 'react';

interface QuestionDisplayProps {
  questionText: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questionText }) => {
  return (
    <div className="mb-6 sm:mb-10 p-4 bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-3xl font-bold text-center text-sky-300">
        {questionText}
      </h2>
    </div>
  );
};

export default QuestionDisplay;
