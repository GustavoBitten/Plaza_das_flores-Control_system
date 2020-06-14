var lastCount, newCount
var hasError = false

$(() => {
  init()
})

let init = () => {
  resetBindings()

  qtdCorrespondencias()

  $('#modalInfoCorrespondencia').on('show.bs.modal', async (event) => {
    let modal = $('#modalInfoCorrespondencia')
    let id = $(event.relatedTarget).data('id')

    $('body').addClass('loading')
    let resposta = await fetch(window.location.href + '/' + id)

    let resultado = await resposta.json()

    if (resposta.status == 200) {
      modal.find('#tipoRastreio').append(
        resultado.rastreio ?
        resultado.tipo_correspondencia.tipo + ' - ' + resultado.rastreio :
        resultado.tipo_correspondencia.tipo
      )
      modal.find('#colData').append(formataData(resultado.created_at))
      modal.find('#colPorteiro').append(resultado.porteiro.nome)
      modal.find('#colNome').append(resultado.morador.nome)
      modal.find('#colEndereco').append(
        resultado.morador.ap.apartamento + '/' + resultado.morador.bl.bloco
      )
      modal.find('#colSituacao').append(resultado.status.situacao)
      modal.find('#colRetiradoPor').append(
        resultado.retirado ? resultado.retirado.nome : '-'
      )
      modal.find('#colDataRetirada').append(
        resultado.data_retirada ? formataData(resultado.data_retirada) : '-'
      )
    } else {
      hasError = true

      resultado.errors.forEach(error => {
        createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
      })
    }
    $('body').removeClass('loading')
  })

  $('#modalInfoCorrespondencia').on('shown.bs.modal', () => {
    if (hasError)
      $('#modalInfoCorrespondencia').modal('hide')

    hasError = false
  })

  $('#modalInfoCorrespondencia').on('hide.bs.modal', () => {
    let modal = $('#modalInfoCorrespondencia')

    modal.find('#tipoRastreio').text('')
    modal.find('#colData').text('')
    modal.find('#colPorteiro').text('')
    modal.find('#colNome').text('')
    modal.find('#colEndereco').text('')
    modal.find('#colSituacao').text('')
    modal.find('#colRetiradoPor').text('')
    modal.find('#colDataRetirada').text('')
  })

  $('#modalNovaCorrespondencia').on('show.bs.modal', async () => {
    let modal = $('#modalNovaCorrespondencia')

    $('body').addClass('loading')
    let resposta = await fetch(window.location.href + '/getComboValues')

    let resultado = await resposta.json()

    if (resposta.status == 200) {
      let comboBlocos = modal.find('#selectBloco')
      let comboApartamentos = modal.find('#selectApartamento')
      let comboTipos = modal.find('#selectTipo')

      let defaultOption = document.createElement('option')
      defaultOption.setAttribute('selected', 'selected')
      defaultOption.append('-')

      comboBlocos.append(defaultOption)
      comboApartamentos.append(defaultOption.cloneNode(true))
      comboTipos.append(defaultOption.cloneNode(true))

      resultado.listaBlocos.forEach(bloco => {
        let option = document.createElement('option')
        option.setAttribute('value', bloco.id)
        option.append(bloco.bloco)

        comboBlocos.append(option)
      })

      resultado.listaApartamentos.forEach(apartamento => {
        let option = document.createElement('option')
        option.setAttribute('value', apartamento.id)
        option.append(apartamento.apartamento)

        comboApartamentos.append(option)
      })

      resultado.listaTipos.forEach(tipo => {
        let option = document.createElement('option')
        option.setAttribute('value', tipo.id)
        option.append(tipo.tipo)

        comboTipos.append(option)
      })
    } else {
      resultado.errors.forEach(error => {
        createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
      })
    }
    $('body').removeClass('loading')
  })

  $('#modalNovaCorrespondencia').on('shown.bs.modal', () => {
    let modal = $('#modalNovaCorrespondencia')
    modal.find('#rastreio').focus()
  })

  $('#selectBloco').on('change', () => {
    buscarNomeMorador()
  })

  $('#selectApartamento').on('change', () => {
    buscarNomeMorador()
  })

  // Reset modal
  $('#modalNovaCorrespondencia').on('hidden.bs.modal', async () => {
    let modal = $('#modalNovaCorrespondencia')

    modal.find('#selectApartamento').text('')
    modal.find('#selectBloco').text('')
    modal.find('#selectTipo').text('')

    modal.find('form')[0].reset()
  })

  $('#btnCadastrarCorrespondencia').on('click', async () => {
    let modal = $('#modalNovaCorrespondencia')

    let bloco_id = modal.find('#selectBloco').val()
    let apartamento_id = modal.find('#selectApartamento').val()
    let tipo_correspondencia_id = modal.find('#selectTipo').val()
    let morador_id = modal.find('#idMorador').val()
    let rastreio = modal.find('#rastreio').val()

    $('body').addClass('loading')
    let resposta = await fetch(window.location.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bloco_id,
        apartamento_id,
        tipo_correspondencia_id,
        morador_id,
        rastreio
      })
    })

    let resultado = await resposta.json()

    if (resposta.status == 200) {
      createToast('', resultado.msg, 'success')

      // hide modal
      modal.modal('hide')

      reload()
    } else {
      resultado.errors.forEach(error => {
        createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
      })
    }
    $('body').removeClass('loading')
  })

  $('a[id^=excluirCorrespondencia]').on('click', (event) => {
    let element = $(event.target.closest('.text-danger'))
    let id = element.data('id')

    // Show confirmation modal
    $('#modalExcluirCorrespondencia').modal('show')

    // If confirmed, delete
    $('a[id=btnDelete]').on('click', async (event) => {
      $('#modalExcluirCorrespondencia').modal('hide')
      $('body').addClass('loading')

      let resposta = await fetch(window.location.href + '/' + id, {
        method: 'DELETE'
      })

      let resultado = await resposta.json()

      if (resposta.status == 200) {
        reload()
      } else {
        resultado.errors.forEach(error => {
          createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
        })
      }

      $('body').removeClass('loading')
    })
  })

  $("#modalExcluirCorrespondencia").on('hide.bs.modal', () => {
    init()
  })

  $('#modalRetiradaCorrespondencia').on('show.bs.modal', async (event) => {
    let modal = $('#modalRetiradaCorrespondencia')

    let idCorrespondencia = $(event.relatedTarget).data('id')

    $('body').addClass('loading')
    let resposta = await fetch(window.location.href + '/getMoradorDependentes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idCorrespondencia
      })
    })

    let resultado = await resposta.json()

    if (resposta.status == 200) {
      let comboMoradores = modal.find('#nomeRetirada')

      let defaultOption = document.createElement('option')
      defaultOption.setAttribute('selected', 'selected')
      defaultOption.append('-')

      comboMoradores.append(defaultOption)

      resultado.forEach(morador => {
        let option = document.createElement('option')
        option.setAttribute('value', morador.id)
        option.append(morador.nome)

        comboMoradores.append(option)
      })

      modal.find('#hiddenCorrespondenciaId').text(idCorrespondencia)
    } else {
      resultado.errors.forEach(error => {
        createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
      })
    }
    $('body').removeClass('loading')
  })

  $('#modalRetiradaCorrespondencia').on('hide.bs.modal', () => {
    let modal = $('#modalRetiradaCorrespondencia')

    modal.find('#nomeRetirada').text('')
    modal.find('#hiddenCorrespondenciaId').text('')
  })

  $('#btnRegistrarRetirada').on('click', async () => {
    let modal = $('#modalRetiradaCorrespondencia')

    let idCorrespondencia = modal.find('#hiddenCorrespondenciaId').text()
    // Recuperar o id do morador
    let idMorador = modal.find('#nomeRetirada').val()

    modal.modal('hide')
    $('body').addClass('loading')
    let resposta = await fetch(window.location.href + '/registrarRetirada?_method=PUT', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idCorrespondencia,
        idMorador
      })
    })

    let resultado = await resposta.json()

    if (resposta.status == 200) {
      reload()
    } else {
      resultado.errors.forEach(error => {
        createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
      })
    }
    $('body').removeClass('loading')
  })
}

let resetBindings = () => {
  $('#modalInfoCorrespondencia').unbind('show.bs.modal')
  $('#modalInfoCorrespondencia').unbind('shown.bs.modal')
  $('#modalInfoCorrespondencia').unbind('hide.bs.modal')
  $('#modalNovaCorrespondencia').unbind('show.bs.modal')
  $('#modalNovaCorrespondencia').unbind('shown.bs.modal')
  $('#selectBloco').unbind('change')
  $('#selectApartamento').unbind('change')
  $('#modalNovaCorrespondencia').unbind('hidden.bs.modal')
  $('#btnCadastrarCorrespondencia').unbind('click')
  $('a[id^=excluirCorrespondencia]').unbind('click')
  $('a[id=btnDelete]').unbind('click')
  $("#modalExcluirCorrespondencia").unbind('hide.bs.modal')
  $('#modalRetiradaCorrespondencia').unbind('show.bs.modal')
  $('#modalRetiradaCorrespondencia').unbind('hide.bs.modal')
  $('#btnRegistrarRetirada').unbind('click')
}

let buscarNomeMorador = async () => {
  let modal = $('#modalNovaCorrespondencia')

    let bloco_id = modal.find('#selectBloco')[0].value
    let apartamento_id = modal.find('#selectApartamento')[0].value

    if (bloco_id != '-' && apartamento_id != '-') {
      $('body').addClass('loading')
      let resposta = await fetch(window.location.href + '/getMoradorCombo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bloco_id,
          apartamento_id
        })
      })

      let resultado = await resposta.json()

      if (resposta.status == 200) {
        let inputNome = modal.find('#nomeMorador')
        let inputId = modal.find('#idMorador')

        if (resultado.error) {
          inputNome.val(resultado.error)
          inputId.val('')
        } else {
          inputNome.val(resultado.nome)
          inputId.val(resultado.id)
        }
      } else {
        resultado.errors.forEach(error => {
          createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
        })
      }
      $('body').removeClass('loading')
    }
}

let formataData = (data) => {
  data = data.split('T')[0]
  let arrayData = data.split('-')
  let dia = arrayData[2]
  let mes = arrayData[1]
  let ano = arrayData[0]

  return dia + '/' + mes + '/' + ano
}

let qtdCorrespondencias = async () => {
  $('body').addClass('loading')
  let resposta = await fetch(window.location.href + '/getCount')

  let resultado = await resposta.json()

  if (resposta.status == 200) {
    lastCount = newCount
    newCount = resultado.qtdCorrespondencias
  } else {
    resultado.errors.forEach(error => {
      createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
    })
  }
  $('body').removeClass('loading')
}

let reload = async () => {
  $('body').addClass('loading')
  let resposta = await fetch(window.location.href + '/getCorrespondencias')

  let resultado = await resposta.json()

  if (resposta.status == 200) {
    if (newCount == 0 && (lastCount == 0 || lastCount == undefined))
      location.reload()

    if (resultado.listaCorrespondencias.length > 0) {
      let tbody = $('#tableBody')
      tbody.text('')

      resultado.listaCorrespondencias.forEach(correspondencia => {
        let tr = document.createElement('tr')

        let colunaData = document.createElement('td')
        colunaData.classList.add('text-center', 'align-middle')
        colunaData.append(formataData(correspondencia.created_at))

        let colunaMorador = document.createElement('td')
        colunaMorador.classList.add('text-center', 'align-middle', 'text-nowrap')
        colunaMorador.append(correspondencia.morador.nome)

        let colunaEndereco = document.createElement('td')
        colunaEndereco.classList.add('text-center', 'align-middle', 'text-nowrap')
        colunaEndereco.append(correspondencia.morador.ap.apartamento + '/' + correspondencia.morador.bl.bloco)

        let colunaTipo = document.createElement('td')
        colunaTipo.classList.add('text-center', 'align-middle', 'text-nowrap')
        colunaTipo.append(correspondencia.tipo_correspondencia.tipo)

        let colunaRastreio = document.createElement('td')
        colunaRastreio.classList.add('text-center', 'align-middle', 'text-nowrap')
        colunaRastreio.append(correspondencia.rastreio ? correspondencia.rastreio : '-')

        let colunaSituacao = document.createElement('td')
        colunaSituacao.classList.add('text-center', 'align-middle')
        colunaSituacao.append(correspondencia.status.situacao)

        let colunaRetiradoPor = document.createElement('td')
        colunaRetiradoPor.classList.add('text-center', 'align-middle', 'text-nowrap')
        if (correspondencia.retirado_por)
          colunaRetiradoPor.append(correspondencia.retirado.nome)
        else {
          let retirada = document.createElement('a')
          retirada.setAttribute('id', 'btnRetirada' + correspondencia.id)
          retirada.classList.add('text-success')
          retirada.setAttribute('data-toggle', 'modal')
          retirada.setAttribute('data-target', '#modalRetiradaCorrespondencia')
          retirada.setAttribute('data-id', correspondencia.id)
          retirada.setAttribute('title', 'Registrar retirada')

          let iconeRetirada = document.createElement('i')
          iconeRetirada.classList.add('fas', 'fa-plus-circle')

          retirada.append(iconeRetirada)

          colunaRetiradoPor.append(retirada)
        }

        let colunaDataRetirada = document.createElement('td')
        colunaDataRetirada.classList.add('text-center', 'align-middle')
        colunaDataRetirada.append(
          correspondencia.data_retirada ? formataData(correspondencia.data_retirada) : '-'
        )

        let colunaAcoes = document.createElement('td')
        colunaAcoes.classList.add('text-center', 'align-middle')

        let info = document.createElement('a')
        info.setAttribute('id', 'info')
        info.classList.add('text-info')
        info.setAttribute('data-toggle', 'modal')
        info.setAttribute('data-target', '#modalInfoCorrespondencia')
        info.setAttribute('data-id', correspondencia.id)
        info.setAttribute('title', 'Detalhes')

        let iconeInfo = document.createElement('i')
        iconeInfo.classList.add('fas', 'fa-info-circle')
        info.append(iconeInfo)

        // let editar = document.createElement('a')
        // editar.setAttribute('id', 'editar')
        // editar.classList.add('text-primary', 'ml-3')
        // editar.setAttribute('data-target', '#modal')
        // editar.setAttribute('data-id', '')
        // editar.setAttribute('title', 'Editar')

        // let iconeEditar = document.createElement('i')
        // iconeEditar.classList.add('fas', 'fa-edit')
        // editar.append(iconeEditar)

        let excluir = document.createElement('a')
        excluir.setAttribute('id', 'excluirCorrespondencia' + correspondencia.id)
        excluir.classList.add('text-danger', 'ml-3')
        excluir.setAttribute('data-id', correspondencia.id)
        excluir.setAttribute('title', 'Excluir')

        let iconeExcluir = document.createElement('i')
        iconeExcluir.classList.add('fas', 'fa-trash-alt')
        excluir.append(iconeExcluir)

        colunaAcoes.append(info)
        // colunaAcoes.append(editar)
        colunaAcoes.append(excluir)

        tr.append(colunaData)
        if (user.tipo_usuario_id != 1) {
          tr.append(colunaMorador)
          tr.append(colunaEndereco)
        }
        tr.append(colunaTipo)
        if (user.tipo_usuario_id == 1)
          tr.append(colunaRastreio)

        tr.append(colunaSituacao)
        tr.append(colunaRetiradoPor)
        tr.append(colunaDataRetirada)
        tr.append(colunaAcoes)

        tbody.append(tr)
      })
    } else {
      let div = $('.col-12.table-responsive')
      div.text('')

      let h4 = document.createElement('h4')
      h4.classList.add('text-danger')
      h4.append('Nenhuma correspondência registrada!')

      div.append(h4)
    }

    init()
  } else {
    resultado.errors.forEach(error => {
      createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
    })
  }
  $('body').removeClass('loading')
}
