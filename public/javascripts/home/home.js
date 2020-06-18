// $('#btnCadastrarCorrespondencia').on('click', async () => {
//     let modal = $('#modalNovaCorrespondencia')

//     let bloco_id = modal.find('#selectBloco').val()
//     let apartamento_id = modal.find('#selectApartamento').val()
//     let tipo_correspondencia_id = modal.find('#selectTipo').val()
//     let morador_id = modal.find('#idMorador').val()
//     let rastreio = modal.find('#rastreio').val()

//     $('body').addClass('loading')
//     let resposta = await fetch(window.location.href, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         bloco_id,
//         apartamento_id,
//         tipo_correspondencia_id,
//         morador_id,
//         rastreio
//       })
//     })

//     let resultado = await resposta.json()

//     if (resposta.status == 200) {
//       createToast('', resultado.msg, 'success')

//       // hide modal
//       modal.modal('hide')

//       reload()
//     } else {
//       resultado.errors.forEach(error => {
//         createToast(error.msg ? error.msg : error.message, 'Algo deu errado!', 'danger')
//       })
//     }
//     $('body').removeClass('loading')
//   })

console.log('teste')



// document.getElementById("submitContato").addEventListener("click", function(event){
//     event.preventDefault()
//   });