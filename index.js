const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
const quizBox = document.querySelector(".boxes-quizz");
const questions = document.querySelector(".container");

let quizzes;
let boxquiz;
let quizClickada;
let allQuest = document.querySelectorAll(".choices");
let quizId;
let score = 0;

function getQuizz() {
  axios.get(API).then((e) => {
    quizzes = e.data;
    writeQuizz();
  });
}

// Function renderiza as quizz
function writeQuizz() {
  quizBox.innerHTML = "";
  quizzes.forEach((element) => {
    quizBox.innerHTML += `<div class="box-quiz" id="${element.id}">
        <img class="gradient"  width="340px" height="181px" src="${element.image}" alt="">
        <div class="sombra">
        <span class="title">${element.title}</span>
        </div>
    </div>`;
  });
  getOneQuiz();
}

// Function devolver id do quizz clicado

function getOneQuiz() {
  boxquiz = document.querySelectorAll(".box-quiz");
  boxquiz.forEach((e) => {
    e.addEventListener("click", function () {
      console.log(e.id);
      verifyId(e);
    });
    0;
  });
}

function verifyId(x) {
  quizzes.forEach((e) => {
    if (x.id == e.id) {
      console.log(e.title);
      quizClickada = e;
      changeScreen();
      openQuiz();
    }
  });
}

function changeScreen() {
  document.querySelector(".one").classList.toggle("hidden");
  document.querySelector(".two").classList.toggle("hidden");
}
getQuizz();

function openQuiz() {
  const banner = document.querySelector("#banner");
  const bannerTitle = document.querySelector("#bannerTitle");

  axios.get(`${API}/${quizClickada.id}`).then((e) => {
    quizId = e.data;
    banner.src = quizId.image;
    bannerTitle.innerHTML = quizId.title;
    console.log(quizId);
  });
  writeQuestions();
}

function writeQuestions() {
  topFunction();

  for (let i = 0; i < quizClickada.questions.length; i++) {
    questions.innerHTML += ` <div class="quiz">
                                <header class="top-quiz" style="background-color: ${quizClickada.questions[i].color}">
                                    <h4>${quizClickada.questions[i].title}</h4>
                                </header>
                             <div class="choices black">
                             </div>
                             </div>
                            `;
    let a = quizClickada.questions[i].answers.sort(comparador);
    for (let j = 0; j < quizClickada.questions[i].answers.length; j++) {
      let choice = document.querySelectorAll(".choices");
      choice[i].innerHTML += `<div class="choice-info ${a[j].isCorrectAnswer}" >
                                <img src="${a[j].image}" alt="img" width="100%" height="175px">
                                <p>${a[j].text}</p>
                            </div>
                            `;
    }
  }
  choiceEvent();
}

function comparador() {
  return Math.random() - 0.5;
}

function reiniciar() {
  score = 0;
  questions.innerHTML = "";
  writeQuestions();
  topFunction();
}

// Volta pro topo da tela.
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function choiceEvent() {
  const escolha = document.querySelectorAll(".choice-info");
  escolha.forEach((e) => {
    e.addEventListener("click", () => {
      effectChoice(e);
      e.parentElement.classList.remove("black");
      if (!document.querySelector(".black")) {
        console.log("testeas");
        writeScore();
      }
    });
  });
}

function effectChoice(x) {
  const questao = x.parentElement; // Pega o elemento pai da opção escolhida
  questao.style.pointerEvents = "none";
  const questoes = [...questao.children]; // pega todas as escolhas dentro do elemento pai
  if (x.classList.contains("true")) {
    score++;
  } for (let i = 0; i < questoes.length; i++) {
    if (x !== questoes[i]) {
      questoes[i].classList.add("not");
    }
  }
  nextChoice(questao);
}

function nextChoice(x) {
  allQuest = document.querySelectorAll(".choices");
  for (let i = 0; i < allQuest.length; i++) {
    if (x == allQuest[i] && allQuest[i] !== allQuest[allQuest.length - 1]) {
      setTimeout(() => {
        allQuest[i + 1].parentElement.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  }
}

function writeScore() {
  let resposta = ((score * 100) / quizClickada.questions.length).toFixed(0);
  let texto;
  let teste = 100 / quizClickada.levels.length;
  for (let i = 0; i < teste; i++) {
    if (resposta > teste) {
      texto = quizClickada.levels[1]
    }else{
      texto = quizClickada.levels[0]
    }
  }
  questions.innerHTML += `<div class="bot-quiz">
                          <header class="quiz-score">
                         <h4>${resposta}% de acerto: ${texto.title}</h4>
                          </header>
                     <div class="quiz-result">
                        <div class="img-result">
                            <img src="${texto.image}" alt="" width="364px" height="273px">
                        </div>
                        <p>
                        ${texto.text}
                        </p>
                    </div>
                </div>`;
                setTimeout(()=>{
                  document.querySelector(".quiz-score").scrollIntoView({ behavior: "smooth" });
                }, 1500)
                
}


function local(){
  let guarda = JSON.stringify(quizClickada);

  window.localStorage.setItem("quiz", guarda);

  let novo = JSON.parse(localStorage.getItem("quiz"));


}
