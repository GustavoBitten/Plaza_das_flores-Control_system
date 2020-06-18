console.log('funcionado')

fetch('https://api.hgbrasil.com/weather?key=e33cd20e&city_name=Campinas,SP',{
    //method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    // headers: {
    //   'Content-Type': 'application/json'
    headers:{
        'X-Requested-With': 'XMLHttpRequest'
      },
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer'
})
  .then(response =>{
      console.log(response) 
    response.json()})
  .then(data => console.log(data));