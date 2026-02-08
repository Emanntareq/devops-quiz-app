let questions = [];
let currentQuestions = [];
let currentIndex = 0;

const topicSelect = document.getElementById("topicSelect");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");

// Load questions from JSON
fetch("data/questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadTopics();
  })
  .catch(error => console.log("Error loading questions:", error));


// Load topics into dropdown
function loadTopics() {
  const topics = [...new Set(questions.map(q => q.topic))];

  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}


// When topic selected
topicSelect.addEventListener("change", () => {
  const selectedTopic = topicSelect.value;
  currentQuestions = questions.filter(q => q.topic === selectedTopic);
  currentIndex = 0;
  showQuestion();
});


// Display question
function showQuestion() {
  feedbackEl.textContent = "";
  optionsEl.innerHTML = "";

  if (currentQuestions.length === 0) return;

  const q = currentQuestions[currentIndex];
  questionEl.textContent = q.question;

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => checkAnswer(index, q);

    optionsEl.appendChild(btn);
  });
}


// Check answer
function checkAnswer(selectedIndex, question) {
  if (selectedIndex === question.answerIndex) {
    feedbackEl.textContent = "Correct! " + question.explanation;
  } else {
    feedbackEl.textContent = "Wrong! " + question.explanation;
  }
}
