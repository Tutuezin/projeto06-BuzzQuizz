const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
document.querySelector("#quiz-info").addEventListener("submit", quizInfo);
document
  .querySelector("#questions-info")
  .addEventListener("submit", openQuestion);

let questions = parseInt(document.querySelector("#quiz-questions").value);
let obj;

function quizInfo(event) {
  event.preventDefault();
  const createQuiz = document.querySelector(".create-quiz");
  const createQuestion = document.querySelector(".create-question");
  const title = document.querySelector("#quiz-title").value;
  const url = document.querySelector("#quiz-url").value;
  questions = document.querySelector("#quiz-questions").value;
  const levels = document.querySelector("#quiz-levels").value;

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
  let answers = [],
    objeto = [],
    textin,
    imagein;

  for (let i = 0; i < 3; i++) {
    let title = document.querySelectorAll("#quiz-question")[i].value;
    let color = document.querySelectorAll("#quiz-color")[i].value;

    answers.push({text:document.querySelector("#quiz-corret-answer").value, image:document.querySelector("#quiz-corret-url").value, isCorrectAnswer:true});
    

    for (let j = 0; j < 3; j++) {
      textin = document.querySelectorAll("#quiz-incorret-answer")[j].value;
      imagein = document.querySelectorAll("#quiz-incorret-url")[j].value;
      answers.push({ text: textin, image: imagein , isCorrectAnswer:false});
    }
    objeto.push({title: title, color:color, answers})
  }
  console.log(objeto)
}

function openQuestion(event) {
  event.preventDefault();
  const closedQuestion = document.querySelector(".inputs.closed");
  closedQuestion.classList.remove("closed");
  closedQuestion.classList.add("open");
  console.log(closedQuestion);
  closedQuestion.innerHTML = "";
  closedQuestion.innerHTML = `
  <div class="question">
                        <h3>Pergunta 1</h3>

                        <input type="text" id="quiz-question" required placeholder="Texto da pergunta">
                        <input type="text" id="quiz-color" required placeholder="Cor de fundo da pergunta">
                    </div>

                    <div class="corret-answer">
                        <h3>Resposta correta</h3>

                        <input type="text" id="quiz-corret-answer" required placeholder="Resposta correta">
                        <input type="text" id="quiz-corret-url" required placeholder="URL da imagem">
                    </div>

                    <div class="incorret-answer">
                        <h3>Respostas incorretas</h3>

                        <input type="text" id="quiz-incorret-answer" required placeholder="Resposta incorreta 1">
                        <input class="margin" type="text" id="quiz-incorret-url" required placeholder="URL da imagem 1">

                        <input type="text" id="quiz-incorret-answer" required placeholder="Resposta incorreta 2">
                        <input class="margin" type="text" id="quiz-incorret-url" required placeholder="URL da imagem 2">

                        <input type="text" id="quiz-incorret-answer" required placeholder="Resposta incorreta 3">
                        <input type="text" id="quiz-incorret-url" required placeholder="URL da imagem 3">
                    </div> 
  `;
}
