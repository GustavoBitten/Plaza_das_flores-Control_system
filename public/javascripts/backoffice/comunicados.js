$('a[id^=comunicado]').on('click', async (event) => {
  let element = $(event.target.parentNode) // element that triggered event
  let id = element.data('id') // get value from target data-id field
  let modal = $(element.data('target'))

  const resposta = await fetch(window.location.href + '/' + id) // get ajax response

  if (resposta.status == 200) {
    const comunicado = await resposta.json() // get json object from ajax response

    // fill modal fields
    modal.find('.modal-title').text(comunicado.titulo)
    modal.find('.body-content').text(comunicado.mensagem)

    // show modal
    modal.modal('show')
  } else {
    alert(resposta.status + ' - ' + resposta.statusText)
  }
})

$('a[id^=excluirComunicado]').on('click', async (event) => {
  let element = $(event.target.closest('.text-danger'))
  let id = element.data('id')

  const resposta = await fetch(window.location.href + '/' + id, {
    method: 'DELETE'
  })

  if (resposta.status = 200) {
    const resultado = await resposta.json()
  } else {
    alert(resposta.status + ' - ' + resposta.statusText)
  }
})