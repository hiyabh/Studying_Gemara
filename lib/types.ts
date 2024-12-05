export interface TalmudSection {
  id: string;
  title: string;
  originalText: string;
  explanation: string[];
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  currentSectionId: string;
  score: number;
  streak: number;
  completedSections: string[];
}

export interface GameSettings {
  pointsPerCorrectAnswer: number;
  pointsPerSecondTry: number;
  streakBonus: {
    [key: number]: number;
  };
}

export interface StudyData {
  title: string;
  student: string;
  sections: TalmudSection[];
  gameSettings: GameSettings;
}