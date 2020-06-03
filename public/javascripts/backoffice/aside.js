console.log("funcionando")

const asideItens = {
    morador:[{
        nome:'Dashboard',
        href:'dashboard',
        icon:'fas fa-columns'
    },{
        nome:'Perfil',
        href:'perfil',
        icon:'fas fa-user-tie'
    },{
        nome:'Áreas Comuns',
        href:'areas-comuns',
        icon:'fas fa-futbol'
    },{
        nome:'Ocorrências',
        href:'ocorrencias',
        icon:'fas fa-exclamation'
    },{
        nome:'Correspondências',
        href:'correspondencias',
        icon:'fas fa-shipping-fast'
    },{
        nome:'Moradores',
        href:'moradores',
        icon:'fas fa-users'
    },{
        nome:'Comunicados',
        href:'comunicados',
        icon:'fas fa-comment-dots'
    },{
        nome:'Financeiro',
        href:'financeiro',
        icon:'fas fa-dollar-sign'
    }]

}





const url = document.URL
const typeUrl = url.split('/')[4]
console.log(typeUrl)


const menu = document.getElementById('menu')
asideItens.morador.forEach(item => {
    menu.innerHTML += `
    <a class="nav-link d-flex justify-content-start align-items-center text-white font-weight-bold"
     href="/backoffice/${typeUrl}/${item.href}">
    <i class="${item.icon} nav-icon mr-2 iconAside"></i>
    <span class="text-link">${item.nome}</span>
    </a>`






});
