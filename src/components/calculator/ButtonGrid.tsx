
import React from 'react';
import CalculatorButton from './CalculatorButton';

interface ButtonGridProps {
  onButtonClick: (value: string) => void;
  onMemoryToggle: () => void;
  showMemory: boolean;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ onButtonClick, onMemoryToggle, showMemory }) => {
  const buttons = [
    // Row 1 - Memory and Clear functions
    ['MC', 'MR', 'M+', 'M-', 'MS'],
    // Row 2 - Advanced functions
    ['sin', 'cos', 'tan', 'log', 'ln'],
    // Row 3 - More functions
    ['√', 'x²', 'x³', '1/x', '!'],
    // Row 4 - Basic operations
    ['(', ')', '±', '÷', 'C'],
    // Row 5 - Numbers and operations
    ['7', '8', '9', '×', 'AC'],
    // Row 6
    ['4', '5', '6', '-', '⌫'],
    // Row 7
    ['1', '2', '3', '+', '%'],
    // Row 8
    ['0', '00', '.', '=', 'π']
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-center mb-4">
        <button
          onClick={onMemoryToggle}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            showMemory
              ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
              : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
          }`}
        >
          ✨ Memory {showMemory ? 'ON' : 'OFF'}
        </button>
      </div>
      
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {row.map((button) => (
            <CalculatorButton
              key={button}
              value={button}
              onClick={onButtonClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ButtonGrid;
