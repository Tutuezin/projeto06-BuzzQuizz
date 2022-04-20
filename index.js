const API = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'
const quizBox = document.querySelector(".boxes-quizz");

let quizzes;


function getQuizz(){
    axios.get(API)
         .then(e=>{
            quizzes = e.data;
            writeQuizz();
         })
}

function writeQuizz(){
    quizBox.innerHTML = ''
    quizzes.forEach(element => {
        quizBox.innerHTML += `<div class="box-quiz">
        <img class="gradient" width="340px" height="181px" src="${element.image}" alt="">
        <span class="title">${element.title}</span>
    </div>`
    });
}

getQuizz();