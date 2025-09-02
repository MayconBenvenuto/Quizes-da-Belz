import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Zap } from 'lucide-react';

interface AnimatedTimerProps {
  timeLeft: number;
  totalTime: number;
  className?: string;
}

export const AnimatedTimer: React.FC<AnimatedTimerProps> = ({ 
  timeLeft, 
  totalTime, 
  className = "" 
}) => {
  const percentage = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 10;
  const isCritical = timeLeft <= 5;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Ícone animado baseado no tempo */}
      <motion.div
        animate={isUrgent ? { 
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.1, 1] 
        } : {}}
        transition={{ 
          duration: 0.5, 
          repeat: isUrgent ? Infinity : 0,
          repeatDelay: 0.5 
        }}
        className="relative"
      >
        {isCritical ? (
          <Zap className={`w-5 h-5 ${isCritical ? 'text-red-500' : isUrgent ? 'text-orange-500' : 'text-gray-600'}`} />
        ) : (
          <Timer className={`w-5 h-5 ${isCritical ? 'text-red-500' : isUrgent ? 'text-orange-500' : 'text-gray-600'}`} />
        )}
      </motion.div>

      {/* Timer circular */}
      <div className="relative">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <motion.path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={isCritical ? "#ef4444" : isUrgent ? "#f97316" : "#3b82f6"}
            strokeWidth="2"
            strokeDasharray={`${percentage}, 100`}
            initial={{ strokeDasharray: "100, 100" }}
            animate={{ strokeDasharray: `${percentage}, 100` }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        
        {/* Número do tempo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={isCritical ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: isCritical ? Infinity : 0 }}
        >
          <span className={`text-sm font-bold ${
            isCritical ? 'text-red-500' : 
            isUrgent ? 'text-orange-500' : 
            'text-gray-700'
          }`}>
            {timeLeft}
          </span>
        </motion.div>
      </div>

      {/* Indicador de velocidade de pontos */}
      <div className="text-xs text-gray-500">
        {timeLeft > 20 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-1 text-green-600"
          >
            <Zap className="w-3 h-3" />
            <span>Bônus Alto!</span>
          </motion.div>
        )}
        {timeLeft <= 20 && timeLeft > 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-1 text-yellow-600"
          >
            <Zap className="w-3 h-3" />
            <span>Bônus Médio</span>
          </motion.div>
        )}
        {timeLeft <= 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-1 text-red-600"
          >
            <Zap className="w-3 h-3" />
            <span>Responda!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
