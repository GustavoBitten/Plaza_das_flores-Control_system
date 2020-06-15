


$(() => {
  init()
});

$(document).on('change', () => {
  init()
})


let init = () => {
  //resetBindings()

  $(document).ready(function () {

    $('input.checkgroup').click(function () {
      if ($(this).is(":checked")) {
        $('input.checkgroup').attr('disabled', true);
        $(this).removeAttr('disabled');
      } else {
        $('input.checkgroup').removeAttr('disabled');
      }
    })

    // Detalhes Ocorrencias 

    $(document).on('click', '.view_data', function () {
      let ocorrenciaId = $(this).attr('id')

      fetch(window.location + '/' + ocorrenciaId).then(function (resultado) {
        return resultado.json()
      }).then(function (ocorrencia) {
        $('#viewDetalhes').modal('show')
        $('#ocorrenciaTitulo').html(ocorrencia.titulo)
        $('#ocorrenciaMensagem').html(ocorrencia.mensagem)
        $('#ocorrenciaRespostaSindico').html(ocorrencia.resposta)
        $('#ocorrenciaFoto').attr("src", ocorrencia.arquivo)
        return ocorrencia//status(200).json({msg: sucesso})
      })

    })



    //Delete Ocorrencia
    $(document).on('click', '.delete_data', function () {
      let ocorrenciaId = $(this).attr('id')
      $('#deleteOcorrencia').modal('show')


      $(document).on('click', '#delete', function () {
      fetch(window.location + '/delete/' + ocorrenciaId, {
         method: 'DELETE' 
        })
        .then(function (resultado) {
          resultado.json();
        })
        .then(function(ocorrencia){
         console.log(ocorrencia)
         $('#deleteOcorrencia').modal('hide')
         location.reload()
        })
     })
      
   })
   



  
   $(document).on('click', '.put_data', function () {
    let ocorrenciaId = $(this).attr('id')
    $('#putResposta').modal('show')


    $(document).on('click', '#responderOcorrencia', function () {
      
    $('#formResposta').attr("action", `/backoffice/${typeUrl}/ocorrencias/editar/${ocorrenciaId}?_method=PUT`)
    
    fetch(window.location + '/editar/' + ocorrenciaId + '?_method=PUT', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status_ocorrencia_id: $('#statusOcorrencia').val(),
        resposta: $('#respostaOcorrenai').val()
      })
    }) .then(function (resultado) {
      resultado.json();
    })
    .then(function(ocorrencia){
     $('#putResposta').modal('hide')
    // location.reload()
    })
      
     })

 })

  })
}



