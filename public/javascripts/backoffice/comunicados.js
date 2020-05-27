$('#modalMostrarComunicado').on('show.bs.modal', async function (event) {
  let modal = $(this)
  let element = $(event.relatedTarget) // element that triggered the modal
  let id = element.data('id') // get value from target data-id field
  let resposta = await fetch(window.location.href + '/' + id) // ajax
  let params = await resposta.json() // get json from ajax response
  
   // fill modal fields
  if (resposta.status == 200) {
    modal.find('.modal-title').text(params.titulo)
    modal.find('.body-content').text(params.mensagem)
    modal.find('.body-error').text('')
  } else {
    modal.find('.modal-title').text('Erro: ' + resposta.status)
    modal.find('.body-content').text('')
    modal.find('.body-error').text(params.erro)
  }
})