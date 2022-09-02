
function randomizarRespostas () {
    let respostas = document.querySelector(".opcoes"); // A FAZER

}

function obterQuizzes () {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

    promise.then(renderizarQuizzes);
    
}

function renderizarQuizzes (response) {


    const quizzesArr = response.data;
    const quizzCard = document.querySelector('.quizzes');
    quizzCard.innerHTML = '';

    for (let i = 0; i < quizzesArr.length; i++) {

        quizzCard.innerHTML +=

        `<div class="quizz" onclick="iniciarQuizz(this.id)" id="${quizzesArr[i].id}">
            <img src="${quizzesArr[i].image}" class="quizzImg">
            <div class=" tituloQuizz">${quizzesArr[i].title}</div>
        </div>`

    }
}

function iniciarQuizz (elemento) {
    
    console.log(elemento)

    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elemento}`)

    promise.then(renderizarQuizzSelecionado)


}

function renderizarQuizzSelecionado (response) {

    const paginaQuizz = document.querySelector('.paginaQuizz');
    paginaQuizz.innerHTML = '';
    let paginaQuizzRespostas = ''
    paginaQuizz.classList.toggle('hidden');

    perguntasArr = response.data.questions;
    quizzImg = response.data.image;
    
    for (let i = 0; i< perguntasArr.length; i++) {

        for (let j = 0; j < perguntasArr[i].answers.length; j++) {

            paginaQuizzRespostas += 
            `<div class="opcao item1" onclick="selecionaResposta(this)">
                <img class="opcaoImg" src="${perguntasArr[i].answers[j].img}">
                ${perguntasArr[i].answers[j].text}
            </div>`
        }

        paginaQuizz.innerHTML += 
        
        `<div class="boxPerguntas">
        <div class="pergunta">${perguntasArr[i].title}</div>
            <div class="opcoes">
                ${paginaQuizzRespostas}
            </div>
        </div>`;

        paginaQuizzRespostas = '';
    }

    paginaQuizz.innerHTML = 

        `<div class="boxTitulo">
            <img class="tituloImg" src="${response.data.img}">
            <div class="tituloQuizz">${response.data.title}</div>
        </div>`+paginaQuizz.innerHTML;

}


function selecionaResposta(divSelecionado){
    
    let item1 = document.querySelector(".item1")
    let item2 = document.querySelector(".item2")
    let item3 = document.querySelector(".item3")
    let item4 = document.querySelector(".item4")

    if(divSelecionado === item1){
        item1.classList.add('color-green')
        item2.classList.add('opcao-outros')
        item2.onclick = ''
        item3.classList.add('opcao-outros')
        item3.onclick = ''
        item4.classList.add('opcao-outros')
        item4.onclick = ''
    }else if(divSelecionado === item2){
        item1.classList.add('opcao-outros')
        item1.onclick = ''
        item2.classList.add('color-green')
        item3.classList.add('opcao-outros')
        item3.onclick = ''
        item4.classList.add('opcao-outros')
        item4.onclick = ''

    }else if(divSelecionado === item3){
        item1.classList.add('opcao-outros')
        item1.onclick = ''
        item2.classList.add('opcao-outros')
        item2.onclick = ''
        item3.classList.add('color-green')
        item4.classList.add('opcao-outros')
        item4.onclick = ''
    }else{
        item1.classList.add('opcao-outros')
        item1.onclick = ''
        item2.classList.add('opcao-outros')
        item2.onclick = ''
        item3.classList.add('opcao-outros')
        item3.onclick = ''
        item4.classList.add('color-green')
    }
    
    console.log(item3)

}

function criarQuizz(){
    let item = document.querySelector('.criar1')
    console.log(item)
    item.classList.toggle('escondido')
}

