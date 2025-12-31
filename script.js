const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Quiz data (fixed)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const questionDiv = document.createElement("div");
    questionDiv.appendChild(
      document.createTextNode(questions[i].question)
    );

    for (let j = 0; j < questions[i].choices.length; j++) {
      const choice = questions[i].choices[j];

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // Restore checked attribute (IMPORTANT)
      if (userAnswers[i] === choice) {
        radio.setAttribute("checked", "true");
      }

      radio.addEventListener("click", () => {
        // Remove checked attribute from same group
        document
          .querySelectorAll(`input[name="question-${i}"]`)
          .forEach((el) => el.removeAttribute("checked"));

        radio.setAttribute("checked", "true");

        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      questionDiv.appendChild(radio);
      questionDiv.appendChild(document.createTextNode(choice));
    }

    questionsElement.appendChild(questionDiv);
  }
}

// Submit quiz
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Restore score after reload
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// Initial render
renderQuestions();
