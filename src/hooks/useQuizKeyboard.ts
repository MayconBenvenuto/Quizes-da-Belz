import { useHotkeys } from 'react-hotkeys-hook';
import { useCallback } from 'react';

interface UseQuizKeyboardProps {
  options: string[];
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const useQuizKeyboard = ({ 
  options, 
  onAnswer, 
  disabled = false 
}: UseQuizKeyboardProps) => {
  
  const handleKeyAnswer = useCallback((index: number) => {
    if (disabled || !options[index]) return;
    onAnswer(options[index]);
  }, [options, onAnswer, disabled]);

  // Teclas 1-4 para as opções
  useHotkeys('1', () => handleKeyAnswer(0), { enabled: !disabled });
  useHotkeys('2', () => handleKeyAnswer(1), { enabled: !disabled });
  useHotkeys('3', () => handleKeyAnswer(2), { enabled: !disabled });
  useHotkeys('4', () => handleKeyAnswer(3), { enabled: !disabled });

  // Teclas A-D para as opções (alternativa)
  useHotkeys('a', () => handleKeyAnswer(0), { enabled: !disabled });
  useHotkeys('b', () => handleKeyAnswer(1), { enabled: !disabled });
  useHotkeys('c', () => handleKeyAnswer(2), { enabled: !disabled });
  useHotkeys('d', () => handleKeyAnswer(3), { enabled: !disabled });

  return {
    getKeyLabel: (index: number) => {
      const keyLabels = ['1/A', '2/B', '3/C', '4/D'];
      return keyLabels[index] || '';
    }
  };
};
