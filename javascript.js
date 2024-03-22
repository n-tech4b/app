document.addEventListener('DOMContentLoaded', function() {

    // Adicione um event listener para as checkboxes da tabela "Gravidade da Infração"
    var gravidadeCheckboxes = document.querySelectorAll('#tabela_gravidade_infra input[type="checkbox"]');
    gravidadeCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Se esta checkbox foi marcada
            if (checkbox.checked) {
                // Percorra todas as checkboxes na tabela "Gravidade da Infração"
                gravidadeCheckboxes.forEach(function(otherCheckbox) {
                    // Desmarque as outras checkboxes, exceto a atualmente selecionada
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

    var impactoCheckboxes = document.querySelectorAll('#tabela_grau_impacto input[type="checkbox"]');
    impactoCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                impactoCheckboxes.forEach(function(otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

    // // Função para calcular e exibir a soma dos valores dos checkboxes selecionados
    // function calcularPontuacao() {
    //     var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    //     var soma = 0;

    //     checkboxes.forEach(function(checkbox) {
    //         if (checkbox.checked) {
    //             soma += parseInt(checkbox.parentNode.previousElementSibling.textContent); // Obtém o valor do elemento anterior na mesma linha
    //         }
    //     });

    //     // Exibir a soma no elemento
    //     document.getElementById('soma_pontuacao').textContent = soma;
    //     document.getElementById('pontos_gravidade').textContent = soma + " pontos";
   
    // }

    // Função para calcular a pontuação
    function calcularPontuacao() {
        // Calcular para a tabela de gravidade de infração
        var checkboxes1 = document.querySelectorAll('#tabela_gravidade_infra input[type="checkbox"]');
        var soma1 = 0;

        checkboxes1.forEach(function(checkbox) {
            if (checkbox.checked) {
                soma1 += parseInt(checkbox.parentNode.previousElementSibling.textContent.trim()); // Alterado para pegar o próximo próximo elemento
            }
        });

        // Exibir a soma no elemento correspondente
        document.getElementById('pontos_gravidade').textContent = soma1 + " ponto (s)";

        // Calcular para a tabela de grau de impacto
        var checkboxes2 = document.querySelectorAll('#tabela_grau_impacto input[type="checkbox"]');
        var soma2 = 0;

        checkboxes2.forEach(function(checkbox) {
            if (checkbox.checked) {
                soma2 += parseInt(checkbox.parentNode.previousElementSibling.textContent.trim()); // Alterado para pegar o próximo próximo elemento
            }
        });

        // Exibir a soma no elemento correspondente
        document.getElementById('pontos_impacto').textContent = soma2 + " ponto (s)";

        // Calcular para a tabela de circunstâncias agravantes
        var checkboxes4 = document.querySelectorAll('#tabela_c_agravantes input[type="checkbox"]');
        var soma4 = 0;

        checkboxes4.forEach(function(checkbox) {
            if (checkbox.checked) {
                soma4 += parseInt(checkbox.parentNode.previousElementSibling.textContent.trim()); // Alterado para pegar o próximo próximo elemento
            }
        });

        // Exibir a soma no elemento correspondente
        document.getElementById('pontos_agravantes').textContent = soma4 + " ponto (s)";

        // Calcular para a tabela de circunstâncias atenuantes
        var checkboxes3 = document.querySelectorAll('#tabela_c_atenuantes input[type="checkbox"]');
        var soma3 = 0;

        checkboxes3.forEach(function(checkbox) {
            if (checkbox.checked) {
                soma3 += parseInt(checkbox.parentNode.previousElementSibling.textContent.trim()); // Alterado para pegar o próximo próximo elemento
            }
        });

        // Exibir a soma no elemento correspondente
        document.getElementById('pontos_atenuantes').textContent = soma3 + " ponto (s)";

        let total_de_pontos = soma1 + soma2 + soma3 + soma4;

        document.getElementById('soma_pontuacao').textContent = total_de_pontos;

        document.getElementById('pontos_total').textContent = total_de_pontos + " ponto (s), equivalendo a 1 anuidade (s), conforme Tabela V da Resolução 198/2020.";


        var somaPontuacao = parseInt(document.getElementById('soma_pontuacao').textContent);
        var multiploAnuidade = calcularMultiploAnuidade(somaPontuacao);

        document.getElementById('pontos_total').textContent = total_de_pontos + " ponto (s), equivalendo a " + multiploAnuidade +  " anuidade (s), conforme Tabela V da Resolução 198/2020.";


    }

    // Adicionar um event listener para cada checkbox
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            calcularPontuacao();
        });
    });

    // Função para calcular o múltiplo de anuidade com base na soma da pontuação
    function calcularMultiploAnuidade(somaPontuacao) {
        // Se a pontuação for menor que 1, o múltiplo será 0
        if (somaPontuacao < 1) {
            return 1;
        }

        // Verificar se a somaPontuacao é maior que 19, se sim, retornar 10
        if (somaPontuacao > 19) {
            return 10;
        }

        // Se não estiver nos casos acima, calcular o múltiplo de anuidade normalmente
        var multiploAnuidade = Math.ceil(somaPontuacao / 2); // Divide a soma por 2 e arredonda para cima
        return multiploAnuidade;
    }

    // Função para atualizar o valor do múltiplo de anuidade no elemento HTML
    function atualizarMultiploAnuidade() {
        var somaPontuacao = parseInt(document.getElementById('soma_pontuacao').textContent);
        var multiploAnuidade = calcularMultiploAnuidade(somaPontuacao);
        document.getElementById('multiplo_anuidade').textContent = multiploAnuidade;
    }

    // Adicionar um event listener para calcular e atualizar o múltiplo de anuidade sempre que a pontuação for alterada
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            atualizarMultiploAnuidade();
        });
    });

    // Objeto contendo os valores da anuidade por ano
    var valoresAnuidade = {
        2012: 369.39,
        2013: 391.37,
        2014: 413.21,
        2015: 439.38,
        2016: 487.57,
        2017: 523.60,
        2018: 533.78,
        2019: 552.78,
        2020: 571.41,
        2021: 571.41,
        2022: 634.04,
        2023: 671.89,
        2024: 697.76
    };

    // Função para calcular e exibir o valor da anuidade com base no ano selecionado
    function calcularAnuidade() {
        // Obter o elemento select
        var selectAno = document.getElementById('inputGroupSelect01');
        // Obter o valor selecionado
        var anoSelecionado = parseInt(selectAno.value);
        // Verificar se o ano selecionado está presente no objeto de valores da anuidade
        if (valoresAnuidade.hasOwnProperty(anoSelecionado)) {
            // Obter o valor da anuidade para o ano selecionado
            var valorAnuidade = valoresAnuidade[anoSelecionado];
            // Exibir o valor da anuidade no elemento HTML
            document.getElementById('valor_anuidade').textContent = 'R$ ' + valorAnuidade.toFixed(2);
            // Atualizar o texto com o ano selecionado
            document.getElementById('ano_notificacao').textContent = 'Valor da anuidade base em ' + anoSelecionado + ' (ano da Notificação Preventiva): ';
        } else {
            // Se o ano selecionado não estiver presente no objeto de valores da anuidade, exibir uma mensagem de erro
            document.getElementById('valor_anuidade').textContent = '';
            document.getElementById('ano_notificacao').textContent = 'Valor da anuidade base em (ano da Notificação Preventiva): ';
        }
    }

    // Adicionar um event listener para o select para chamar a função calcularAnuidade quando o valor for alterado
    var selectAno = document.getElementById('inputGroupSelect01');
    selectAno.addEventListener('change', function() {
        calcularAnuidade();
    });

    // Função para calcular e exibir o valor da multa conforme a Resolução 198
    function calcularMultaRes198() {
        // Obter o valor do múltiplo de anuidade
        var multiploAnuidade = parseInt(document.getElementById('multiplo_anuidade').textContent);

        // Verificar se o valor do múltiplo de anuidade é maior que 0 e se o ano da notificação preventiva foi selecionado
        if (multiploAnuidade > 0 && document.getElementById('inputGroupSelect01').value !== 'Selecionar') {
            // Obter o valor da anuidade base
            var valorAnuidadeBase = parseFloat(document.getElementById('valor_anuidade').textContent.replace('R$ ', ''));

            // Calcular o valor da multa conforme a Resolução 198
            var valorMultaRes198 = valorAnuidadeBase * multiploAnuidade;

            // Exibir o valor da multa no elemento HTML
            document.getElementById('valor_multa_res198').textContent = 'R$ ' + valorMultaRes198.toFixed(2);
            // document.getElementById('valor_multa_res198_final').textContent = 'R$ ' + valorMultaRes198.toFixed(2);
        } else {
            // Se o valor do múltiplo de anuidade for 0 ou se o ano da notificação preventiva não foi selecionado,
            // exibir uma mensagem indicando que é necessário selecionar o ano da notificação preventiva
            document.getElementById('valor_multa_res198').textContent = ''; //em branco
        }
    }

    // Adicionar um event listener para chamar a função calcularMultaRes198 sempre que os valores forem alterados
    var inputs = document.querySelectorAll('input[type="checkbox"], select');
    inputs.forEach(function(input) {
        input.addEventListener('change', function() {
            calcularMultaRes198();
        });
    });

    // Adicionar event listener para o botão "Novo Cálculo"
    document.getElementById('novo_calculo').addEventListener('click', function() {
        // Recarregar a página
        location.reload();
    });

    // Adicionar um event listener para quando a página for completamente carregada
    window.onload = function() {
        // Rolar a página para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Isso fará a rolagem ser suave
        });
    };

    const copyButton = document.getElementById('copiar_tabela');
    copyButton.addEventListener('click', function() {
        const table = document.getElementById('tabela_resumo');
        console.log(table)
        const range = document.createRange();
        console.log(range)
        range.selectNode(table);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alert('Tabela copiada com sucesso.');
    });

    // Adicionando evento de escuta aos checkboxes da tabela de gravidade de infração
    var checkboxes1 = document.querySelectorAll('#tabela_gravidade_infra input[type="checkbox"]');
    checkboxes1.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            atualizarDescricaoInfracaoImpacto('descricao_gravidade', checkboxes1);
        });
    });

    // Adicionando evento de escuta aos checkboxes da tabela de grau de impacto
    var checkboxes2 = document.querySelectorAll('#tabela_grau_impacto input[type="checkbox"]');
    checkboxes2.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            atualizarDescricaoInfracaoImpacto('descricao_impacto', checkboxes2);
        });
    });

    // Adicionando evento de escuta aos checkboxes da tabela de circunstâncias agravantes
    var checkboxes3 = document.querySelectorAll('#tabela_c_agravantes input[type="checkbox"]');
    checkboxes3.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            atualizarDescricaoAgravantesAtenuantes('descricao_agravantes', checkboxes3);
        });
    });

    // Adicionando evento de escuta aos checkboxes da tabela de circunstâncias atenuantes
    var checkboxes4 = document.querySelectorAll('#tabela_c_atenuantes input[type="checkbox"]');
    checkboxes4.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            atualizarDescricaoAgravantesAtenuantes('descricao_atenuantes', checkboxes4);
        });
    });

    // Função para atualizar a descrição com base nos checkboxes selecionados
    function atualizarDescricaoInfracaoImpacto(idDescricao, checkboxes) {
        var descricao = '';
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                // Concatenar a descrição do checkbox selecionado
                descricao += checkbox.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim() + '';
            }
        });
        // Atualizar a descrição no elemento correspondente
        document.getElementById(idDescricao).textContent = descricao;
    }

    // Função para atualizar a descrição com base nos checkboxes selecionados
    function atualizarDescricaoAgravantesAtenuantes(idDescricao, checkboxes) {
        var descricao = '';
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                // Concatenar a descrição do checkbox selecionado
                descricao += checkbox.parentNode.previousElementSibling.previousElementSibling.textContent.trim() + "<br>";
            }
        });
        // Atualizar a descrição no elemento correspondente usando innerHTML
        document.getElementById(idDescricao).innerHTML = descricao;
    }

    


});