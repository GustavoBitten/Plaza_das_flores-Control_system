$('a[id^=comunicado]').on('click', async function (event) {
  let element = $(this) // element that triggered the modal
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
  } else {
    alert(resposta.status + ' - ' + resposta.statusText)
  }
})