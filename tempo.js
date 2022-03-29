// 2022-03-30T22:01:00.000Z
const formataData = (data) => {
   let dataFormatada = new Date(data);
   dataFormatada = `${dataFormatada.getDate()}/${dataFormatada.getMonth()}/${dataFormatada.getFullYear()} ${dataFormatada.getHours()}:${dataFormatada.getMinutes()}`;
   return dataFormatada;
};
