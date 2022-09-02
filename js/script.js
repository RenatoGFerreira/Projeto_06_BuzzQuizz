function iniciarQuizz () {
    let mostrarQuizz = document.querySelector(".paginaQuizz");
    mostrarQuizz.classList.toggle('hidden');
}

function randomizarRespostas () {
    let respostas = document.querySelector(".opcoes"); // A FAZER

}

function obterQuizzes () {

    console.log('pqp')
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

    promise.then(renderizarQuizzes);
    
}

function renderizarQuizzes (response) {

    console.log(response.data)
    const quizzesArr = response.data;
    const quizzCard = document.querySelector('.quizzes');
    quizzCard.innerHTML = '';

    for (let i = 0; i < quizzesArr.length; i++) {
        console.log(quizzesArr[i].image)
        quizzCard.innerHTML +=
        
        `<div class="quizz" onclick="iniciarQuizz(this)">
            <img src="${quizzesArr[i].image}" class="quizzImg">
            <div class=" tituloQuizz">${quizzesArr[i].title}</div>
        </div>`

    }
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

