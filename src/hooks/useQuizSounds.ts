import { useSound } from 'use-sound';

// Tipo para suporte a navegadores antigos
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export const useQuizSounds = () => {
  // Usando sons do sistema ou fallback para URLs de CDN
  const [playCorrect] = useSound('/sounds/correct.mp3', { 
    volume: 0.5,
    // Fallback para som do sistema se o arquivo não existir
    onError: () => {
      // Som alternativo usando Web Audio API
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    }
  });

  const [playIncorrect] = useSound('/sounds/incorrect.mp3', { 
    volume: 0.5,
    onError: () => {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(200, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.4);
    }
  });

  const [playTick] = useSound('/sounds/tick.mp3', { 
    volume: 0.3,
    onError: () => {
      // Som de tick discreto
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    }
  });

  return {
    playCorrect: () => {
      try {
        playCorrect();
      } catch (error) {
        console.log('Fallback de som executado para resposta correta');
      }
    },
    playIncorrect: () => {
      try {
        playIncorrect();
      } catch (error) {
        console.log('Fallback de som executado para resposta incorreta');
      }
    },
    playTick: () => {
      try {
        playTick();
      } catch (error) {
        console.log('Fallback de som executado para tick');
      }
    }
  };
};
