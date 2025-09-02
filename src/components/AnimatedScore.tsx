import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface AnimatedScoreProps {
  score: number;
  totalPoints: number;
  maxPossiblePoints: number;
  className?: string;
}

export const AnimatedScore: React.FC<AnimatedScoreProps> = ({ 
  score, 
  totalPoints, 
  maxPossiblePoints, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2 
      }}
      className={`bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Sua Pontuação</h3>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="text-6xl font-bold mb-3 text-corporate-blue"
      >
        <CountUp
          start={0}
          end={totalPoints}
          duration={2}
          separator="."
          preserveValue
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-2"
      >
        <div className="text-lg font-semibold text-gray-600">
          pontos
        </div>
        
        <div className="text-sm text-gray-600">
          Você conquistou <strong>{totalPoints}</strong> de{' '}
          <strong>{maxPossiblePoints}</strong> pontos possíveis
        </div>
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>
            <strong>
              <CountUp start={0} end={score} duration={1.5} />
            </strong>{' '}
            acertos de <strong>{Math.floor(maxPossiblePoints / 100)}</strong> perguntas
          </p>
          <p>Pontuação baseada em acertos + velocidade de resposta</p>
          <p className="text-xs text-gray-400 mt-1">
            (50 pontos base + até 50 pontos de bônus por velocidade)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
