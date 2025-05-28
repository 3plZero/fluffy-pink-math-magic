
import React from 'react';

interface DisplayProps {
  value: string;
  equation: string;
  isError: boolean;
}

const Display: React.FC<DisplayProps> = ({ value, equation, isError }) => {
  return (
    <div className="text-right space-y-2">
      <div className="text-sm text-pink-600/70 h-6 overflow-hidden">
        {equation && (
          <div className="animate-fade-in">{equation}</div>
        )}
      </div>
      <div className={`text-3xl font-bold ${
        isError 
          ? 'text-red-400' 
          : 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
      }`}>
        {value}
      </div>
    </div>
  );
};

export default Display;
