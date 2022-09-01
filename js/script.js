function iniciarQuizz () {
    let mostrarQuizz = document.querySelector(".paginaQuizz");
    mostrarQuizz.classList.toggle('hidden');
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


