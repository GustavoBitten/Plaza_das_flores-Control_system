const menu = document.getElementById('menu')

class Item {
    constructor(name, href, icon) {
        this.name = name
        this.href = href
        this.icon = icon
    }
}

const dashboard = new Item('Dashboard', 'dashboard', 'fas fa-columns')
const perfil = new Item('Perfil', 'perfil', 'fas fa-user-tie')
const areas_comuns = new Item('Áreas Comuns', 'areas_comuns', 'fas fa-futbol')
const ocorrencias = new Item('Ocorrências', 'ocorrencias', 'fas fa-exclamation')
const correspondencias = new Item('Correspondências', 'correspondencias', 'fas fa-shipping-fast')
const comunicados = new Item('Comunicados', 'comunicados', 'fas fa-comment-dots')
const financeiro = new Item('Financeiro', 'financeiro', 'fas fa-dollar-sign')

const moradores = new Item('Moradores', 'moradores', 'fas fa-users')

//Para alterar as opções do aside, só alterar os arrays abaixo

const comumItems = [dashboard, perfil, areas_comuns, ocorrencias, correspondencias, comunicados, financeiro]

const moradorItems = [...comumItems]
const sindicoItems = [...comumItems, moradores]
const portariaItems = [...comumItems]


const url = document.URL
const typeUrl = url.split('/')[4]



function insertItemsAside(asideItens) {

    asideItens.forEach(item => {
        menu.innerHTML += `
        <a class="nav-link d-flex justify-content-start align-items-center text-white font-weight-bold"
        href="/backoffice/${typeUrl}/${item.href}">
        <i class="${item.icon} nav-icon mr-2 iconAside"></i>
        <span class="text-link">${item.name}</span>
        </a>`

    });
}

switch (typeUrl) {
    case 'morador':
        insertItemsAside(moradorItems)
        break;
    case 'sindico':
        insertItemsAside(sindicoItems)
        break;
    case 'portaria':
        insertItemsAside(portariaItems)
        break;

    default:
        break;
}