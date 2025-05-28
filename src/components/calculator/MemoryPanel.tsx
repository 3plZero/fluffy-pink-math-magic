
import React from 'react';

interface MemoryPanelProps {
  memory: number[];
  onMemoryRecall: (index: number) => void;
  onMemoryClear: (index: number) => void;
  onMemoryAdd: (value: number) => void;
  onMemorySubtract: (value: number) => void;
}

const MemoryPanel: React.FC<MemoryPanelProps> = ({ 
  memory, 
  onMemoryRecall, 
  onMemoryClear 
}) => {
  return (
    <div className="bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-2xl p-4 mb-4 backdrop-blur-sm border border-purple-200/50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-purple-600">💖 Memory Storage</h3>
        <span className="text-xs text-purple-500">{memory.length} saved</span>
      </div>
      
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {memory.length === 0 ? (
          <div className="text-center py-4 text-purple-400 text-sm">
            ✨ No memories yet! ✨
          </div>
        ) : (
          memory.map((value, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/50 rounded-lg p-2 backdrop-blur-sm"
            >
              <span className="text-purple-700 font-medium text-sm">{value}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => onMemoryRecall(index)}
                  className="px-2 py-1 bg-pink-300 text-white rounded text-xs hover:bg-pink-400 transition-colors"
                >
                  Use
                </button>
                <button
                  onClick={() => onMemoryClear(index)}
                  className="px-2 py-1 bg-red-300 text-white rounded text-xs hover:bg-red-400 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemoryPanel;
