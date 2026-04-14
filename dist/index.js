"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let colortheme_switch = document.getElementById("color-changer");
const root = document.documentElement;
colortheme_switch.addEventListener("click", toggleTheme);
let data;
initTheme();
let current_question = -1;
let choosen_question = "";
function setTheme(theme) {
    const sun_icon = document.getElementById("sun-icon");
    const moon_icon = document.getElementById("moon-icon");
    let path_icon_sun_dark = "assets/images/icon-sun-dark.svg";
    let path_icon_moon_dark = "assets/images/icon-moon-dark.svg";
    let path_icon_sun_light = "assets/images/icon-sun-light.svg";
    let path_icon_moon_light = "assets/images/icon-moon-light.svg";
    if (theme === "light") {
        sun_icon.src = path_icon_sun_dark;
        moon_icon.src = path_icon_moon_dark;
    }
    else {
        sun_icon.src = path_icon_sun_light;
        moon_icon.src = path_icon_moon_light;
    }
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}
function getSavedTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
        return saved;
    }
    return null;
}
function getPreferredTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark").matches
        ? "dark" : "light";
}
function initTheme() {
    setTheme(getPreferredTheme());
}
function toggleTheme() {
    const currentTheme = root.getAttribute("data-theme");
    if (currentTheme === "dark") {
        setTheme("light");
    }
    else {
        setTheme("dark");
    }
}
function loadJson(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = yield response.json();
        return data;
    });
}
let currentQuestionIndex = 0;
let selectedAnswer = null;
let isSubmitted = false;
let score = 0;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let html_button = document.getElementById("html-button");
        let css_button = document.getElementById("css-button");
        let javascript_button = document.getElementById("javascript-button");
        let accessibility_button = document.getElementById("accessibility-button");
        html_button.addEventListener("click", (e) => {
            renderQuestionPage(main, data.quizzes[0]);
        });
        css_button.addEventListener("click", (e) => {
            renderQuestionPage(main, data.quizzes[1]);
        });
        javascript_button.addEventListener("click", (e) => {
            renderQuestionPage(main, data.quizzes[2]);
        });
        accessibility_button.addEventListener("click", (e) => {
            renderQuestionPage(main, data.quizzes[3]);
        });
        let main = document.querySelector("main");
        try {
            data = yield loadJson("../data.json");
            console.log(data);
            //  renderQuestionPage(main, data.quizzes[1]);
        }
        catch (error) {
            console.log("Error loading JSON:", error);
        }
    });
}
let main = document.querySelector("main");
function renderQuestionPage(container, quiz) {
    const question = quiz.questions[currentQuestionIndex];
    const letters = ["A", "B", "C", "D"];
    const progressValue = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
    container.innerHTML = "";
    const questionPage = document.createElement("div");
    questionPage.className = "question-page";
    const topWrapper = document.createElement("div");
    topWrapper.className = "logo-image-switch-wrapper";
    const logoWrapper = document.createElement("div");
    logoWrapper.className = "logo-image-wrapper";
    const logoImg = document.createElement("img");
    logoImg.className = "icon-size";
    logoImg.src = quiz.icon;
    logoImg.alt = `${quiz.title} logo`;
    const logoText = document.createElement("p");
    logoText.className = "logo-text";
    logoText.textContent = quiz.title;
    logoWrapper.append(logoImg, logoText);
    const switchWrapper = document.createElement("div");
    switchWrapper.className = "switch-theme-wrapper";
    const sunIcon = document.createElement("img");
    sunIcon.id = "sun-icon";
    sunIcon.src = "assets/images/icon-sun-dark.svg";
    sunIcon.alt = "sun light";
    const switchLabel = document.createElement("label");
    switchLabel.className = "switch";
    const checkbox = document.createElement("input");
    checkbox.id = "color-changer";
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", toggleTheme);
    const slider = document.createElement("span");
    slider.className = "slider round";
    switchLabel.append(checkbox, slider);
    const moonIcon = document.createElement("img");
    moonIcon.id = "moon-icon";
    moonIcon.src = "assets/images/icon-moon-dark.svg";
    moonIcon.alt = "moon dark";
    switchWrapper.append(sunIcon, switchLabel, moonIcon);
    topWrapper.append(logoWrapper, switchWrapper);
    const questionBlock = document.createElement("div");
    questionBlock.className = "question-block-full";
    const questionNumber = document.createElement("p");
    questionNumber.className = "question-number";
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`;
    const questionTitle = document.createElement("h2");
    questionTitle.className = "question";
    questionTitle.textContent = question.question;
    questionBlock.append(questionNumber, questionTitle);
    const progress = document.createElement("progress");
    progress.id = "progress";
    progress.max = 100;
    progress.value = progressValue;
    const questions = document.createElement("div");
    questions.className = "questions";
    question.options.forEach((option, index) => {
        var _a;
        const questionItem = document.createElement("div");
        questionItem.className = "question-item";
        questionItem.dataset.option = option;
        const blockLetter = document.createElement("div");
        blockLetter.className = "block-letter";
        blockLetter.textContent = (_a = letters[index]) !== null && _a !== void 0 ? _a : String(index + 1);
        const exactlyQuestion = document.createElement("p");
        exactlyQuestion.className = "exactly-question";
        exactlyQuestion.textContent = option;
        const resultIcon = document.createElement("img");
        resultIcon.className = "hidden result-icon";
        if (!isSubmitted && selectedAnswer === option) {
            questionItem.classList.add("selected");
        }
        if (isSubmitted) {
            if (selectedAnswer === question.answer) {
                if (option === question.answer) {
                    questionItem.classList.add("correct");
                    blockLetter.classList.add("correct-block");
                    resultIcon.src = "assets/images/icon-correct.svg";
                    resultIcon.alt = "correct icon";
                    resultIcon.classList.remove("hidden");
                }
            }
            else {
                if (selectedAnswer === option) {
                    questionItem.classList.add("wrong");
                    blockLetter.classList.add("wrong-block");
                    resultIcon.src = "assets/images/icon-incorrect.svg";
                    resultIcon.alt = "incorrect icon";
                    resultIcon.classList.remove("hidden");
                }
                else if (option === question.answer) {
                    resultIcon.src = "assets/images/icon-correct.svg";
                    resultIcon.alt = "correct icon";
                    resultIcon.classList.remove("hidden");
                }
            }
        }
        questionItem.addEventListener("click", () => {
            if (isSubmitted)
                return;
            selectedAnswer = option;
            renderQuestionPage(container, quiz);
        });
        questionItem.append(blockLetter, exactlyQuestion, resultIcon);
        questions.appendChild(questionItem);
    });
    const submitWrapper = document.createElement("div");
    submitWrapper.className = "submit-button-wrapper";
    const submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    submitButton.textContent = isSubmitted ? "Next Question" : "Submit Answer";
    submitButton.addEventListener("click", () => {
        if (!isSubmitted) {
            if (!selectedAnswer)
                return;
            isSubmitted = true;
            if (selectedAnswer === question.answer) {
                score++;
            }
            renderQuestionPage(container, quiz);
            return;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex >= quiz.questions.length) {
            renderResultPage(container, quiz, score);
            return;
        }
        selectedAnswer = null;
        isSubmitted = false;
        renderQuestionPage(container, quiz);
    });
    submitWrapper.appendChild(submitButton);
    questionBlock.append(progress);
    questionPage.append(topWrapper, questionBlock, questions, submitWrapper);
    //
    container.appendChild(questionPage);
}
function renderResultPage(container, quiz, score) {
    container.innerHTML = "";
    const resultPage = document.createElement("div");
    resultPage.className = "result-page";
    const topWrapper = document.createElement("div");
    topWrapper.className = "logo-image-switch-wrapper";
    const logoWrapper = document.createElement("div");
    logoWrapper.className = "logo-image-wrapper";
    const logoImg = document.createElement("img");
    logoImg.className = "accessibility-background icon-size";
    logoImg.src = quiz.icon;
    logoImg.alt = `${quiz.title} logo`;
    const logoText = document.createElement("p");
    logoText.className = "logo-text";
    logoText.textContent = quiz.title;
    logoWrapper.append(logoImg, logoText);
    const switchWrapper = document.createElement("div");
    switchWrapper.className = "switch-theme-wrapper";
    const sunIcon = document.createElement("img");
    sunIcon.id = "sun-icon";
    sunIcon.src = "assets/images/icon-sun-dark.svg";
    sunIcon.alt = "sun light";
    const switchLabel = document.createElement("label");
    switchLabel.className = "switch";
    const checkbox = document.createElement("input");
    checkbox.id = "color-changer";
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", toggleTheme);
    const slider = document.createElement("span");
    slider.className = "slider round";
    switchLabel.append(checkbox, slider);
    const moonIcon = document.createElement("img");
    moonIcon.id = "moon-icon";
    moonIcon.src = "assets/images/icon-moon-dark.svg";
    moonIcon.alt = "moon dark";
    switchWrapper.append(sunIcon, switchLabel, moonIcon);
    topWrapper.append(logoWrapper, switchWrapper);
    const completedHeader = document.createElement("h2");
    completedHeader.className = "completed-header";
    completedHeader.innerHTML = `Quiz completed <span class="bold">You scored...</span>`;
    const resultBlock = document.createElement("div");
    resultBlock.className = "result-block";
    const resultBlockHeader = document.createElement("div");
    resultBlockHeader.className = "result-block-header";
    const resultIcon = document.createElement("img");
    resultIcon.src = quiz.icon;
    resultIcon.alt = `${quiz.title} icon`;
    const themeName = document.createElement("p");
    themeName.className = "theme-name";
    themeName.textContent = quiz.title;
    resultBlockHeader.append(resultIcon, themeName);
    const scoreText = document.createElement("p");
    scoreText.className = "score";
    scoreText.textContent = String(score);
    const outOfText = document.createElement("p");
    outOfText.className = "out-of";
    outOfText.textContent = `out of ${quiz.questions.length}`;
    resultBlock.append(resultBlockHeader, scoreText, outOfText);
    const playAgainButton = document.createElement("button");
    playAgainButton.className = "play-again";
    playAgainButton.textContent = "Play Again";
    playAgainButton.addEventListener("click", () => {
        currentQuestionIndex = 0;
        selectedAnswer = null;
        isSubmitted = false;
        score = 0;
        container.innerHTML = "";
        location.reload();
    });
    resultPage.append(topWrapper, completedHeader, resultBlock, playAgainButton);
    container.appendChild(resultPage);
}
init();
