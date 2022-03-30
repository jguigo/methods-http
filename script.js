const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

const modalPopUp = document.querySelector('#modal');
const outClick = document.querySelector('.supreme-container');
const btnReservar = document.querySelector('btn-reserva')

const eventosIndex = document.querySelector('#container-eventos');
const modalH3 = document.querySelector('#modal h3')
const formModal = document.querySelector('form')
const inputNome = document.querySelector('#nome')
const inputEmail = document.querySelector('#email')
const inputLotacao = document.querySelector('#lotacao')

function data(data){
    let d = data.split('');
    let dd = d.slice(8,10).join('') + '/' + d.slice(5,7).join('') + '/' + d.slice(0,4).join('');
    return dd;
}

const listar3Eventos = async () =>{
    const configuracao = {
        method: 'GET',
        redirect: 'follow'
    }

    const resposta = await fetch(`${BASE_URL}/events`, configuracao);
    const conteudoResposta = await resposta.json();
    const tresEventos = conteudoResposta.slice(0,3);

    tresEventos.forEach(item =>{
        eventosIndex.innerHTML += 
            `<article class="evento card p-5 m-3">
                    <h2>${item.name} - ${data(item.scheduled)}</h2>
                    <h4>${item.attractions}</h4>
                    <p>${item.description}</p>
                    <button id="btn-reserva" href="#" class="btn btn-primary" onclick="exibirModal(this)" eventID="${item._id}">reservar ingresso</butt>
            </button>`
    })
}
listar3Eventos()

//modal
let condition = false
const exibirModal = async (e) =>{
        modalPopUp.setAttribute('style', 'display:block')
        outClick.setAttribute('style', 'filter:blur(5px)')
        setTimeout(() =>{
            condition = true
        }, 200)

        const id = e.getAttribute('eventID');
        
        const configuracao = {
            method: 'GET',
            redirect: 'follow'
        };
        const resposta = await fetch(`${BASE_URL}/events/${id}`, configuracao);
        const conteudoResposta = await resposta.json();
        modalH3.innerHTML = `${conteudoResposta.name} - ${data(conteudoResposta.scheduled)}`
        modalH3.setAttribute('eventID', id)
}

outClick.onclick = () => {
    if (condition) {
        modalPopUp.setAttribute('style', 'display:none')
        outClick.setAttribute('style', 'filter:blur(0px)')
        condition = false
        inputNome.value = '';
        inputEmail.value = '';
        inputLotacao.value = '';

    }
} //modal



formModal.onsubmit = async (e) =>{
    e.preventDefault();
    const id = modalH3.getAttribute('eventID');
    const novaCompra = {
        owner_name: inputNome.value,
        owner_email: inputEmail.value,
        number_tickets: inputLotacao.value,
        event_id: id
    }

    const configuracao = {
        method: 'POST',
        body: JSON.stringify(novaCompra),
        headers: {
            'Content-Type':'application/json' 
        },

        redirect: 'follow',
    }
    try{
    const resposta = await fetch(`${BASE_URL}/bookings`, configuracao)
    }
    catch(erro){
        console.log(erro)
    }
}