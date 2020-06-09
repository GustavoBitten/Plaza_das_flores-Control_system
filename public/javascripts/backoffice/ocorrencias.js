
$(function(){  
    $('input.checkgroup').click(function(){ 
      if($(this).is(":checked")){ 
         $('input.checkgroup').attr('disabled',true);
       $(this).removeAttr('disabled'); 
        }else{ 
        $('input.checkgroup').removeAttr('disabled');
          } 
         })
        }) 