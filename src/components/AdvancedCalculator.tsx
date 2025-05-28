
import React, { useState } from 'react';
import Display from './calculator/Display';
import ButtonGrid from './calculator/ButtonGrid';
import MemoryPanel from './calculator/MemoryPanel';
import { useCalculator } from '@/hooks/useCalculator';

const AdvancedCalculator = () => {
  const [showMemory, setShowMemory] = useState(false);
  const calculator = useCalculator();

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-pink-200/50">
      <div className="bg-gradient-to-br from-pink-100/50 to-purple-100/50 rounded-2xl p-4 mb-4">
        <Display 
          value={calculator.display}
          equation={calculator.equation}
          isError={calculator.isError}
        />
      </div>
      
      {showMemory && (
        <MemoryPanel 
          memory={calculator.memory}
          onMemoryRecall={calculator.memoryRecall}
          onMemoryClear={calculator.memoryClear}
          onMemoryAdd={calculator.memoryAdd}
          onMemorySubtract={calculator.memorySubtract}
        />
      )}
      
      <ButtonGrid 
        onButtonClick={calculator.handleInput}
        onMemoryToggle={() => setShowMemory(!showMemory)}
        showMemory={showMemory}
      />
    </div>
  );
};

export default AdvancedCalculator;
