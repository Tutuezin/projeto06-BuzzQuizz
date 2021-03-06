document.querySelector("#quiz-info").addEventListener("submit", quizInfo);

document.querySelector("#questions-info").addEventListener("submit", createLevels);

let questsQtd = parseInt(document.querySelector("#quiz-questions").value);
let levels = document.querySelector("#quiz-levels").value;
let obj,
  quests = [],
  answer = [];

function comeceComeco() {
  const startQuiz = document.querySelector(".screen.one");
  const createQuiz = document.querySelector(".create-quiz");
  startQuiz.innerHTML = "";
  createQuiz.classList.remove("hidden");
}

function quizInfo(event) {
  event.preventDefault();
  const createQuiz = document.querySelector(".create-quiz");
  const createQuestion = document.querySelector(".create-question");
  const title = document.querySelector("#quiz-title").value;
  const image = document.querySelector("#quiz-url").value;
  questsQtd = document.querySelector("#quiz-questions").value;
  levels = document.querySelector("#quiz-levels").value;

  // verifica as informações básicas do quiz
  if (title.length < 20) {
    alert("O mínimo permitido são 20 caracteres!");
  } else if (title.length > 65) {
    alert("O máximo permitido são 65 caracteres!");
  } else if (!image.includes("https://")) {
    alert("Coloque a imagem em fortmato URL!");
  } else if (parseInt(questsQtd) < 3) {
    alert("O mínimo permitido são 3 perguntas!");
  } else if (isNaN(questsQtd)) {
    alert("Por favor, digite a quantidade de questões em forma númerica!");
  } else if (parseInt(levels) < 2) {
    alert("O mínimo permitido são 2 níveis!");
  } else if (isNaN(levels)) {
    alert("Por favor, digite a quantidade de níveis em números!");
  } else if (createQuestion.querySelector(".closed")) {
    alert("Falta mais forms");
  } else {
    nextScreen(createQuiz, createQuestion);
  }

  obj = { title, image };
  console.log(obj);
}

function nextScreen(criadorQuiz, telaPerguntas) {
  criadorQuiz.classList.add("hidden");
  telaPerguntas.classList.remove("hidden");

  for (let i = 1; i < questsQtd; i++) {
  document.querySelector("#questions-info").innerHTML += `<div class="inputs closed">
  <div class="edit-question">
      <h3>Pergunta ${i + 1}</h3>
      <button onclick="openQuestion()">
          <img src="/assets/editQuestion.svg" width="26px" height="23px" alt="">
      </button>
  </div>
</div>`;
  }
  document.querySelector("#questions-info").innerHTML += `<button type="submit" class="next-levels">Prosseguir pra criar níveis</button>`;
}

function writeLevelAbas() {

  document.querySelector("#levels-info").innerHTML = `<div class="inputs open">
  <div class="level">
      <h3>Nível 1</h3>

      <input type="text" id="level-title" required placeholder="Título do nível">
      <input type="text" id="level-percentage" required placeholder="% de acerto mínima">
      <input type="text" id="level-url" required placeholder="URL da imagem do nível">
      <input type="text" id="level-description" required placeholder="Descrição do nível">
  </div>
</div>
</form>`
  for (let i = 1; i < levels; i++) {
    document.querySelector("#levels-info").innerHTML += `<div class="inputs closed">
    <div class="edit-level">
        <h3>Nível ${i+1}</h3>
        <button onclick="openLevel()">
            <img src="/assets/editQuestion.svg" width="26px" height="23px" alt="">
        </button>
    </div>
</div>`;
  }
  document.querySelector("#levels-info").innerHTML += `<button type="submit" class="finish-quiz">Finalizar Quizz</button>`;
}

function getQuest() {
  let forms = document.querySelectorAll(".inputs.quest");
  for (let i = 0; i < forms.length; i++) {
    createQuestions(forms[i]);
  }
  obj["questions"] = quests;
  
  document.querySelector("#levels-info").addEventListener("submit", setLevels);
}

function createQuestions(pergunta) {
  const createQuestion = document.querySelector(".create-question");

  let title = pergunta.querySelector("#quiz-question").value;
  let color = pergunta.querySelector("#quiz-color").value;

  answer.push({
    text: pergunta.querySelector("#quiz-corret-answer").value,
    image: pergunta.querySelector("#quiz-corret-url").value,
    isCorrectAnswer: true,
  });

  for (let j = 0; j < 3; j++) {
    let textin = pergunta.querySelectorAll("#quiz-incorret-answer")[j].value;
    let imagein = pergunta.querySelectorAll("#quiz-incorret-url")[j].value;
    if (textin && imagein) {
      console.log("uma vez")
      answer.push({ text: textin, image: imagein, isCorrectAnswer: false });
    }
  }
  quests.push({ title: title, color: color, answers: answer });
  answer = [];
  writeLevelAbas()
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
  } else if (document.querySelector(".create-question").querySelector(".closed")) {
    alert("Falta mais forms");
  } else {
    createQuestion.classList.add("hidden");
    createLevel.classList.remove("hidden");
    getQuest()
  }
}

function openLevel() {
  let paiLevel = document.querySelector(".create-level");
  const closedLevel = paiLevel.querySelector(".inputs.closed");
  closedLevel.innerHTML = "";

  closedLevel.classList.remove("closed");
  closedLevel.classList.add("open");
  let quantidade = document
    .querySelector(".create-level ")
    .querySelectorAll(".inputs.open").length;
  closedLevel.innerHTML += `
                    <div class="level">
                        <h3>Nível ${quantidade}</h3>

                        <input type="text" id="level-title" required placeholder="Título do nível">
                        <input type="text" id="level-percentage" required placeholder="% de acerto mínima">
                        <input type="text" id="level-url" required placeholder="URL da imagem do nível">
                        <input type="text" id="level-description" required placeholder="Descrição do nível">
                    </div>
  `;
}

function setLevels(event) {
  event.preventDefault();
  const createLevel = document.querySelector(".create-level");
  const createFinish = document.querySelector(".create-finish");
  const levelTitle = document
    .querySelector(".create-level")
    .querySelector("#level-title").value;
  const levelPercentage = parseInt(
    document.querySelector("#level-percentage").value
  );
  const levelUrl = document.querySelector("#level-url").value;
  const levelDescription = document.querySelector("#level-description").value;

  if (levelTitle.length < 10) {
    alert("O mínimo permitido no título do nível são 10 caracteres!");
  } else if (levelPercentage < 0 || levelPercentage > 100) {
    alert("A taxa de acerto tem que ser um número entre 0 e 100!");
  } else if (isNaN(levelPercentage)) {
    alert("Por favor, digite a taxa de acertos em forma númerica!");
  } else if (!levelUrl.includes("https://")) {
    alert("Coloque a imagem em fortmato URL!");
  } else if (levelDescription.length < 30) {
    alert("O mínimo permitido na descrição do nível são 30 caracteres!");
  } else if (document.querySelector(".create-level").querySelector(".closed")) {
    alert("Falta mais forms");
  } else {
    /* createLevel.classList.add("hidden");
    createFinish.classList.remove("hidden"); */
    document.querySelector(".create-level").classList.add("hidden");
    postObjeto();
    
  }
  console.log(event.parentElement);
}

function writeFinish(x) {
  const finish = document.querySelector(".create-finish");
  if(x == 0){
    finish.innerHTML = `<div class="create-finish ">
  <h2>Seu quizz está pronto!</h2>
  <div class="finish">
  <img src="${obj.url}" width="500px" height="266px" alt="">
  <div class="sombra"></div>
  <h3>${obj.title}</h3>
  </div>
  <div class="btn accessquiz">Acessar Quizz</div>
  <div class="btn backhome" onclick="window.location.reload()">Voltar para home</div>
  </div>`;
  
  }else{
    finish.innerHTML = `<div class="create-finish ">
  <h2>ERRO NO SEU QUIZZ!</h2>
  <div class="finish">
  <img src="${obj.image}" width="500px" height="266px" alt="">
  <div class="sombra"></div>
  <h3>${obj.title}</h3>
  </div>
  <div class="btn accessquiz">Revisar erro</div>
  <div class="btn backhome" onclick="window.location.reload()">Voltar para home</div>
  </div>`;
  }
  
}

function createAnswer() {
  const creatLevel = document.querySelector(".create-level");
  const allLevels = creatLevel.querySelectorAll(".inputs.open");

  for (let j = 0; j < allLevels.length; j++) {
    let title = allLevels[j].querySelector("#level-title").value;
    let image = allLevels[j].querySelector("#level-url").value;
    let text = allLevels[j].querySelector("#level-description").value;
    let minValue = allLevels[j].querySelector("#level-percentage").value;
    answer.push({ title: title, image: image, text: text, minValue: minValue });
  }
  obj["levels"] = answer;
  answer = [];
}

function postObjeto(){
  createAnswer();
  axios.post(API, obj)
      .then(e=>{
        addLocal(e.data.id);
        writeFinish(0)
      }).catch(erro =>{
        console.log(erro)
        writeFinish(1)
      });
        
      
}

function addLocal(id) {
  if (localStorage) {
      let ids;
      if (!localStorage['ids']) ids = [];
      else ids = JSON.parse(localStorage['ids']);            
      if (!(ids instanceof Array)) ids = [];
      ids.push(id);

      localStorage.setItem('ids', JSON.stringify(ids));
  } 
}

/* SE VC VER ISSO VC ESTA ATT */
