$(document).ready(function () {

    $('.tel').mask("(00) 00000-0000") 

    $('#cpf').mask("000.000.000-00") 
    $('.cpfDependente').mask("000.000.000-00") 
    $('.cpfFuncionario').mask("000.000.000-00")

    $('.rgDependente').mask("00.000.000-0") 
    $('.rgVisitante').mask("00.000.000-0") 
    $('.rgFuncionario').mask("00.000.000-0") 
    $('.rgEmpresa').mask("00.000.000-0") 

    $('.placaVeiculo').mask("AAA-0000")

    $('.cnpjEmpresa').mask("00.000.000/0000-00") 


   

    $('.addDependente').click(function () {

        $('.cpfDependente').unmask()
        $('.rgDependente').unmask() 

    })

    $('.addVisitante').click(function () {

        $('.rgVisitante').unmask() 

    })

    $('.addFuncionario').click(function () {
        $('.cpfFuncionario').unmask()
        $('.rgFuncionario').unmask() 

    })

    $('.addVeiculo').click(function () {
        $('.placaVeiculo').unmask()

    })

    $('.addEmpresa').click(function () {
        $('.rgEmpresa').unmask()
        $('.cnpjEmpresa').unmask()

    })

    

})



