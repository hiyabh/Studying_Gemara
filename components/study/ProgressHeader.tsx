"use client";

import { Card } from '@/components/ui/card';
import { Trophy, Book } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProgressHeaderProps {
  score: number;
  streak: number;
  currentSection: number;
  totalSections: number;
}

export function ProgressHeader({ score, streak, currentSection, totalSections }: ProgressHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
          <div className="text-right">
            <p className="text-sm text-blue-600">ניקוד</p>
            <p className="text-xl font-bold">{score}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-center">
          <div className="text-right">
            <p className="text-sm text-blue-600">רצף נכון</p>
            <p className="text-xl font-bold">{streak}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-center">
          <Book className="w-6 h-6 text-blue-500 mr-2" />
          <div className="text-right">
            <p className="text-sm text-blue-600">התקדמות</p>
            <p className="text-xl font-bold">{currentSection}/{totalSections}</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}