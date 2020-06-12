var lastCount, newCount

$(() => {
  init()
})

let init = () => {
  resetBindings()

  qtdCorrespondencias()

  $('#modalInfoCorrespondencia').on('show.bs.modal', async (event) => {
    let modal = $('#modalInfoCorrespondencia')
    let id = $(event.relatedTarget).data('id')

    let resposta = await fetch(window.location.href + '/' + id)

    if (resposta.status == 200) {
      let correspondencia = await resposta.json()

      modal.find('#tipoRastreio').append(
        correspondencia.rastreio ?
        correspondencia.tipo_correspondencia.tipo + ' - ' + correspondencia.rastreio :
        correspondencia.tipo_correspondencia.tipo
      )
      modal.find('#colData').append(formataData(correspondencia.created_at))
      modal.find('#colPorteiro').append(correspondencia.porteiro.nome)
      modal.find('#colNome').append(correspondencia.morador.nome)
      modal.find('#colEndereco').append(
        correspondencia.morador.ap.apartamento + '/' + correspondencia.morador.bl.bloco
      )
      modal.find('#colSituacao').append(correspondencia.status.situacao)
      modal.find('#colRetiradoPor').append(
        correspondencia.retirado ? correspondencia.retirado.nome : '-'
      )
      modal.find('#colDataRetirada').append(
        correspondencia.data_retirada ? formataData(correspondencia.data_retirada) : '-'
      )
    } else
      alert(resposta.status + ' - ' + resposta.statusText)
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

    let resposta = await fetch(window.location.href + '/getComboValues')

    if (resposta.status == 200) {
      let combos = await resposta.json()

      let comboBlocos = modal.find('#selectBloco')
      let comboApartamentos = modal.find('#selectApartamento')
      let comboTipos = modal.find('#selectTipo')

      let defaultOption = document.createElement('option')
      defaultOption.setAttribute('selected', 'selected')
      defaultOption.append('-')

      comboBlocos.append(defaultOption)
      comboApartamentos.append(defaultOption.cloneNode(true))
      comboTipos.append(defaultOption.cloneNode(true))

      combos.listaBlocos.forEach(bloco => {
        let option = document.createElement('option')
        option.setAttribute('value', bloco.id)
        option.append(bloco.bloco)

        comboBlocos.append(option)
      })

      combos.listaApartamentos.forEach(apartamento => {
        let option = document.createElement('option')
        option.setAttribute('value', apartamento.id)
        option.append(apartamento.apartamento)

        comboApartamentos.append(option)
      })

      combos.listaTipos.forEach(tipo => {
        let option = document.createElement('option')
        option.setAttribute('value', tipo.id)
        option.append(tipo.tipo)

        comboTipos.append(option)
      })
    } else
      alert(resposta.status + ' - ' + resposta.statusText)
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

    if (resposta.status == 200) {
      let correspondencia = await resposta.json()

      // hide modal
      modal.modal('hide')

      reload()
    } else
      alert(resposta.status + ' - ' + resposta.statusText)
  })

  $('a[id^=excluirCorrespondencia]').on('click', (event) => {
    let element = $(event.target.closest('.text-danger'))
    let id = element.data('id')

    // Show confirmation modal
    $('#modalExcluirCorrespondencia').modal('show')

    // If confirmed, delete
    $('a[id=btnDelete]').on('click', async (event) => {

      let resposta = await fetch(window.location.href + '/' + id, {
        method: 'DELETE'
      })

      if (resposta.status == 200) {
        let resultado = await resposta.json()

        reload()
      } else {
        alert(resposta.status + ' - ' + resposta.statusText)
      }

      $('#modalExcluirCorrespondencia').modal('hide')
    })
  })

  $("#modalExcluirCorrespondencia").on('hide.bs.modal', () => {
    init()
  })

  $('#modalRetiradaCorrespondencia').on('show.bs.modal', async (event) => {
    let modal = $('#modalRetiradaCorrespondencia')

    let idCorrespondencia = $(event.relatedTarget).data('id')

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

    if (resposta.status == 200) {
      let moradores = await resposta.json()

      let comboMoradores = modal.find('#nomeRetirada')

      let defaultOption = document.createElement('option')
      defaultOption.setAttribute('selected', 'selected')
      defaultOption.append('-')

      comboMoradores.append(defaultOption)

      moradores.forEach(morador => {
        let option = document.createElement('option')
        option.setAttribute('value', morador.id)
        option.append(morador.nome)

        comboMoradores.append(option)
      })

      modal.find('#hiddenCorrespondenciaId').text(idCorrespondencia)
    } else
      alert(resposta.status + ' - ' + resposta.statusText)
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

    if (resposta.status == 200) {
      let registro = await resposta.json()

      // hide modal
      modal.modal('hide')

      reload()
    } else
      alert(resposta.status + ' - ' + resposta.statusText)
  })
}

let resetBindings = () => {
  $('#modalInfoCorrespondencia').unbind('show.bs.modal')
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

      if (resposta.status == 200) {
        let morador = await resposta.json()

        let inputNome = modal.find('#nomeMorador')
        let inputId = modal.find('#idMorador')

        if (morador.error) {
          inputNome.val(morador.error)
          inputId.val('')
        } else {
          inputNome.val(morador.nome)
          inputId.val(morador.id)
        }
      } else
        alert(resposta.status + ' - ' + resposta.statusText)
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
  let resposta = await fetch(window.location.href + '/getCount')

  if (resposta.status == 200) {
    let resultado = await resposta.json()

    lastCount = newCount
    newCount = resultado.qtdCorrespondencias
  } else
    alert(resposta.status + ' - ' + resposta.statusText)
}

let reload = async () => {
  let resposta = await fetch(window.location.href + '/getCorrespondencias')

  if (resposta.status == 200) {
    const resultado = await resposta.json()

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

        let editar = document.createElement('a')
        editar.setAttribute('id', 'editar')
        editar.classList.add('text-primary', 'ml-3')
        editar.setAttribute('data-target', '#modal')
        editar.setAttribute('data-id', '')
        editar.setAttribute('title', 'Editar')

        let iconeEditar = document.createElement('i')
        iconeEditar.classList.add('fas', 'fa-edit')
        editar.append(iconeEditar)

        let excluir = document.createElement('a')
        excluir.setAttribute('id', 'excluirCorrespondencia' + correspondencia.id)
        excluir.classList.add('text-danger', 'ml-3')
        excluir.setAttribute('data-id', correspondencia.id)
        excluir.setAttribute('title', 'Excluir')

        let iconeExcluir = document.createElement('i')
        iconeExcluir.classList.add('fas', 'fa-trash-alt')
        excluir.append(iconeExcluir)

        colunaAcoes.append(info)
        colunaAcoes.append(editar)
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
  } else
    alert(resposta.status + ' - ' + resposta.statusText)
}