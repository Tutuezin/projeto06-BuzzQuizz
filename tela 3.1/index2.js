const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
document.querySelector("#quiz-info").addEventListener("submit", quizInfo);

document
  .querySelector("#questions-info")
  .addEventListener("submit", createLevels);

let questions = parseInt(document.querySelector("#quiz-questions").value);
let levels = document.querySelector("#quiz-levels").value;
let obj, quests = [], answer = []

function quizInfo(event) {
  event.preventDefault();
  const createQuiz = document.querySelector(".create-quiz");
  const createQuestion = document.querySelector(".create-question");
  const title = document.querySelector("#quiz-title").value;
  const url = document.querySelector("#quiz-url").value;
  questions = document.querySelector("#quiz-questions").value;
  levels = document.querySelector("#quiz-levels").value;

  // verifica as informações básicas do quiz
  if (title.length < 20) {
    alert("O mínimo permitido são 20 caracteres!");
  } else if (title.length > 65) {
    alert("O máximo permitido são 65 caracteres!");
  } else if (!url.includes("https://")) {
    alert("Coloque a imagem em fortmato URL!");
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
  console.log(obj);
}

function nextScreen(criadorQuiz, telaPerguntas) {
  criadorQuiz.classList.add("hidden");
  telaPerguntas.classList.remove("hidden");

  for (let i = 1; i < questions; i++) {
      telaPerguntas.innerHTML += `<div class="inputs closed">
  <div class="edit-question">
      <h3>Pergunta ${i+1}</h3>
      <button onclick="openQuestion()">
          <img src="/assets/editQuestion.svg" width="26px" height="23px" alt="">
      </button>
  </div>
</div>`
  }
  telaPerguntas.innerHTML += `<button type="submit" onclick="getQuest()" class="next-levels">Prosseguir pra criar níveis</button>`

}

function getQuest() {
  let forms = document.querySelectorAll(".inputs.quest");
  for (let i = 0; i < forms.length; i++) {
      createQuestions(forms[i]);
      forms[i].style.backgroundColor = 'red'
  }
  obj["questions"] = quests;
}


function getLevels() {
  let forms = document.querySelectorAll(".inputs.quest");
  for (let i = 0; i < forms.length; i++) {
      createQuestions(forms[i]);
      forms[i].style.backgroundColor = 'red'
  }
  answer = [];
  obj["levels"] = quests;
}

function createQuestions(pergunta) {
  const createQuestion = document.querySelector(".create-question");


  let title = pergunta.querySelector("#quiz-question").value;
  let color = pergunta.querySelector("#quiz-color").value;

  answer.push({ text: pergunta.querySelector("#quiz-corret-answer").value, image: pergunta.querySelector("#quiz-corret-url").value, isCorrectAnswer: true });


  for (let j = 0; j < 3; j++) {
      let textin = pergunta.querySelectorAll("#quiz-incorret-answer")[j].value;
      let imagein = pergunta.querySelectorAll("#quiz-incorret-url")[j].value;
      answer.push({ text: textin, image: imagein, isCorrectAnswer: false });
  }
  quests.push({ title: title, color: color, answer })
  answer = [];
}

/* abrir questões TELA 3.2 */
function openQuestion() {
  const closedQuestion = document.querySelector(".inputs.closed");
  closedQuestion.classList.remove("closed");
  closedQuestion.classList.add("open", "quest");
  //Pegar qual foi clicada
  let array = document.querySelectorAll(".inputs.quest").length;
  closedQuestion.innerHTML = `
<div class="question">
                      <h3>Pergunta ${array}</h3>

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

                      <input type="text" id="quiz-incorret-answer"  placeholder="Resposta incorreta 2">
                      <input class="margin" type="text" id="quiz-incorret-url"  placeholder="URL da imagem 2">

                      <input type="text" id="quiz-incorret-answer" placeholder="Resposta incorreta 3">
                      <input type="text" id="quiz-incorret-url"  placeholder="URL da imagem 3">
                  </div> 
`;
}


/* IR PARA A PAGINA DE NIVEIS TELA 3 */
function createLevels(event) {
  event.preventDefault();
  const createQuestion = document.querySelector(".create-question");
  const createLevel = document.querySelector(".create-level");

  const quizQuestion = document.querySelector("#quiz-question").value;
  const quizColor = document.querySelector("#quiz-color").value;
  const quizCorretAnswer = document.querySelector("#quiz-corret-answer").value;
  const quizCorretUrl = document.querySelector("#quiz-corret-url").value;
  const quizIncorretAnswer = document.querySelector(
    "#quiz-incorret-answer"
  ).value;
  const quizIncorretUrl = document.querySelector("#quiz-incorret-url").value;

  // verifica as perguntas do quiz
  if (quizQuestion.length < 20) {
    alert("O mínimo permitido nas perguntas são 20 caracteres!");
  } else if (!quizColor.includes("#")) {
    alert("Cores hexadecimais precisam do '#' antes dos caracteres");
  } else if (quizColor.length > 7) {
    alert("Cores hexadecimais tem no máximo 6 caracteres depois do '#'!");
  } else if (!quizCorretUrl.includes("https://")) {
    alert("Coloque a imagem certa em fortmato URL!");
  } else if (!quizIncorretUrl.includes("https://")) {
    alert("Coloque a imagem errada em fortmato URL!");
  } else {
    createQuestion.classList.add("hidden");
    createLevel.classList.remove("hidden");
  }
}
