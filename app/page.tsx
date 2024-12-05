"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Trophy, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { studyData } from "@/lib/data";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [progress] = useLocalStorage("userProgress", {
    currentSectionId: studyData.sections[0].id,
    score: 0,
    streak: 0,
    completedSections: [],
  });

  const handleStartLearning = () => {
    router.push("/learn");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto p-8 text-center space-y-6 shadow-lg">
          <motion.h1 
            className="text-4xl font-bold text-blue-900 mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            ברוך הבא, {studyData.student}!
          </motion.h1>
          
          <h2 className="text-xl text-blue-700">{studyData.title}</h2>
          
          <motion.div 
            className="flex justify-center items-center gap-4 p-4 bg-blue-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div className="text-right">
              <p className="text-sm text-blue-600">הניקוד שלך</p>
              <p className="text-2xl font-bold text-blue-900">{progress?.score || 0} נקודות</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="lg" 
              className="w-full text-lg gap-2 h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              onClick={handleStartLearning}
            >
              <BookOpen className="w-6 h-6" />
              בוא נלמד!
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="p-4 text-center">
                <h3 className="font-semibold text-blue-800">סך הכל דפים</h3>
                <p className="text-2xl font-bold text-blue-900">{studyData.sections.length}</p>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="p-4 text-center">
                <h3 className="font-semibold text-blue-800">
                  <Calendar className="w-5 h-5 inline-block ml-1" />
                  מסכת
                </h3>
                <p className="text-xl font-bold text-blue-900">בבא מציעא</p>
              </Card>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}