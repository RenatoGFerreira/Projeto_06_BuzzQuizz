let meusQuizzes = []
let quizzId

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
}

function criarQuizz(){
    const objetoCriarGame = document.querySelector('.criar1')
    const objetoMain = document.querySelector('.conteudo')

    objetoCriarGame.classList.toggle('escondido')
    objetoMain.classList.toggle('escondido')

}


function prosseguircriarperguntas(){
    let tituloquizzcriado = document.querySelector(".criar1tituloquizz").value;   
    console.log(tituloquizzcriado);

    let urltituloquizzcriado = document.querySelector(".criar1urlquizz").value;   
    console.log(urltituloquizzcriado);

    let quantidadeperguntasquizzcriado = document.querySelector(".criar1quantidadeperguntasquizz").value;
    console.log(quantidadeperguntasquizzcriado);

    let quantidadeniveisquizzcriado = document.querySelector(".criar1quantidadeniveisquizz").value;
    console.log (quantidadeniveisquizzcriado);

    if(tituloquizzcriado.length< 20 || tituloquizzcriado.length>65 || urltituloquizzcriado.includes('http') === false || quantidadeperguntasquizzcriado <3 || quantidadeniveisquizzcriado <2){
        let campocriarquizz = document.querySelector(".criar1infosquizz");
        campocriarquizz.innerHTML =`
        <input type="text" class="criar1tituloquizz inputcriar1" placeholder="Título do seu quizz">
        <div class="msgerro">O título do quizz deve ter entre 20 e 65 caracteres</div>
        <input type="text" class="criar1urlquizz inputcriar1" placeholder="URL da imagem do seu quizz">
        <div class="msgerro">O valor informado não é uma URL válida. </div>
        <input type="text" class="criar1quantidadeperguntasquizz inputcriar1"
            placeholder="Quantidade de perguntas do seu quizz">
            <div class="msgerro">O quizz deve ter no mínimo 3 perguntas.</div>
        <input type="text" class="criar1quantidadeniveisquizz inputcriar1"
            placeholder="Quantidade de niveis do seu quizz">
            <div class="msgerro">O quizz deve ter no mínimo 2 níveis.</div>
    </div>`;

    }
    else{
        let criar1 = document.querySelector(".criar1");
        criar1.classList.add("escondido");
        let criar2 = document.querySelector(".criar2");
        criar2.classList.remove("escondido");
        renderizacriarperguntas(quantidadeperguntasquizzcriado);


    }
}
function renderizacriarperguntas(quantidadeperguntas){
    for(i=1; i<= quantidadeperguntas; i++){
        let campoperguntas = document.querySelector(".criar2");
        campoperguntas.innerHTML += `<div class="criar2perguntas pergunta${i}">
        <div class="textopergunta${i}">
            <p> <strong>Pergunta ${i}</strong></p>
        </div>
        <img src="iconeabrir.svg" class="iconeabrir iconepergunta${i}" onclick="abreperguntas(this)"></img>           
        
    </div>`;
    if(i==quantidadeperguntas){
        campoperguntas.innerHTML += `<button class="criar2botao" onclick="prosseguircriarniveis()">Prosseguir para criar niveis</button>`
    }
    }
}
function abreperguntas(pergunta){
    let classepergunta = pergunta.parentNode.classList;
    console.log(classepergunta[1])
    console.log(pergunta.parentNode.classList)
    let caixapergunta =pergunta.parentNode;
    console.log(caixapergunta);
    pergunta.classList.add("escondido");
    caixapergunta.innerHTML += `<img src="iconeabrir.svg" class="iconeabrir icone${classepergunta[1]} escondido"></img>
    <input type="text" class="inputcriar2 inputexto${classepergunta[1]}" placeholder="Texto da pergunta">
    <input type="text" class="inputcriar2 inputcor${classepergunta[1]}" placeholder="Cor de fundo da pergunta">

    <div class="respostacorreta">
        <p> <strong>Resposta correta</strong></p>
    </div>
    <input type="text" class="inputcriar2 inputrespostacorreta${classepergunta[1]}" placeholder="Resposta correta">
    <input type="text" class="inputcriar2 inputurlrespostacorreta${classepergunta[1]}" placeholder="URL da imagem">

    <div class="repostasincorretas${classepergunta[1]}">
        <p> <strong>Respostas incorretas</strong></p>
        <input type="text" class="inputcriar2 inputrespostaincorreta1${classepergunta[1]}" placeholder="Resposta Incorreta 1">
        <input type="text" class="inputcriar2 inputurlimagemincorreta1${classepergunta[1]}" placeholder="URL da imagem 1">
        <input type="text" class="inputcriar2 inputrespostaincorreta2${classepergunta[1]}" placeholder="Resposta Incorreta 2">
        <input type="text" class="inputcriar2 inputurlimagemincorreta2${classepergunta[1]}" placeholder="URL da imagem 2">
        <input type="text" class="inputcriar2 inputrespostaincorreta3${classepergunta[1]}" placeholder="Resposta Incorreta 3">
        <input type="text" class="inputcriar2 inputurlimagemincorreta3${classepergunta[1]}" placeholder="URL da imagem 3">
    </div>`

}
let questions;
let numeroperguntas;
function prosseguircriarniveis(){
    questions = [];
    let numeroperguntas = document.querySelector(".criar1quantidadeperguntasquizz").value;
    for(i=1; i<= numeroperguntas; i++){
        let a = {
            title: "",
            color: "",
            answers: [
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: true
                },
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: false
                }
            ]      
        }
        
    }

function criarQuizz(){
    const objetoCriarGame = document.querySelector('.criar1')
    const objetoMain = document.querySelector('.conteudo')

    objetoCriarGame.classList.toggle('escondido')
    objetoMain.classList.toggle('escondido')

}
function abrecriar4(){
    let criar3 = document.querySelector(".criar3");
    criar3.classList.add("escondido");
    let criar4 = document.querySelector(".criar4");
    criar4.classList.remove("escondido");
    let img = document.querySelector(".criar1urlquizz").value;
    let titulo = document.querySelector(".criar1tituloquizz").value;
    

    let criarfim = document.querySelector(".criar4");
    criarfim.innerHTML = `<div class="criar4titulo"><strong>Seu quizz está pronto</strong></div>
    <div class="divimagemcriar4">
        <img src="${img}" class="criar4imagem">
        <h1>${titulo}</h1>


    </div>
    <button class="criar4botao">Acessar Quizz</button>
    <button class="criar4botaovoltar">Voltar para Home</button>`

}}