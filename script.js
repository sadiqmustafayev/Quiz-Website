const question = [
  {
    question: "Where is the capital of Azerbaijan?",
    answer: [
      { text: "Ganja", correct: false },
      { text: "Baku", correct: true },
      { text: "Gabala", correct: false },
      { text: "Lankaran", correct: false },
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answer: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ]
  },
  {
    question: "When was the Safavid state established?",
    answer: [
      { text: "1455", correct: false },
      { text: "1501", correct: true },
      { text: "1645", correct: false },
      { text: "1748", correct: false },
    ]
  },
  {
    question: "Where is the capital of Turkey?",
    answer: [
      { text: "Ankara", correct: true },
      { text: "Istanbul", correct: false },
      { text: "Izmir", correct: false },
      { text: "Bodrum", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer.correct));
    answerButtonsElement.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
  });
}

function selectAnswer(correct) {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect")
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true
  });
  nextButton.style.display = "block";
  nextButton.innerText = "Next";
  nextButton.addEventListener("click", handleNextButton);
}

function resetState() {
  // Cevap düğmelerini temizle
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerText = "Play Again";
  nextButton.addEventListener("click", startQuiz);
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < question.length){
    showQuestion();
  }else{
    showScore();
  }
}

startQuiz();
