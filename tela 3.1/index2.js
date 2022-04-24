const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
document.querySelector("#quiz-info").addEventListener("submit", quizInfo);

let obj;

function quizInfo(event) {
  event.preventDefault();
  const createQuiz = document.querySelector(".create-quiz");
  const createQuestion = document.querySelector(".create-question");
  const title = document.querySelector("#quiz-title").value;
  const url = document.querySelector("#quiz-url").value;
  const qntQuestions = document.querySelector("#quiz-questions").value;
  const levels = document.querySelector("#quiz-levels").value;

  console.log(title.length);

  // verifica as informações básicas do quiz ### FALTA CHECAR URL ###
  if (title.length < 25) {
    alert("O mínimo permitido são 20 caracteres!");
  } else if (title.length > 65) {
    alert("O máximo permitido são 65 caracteres!");
  } else if (parseInt(qntQuestions) < 3) {
    alert("O mínimo permitido são 3 perguntas!");
  } else if (isNaN(qntQuestions)) {
    alert("Por favor, digite a quantidade de questões em números!");
  } else if (parseInt(levels) < 2) {
    alert("O mínimo permitido são 2 níveis!");
  } else if (isNaN(levels)) {
    alert("Por favor, digite a quantidade de níveis em números!");
  } else {
    nextScreen(createQuiz, createQuestion);
  }

  obj = { title, url, qntQuestions, levels };
  obj["questions"] = ["dsadsad", "sadas", "dsadasd"];
  obj1;
  console.log(obj);
}

function nextScreen(x, y) {
  x.classList.add("hidden");
  y.classList.remove("hidden");
}
