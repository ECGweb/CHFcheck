const questions = [
    { question: "앉아 있거나 누워 있을 때도 숨이 참", id: "q1", oScore: 3 },
    { question: "2~3일 내에 체중이 2Kg이상 증가함", id: "q2", oScore: 2 },
    { question: "발, 발목, 다리, 복부의 부종이 증가함", id: "q3", oScore: 1 },
    { question: "비정상적인 피로나 약함을 느낌", id: "q4", oScore: 1 },
    { question: "기침이 계속됨", id: "q5", oScore: 1 },
    { question: "어지러움", id: "q6", oScore: 1 },
    { question: "가슴 두근거림", id: "q7", oScore: 1 },
    { question: "가슴 통증", id: "q8", oScore: 3 },
];

const additionalQuestions = [
    { question: "나트륨 2000mg/일이하로 드셨나요?", id: "aq1"},
    { question: "물 종류 1.5~2L/일이하로 드셨나요?", id: "aq2"},
    { question: "오늘 약을 복용하셨나요?", id: "aq3"},
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submitButton");
const resultElement = document.getElementById("result");
let additionalQuestionsDisplayed = false;

questions.forEach(question => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionTextDiv = document.createElement("div");
    questionTextDiv.classList.add("question-text");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionTextDiv.appendChild(questionText);
    questionDiv.appendChild(questionTextDiv);

    const checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("checkbox");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.id = question.id;
    checkboxInput.name = question.id;
    checkboxInput.value = question.oScore; // 점수를 value 속성에 저장

    const checkboxLabel = document.createElement("label");
    checkboxLabel.htmlFor = question.id;
    checkboxLabel.textContent = "";

    checkboxDiv.appendChild(checkboxInput);
    checkboxDiv.appendChild(checkboxLabel);
    questionDiv.appendChild(checkboxDiv);

    questionsElement.appendChild(questionDiv);
});

function handleButtonClick(questionId, selectedValue) {
    const allButtons = document.querySelectorAll(`.question button[name="${questionId}"]`);
    allButtons.forEach(button => {
        button.classList.remove("selected");
    });

    const currentButton = document.querySelector(`.question button[name="${questionId}"][value="${selectedValue}"]`);
    currentButton.classList.add("selected");
}

submitButton.addEventListener("click", () => {
    let totalScore = 0;
    const answers = {};
    const imageContainer = document.getElementById("imageContainer");
    const resultImage = document.getElementById("resultImage");
    const additionalQuestionsElement = document.getElementById("additionalQuestions");

    questions.forEach(question => {
        const checkbox = document.getElementById(question.id);
        answers[question.id] = checkbox.checked;
        if (checkbox.checked) {
            totalScore += Number(question.oScore); // 점수를 숫자로 변환하여 더함
        }
    });

    resultElement.textContent = `총점: ${totalScore}점`;

    // 이미지 표시 및 스크롤 이동
    if (totalScore < 4) {
        resultImage.src = "img/green.jpg";
        resultElement.textContent = "정상";
        imageContainer.style.display = "block";

        // 추가 질문 표시
        if (!additionalQuestionsDisplayed) {
            additionalQuestionsDisplayed = true;
            displayAdditionalQuestions();
            resultImage.onload = function () { // 이미지 로딩 후 추가 질문으로 스크롤
                additionalQuestionsElement.scrollIntoView({ behavior: "smooth" });
            };
        }
    } 
    else if (totalScore < 8) {
        resultImage.src = "img/yellow.jpg";
        resultElement.textContent = "주의";
        imageContainer.style.display = "block";

        // 추가 질문 표시
        if (!additionalQuestionsDisplayed) {
            additionalQuestionsDisplayed = true;
            displayAdditionalQuestions();
            resultImage.onload = function () { // 이미지 로딩 후 추가 질문으로 스크롤
                additionalQuestionsElement.scrollIntoView({ behavior: "smooth" });
            };
        }
    } 
    else {
        resultImage.src = "img/red.jpg";
        resultElement.textContent = "위험 (응급실 또는 외래 방문) ";
        imageContainer.style.display = "block";

        // 추가 질문 제거
        clearAdditionalQuestions();
        additionalQuestionsDisplayed = false;
        resultImage.onload = function () { // 이미지 로딩 후 결과로 스크롤
            resultElement.scrollIntoView({ behavior: "smooth" });
        };
    }
});

function displayAdditionalQuestions() {
    const additionalQuestionsElement = document.getElementById("additionalQuestions");
    additionalQuestionsElement.style.display = "block";

    additionalQuestions.forEach(question => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionTextDiv = document.createElement("div");
        questionTextDiv.classList.add("question-text");
        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionTextDiv.appendChild(questionText);
        questionDiv.appendChild(questionTextDiv);

        const checkboxDiv = document.createElement("div");
        checkboxDiv.classList.add("checkbox");

        const checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.id = question.id;
        checkboxInput.name = question.id;

        const checkboxLabel = document.createElement("label");
        checkboxLabel.htmlFor = question.id;
        checkboxLabel.textContent = ""; // Empty label for better alignment

        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(checkboxLabel);
        questionDiv.appendChild(checkboxDiv);

        additionalQuestionsElement.appendChild(questionDiv);
    });
}

function clearAdditionalQuestions() {
    const additionalQuestionsElement = document.getElementById("additionalQuestions");
    additionalQuestionsElement.style.display = "none";
    additionalQuestionsElement.innerHTML = "";
}