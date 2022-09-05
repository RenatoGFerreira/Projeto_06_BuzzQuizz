let meusQuizzes = []
let QuizzObject, quizzId;
let numAcertos = 0
let numErros = 0

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
    let quizzesusuario = localStorage.getItem("quizzesusuario");
    quizzesusuarioDeserializados = JSON.parse(quizzesusuario);

    if(quizzesusuarioDeserializados.length === 0){
        sectionCriar.classList.remove('escondido')
        sectionCriado.classList.add('escondido')
    }else{
        sectionCriar.classList.add('escondido')
        sectionCriado.classList.remove('escondido')
        pegarmeusQuizzes(quizzesusuarioDeserializados);
    }
}
function pegarmeusQuizzes (quizzesusuarioDeserializados) {
    console.log(quizzesusuarioDeserializados);

    for (i=0; i< quizzesusuarioDeserializados.length; i++){
        console.log(quizzesusuarioDeserializados[i].id);
        let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzesusuarioDeserializados[i].id}`);
        promise.then (renderizarmeusQuizzes);
    }
    
}
function renderizarmeusQuizzes (response) {

    
    const quizzCard = document.querySelector('.criado');
            quizzCard.innerHTML +=

        `<div class="quizz" onclick="iniciarQuizz(this.id)" id="${response.data.id}">
            <img src="${response.data.image}" class="quizzImg">
            <div class=" tituloQuizz">${response.data.title}</div>
            <div class="caixaicones"> <ion-icon class="editicon" name="create-outline" onclick="editaquizz(${response.data.id})"></ion-icon>
            <ion-icon class="deleteicon" name="trash-outline" onclick="deletaquizz(${response.data.id})"></ion-icon> </div>
            
        </div>`;
    }

function deletaquizz(id){
    let confirmadelete = confirm("Tem certeza que deseja deletar esse quizz?");
    if (confirmadelete === true){
    let id2 = id;
    let quizzdeletado = localStorage.getItem("quizzesusuario");
    let quizzdeletadostring = JSON.parse(quizzdeletado);
    for (i=0; i<quizzdeletadostring.length;i++){
        if (quizzdeletadostring[i].id === id2){
            console.log(quizzdeletadostring[i].id);
            console.log(id);
            console.log(quizzdeletadostring[i].key)
            const headers = {
                'Secret-Key': quizzdeletadostring[i].key
            };
            
            let promise= axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`, { headers } )
            promise.then(deletebemsucedido);
            
            }  

        }
    
    }}
function deletebemsucedido(){
    alert("Quizz deletado com sucesso!");
    document.location.reload();

}
//function atualizastorage(i){
//    console.log("até aqui sim");
  //  let quizzdeletado = localStorage.getItem("quizzesusuario");
    //quizzdeletadostring = JSON.parse(quizzdeletado);
  //  quizzdeletadostring.splice(i);
   // quizzdeletado2 = JSON.stringify(quizzdeletadostring);
    //localStorage.setItem("quizzesusuario", quizzdeletado2);
    //document.location.reload();

//}

function randomizarRespostas () {

    return Math.random() -0.5;

}

function loading () {
    let loadPage = document.querySelector('.loading')
    loadPage.classList.toggle('escondido')
    loadPage.scrollIntoView()
}

function obterQuizzes () {

    loading();
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
    loading();
}

function iniciarQuizz (elementoID) {
    quizzId = elementoID;
    const objetoMain = document.querySelector('.quizzes')
    objetoMain.classList.add('escondido')

    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elementoID}`);

    loading();
    promise.then(renderizarQuizzSelecionado)

}

function renderizarQuizzSelecionado (response) {
    QuizzObject = response.data;
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
        <div class="pergunta" style="background-color:${perguntasArr[i].color}">${perguntasArr[i].title}</div>
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
        `<div class="footer">
            <button class="reiniciar" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
            <button class="retornar" onclick="retornaHome()">Voltar à home</button>
         </div>`
        
    let header = document.querySelector(".boxTitulo");

    loading();
    header.scrollIntoView();
}

function reiniciarQuizz() {
    iniciarQuizz(quizzId);
    numAcertos = 0;
    numErros = 0;
}

function retornaHome () {
    const paginaQuizz = document.querySelector('.paginaQuizz');
    paginaQuizz.innerHTML = '';

    const objetoMain = document.querySelector('.quizzes')
    objetoMain.classList.remove('escondido')
    document.location.reload();

    numAcertos = 0;
    numErros = 0;
}


function selecionaResposta(divSelecionado){
    
    if (divSelecionado.classList.contains("true")){
        numAcertos++
    }else {
        numErros++
    }

    const pergunta = divSelecionado.parentNode
    pergunta.classList.add('respondido')
    const respostasArr = divSelecionado.parentNode.childNodes

    for (let i=1; i<respostasArr.length-1; i++) {
        respostasArr[i].removeAttribute("onclick");

        if( (respostasArr[i].classList.contains("true")) ) { 
            respostasArr[i].classList.add("color-green", "opcao-outros")
        } else {
            respostasArr[i].classList.add("color-red", "opcao-outros");
        }
    }

    divSelecionado.classList.remove("opcao-outros")

    proximo = divSelecionado.parentNode.parentNode.nextSibling;
    setTimeout(autoScroll, 1700)
    checarRespostas();

    function autoScroll () {
        proximo.scrollIntoView()
    }
}

function checarRespostas () {

    const opcoes = document.querySelectorAll('.opcoes')
    opcoesCheck = Array.from(opcoes)

    if ( opcoesCheck.every((opcao) => opcao.classList.contains("respondido"))) {

        renderizarResultado();
    }
}

function renderizarResultado () {

    const resultado = document.querySelector('.footer')
    const calculaAcertos = Math.round((numAcertos/(numAcertos+numErros))*100)

    for (let i = 0; i<QuizzObject.levels.length; i++) {
        
        if ( ((calculaAcertos>=QuizzObject.levels[i].minValue) && (calculaAcertos<QuizzObject.levels[i+1])) || (calculaAcertos>=QuizzObject.levels[i].minValue && calculaAcertos<= 100)){

            resultado.innerHTML = 
    
            `<div class="boxResultado">
                <div class="resultTitle"> ${calculaAcertos}% de acertos: ${QuizzObject.levels[i].title}</div>
                <img class="resultImg" src="${QuizzObject.levels[i].image}"> 
                <div class="resultText">${QuizzObject.levels[i].text}</div>
             </div>
            <button class="reiniciar" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
            <button class="retornar" onclick="retornaHome()">Voltar à home</button>`

        }   
    }

    setTimeout (autoScroll,1700)
    numAcertos = 0;
    numErros = 0;

    function autoScroll (){
        resultado.scrollIntoView();
    }
}

function criarQuizz(){
    const objetoCriarGame = document.querySelector('.criar1')
    const objetoMain = document.querySelector('.conteudo')

    objetoCriarGame.classList.toggle('escondido')
    objetoMain.classList.toggle('escondido') 
    let titulo = document.querySelector(".criar1tituloquizz");
    titulo.value = "qlqcoisa";

}




function prosseguircriarperguntas(){
    let tituloquizzcriado = document.querySelector(".criar1tituloquizz").value;   
    console.log(tituloquizzcriado);

    let urltituloquizzcriado = document.querySelector(".criar1urlquizz").value;   
    checkUrl(urltituloquizzcriado);

    let quantidadeperguntasquizzcriado = document.querySelector(".criar1quantidadeperguntasquizz").value;
    console.log(quantidadeperguntasquizzcriado);

    let quantidadeniveisquizzcriado = document.querySelector(".criar1quantidadeniveisquizz").value;
    console.log (quantidadeniveisquizzcriado);

    if(tituloquizzcriado.length< 20 || tituloquizzcriado.length>65 || funciona === false || quantidadeperguntasquizzcriado <3 || quantidadeniveisquizzcriado <2){
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
        
        let pergunta = `.inputextopergunta${i}`;
        let cor = `.inputcorpergunta${i}`;
        let respostacorreta = `.inputrespostacorretapergunta${i}`;
        let urlrespostacorreta = `.inputurlrespostacorretapergunta${i}`;
        let respostaincorreta1 = `.inputrespostaincorreta1pergunta${i}`;
        let urlrespostaincorreta1 = `.inputurlimagemincorreta1pergunta${i}`;
        let respostaincorreta2 = `.inputrespostaincorreta2pergunta${i}`;
        let urlrespostaincorreta2 = `.inputurlimagemincorreta2pergunta${i}`;
        let respostaincorreta3 = `.inputrespostaincorreta3pergunta${i}`;
        let urlrespostaincorreta3 = `.inputurlimagemincorreta3pergunta${i}`;
        

        a.title = document.querySelector(pergunta).value;
        console.log(a.title.length);
        console.log(i);
        if (a.title.length <20 || a.title===null){             
            erroperguntas(i);
            break;
        }
        a.color = document.querySelector(cor).value;
        if (a.color.length !=7 || a.color.includes('#')=== false){
            erroperguntas(i);
            break;
        }
        a.answers[0].text = document.querySelector(respostacorreta).value;
        if(a.answers[0].text === ""){
            erroperguntas(i);
            break;
        }
        a.answers[0].image = document.querySelector(urlrespostacorreta).value;
        checkUrl(a.answers[0].image);
        if(funciona === false){
            erroperguntas(i);
            break;
        }
        a.answers[1].text= document.querySelector(respostaincorreta1).value;
        if (a.answers[1].text === ""){
            erroperguntas(i);
            break;
        }
        a.answers[1].image = document.querySelector(urlrespostaincorreta1).value;
        checkUrl(a.answers[1].image);
        if(funciona === false){
            erroperguntas(i);
            break;
        }
        let incorreta2 = document.querySelector(respostaincorreta2).value;
        let incorreta3 = document.querySelector(respostaincorreta3).value;
        if(incorreta2 === ""){}
        else{ 
            let b = {
            text:"",
            image:"",
            isCorrectAnswer: false
            }
            b.text = document.querySelector(respostaincorreta2).value;
            b.image = document.querySelector(urlrespostaincorreta2).value;
            checkUrl(b.image);
            if(funciona ===false)
            {
                erroperguntas(i);
                break;
            }
            a.answers.push(b);

        }
        if(incorreta3 === ""){}
        else{ 
            let b = {
            text:"",
            image:"",
            isCorrectAnswer: false
            }
            b.text = document.querySelector(respostaincorreta3).value;
            b.image = document.querySelector(urlrespostaincorreta3).value;
            checkUrl(b.image);
            if(funciona ===false)
            {
                erroperguntas(i);
                break;
            }
            
            a.answers.push(b);

        }
        questions.push(a);
        
              
        
    }
    console.log(numeroperguntas);
    if(questions.length == numeroperguntas ){
        console.log (numeroperguntas);
        criarniveis();
    }    
}
function erroperguntas(i){
    
    let perguntaerro = `.pergunta${i}`;
    let perguntaerro2 = document.querySelector(perguntaerro);
    perguntaerro2.innerHTML = `
    <div class="textopergunta${i}">
        <p> <strong>Pergunta ${i}</strong></p>
    </div>
    <img src="iconeabrir.svg" class="iconeabrir iconepergunta${i} escondido" onclick="abreperguntas(this)">           
    
<img src="iconeabrir.svg" class="iconeabrir iconepergunta${i} escondido">
<input type="text" class="inputcriar2 inputextopergunta${i}" placeholder="Texto da pergunta">
<div class="msgerro">O texto da pergunta deve ter no mínimo 20 caracteres</div>
<input type="text" class="inputcriar2 inputcorpergunta${i}" placeholder="Cor de fundo da pergunta">
<div class="msgerro">A cor deve ser no formato #ABC123</div>

<div class="respostacorreta">
    <p> <strong>Resposta correta</strong></p>
</div>
<input type="text" class="inputcriar2 inputrespostacorretapergunta${i}" placeholder="Resposta correta">
<div class="msgerro">O texto da resposta correta não pode ser vazio</div>
<input type="text" class="inputcriar2 inputurlrespostacorretapergunta${i}" placeholder="URL da imagem">
<div class="msgerro">O URL deve ser no formato: http...</div>

<div class="repostasincorretaspergunta${i}">
    <p> <strong>Respostas incorretas</strong></p>
    <input type="text" class="inputcriar2 inputrespostaincorreta1pergunta${i}" placeholder="Resposta Incorreta 1">
    <div class="msgerro">A pergunta deve ter pelo menos uma resposta incorreta</div>
    <input type="text" class="inputcriar2 inputurlimagemincorreta1pergunta${i}" placeholder="URL da imagem 1">
    <div class="msgerro">O URL deve ser no formato: http...</div>
    <input type="text" class="inputcriar2 inputrespostaincorreta2pergunta${i}" placeholder="Resposta Incorreta 2">
    <input type="text" class="inputcriar2 inputurlimagemincorreta2pergunta${i}" placeholder="URL da imagem 2">
    <input type="text" class="inputcriar2 inputrespostaincorreta3pergunta${i}" placeholder="Resposta Incorreta 3">
    <input type="text" class="inputcriar2 inputurlimagemincorreta3pergunta${i}" placeholder="URL da imagem 3">
</div></div>`;
questions = [];

}
function abreniveis(nivel){
    console.log(nivel);
    console.log(nivel.parentNode.classList);
    let classenivel = nivel.parentNode.classList;
    console.log(classenivel[1])
    let caixanivel =nivel.parentNode;
    console.log(caixanivel);
    nivel.classList.add("escondido");
    caixanivel.innerHTML += `
<img src="iconeabrir.svg" class="iconeabrir icone${classenivel[1]} escondido"></img>
<input type="text" class="inputcriar3 inputtitulo${classenivel[1]}" placeholder="Título do nível">
<input type="text" class="inputcriar3 inputporcentagem${classenivel[1]}" placeholder="% de acerto mínima">
<input type="text" class="inputcriar3 inputurl${classenivel[1]}" placeholder="URL da imagem do nível">
<input type="text" class="inputcriar3 inputdescricao${classenivel[1]}" placeholder="Descrição do nível">`

}
function criarniveis(){
    let criar3 = document.querySelector(".criar3");
    criar3.classList.remove("escondido");
    let criar2 = document.querySelector(".criar2");
    criar2.classList.add("escondido");
    let quantidadeniveisquizzcriado = document.querySelector(".criar1quantidadeniveisquizz").value;
    for (i=1; i<= quantidadeniveisquizzcriado; i++){
        let criar3 = document.querySelector(".criar3");
        criar3.innerHTML += `<div class="criar3niveis nivel${i}">
        <div class="textonivel${i}">
            <p> <strong>Nivel ${i}</strong></p>
        </div>
        <img src="iconeabrir.svg" class="iconeabrir iconenivel${i}" onclick="abreniveis(this)"></img>
    </div>`;
    if (i == quantidadeniveisquizzcriado){
        criar3.innerHTML += `<button class="criar3botao" onclick="finalizarquizz()">Finalizar Quizz</button>`
    }
    }
    
}
function abrecriarquizz(){
    let criar1= document.querySelector(".criar1");
    criar1.classList.remove("escondido");
}
let niveis;
let percentagem0;
function finalizarquizz(){
    let quantidadeniveisquizzcriado = document.querySelector(".criar1quantidadeniveisquizz").value;
    niveis = [];
    for(i=1; i<=quantidadeniveisquizzcriado; i++){
        let a = {
            title: "",
            image: "",
            text: "",
            minValue: ""
        };
        let titulo = `.inputtitulonivel${i}`;
        let porcentagem = `.inputporcentagemnivel${i}`;
        let url = `.inputurlnivel${i}`;
        let descricao = `.inputdescricaonivel${i}`;

        a.title = document.querySelector(titulo).value;
        if(a.title.length <= 10){
            erroniveis(i);
            break;
        }
        a.image = document.querySelector(url).value;
        checkUrl(a.image);
        if( funciona === false ){
            erroniveis(i);
            break;
        }
        a.text = document.querySelector(descricao).value;
        if (a.text.length < 30){
            erroniveis(i);
            break;
        }

        a.minValue = document.querySelector(porcentagem).value;
        if(a.minValue < 0 || a.minValue > 100){
            erroniveis(i);
            break;
        }
        niveis.push(a);
    }
    for (i=0; i< quantidadeniveisquizzcriado; i++){
        if(niveis[i].minValue == 0){
            porcentagem0 = true;
            break;
        }
        else{
            porcentagem0 = false;
        }
    }
    if(porcentagem0 === false){
        erroniveis(1);
    }
    else{ 
        let tituloquizzcriado = document.querySelector(".criar1tituloquizz").value;
        let urltituloquizzcriado = document.querySelector(".criar1urlquizz").value;


        let quizz = {
            title: "",
            image: "",
            questions: "",
            levels: ""
        }
        quizz.title = tituloquizzcriado;
        quizz.image = urltituloquizzcriado;
        quizz.questions = questions;
        quizz.levels = niveis;
        console.log(quizz);
        let promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizz);
        promise.then(abrecriar4);
    }
}
function erroniveis(i){
    let nivelerro = `.nivel${i}`;
    let nivelerro2 = document.querySelector(nivelerro);
    nivelerro2.innerHTML =`<div class="textonivel${i}">
    <p> <strong>Nivel ${i}</strong></p>
</div>
<img src="iconeabrir.svg" class="iconeabrir iconenivel${i} escondido"></img>
<input type="text" class="inputcriar3 inputtitulonivel${i}" placeholder="Título do nível">
<div class="msgerro">O título do nivel deve ter mais de 10 caracteres</div>
<input type="text" class="inputcriar3 inputporcentagemnivel${i}" placeholder="% de acerto mínima">
<div class="msgerro">A porcentagem deve ser um número entre 0 e 100, com pelo menos um nivel partindo de 0</div>
<input type="text" class="inputcriar3 inputurlnivel${i}" placeholder="URL da imagem do nível">
<div class="msgerro">A URL deve ser no formato http...</div>
<input type="text" class="inputcriar3 inputdescricaonivel${i}" placeholder="Descrição do nível">
<div class="msgerro">A descrição do nível deve ter pelo menos 30 caracteres</div>`


}
function abrecriar4(resposta){
    console.log(resposta);
    let a = {
        id: "",
        key:""
    };
    a.id = resposta.data.id;
    a.key = resposta.data.key;
    
    let buscaquizzes = localStorage.getItem("quizzesusuario");
    if (buscaquizzes === null){
        localStorage.setItem("quizzesusuario", "[]" );
        buscaquizzes = localStorage.getItem("quizzesusuario");
    }
    let buscaquizzesarray = JSON.parse(buscaquizzes);
    buscaquizzesarray.push(a);
    let arrayatualizado = JSON.stringify(buscaquizzesarray);
    localStorage.setItem("quizzesusuario", arrayatualizado);

    

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
    <button class="criar4botao" onclick="botao4(${resposta.data.id})">Acessar Quizz</button>
    <button class="criar4botaovoltar" onclick="botaohome()">Voltar para Home</button>`

}
function botao4(id){
    let iddoquizz= id;
    let criar4 = document.querySelector(".criar4");
    criar4.classList.add("escondido");
    const objetoMain = document.querySelector('.conteudo')
    objetoMain.classList.toggle('escondido'); 
    iniciarQuizz(iddoquizz);
}
function botaohome(){
    document.location.reload();
}
function checkUrl(string) {
    try {
     let url = new URL(string)
     funciona = true;
   } catch(err) {
       funciona = false;
   }
 }
 