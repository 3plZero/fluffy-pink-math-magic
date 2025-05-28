
import React from 'react';

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ value, onClick }) => {
  const getButtonStyle = (val: string) => {
    // Numbers
    if (/[0-9]/.test(val) || val === '.' || val === '00') {
      return 'bg-gradient-to-br from-white to-pink-50 text-pink-800 border-pink-200 hover:from-pink-50 hover:to-pink-100 hover:scale-105';
    }
    
    // Basic operations
    if (['+', '-', '×', '÷', '='].includes(val)) {
      return 'bg-gradient-to-br from-pink-400 to-purple-400 text-white border-pink-300 hover:from-pink-500 hover:to-purple-500 hover:scale-105 shadow-lg';
    }
    
    // Memory functions
    if (['MC', 'MR', 'M+', 'M-', 'MS'].includes(val)) {
      return 'bg-gradient-to-br from-purple-300 to-pink-300 text-white border-purple-200 hover:from-purple-400 hover:to-pink-400 hover:scale-105';
    }
    
    // Advanced functions
    if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'x³', '1/x', '!', 'π'].includes(val)) {
      return 'bg-gradient-to-br from-rose-300 to-pink-300 text-white border-rose-200 hover:from-rose-400 hover:to-pink-400 hover:scale-105';
    }
    
    // Clear functions
    if (['C', 'AC', '⌫'].includes(val)) {
      return 'bg-gradient-to-br from-red-300 to-pink-300 text-white border-red-200 hover:from-red-400 hover:to-pink-400 hover:scale-105';
    }
    
    // Default
    return 'bg-gradient-to-br from-pink-200 to-purple-200 text-pink-800 border-pink-200 hover:from-pink-300 hover:to-purple-300 hover:scale-105';
  };

  const getButtonSize = (val: string) => {
    if (val === '0') return 'col-span-2';
    return '';
  };

  return (
    <button
      onClick={() => onClick(value)}
      className={`
        ${getButtonStyle(value)}
        ${getButtonSize(value)}
        h-12 rounded-xl border-2 font-bold text-sm
        transition-all duration-200 ease-out
        hover:shadow-lg active:scale-95
        backdrop-blur-sm
      `}
    >
      {value}
    </button>
  );
};

export default CalculatorButton;
