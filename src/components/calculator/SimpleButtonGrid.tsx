
import React from 'react';
import CalculatorButton from './CalculatorButton';

interface SimpleButtonGridProps {
  onButtonClick: (value: string) => void;
}

const SimpleButtonGrid: React.FC<SimpleButtonGridProps> = ({ onButtonClick }) => {
  const buttons = [
    ['C', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <div className="space-y-3">
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className={`grid gap-3 ${
          rowIndex === 4 ? 'grid-cols-3' : 'grid-cols-4'
        }`}>
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

export default SimpleButtonGrid;
