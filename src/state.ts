import type {QuizState} from "./types";


export const state: QuizState = {
    currentQuizIndex: null,
    currentQuestionIndex:0,
    selectedAnswer:null,
    score:0,
    isSubmitted:false
};

export function resetQuestionState():void{
    state.selectedAnswer = null;
    state.isSubmitted = false;
}

export function resetQuizState():void{
    state.currentQuestionIndex = 0;
    state.selectedAnswer = null;
    state.score = 0;
    state.isSubmitted = false;
}