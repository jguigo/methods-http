const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const nomeDoLink = window.location.pathname;
//inputs
const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");

//formulário
const formEvento = document.querySelector("form");

//FUNÇÕES
function urlId() {
   let getIdUrl = window.location.href;
   getIdUrl = getIdUrl
      .split("")
      .splice(getIdUrl.indexOf("?") + 1, getIdUrl.length)
      .join("");
   return getIdUrl;
   
}
const formataData = (data) => {
   let d = data.split('');
   
   let dd = d.slice(8,10).join('') + '/' + d.slice(5,7).join('') + '/' + d.slice(0,4).join('');
   let dt = d.slice(11,16).join('')
   
   return `${dd} ${dt}`
};

if (nomeDoLink === "/index.html") {
   //tabela
   const tabela = document.querySelector("tbody");

   //POST - criando evento
   formEvento.onsubmit = async (e) => {
      e.preventDefault();

      newEvent = {
         name: inputNome.value,
         poster: inputBanner.value,
         attractions: inputAtracoes.value.split(","),
         description: inputDescricao.value,
         scheduled: inputData.value,
         number_tickets: inputLotacao.value,
      };

      const configPost = {
         method: "POST",
         body: JSON.stringify(newEvent),
         headers: {
            "Content-Type": "application/json",
         },
         redirect: "follow",
      };

      const criaEvento = await fetch(`${BASE_URL}/events`, configPost);
      const dadosDoNovoEvento = await criaEvento.json();
      console.log(dadosDoNovoEvento);
   };

   //GET retornar todos os eventos

   const mostrarTudo = async () => {
      const requestOptions = {
         method: "GET",
         redirect: "follow",
      };
      const exibirTudo = await fetch(`${BASE_URL}/events`, requestOptions);
      const exibirTudoMesmo = await exibirTudo.json();
      console.log(exibirTudo);
      console.log(exibirTudoMesmo);

      exibirTudoMesmo.forEach((item) => {
         tabela.innerHTML += `<tr>
            <th scope="row">${exibirTudoMesmo.indexOf(item) + 1}</th>
            <td>${formataData(item.scheduled)}</td>
            <td>${item.name}</td>
            <td>${item.attractions}</td>
            <td>
                <a href="reservas.html" class="btn btn-dark">ver reservas</a>
                <a href="editar-evento.html?${
                    item._id
                 }" class="btn btn-secondary">editar</a>
                <a href="excluir-evento.html?${
                   item._id
                }" class="btn btn-danger">excluir</a>
            </td>
        </tr>`;
      });
   };

   //DEL deletar por id
   const deletarEvento = async (id) => {
      const requestOptions = {
         method: "DELETE",
         redirect: "follow",
      };

      const delEvento = await fetch(`${BASE_URL}/events/${id}`, requestOptions);
      console.log(delEvento);
   };

   //execução
   mostrarTudo();
}

if (nomeDoLink === "/excluir-evento.html") {

    console.log(formEvento);

   //GET, retornar por id
   const mostrarEvento = async (id) => {
      const requestOptions = {
         method: "GET",
         redirect: "follow",
      };

      const retorno = await fetch(`${BASE_URL}/events/${id}`, requestOptions);
      const retornoBody = await retorno.json();

      inputNome.value = retornoBody.name;
      inputBanner.value = retornoBody.poster;
      inputAtracoes.value = retornoBody.attractions;
      inputDescricao.value = retornoBody.description;
      inputData.value = retornoBody.scheduled;
      inputLotacao.value = retornoBody.number_tickets;
   };
   mostrarEvento(urlId());

   formEvento.onsubmit = async (e) => {
      e.preventDefault();
      const requestOptions = {
         method: "DELETE",
         redirect: "follow",
      };

      await fetch(`${BASE_URL}/events/${urlId()}`, requestOptions);
      window.location.href = 'index.html'
   };


}
if (nomeDoLink === '/editar-evento.html') {

    console.log(formEvento);

   //GET, retornar por id
   const mostrarEvento = async (id) => {
      const requestOptions = {
         method: "GET",
         redirect: "follow",
      };

      const retorno = await fetch(`${BASE_URL}/events/${id}`, requestOptions);
      const retornoBody = await retorno.json();

      inputNome.value = retornoBody.name;
      inputBanner.value = retornoBody.poster;
      inputAtracoes.value = retornoBody.attractions;
      inputDescricao.value = retornoBody.description;
      inputData.value = retornoBody.scheduled.split('').slice(0,16).join('');
      inputLotacao.value = retornoBody.number_tickets;
   };
   mostrarEvento(urlId());

}
