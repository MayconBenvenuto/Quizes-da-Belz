import React from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

interface QuizCelebrationProps {
  show: boolean;
  score: number;
  totalQuestions: number;
}

export const QuizCelebration: React.FC<QuizCelebrationProps> = ({ 
  show, 
  score, 
  totalQuestions 
}) => {
  if (!show) return null;

  const percentage = (score / totalQuestions) * 100;
  const shouldShowConfetti = percentage >= 70; // Confetti para 70% ou mais

  return (
    <>
      {shouldShowConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#011147', '#0066cc', '#00ff88', '#ffaa00', '#ff0066']}
        />
      )}
      
      {percentage >= 90 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
          <div className="text-6xl animate-bounce">🏆</div>
        </motion.div>
      )}
      
      {percentage >= 80 && percentage < 90 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
          <div className="text-6xl animate-bounce">🥈</div>
        </motion.div>
      )}
      
      {percentage >= 70 && percentage < 80 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
          <div className="text-6xl animate-bounce">🥉</div>
        </motion.div>
      )}
    </>
  );
};
