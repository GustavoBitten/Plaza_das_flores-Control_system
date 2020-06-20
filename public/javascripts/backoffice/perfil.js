$(document).ready(function () {

    $('#cpf').mask("000.000.000-00") 
    $('.tel').mask("(00) 00000-0000") 
    $('.cpfDependente').mask("000.000.000-00") 
    $('.rgDependente').mask("00.000.000-0") 
   

    $('.addDependente').click(function () {

        $('.cpfDependente').unmask()
        $('.rgDependente').unmask() 

    })

    

})



