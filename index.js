const API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const quizBox = document.querySelector(".boxes-quizz");

let quizzes;
let boxquiz;
let quizClickada;

let quizId;

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
  const questions = document.querySelector(".container");

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
                                <img src="${a[j].image}" alt="img" width="329px" height="175px">
                                <p>${a[j].text}</p>
                            </div>
                            `;
    }
  }
  choiceEvent()
}

function comparador() {
  return Math.random() - 0.5;
}

function reiniciar() {
  document.querySelector(".container").innerHTML = "";
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
  escolha.forEach(e=>{
    e.addEventListener('click', ()=>{
      const questao = e.parentElement; // Pega o elemento pai da opção escolhida
          const questoes = [...questao.children]; // pega todas as escolhas dentro do elemento pai
          questoes.forEach(a=>{
            a.parentElement.classList.remove("black");
            nextChoice(questao);
            if(a == e){
              console.log("são iguais")
            }else{
              a.classList.add("not")
            }
          });
    })
  })
}

function nextChoice(x){
  const allQuest = document.querySelectorAll(".choices");
  for(let i = 0; i<allQuest.length; i++){
    if(x == allQuest[i] && allQuest[i] !== allQuest[allQuest.length-1]){
      setTimeout(()=>{
        allQuest[i+1].parentElement.scrollIntoView({ behavior: 'smooth' });
      },2000)
      
    }
  }
  
}