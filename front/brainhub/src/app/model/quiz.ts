export interface Quiz {
  quiz: string;
  questions: Question[];
}

export interface Question {
  id: number;
  texte_question: string;
  choix: string[];
  bonne_reponse: string;
}

export interface QuizResponse {
  quizes: Quiz[];
  quiz: Quiz;
}
