const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
document.querySelector("#quiz-info").addEventListener("submit", quizInfo);
let questions = document.querySelector("#quiz-questions").value;
let obj;

function quizInfo(event) {
  event.preventDefault();
  const createQuiz = document.querySelector(".create-quiz");
  const createQuestion = document.querySelector(".create-question");
  const title = document.querySelector("#quiz-title").value;
  const url = document.querySelector("#quiz-url").value;
  questions = document.querySelector("#quiz-questions").value;
  const levels = document.querySelector("#quiz-levels").value;

  console.log(title.length);

  // verifica as informações básicas do quiz ### FALTA CHECAR URL ###
  if (title.length < 25) {
    alert("O mínimo permitido são 20 caracteres!");
  } else if (title.length > 65) {
    alert("O máximo permitido são 65 caracteres!");
  } else if (parseInt(questions) < 3) {
    alert("O mínimo permitido são 3 perguntas!");
  } else if (isNaN(questions)) {
    alert("Por favor, digite a quantidade de questões em números!");
  } else if (parseInt(levels) < 2) {
    alert("O mínimo permitido são 2 níveis!");
  } else if (isNaN(levels)) {
    alert("Por favor, digite a quantidade de níveis em números!");
  } else {
    nextScreen(createQuiz, createQuestion);
  }

  obj = { title, url };
  //obj["questions"] = ["dsadsad", "sadas", "dsadasd"];
  console.log(obj);
}

function nextScreen(x, y) {
  x.classList.add("hidden");
  y.classList.remove("hidden");
}

function createQuestions() {
  const createQuestion = document.querySelector(".create-question");
  let text = [],
    image = [],
    textin,
    imagein;

  for (let i = 0; i < 3; i++) {
    let title = document.querySelectorAll("#quiz-question")[i].value;
    let color = document.querySelectorAll("#quiz-color")[i].value;

    text.push(document.querySelector("#quiz-corret-answer").value);
    image.push(document.querySelector("#quiz-corret-url").value);

    for (let j = 0; j < 3; j++) {
      textin = document.querySelectorAll("#quiz-incorret-answer")[j].value;
      imagein = document.querySelectorAll("#quiz-incorret-url")[j].value;
      text.push(textin);
      image.push(imagein);
    }
  }
  obj["questions"] += { title };

  console.log(text);
  console.log(image);
}
