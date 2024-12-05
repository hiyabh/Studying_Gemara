"use client";

// Create oscillator-based sounds instead of loading MP3 files
const createOscillatorSound = (
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine'
) => {
  if (typeof window === 'undefined') return;
  
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
};

export const playCorrectSound = () => {
  // Happy chord
  createOscillatorSound(440, 0.15, 'sine'); // A4
  setTimeout(() => createOscillatorSound(554.37, 0.15, 'sine'), 50); // C#5
  setTimeout(() => createOscillatorSound(659.25, 0.15, 'sine'), 100); // E5
};

export const playIncorrectSound = () => {
  // Gentle low tone
  createOscillatorSound(220, 0.2, 'sine'); // A3
};

export const playStreakSound = () => {
  // Rising arpeggio
  createOscillatorSound(440, 0.1, 'sine'); // A4
  setTimeout(() => createOscillatorSound(554.37, 0.1, 'sine'), 100); // C#5
  setTimeout(() => createOscillatorSound(659.25, 0.1, 'sine'), 200); // E5
  setTimeout(() => createOscillatorSound(880, 0.2, 'sine'), 300); // A5
};

export const initializeAudio = async () => {
  // No initialization needed for oscillator-based sounds
};