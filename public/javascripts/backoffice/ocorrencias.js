

$(() => {
  init()
});

$(document).on('change', () => {
  init()
})


let init = () => {
  //resetBindings()

  $(document).ready(function(){  

    $('input.checkgroup').click(function(){ 
      if($(this).is(":checked")){ 
         $('input.checkgroup').attr('disabled',true);
       $(this).removeAttr('disabled'); 
        }else{ 
        $('input.checkgroup').removeAttr('disabled');
          } 
         })
        
  
         $(document).on('click','.view_data', function(){
           let ocorrenciaId = $(this).attr('id')
           //alert(ocorrenciaId);
          // alert(window.location+'/'+ocorrenciaId)
           
           fetch(window.location+'/'+ocorrenciaId).then(function(resultado){
             return resultado.json()
            }).then(function(ocorrencia){
            //let ocorrenciaView = JSON.stringify(ocorrencia)
           // console.log(ocorrencia.id)
           // alert(ocorrencia.mensagem);
            $('#viewDetalhes').modal('show')
            $('#ocorrenciaTitulo').html(ocorrencia.titulo)
            $('#ocorrenciaMensagem').html(ocorrencia.mensagem)
            $('#ocorrenciaRespostaSindico').html(ocorrencia.resposta)
            $('#ocorrenciaFoto').attr("src",ocorrencia.arquivo)

           // alert(teste1)


            return ocorrencia//status(200).json({msg: sucesso})
            
          })
          
          })


        })
}

