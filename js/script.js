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