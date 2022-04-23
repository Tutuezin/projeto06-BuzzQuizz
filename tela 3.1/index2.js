const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
document.querySelector("#quiz-info").addEventListener("submit", nextPage);

let obj;

function nextPage(event) {
  event.preventDefault();
  const createQuiz = document.querySelector(".create-quiz");
  const title = document.querySelector("#quiz-title").value;
  const url = document.querySelector("#quiz-url").value;
  const qntQuestions = document.querySelector("#quiz-questions").value;
  const levels = document.querySelector("#quiz-levels").value;

  obj = { title, url, qntQuestions, levels };
  console.log(obj);

  createQuiz.classList.add("hidden");
}
