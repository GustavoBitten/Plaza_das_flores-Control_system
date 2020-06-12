class Financeiro {
    constructor(){
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
}

const test = new Financeiro


