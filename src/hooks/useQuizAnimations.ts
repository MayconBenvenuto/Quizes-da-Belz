import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterProps {
  end: number;
  duration?: number;
  start?: number;
  incrementOnMount?: boolean;
}

export const useAnimatedCounter = ({ 
  end, 
  duration = 2000, 
  start = 0, 
  incrementOnMount = true 
}: UseAnimatedCounterProps) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!incrementOnMount) return;

    const increment = (end - start) / (duration / 16);
    
    const updateCount = () => {
      if (countRef.current < end) {
        countRef.current += increment;
        setCount(Math.floor(countRef.current));
        rafRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(updateCount);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, start, duration, incrementOnMount]);

  const reset = () => {
    setCount(start);
    countRef.current = start;
  };

  return { count, reset };
};

// Hook para gerenciar animações de entrada/saída das perguntas
export const useQuestionTransition = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextQuestion = () => {
    setDirection(1);
    setCurrentIndex(prev => prev + 1);
  };

  const previousQuestion = () => {
    setDirection(-1);
    setCurrentIndex(prev => prev - 1);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return {
    currentIndex,
    direction,
    nextQuestion,
    previousQuestion,
    variants,
    setCurrentIndex,
  };
};

// Hook para animações de feedback visual
export const useFeedbackAnimation = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const triggerError = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
  };

  return {
    triggerSuccess,
    triggerError,
    showSuccess,
    showError,
  };
};
