interface QuizState{
    currentQuizIndex: number | null;
    currentQuestionIndex: number;
    selectedAnswer: string | null;
    score: number;
    isSubmitted: boolean;
}

interface Question{
    question:string,
    options:Array<string>,
    answer:string
}

 interface Quizz{
    "title":string,
    "icon":string,
    questions:Array<Question>
}

 interface Quizzes{
    quizzes: Array<Quizz>
}
let colortheme_switch = document.getElementById("color-changer") as HTMLInputElement;
const root = document.documentElement;
colortheme_switch.addEventListener("click", toggleTheme);
let data:Quizzes;



initTheme();




let current_question = -1;
let choosen_question:string ="";




/*function choose_title_clicked(e:MouseEvent){
    let target = e.target as HTMLButtonElement;
    switch (target.id){
        case "html-button":{
            renderQuestionPage(main,data.quizzes[0],1 );
            break;
        }
        case "css-button":{
            renderQuestionPage(main, data.quizzes[1], 1);
            break;
        }
        case "javascript-button":{
            renderQuestionPage(main, data.quizzes[2], 1);
            break;
        }
        case "accessibility-button":{
            renderQuestionPage(main, data.quizzes[3], 1);
            break;
        }

    }
}


*/




type Theme = "light" | "dark";
function setTheme(theme: Theme){
    const sun_icon = document.getElementById("sun-icon") as HTMLImageElement;
    const moon_icon = document.getElementById("moon-icon") as HTMLImageElement;
    let path_icon_sun_dark = "assets/images/icon-sun-dark.svg";
    let path_icon_moon_dark = "assets/images/icon-moon-dark.svg";
    let path_icon_sun_light = "assets/images/icon-sun-light.svg";
    let path_icon_moon_light = "assets/images/icon-moon-light.svg";
    if (theme === "light"){
        sun_icon.src = path_icon_sun_dark;
        moon_icon.src = path_icon_moon_dark;
    }
    else{
        sun_icon.src = path_icon_sun_light;
        moon_icon.src = path_icon_moon_light;
    }

    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

function getSavedTheme(): Theme | null{
    const saved = localStorage.getItem("theme");

    if (saved === "light" || saved === "dark"){
        return saved;
    }
    return null;
}


function getPreferredTheme(): Theme{
    const savedTheme = getSavedTheme();

    if (savedTheme){
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark").matches
    ? "dark" : "light";
}

function initTheme(): void{
    setTheme(getPreferredTheme());
}
function toggleTheme(): void {
    const currentTheme = root.getAttribute("data-theme");

    if (currentTheme === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}





async function loadJson<T>(url:string):Promise<T>{
    const response = await fetch(url);

    if (!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data:T = await response.json();
    return data;
}

let currentQuestionIndex = 0;
let selectedAnswer: string | null = null;
let isSubmitted = false;
let score = 0;



async function init():Promise<void>{
    let html_button = document.getElementById("html-button") as HTMLButtonElement;
    let css_button = document.getElementById("css-button") as HTMLButtonElement;
    let javascript_button = document.getElementById("javascript-button") as HTMLButtonElement;
    let accessibility_button = document.getElementById("accessibility-button") as HTMLButtonElement;

    html_button.addEventListener("click", (e)=>{
        renderQuestionPage(main, data.quizzes[0]);
    })

    let main = document.querySelector("main") as HTMLDivElement;
    try{
        data = await loadJson<Quizzes>("../data.json");
        console.log(data);
      //  renderQuestionPage(main, data.quizzes[1]);
    }
    catch(error){
        console.log("Error loading JSON:", error);
    }


}
let main = document.querySelector("main") as HTMLDivElement;

function renderQuestionPage(
    container: HTMLElement,
    quiz: Quizz,
): void {
    const question = quiz.questions[currentQuestionIndex];
    const letters = ["A", "B", "C", "D"];
    const progressValue =
        ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

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
        const questionItem = document.createElement("div");
        questionItem.className = "question-item";

        if (selectedAnswer === option) {
            questionItem.classList.add("selected");
        }



        questionItem.dataset.option = option;

        const blockLetter = document.createElement("div");
        blockLetter.className = "block-letter";
        blockLetter.textContent = letters[index] ?? String(index + 1);

        const exactlyQuestion = document.createElement("p");
        exactlyQuestion.className = "exactly-question";
        exactlyQuestion.textContent = option;

        const resultIcon = document.createElement("img");
        resultIcon.className = "hidden result-icon";

        if (isSubmitted) {
            if (option === question.answer) {
                resultIcon.src = "assets/images/icon-correct.svg";
                resultIcon.alt = "correct icon";
                resultIcon.classList.remove("hidden");
            } else if (selectedAnswer === option) {
                resultIcon.src = "assets/images/icon-incorrect.svg";
                resultIcon.alt = "incorrect icon";
                resultIcon.classList.remove("hidden");
            }
        }

        questionItem.addEventListener("click", () => {
            if (isSubmitted) return;

            selectedAnswer = option;
            renderQuestionPage(container, quiz);
        });

        questionItem.append(blockLetter, exactlyQuestion, resultIcon);
        questions.appendChild(questionItem);
        if (isSubmitted) {
            if (option === question.answer) {
                questionItem.classList.add("correct");
                questionItem.querySelector(".block-letter")?.classList.add("correct-block");
            } else if (selectedAnswer === option) {
                questionItem.classList.add("wrong");
                questionItem.querySelector(".block-letter")?.classList.add("wrong-block");
            }
        }
    });

    const submitWrapper = document.createElement("div");
    submitWrapper.className = "submit-button-wrapper";

    const submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    submitButton.textContent = isSubmitted ? "Next Question" : "Submit Answer";

    submitButton.addEventListener("click", () => {
        if (!isSubmitted) {
            if (!selectedAnswer) return;

            isSubmitted = true;

            if (selectedAnswer === question.answer) {
                score++;
            }

            renderQuestionPage(container, quiz);
            return;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex >= quiz.questions.length) {
            return;
        }

        selectedAnswer = null;
        isSubmitted = false;

        renderQuestionPage(container, quiz);
    });

    submitWrapper.appendChild(submitButton);

    questionPage.append(
        topWrapper,
        questionBlock,
        progress,
        questions,
        submitWrapper
    );

    container.appendChild(questionPage);
}




init();

