$(() => {
  init()
})

// $(document).on('change', () => {
//   init()
// })

let init = () => {
  resetBindings()

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
}

let resetBindings = () => {
  $('#modalNovaCorrespondencia').unbind('show.bs.modal')
  $('#modalNovaCorrespondencia').unbind('shown.bs.modal')
  $('#selectBloco').unbind('change')
  $('#selectApartamento').unbind('change')
  $('#modalNovaCorrespondencia').unbind('hidden.bs.modal')
  $('#btnCadastrarCorrespondencia').unbind('click')
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

        if(morador.error)
          inputNome.val(morador.error)
        else {
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

let reload = async () => {
  let tbody = $('#tableBody')
  tbody.text('')

  let resposta = await fetch(window.location.href + '/getCorrespondencias')

  if (resposta.status == 200) {
    const resultado = await resposta.json()

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
        let button = document.createElement('button')
        button.setAttribute('id', 'btnRetirada')
        button.setAttribute('type', 'button')
        button.classList.add('btn-sm', 'btn-orange', 'border-0', 'rounded-pill', 'font-weight-bold')
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#modal')
        button.append('Registrar')

        colunaRetiradoPor.append(button)
      }

      let colunaDataRetirada = document.createElement('td')
      colunaDataRetirada.classList.add('text-center', 'align-middle')
      colunaDataRetirada.append(formataData(correspondencia.updated_at))

      let colunaAcoes = document.createElement('td')
      colunaAcoes.classList.add('text-center', 'align-middle')

      let editar = document.createElement('a')
      editar.setAttribute('id', 'editar')
      editar.classList.add('text-primary', 'text-decoration-none')
      editar.setAttribute('data-target', '#modal')
      editar.setAttribute('data-id', '')
      editar.setAttribute('title', 'Editar')

      let iconeEditar = document.createElement('i')
      iconeEditar.classList.add('fas', 'fa-edit')
      editar.append(iconeEditar)

      let excluir = document.createElement('a')
      excluir.setAttribute('id', 'excluir')
      excluir.classList.add('text-danger', 'ml-3', 'mt-3')
      excluir.setAttribute('data-id', '')
      excluir.setAttribute('title', 'Excluir')

      let iconeExcluir = document.createElement('i')
      iconeExcluir.classList.add('fas', 'fa-trash-alt')
      excluir.append(iconeExcluir)

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
  } else
    alert(resposta.status + ' - ' + resposta.statusText)
}
