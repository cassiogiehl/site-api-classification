$(document).ready(function() {
    $.ajax({
        url: "http://localhost:5000/",
        type: "GET",
        success: function(data) {
            console.log('Conexão com a API efetuada com sucesso');
        },
        error: function(data) {
            console.log('Erro na conexão com a API');
        }
    })

    $('.classify').click(function() {
        console.log("Classificando...")

        let form_data = JSON.stringify({
                'sepal_lenght': parseInt($('input[name="sepal_lenght"]').val()),
                'sepal_width': parseInt($('input[name="sepal_width"]').val()),
                'petal_lenght': parseInt($('input[name="petal_lenght"]').val()),
                'petal_width': parseInt($('input[name="petal_width"]').val())
        })

        $.ajax({
            url: "http://127.0.0.1:5000/predict",
            type: "POST",
            dataType: 'json',
            data: form_data,
            success: function(data) {
                if(data.predicted == 0) { 
                    classification = 'Sua íris foi classificada como SETOSA' 
                } else if(data.predicted == 1) { 
                    classification = 'Sua íris foi classificada como VERSICOLOR' 
                } else if(data.predicted == 2) { 
                    classification = 'Sua íris foi classificada como VIRGÍNICA' 
                }

                $('.classification').empty()
                                    .append(classification)
            },
            error: function(data) {
                console.log('AJAX Error');
                console.log(data);
            }
        })
    });
});