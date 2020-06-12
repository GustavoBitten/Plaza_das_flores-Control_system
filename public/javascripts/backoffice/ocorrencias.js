

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
      fetch(window.location + '/delete/' + ocorrenciaId, { method: 'DELETE' })
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


  })
}
