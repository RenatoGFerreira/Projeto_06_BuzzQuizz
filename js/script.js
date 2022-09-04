let quizzId

function randomizarRespostas () {

    return Math.random() -0.5;

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

function iniciarQuizz (elementoID) {
    quizzId = elementoID;
    const objetoMain = document.querySelector('.quizzes')
    objetoMain.classList.add('escondido')

    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elementoID}`)

    promise.then(renderizarQuizzSelecionado)


}

function renderizarQuizzSelecionado (response) {

    const paginaQuizz = document.querySelector('.paginaQuizz');
    paginaQuizz.innerHTML = '';
    let paginaQuizzRespostas = '';
    paginaQuizz.classList.remove('hidden');

    perguntasArr = response.data.questions;
    quizzImg = response.data.image;
    
    for (let i = 0; i< perguntasArr.length; i++) {

        perguntasArr[i].answers.sort(randomizarRespostas);

        for (let j = 0; j < perguntasArr[i].answers.length; j++) {

            paginaQuizzRespostas += 
            `<div class="opcao ${perguntasArr[i].answers[j].isCorrectAnswer}" onclick="selecionaResposta(this)">
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
            <img class="tituloImg" src="${response.data.questions.img}">
            <div class="tituloQuizz">${response.data.title}</div>
        </div>`+paginaQuizz.innerHTML
        +
        `<button class="reiniciar" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
        <button class="retornar" onclick="retornaHome()">Voltar à home</button>`
        
    let header = document.querySelector(".boxTitulo");
    header.scrollIntoView();
}

function reiniciarQuizz() {
    iniciarQuizz(quizzId);
}

function retornaHome () {
    const paginaQuizz = document.querySelector('.paginaQuizz');
    paginaQuizz.innerHTML = '';

    const objetoMain = document.querySelector('.quizzes')
    objetoMain.classList.remove('escondido')

}


function selecionaResposta(divSelecionado){
    
    if (divSelecionado.classList.contains("true")){

        divSelecionado.classList.toggle('color-green');
    }else {
        divSelecionado.classList.toggle("color-red");
    }

    respostasArr = divSelecionado.parentNode.childNodes

    for (let i=1; i<respostasArr.length-1; i++) {
        respostasArr[i].removeAttribute("onclick");

        if( (respostasArr[i].classList.contains("color-red")) || (respostasArr[i].classList.contains("color-green")) ) {

            
        } else {
            respostasArr[i].classList.add("opcao-outros");
        }
    }

  /*   respostasArr.forEach(resposta => { resposta.classList.add("opcao-outros");
        
    }); */

 /*    let item1 = document.querySelector(".item1")
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
 */
}

function criarQuizz(){
    const objetoCriarGame = document.querySelector('.criar1')
    const objetoMain = document.querySelector('.conteudo')

    objetoCriarGame.classList.toggle('escondido')
    objetoMain.classList.toggle('escondido')

}

