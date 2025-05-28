
import React from 'react';
import Display from './calculator/Display';
import SimpleButtonGrid from './calculator/SimpleButtonGrid';
import { useSimpleCalculator } from '@/hooks/useSimpleCalculator';

const SimpleCalculator = () => {
  const calculator = useSimpleCalculator();

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-pink-200/50">
      <div className="bg-gradient-to-br from-pink-100/50 to-purple-100/50 rounded-2xl p-4 mb-4">
        <Display 
          value={calculator.display}
          equation={calculator.equation}
          isError={calculator.isError}
        />
      </div>
      
      <SimpleButtonGrid onButtonClick={calculator.handleInput} />
    </div>
  );
};

export default SimpleCalculator;
