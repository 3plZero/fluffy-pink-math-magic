
import { useState, useCallback } from 'react';

export const useSimpleCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
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

      // Clear
      if (input === 'C') {
        setDisplay('0');
        setEquation('');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(false);
        return;
      }

      // Backspace
      if (input === '⌫') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
        return;
      }

      const currentValue = parseFloat(display);

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
  }, [display, previousValue, operation, waitingForNewValue, calculateResult]);

  return {
    display,
    equation,
    isError,
    handleInput
  };
};
