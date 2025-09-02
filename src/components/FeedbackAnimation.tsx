import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface FeedbackAnimationProps {
  showSuccess: boolean;
  showError: boolean;
}

export const FeedbackAnimation: React.FC<FeedbackAnimationProps> = ({ 
  showSuccess, 
  showError 
}) => {
  return (
    <>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 0.6 }}
              className="bg-green-500 text-white rounded-full p-4 shadow-lg"
            >
              <CheckCircle className="w-8 h-8" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              animate={{ 
                x: [-10, 10, -10, 10, 0],
              }}
              transition={{ duration: 0.5 }}
              className="bg-red-500 text-white rounded-full p-4 shadow-lg"
            >
              <XCircle className="w-8 h-8" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
