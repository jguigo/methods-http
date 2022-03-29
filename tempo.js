// 2022-03-30T22:01:00.000Z
const formataData = (data) => {
   let d = data.split('');
   
   let dd = d.slice(8,10).join('') + '/' + d.slice(5,7).join('') + '/' + d.slice(0,4).join('');
   let dt = d.slice(11,16).join('')
   
   return `${dd} ${dt}`
};


console.log(formataData('2022-03-31T01:59:00.000Z'));