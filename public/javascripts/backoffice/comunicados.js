$(() => {
  init()
});

$(document).on('change', () => {
  init()
})

let init = () => {
  resetBindings()

  $('#btnCriarComunicado').on('click', async () => {
    let modal = $('#modalNovoComunicado')

    let titulo = modal.find('#titulo').val()
    let mensagem = modal.find('#mensagem').val()

    $('body').addClass('loading')
    let resposta = await fetch(window.location.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo,
        mensagem
      })
    })

    let resultado = await resposta.json()

    if (resposta.status == 200) {
      // hide modal
      modal.modal('hide')

      reload()

      createToast('Comunicado criado com sucesso!', '', 'success')
    } else {
      resultado.errors.forEach(error => {
        createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
      })
    }
    $('body').removeClass('loading')
  })

  $('#modalNovoComunicado').on('shown.bs.modal', () => {
    $('#modalNovoComunicado').find('#titulo').focus()
  })

  $('#modalNovoComunicado').on('hidden.bs.modal', () => {
    $('#modalNovoComunicado').find('form').trigger('reset')
  })

  $('a[id^=comunicado]').on('click', async (event) => {
    let element = $(event.target.parentNode) // element that triggered event
    let id = element.data('id') // get value from target data-id field
    let modal = $(element.data('target'))

    $('body').addClass('loading')
    let resposta = await fetch(window.location.href + '/' + id) // get ajax response

    let resultado = await resposta.json() // get json object from ajax response

    if (resposta.status == 200) {
      // fill modal fields
      modal.find('.body-title').text(resultado.titulo)
      modal.find('.body-content').text(resultado.mensagem)

      // show modal
      modal.modal('show')
    } else {
      resultado.errors.forEach(error => {
        createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
      })
    }
    $('body').removeClass('loading')
  })

  $('a[id^=editarComunicado]').on('click', async (event) => {
    let element = $(event.target.closest('.text-primary'))
    let id = element.data('id') // get value from target data-id field
    let modal = $(element.data('target'))

    $('body').addClass('loading')
    let resposta = await fetch(window.location.href + '/' + id) // get ajax response

    let resultado = await resposta.json() // get json object from ajax response

    if (resposta.status == 200) {
      // fill modal fields
      modal.find('#tituloEditado').val(resultado.titulo)
      modal.find('#mensagemEditada').val(resultado.mensagem)

      // set data-temp
      modal.find('#btnAtualizar').attr('data-temp', resultado.id)

      // show modal
      modal.modal('show')
    } else {
      resultado.errors.forEach(error => {
        createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
      })
    }
    $('body').removeClass('loading')
  })

  $("#modalEditarComunicado").on('shown.bs.modal', () => {
    $(document.getElementById('tituloEditado')).focus()
  });

  $("#modalEditarComunicado").on('hide.bs.modal', () => {
    $(document.getElementById('tituloEditado')).val('')
    $(document.getElementById('mensagemEditada')).val('')
  })

  $('#btnAtualizar').on('click', async () => {
    let element = document.getElementById('btnAtualizar')
    let id = element.getAttribute('data-temp')
    let modal = $(element.closest('#modalEditarComunicado'))
    let tituloEditado = modal.find('#tituloEditado').val()
    let mensagemEditada = modal.find('#mensagemEditada').val()

    $('body').addClass('loading')
    let resposta = await fetch(window.location.href + '/' + id + '?_method=PUT', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: tituloEditado,
        mensagem: mensagemEditada
      })
    })

    let resultado = await resposta.json()

    if (resposta.status == 200) {
      modal.modal('hide')

      reload()

      createToast('Comunicado atualizado com sucesso!', 'Tudo certo!', 'success')
    } else {
      resultado.errors.forEach(error => {
        createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
      })
    }
    $('body').removeClass('loading')
  })

  $('a[id^=excluirComunicado]').on('click', (event) => {
    let element = $(event.target.closest('.text-danger'))
    let id = element.data('id')

    // Show confirmation modal
    $('#modalExcluirComunicado').modal('show')

    // If confirmed, delete
    $('a[id=btnDelete]').on('click', async (event) => {

      $('body').addClass('loading')
      let resposta = await fetch(window.location.href + '/' + id, {
        method: 'DELETE'
      })

      let resultado = await resposta.json()

      if (resposta.status == 200) {
        reload()

        createToast('Comunicado excluído com sucesso!', 'Tudo certo', 'success')
      } else {
        resultado.errors.forEach(error => {
          createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
        })
      }

      $('body').removeClass('loading')

      $('#modalExcluirComunicado').modal('hide')
    })
  })

  $("#modalExcluirComunicado").on('hide.bs.modal', () => {
    init()
  })
}

let resetBindings = () => {
  $('#btnCriarComunicado').unbind('click')
  $('#modalNovoComunicado').unbind('shown.bs.modal')
  $('#modalNovoComunicado').unbind('hidden.bs.modal')
  $('a[id^=comunicado]').unbind('click')
  $('a[id^=editarComunicado]').unbind('click')
  $("#modalEditarComunicado").unbind('shown.bs.modal')
  $("#modalEditarComunicado").unbind('hide.bs.modal')
  $('#btnAtualizar').unbind('click')
  $('a[id^=excluirComunicado]').unbind('click')
  $('a[id=btnDelete]').unbind('click')
  $("#modalExcluirComunicado").unbind('hide.bs.modal')
}

let formataData = (data) => {
  data = data.split('T')[0]
  let arrayData = data.split('-')
  let dia = arrayData[2]
  let mes = arrayData[1]
  let ano = arrayData[0]

  return dia + '/' + mes + '/' + ano
}

let reload = async () => {
  $('body').addClass('loading')
  let resposta = await fetch(window.location.href + '/getComunicados')

  let resultado = await resposta.json()

  if (resposta.status == 200) {
    let tableBody = document.querySelector('#tableBody')
    tableBody.innerHTML = ''

    resultado.forEach(comunicado => {
      let tableRow = document.createElement('tr')

      let colData = document.createElement('td')
      colData.classList.add('text-center', 'align-middle')
      colData.append(formataData(comunicado.created_at))

      let colAtualizacao = document.createElement('td')
      colAtualizacao.classList.add('text-center', 'align-middle')
      colAtualizacao.append(
        comunicado.created_at == comunicado.updated_at ? '-' : formataData(comunicado.updated_at)
      )

      let colComunicado = document.createElement('td')
      colComunicado.classList.add('text-center', 'align-middle')

      let linkComunicado = document.createElement('a')
      linkComunicado.setAttribute('id', 'comunicado' + comunicado.id)
      linkComunicado.setAttribute('data-target', '#modalMostrarComunicado')
      linkComunicado.setAttribute('data-id', comunicado.id)
      linkComunicado.setAttribute('title', comunicado.titulo)

      let tituloComunicado = document.createElement('u')
      tituloComunicado.append(comunicado.titulo.length > 50 ? comunicado.titulo.substr(0, 47) + '...' : comunicado.titulo)

      let colAcoes = document.createElement('td')
      colAcoes.classList.add('text-center', 'align-middle')

      let linkEditar = document.createElement('a')
      linkEditar.setAttribute('id', 'editarComunicado' + comunicado.id)
      linkEditar.classList.add('text-primary', 'text-decoration-none')
      linkEditar.setAttribute('data-target', '#modalEditarComunicado')
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
      tableRow.append(colAtualizacao)
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
  } else {
    resultado.errors.forEach(error => {
      createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
    })
  }
  $('body').removeClass('loading')
}
