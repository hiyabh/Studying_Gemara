"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/lib/types';
import { playCorrectSound, playIncorrectSound, playStreakSound, initializeAudio } from '@/lib/sounds';
import { cn } from '@/lib/utils';
import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface QuestionCardProps {
  question: Question;
  onAnswer: (index: number) => void;
  selectedAnswer: number | null;
  showExplanation: boolean;
  streak?: number;
}

export function QuestionCard({
  question,
  onAnswer,
  selectedAnswer,
  showExplanation,
  streak = 0,
}: QuestionCardProps) {
  useEffect(() => {
    initializeAudio();
  }, []);

  const handleAnswerClick = useCallback(async (index: number) => {
    const isCorrect = index === question.correctAnswer;
    
    try {
      if (isCorrect) {
        if (streak > 0 && streak % 3 === 0) {
          await playStreakSound();
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FF4500']
          });
        } else {
          await playCorrectSound();
          confetti({
            particleCount: 80,
            spread: 45,
            origin: { y: 0.6 },
            colors: ['#4CAF50', '#8BC34A', '#CDDC39']
          });
        }
      } else {
        await playIncorrectSound();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
    
    onAnswer(index);
  }, [question.correctAnswer, streak, onAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">שאלה</h2>
        <p className="text-xl mb-6">{question.text}</p>
        
        <div className="grid gap-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            
            return (
              <Button
                key={index}
                variant={isSelected ? (isCorrect ? "default" : "destructive") : "outline"}
                className={cn(
                  "text-right p-4 h-auto transition-all duration-300",
                  isSelected && isCorrect && "bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white scale-105 shadow-lg animate-pulse",
                  isSelected && !isCorrect && "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white",
                  showExplanation && isCorrect && !isSelected && "bg-gradient-to-r from-emerald-50 to-green-100 border-emerald-500",
                  "hover:scale-102 hover:shadow-md"
                )}
                onClick={() => handleAnswerClick(index)}
                disabled={showExplanation}
              >
                {option}
              </Button>
            );
          })}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-6 p-4 rounded-lg",
              selectedAnswer === question.correctAnswer 
                ? "bg-gradient-to-r from-emerald-50 to-green-100 border-2 border-emerald-500" 
                : "bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-500"
            )}
          >
            <h3 className={cn(
              "font-bold mb-2 text-lg",
              selectedAnswer === question.correctAnswer 
                ? "text-emerald-700" 
                : "text-orange-700"
            )}>
              {selectedAnswer === question.correctAnswer 
                ? "🎉 כל הכבוד! תשובה נכונה!" 
                : "💪 כמעט! הנה ההסבר:"}
            </h3>
            <p className="text-lg">{question.explanation}</p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}