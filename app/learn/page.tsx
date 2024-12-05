"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { studyData } from '@/lib/data';
import { ExplanationCard } from '@/components/study/ExplanationCard';
import { QuestionCard } from '@/components/study/QuestionCard';
import { ProgressHeader } from '@/components/study/ProgressHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import type { UserProgress } from '@/lib/types';

export default function LearnPage() {
  const router = useRouter();
  const [progress, setProgress] = useLocalStorage<UserProgress>("userProgress", {
    currentSectionId: studyData.sections[0].id,
    score: 0,
    streak: 0,
    completedSections: [],
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentSection = studyData.sections.find(
    section => section.id === progress.currentSectionId
  );
  
  if (!currentSection) return null;

  const currentSectionIndex = studyData.sections.findIndex(
    section => section.id === progress.currentSectionId
  );

  const handleAnswerSubmit = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === currentSection.questions[0].correctAnswer;
    const newStreak = isCorrect ? progress.streak + 1 : 0;
    
    let bonus = 1;
    Object.entries(studyData.gameSettings.streakBonus).forEach(([streak, multiplier]) => {
      if (newStreak >= parseInt(streak)) {
        bonus = multiplier;
      }
    });

    setProgress(prev => ({
      ...prev,
      score: prev.score + (isCorrect ? 
        studyData.gameSettings.pointsPerCorrectAnswer * bonus : 
        studyData.gameSettings.pointsPerSecondTry),
      streak: newStreak,
      completedSections: [...prev.completedSections, currentSection.id]
    }));
  };

  const handleNextSection = async () => {
    setIsTransitioning(true);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    await new Promise(resolve => setTimeout(resolve, 600));

    const nextIndex = currentSectionIndex + 1;
    if (nextIndex < studyData.sections.length) {
      setProgress(prev => ({
        ...prev,
        currentSectionId: studyData.sections[nextIndex].id
      }));
      setSelectedAnswer(null);
      setShowExplanation(false);
    }

    setIsTransitioning(false);
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={handleHomeClick}
            className="flex items-center gap-2 bg-white hover:bg-blue-50"
          >
            <Home className="w-5 h-5" />
            חזרה לדף הבית
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProgressHeader
                score={progress.score}
                streak={progress.streak}
                currentSection={currentSectionIndex + 1}
                totalSections={studyData.sections.length}
              />

              <Card className="p-6 mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{currentSection.title}</h2>
                <p className="text-xl text-right leading-relaxed">{currentSection.originalText}</p>
              </Card>

              <ExplanationCard explanation={currentSection.explanation} />

              <QuestionCard
                question={currentSection.questions[0]}
                onAnswer={handleAnswerSubmit}
                selectedAnswer={selectedAnswer}
                showExplanation={showExplanation}
                streak={progress.streak}
              />

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex justify-center"
                >
                  <Button
                    size="lg"
                    onClick={handleNextSection}
                    className="w-48 text-lg"
                    disabled={currentSectionIndex === studyData.sections.length - 1}
                  >
                    {currentSectionIndex === studyData.sections.length - 1 
                      ? "סיימת את הלימוד!"
                      : "לשיעור הבא"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}