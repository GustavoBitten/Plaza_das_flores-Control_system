$(() => {
  init()
});

$(document).on('change', () => {
  init()
})

let init = () => {
  $('a[id^=comunicado]').on('click', async (event) => {
    let element = $(event.target.parentNode) // element that triggered event
    let id = element.data('id') // get value from target data-id field
    let modal = $(element.data('target'))

    let resposta = await fetch(window.location.href + '/' + id) // get ajax response

    if (resposta.status == 200) {
      let comunicado = await resposta.json() // get json object from ajax response

      // fill modal fields
      modal.find('.modal-title').text(comunicado.titulo)
      modal.find('.body-content').text(comunicado.mensagem)

      // show modal
      modal.modal('show')
    } else
      alert(resposta.status + ' - ' + resposta.statusText)
  })

  $('a[id^=excluirComunicado]').on('click', async (event) => {
    let element = $(event.target.closest('.text-danger'))
    let id = element.data('id')

    let resposta = await fetch(window.location.href + '/' + id, {
      method: 'DELETE'
    })

    if (resposta.status == 200) {
      let resultado = await resposta.json()

      reload()
    } else
      alert(resposta.status + ' - ' + resposta.statusText)
  })
}

let reload = async () => {
  let resposta = await fetch(window.location.href + '/getComunicados')

  if (resposta.status == 200) {
    let listaComunicados = await resposta.json()

    let tableBody = document.querySelector('#tableBody')
    tableBody.innerHTML = ''

    listaComunicados.forEach(comunicado => {
      let tableRow = document.createElement('tr')

      let colData = document.createElement('td')
      colData.classList.add('align-middle')
      colData.append(comunicado.created_at)

      let colComunicado = document.createElement('td')
      colComunicado.classList.add('align-middle')

      let linkComunicado = document.createElement('a')
      linkComunicado.setAttribute('id', 'comunicado' + comunicado.id)
      linkComunicado.setAttribute('data-target', '#modalMostrarComunicado')
      linkComunicado.setAttribute('data-id', comunicado.id)

      let tituloComunicado = document.createElement('u')
      tituloComunicado.append(comunicado.titulo)

      let colAcoes = document.createElement('td')
      colAcoes.classList.add('align-middle')

      let linkEditar = document.createElement('a')
      linkEditar.setAttribute('id', 'editarComunicado' + comunicado.id)
      linkEditar.classList.add('text-primary', 'text-decoration-none')
      linkEditar.setAttribute('data-id', comunicado.id)
      linkEditar.setAttribute('title', 'Editar Comunicado')

      let iconeEditar = document.createElement('i')
      iconeEditar.classList.add('fas', 'fa-edit')

      let linkExcluir = document.createElement('a')
      linkExcluir.setAttribute('id', 'excluirComunicado' + comunicado.id)
      linkExcluir.classList.add('text-danger', 'ml-3')
      linkExcluir.setAttribute('data-id', comunicado.id)
      linkExcluir.setAttribute('title', 'Excluir Comunicado')

      let iconeExcluir = document.createElement('i')
      iconeExcluir.classList.add('fas', 'fa-trash-alt')

      tableBody.append(tableRow)
      tableRow.append(colData)
      tableRow.append(colComunicado)
      colComunicado.append(linkComunicado)
      linkComunicado.append(tituloComunicado)
      tableRow.append(colAcoes)
      colAcoes.append(linkEditar)
      linkEditar.append(iconeEditar)
      colAcoes.append(linkExcluir)
      linkExcluir.append(iconeExcluir)

      $(document).trigger('change')
    })
  } else
    alert(resposta.status + ' - ' + resposta.statusText)
}