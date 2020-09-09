$(document).ready(function(){

    ottieniTodo();

    var nuovoTodo;

    $('form#post-todo button').click(function(){
        nuovoTodo = $('input#todo').val();
        aggiungiTodo(nuovoTodo);
    });

    // $('input#todo').keyup(function(event){
    //     if (event.keyCode == 13 || event.which == 13){
    //         console.log('ok');
    //         // nuovoTodo = $('input#todo').val();
    //         // console.log(nuovoTodo);
    //         // aggiungiTodo(nuovoTodo);
    //     }
    // })

    $(document).on('click','span.delete',function(){
        var idDaCancellare = $(this).parent().attr('data-id');
        eliminaTodo(idDaCancellare);
    });

    $(document).on('click','span.testo',function(){                     // al click sul testo del to do
        $(this).addClass('hidden');                                         // nasconde il testo
        $(this).siblings('input.da-fare').removeClass('hidden').focus();    // mostra l'input per modificare

    });

    // 1 - cliccando fuori le classi si ri invertono
    $(document).on('focusout','input.da-fare',function(){               // al click fuori dall'input
        $(this).addClass('hidden');                                         // nasconde l'input
        $(this).siblings('span.testo').removeClass('hidden');               // mostra il testo
    });

    // 2 - deve realmente modificare
    $(document).on('keydown','input.da-fare',(function(event){
        if (event.keyCode == 13 || event.which == 13){
            var nuovoTodo = $(this).val();
            var idDaModificare = $(this).parent().attr('data-id');
            sostituisciTodo(nuovoTodo, idDaModificare);
        }
    }))

})

// DA FARE
// - post all'invio con tasto invio
// - iconicine invece delle X

// ---- funzioni ---- //

function ottieniTodo(){
    $.ajax(
        {
            url:'http://157.230.17.132:3008/todos',
            method:'GET',
            success: function(risposta){
                stampaTodo(risposta);
            },
            error: function(){
                alert('Si è verificato un errore');
            }
        }
    )
}

function stampaTodo(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++){
        var context = {
            todo: data[i].text,
            id: data[i].id
        };
        var html = template(context);
        $('#to-dos').append(html);
    }
}

function aggiungiTodo(val){
    $.ajax(
        {
            url:'http://157.230.17.132:3008/todos',
            method:'PUSH',
            data:{
                text: val
            },
            success: function(risposta){
                $('ol#to-dos').empty();
                ottieniTodo();
                stampaTodo(risposta);
            },
            error: function(){
                alert('Si è verificato un errore');
            }
        }
    )
}

function eliminaTodo(id){
    $.ajax(
        {
            url:'http://157.230.17.132:3008/todos/' + id,
            method:'DELETE',
            success: function(risposta){
                $('ol#to-dos').empty();
                ottieniTodo();
                stampaTodo(risposta);
            },
            error: function(){
                alert('Si è verificato un errore');
            }
        }
    )
}

function sostituisciTodo(val, id){
    $.ajax(
        {
            url:'http://157.230.17.132:3008/todos/' + id,
            method:'PUT',
            data:{
                text:val
            },
            success: function(risposta){
                $('ol#to-dos').empty();
                ottieniTodo();
                stampaTodo(risposta);
            },
            error: function(){
                alert('Si è verificato un errore qui');
            }
        }
    )
}
