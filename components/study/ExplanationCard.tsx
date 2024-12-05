"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface ExplanationCardProps {
  explanation: string[];
}

export function ExplanationCard({ explanation }: ExplanationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 mb-6 bg-blue-50">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">הסבר</h2>
        {explanation.map((paragraph, index) => (
          <p key={index} className="text-lg text-right leading-relaxed mb-2">
            {paragraph}
          </p>
        ))}
      </Card>
    </motion.div>
  );
}