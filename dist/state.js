"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
exports.resetQuestionState = resetQuestionState;
exports.resetQuizState = resetQuizState;
exports.state = {
    currentQuizIndex: null,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    isSubmitted: false
};
function resetQuestionState() {
    exports.state.selectedAnswer = null;
    exports.state.isSubmitted = false;
}
function resetQuizState() {
    exports.state.currentQuestionIndex = 0;
    exports.state.selectedAnswer = null;
    exports.state.score = 0;
    exports.state.isSubmitted = false;
}
