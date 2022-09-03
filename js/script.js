let meusQuizzes = []

let objetoQuizz ={ 
    id: 11836, 
    title: 'Título do quizz', 
    image: 'https://http.cat/411.jpg', 
    questions: [{title: 'Título da pergunta 1', color: '#123456', answers: [{text: 'pppppp', image: 'https://i.pinimg.com/736x/98/35/99/ec810.jpg', isCorrectAnswer: true}]}], 
    levels: [{title: 'Título do nível 1', image: 'https://http.cat/411.jpg', text: 'Descrição do nível 1', minValue: 0}]
}



function mostrarMeusQuizzes(){
    let sectionCriar = document.querySelector('.criar')
    let sectionCriado = document.querySelector('.criado')

    if(meusQuizzes.length === 0){
        sectionCriar.classList.remove('escondido')
        sectionCriado.classList.add('escondido')
    }else{
        sectionCriar.classList.add('escondido')
        sectionCriado.classList.remove('escondido')
    }
}



function randomizarRespostas () {
    /* let respostas = document.querySelector(".opcoes");
    
    respostas.forEach(resposta => {
        let randomPos = Math.floor(Math.random() * qtdRespostas);
        resposta.style.order = randomPos;
    }); */

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

function iniciarQuizz (elemento) {
    const objetoMain = document.querySelector('.quizzes')
    objetoMain.classList.toggle('escondido')

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

        perguntasArr[i].answers.sort(randomizarRespostas)

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
    const objetoCriarGame = document.querySelector('.criar1')
    const objetoMain = document.querySelector('.conteudo')

    objetoCriarGame.classList.toggle('escondido')
    objetoMain.classList.toggle('escondido')

}
