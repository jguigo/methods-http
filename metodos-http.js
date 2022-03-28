const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

const inputNome = document.querySelector('#nome');
const inputPoster = document.querySelector('#poster');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');

const formCriarEvento = document.querySelector('form');


//POST - criando evento
formCriarEvento.onsubmit = async (e) => {
    e.preventDefault();

    newEvent = {
        name: inputNome.value,
        poster: inputPoster.value,
        attractions: inputAtracoes.value.split(','),
        description: inputDescricao.value,
        scheduled: inputData.value,
        number_tickets: inputLotacao.value
    }

    const configPost = {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers:{
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    }

    const criaEvento = await fetch(`${BASE_URL}/events`, configPost);
    const dadosDoNovoEvento = await criaEvento.json();
    console.log(dadosDoNovoEvento);
}

//GET, retornar por id

const mostrarEvento = async (id) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

    const teste = await fetch(`${BASE_URL}/events/${id}`, requestOptions);
    console.log(teste);
    const testeBody = await teste.json();
    console.log(testeBody._id);
}

//GET retornar todos os eventos

const mostrarTudo = async () => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const exibirTudo = await fetch(`${BASE_URL}/events`, requestOptions);
    const exibirTudoMesmo = await exibirTudo.json();
    console.log(exibirTudo);
    console.log(exibirTudoMesmo);
    
}

//DEL deletar por id
const deletarEvento = async (id) => {
    const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
    const teste = await fetch(`${BASE_URL}/events/${id}`, requestOptions);
    console.log(teste);

}