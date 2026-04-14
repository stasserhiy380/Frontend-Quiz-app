

export interface QuizState{
    currentQuizIndex: number | null;
    currentQuestionIndex: number;
    selectedAnswer: string | null;
    score: number;
    isSubmitted: boolean;
}