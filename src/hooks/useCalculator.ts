
import { useState, useCallback } from 'react';

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [memory, setMemory] = useState<number[]>([]);
  const [isError, setIsError] = useState(false);

  const calculateResult = useCallback((firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        if (secondValue === 0) throw new Error('Division by zero');
        return firstValue / secondValue;
      case '%':
        return firstValue % secondValue;
      default:
        return secondValue;
    }
  }, []);

  const performAdvancedOperation = useCallback((value: number, operation: string): number => {
    switch (operation) {
      case 'sin':
        return Math.sin(value * Math.PI / 180);
      case 'cos':
        return Math.cos(value * Math.PI / 180);
      case 'tan':
        return Math.tan(value * Math.PI / 180);
      case 'log':
        if (value <= 0) throw new Error('Invalid input for log');
        return Math.log10(value);
      case 'ln':
        if (value <= 0) throw new Error('Invalid input for ln');
        return Math.log(value);
      case '√':
        if (value < 0) throw new Error('Invalid input for sqrt');
        return Math.sqrt(value);
      case 'x²':
        return value * value;
      case 'x³':
        return value * value * value;
      case '1/x':
        if (value === 0) throw new Error('Division by zero');
        return 1 / value;
      case '!':
        if (value < 0 || !Number.isInteger(value)) throw new Error('Invalid input for factorial');
        let result = 1;
        for (let i = 2; i <= value; i++) {
          result *= i;
        }
        return result;
      case '±':
        return -value;
      default:
        return value;
    }
  }, []);

  const handleInput = useCallback((input: string) => {
    setIsError(false);

    try {
      // Numbers
      if (/[0-9]/.test(input)) {
        if (waitingForNewValue) {
          setDisplay(input);
          setWaitingForNewValue(false);
        } else {
          setDisplay(display === '0' ? input : display + input);
        }
        return;
      }

      // Decimal point
      if (input === '.') {
        if (waitingForNewValue) {
          setDisplay('0.');
          setWaitingForNewValue(false);
        } else if (!display.includes('.')) {
          setDisplay(display + '.');
        }
        return;
      }

      // Double zero
      if (input === '00') {
        if (waitingForNewValue) {
          setDisplay('00');
          setWaitingForNewValue(false);
        } else if (display !== '0') {
          setDisplay(display + '00');
        }
        return;
      }

      // Clear functions
      if (input === 'C') {
        setDisplay('0');
        return;
      }

      if (input === 'AC') {
        setDisplay('0');
        setEquation('');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(false);
        return;
      }

      if (input === '⌫') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
        return;
      }

      // Constants
      if (input === 'π') {
        setDisplay(Math.PI.toString());
        setWaitingForNewValue(true);
        return;
      }

      const currentValue = parseFloat(display);

      // Advanced operations (single operand)
      if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'x³', '1/x', '!', '±'].includes(input)) {
        const result = performAdvancedOperation(currentValue, input);
        setDisplay(result.toString());
        setEquation(`${input}(${currentValue}) = ${result}`);
        setWaitingForNewValue(true);
        return;
      }

      // Memory operations
      if (input === 'MS') {
        setMemory(prev => [...prev, currentValue]);
        return;
      }

      if (input === 'MC') {
        setMemory([]);
        return;
      }

      if (input === 'MR') {
        if (memory.length > 0) {
          setDisplay(memory[memory.length - 1].toString());
          setWaitingForNewValue(true);
        }
        return;
      }

      if (input === 'M+') {
        if (memory.length > 0) {
          const newMemory = [...memory];
          newMemory[newMemory.length - 1] += currentValue;
          setMemory(newMemory);
        }
        return;
      }

      if (input === 'M-') {
        if (memory.length > 0) {
          const newMemory = [...memory];
          newMemory[newMemory.length - 1] -= currentValue;
          setMemory(newMemory);
        }
        return;
      }

      // Parentheses (simplified implementation)
      if (input === '(' || input === ')') {
        // For now, just add to equation display
        setEquation(prev => prev + input);
        return;
      }

      // Basic operations
      if (['+', '-', '×', '÷', '%'].includes(input)) {
        if (previousValue !== null && operation && !waitingForNewValue) {
          const result = calculateResult(previousValue, currentValue, operation);
          setDisplay(result.toString());
          setEquation(`${previousValue} ${operation} ${currentValue} = ${result}`);
          setPreviousValue(result);
        } else {
          setPreviousValue(currentValue);
        }
        setOperation(input);
        setWaitingForNewValue(true);
        return;
      }

      // Equals
      if (input === '=') {
        if (previousValue !== null && operation) {
          const result = calculateResult(previousValue, currentValue, operation);
          setDisplay(result.toString());
          setEquation(`${previousValue} ${operation} ${currentValue} = ${result}`);
          setPreviousValue(null);
          setOperation(null);
          setWaitingForNewValue(true);
        }
        return;
      }

    } catch (error) {
      setDisplay('Error');
      setIsError(true);
      setEquation('');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  }, [display, equation, previousValue, operation, waitingForNewValue, memory, calculateResult, performAdvancedOperation]);

  const memoryRecall = useCallback((index: number) => {
    if (memory[index] !== undefined) {
      setDisplay(memory[index].toString());
      setWaitingForNewValue(true);
    }
  }, [memory]);

  const memoryClear = useCallback((index: number) => {
    setMemory(prev => prev.filter((_, i) => i !== index));
  }, []);

  const memoryAdd = useCallback((value: number) => {
    setMemory(prev => [...prev, value]);
  }, []);

  const memorySubtract = useCallback((value: number) => {
    setMemory(prev => [...prev, -value]);
  }, []);

  return {
    display,
    equation,
    isError,
    memory,
    handleInput,
    memoryRecall,
    memoryClear,
    memoryAdd,
    memorySubtract
  };
};
