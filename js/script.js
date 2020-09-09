$(document).ready(function(){

    ottieniTodo();

    // aggiungi to do al click sul bottone
    $('form#post-todo button').click(function(){
        var nuovoTodoBottone = $('input#todo').val();
        aggiungiTodo(nuovoTodoBottone);
    });

    // aggiungi to do premendo invio
    $('input#todo').keydown(function(event){
        if (event.keyCode == 13 || event.which == 13){
            var nuovoTodoInvio = $(this).val();
            aggiungiTodo(nuovoTodoInvio);
        }
    })

    // cancella un to do cliccando sulla X
    $(document).on('click','span.delete',function(){
        var idDaCancellare = $(this).parent().attr('data-id');
        eliminaTodo(idDaCancellare);
    });

    // rendi visibile l'input per modificare una to do
    $(document).on('click','span.testo',function(){                     // al click sul testo del to do
        $(this).addClass('hidden');                                         // nasconde il testo
        $(this).siblings('input.da-fare').removeClass('hidden').focus();    // mostra l'input per modificare

    });

    // cliccando fuori dall'input torna visibile il teso
    $(document).on('focusout','input.da-fare',function(){               // al click fuori dall'input
        $(this).addClass('hidden');                                         // nasconde l'input
        $(this).siblings('span.testo').removeClass('hidden');               // mostra il testo
    });

    // modificando e premendo invio il testo si modifica
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
// - iconicine invece delle X https://fontawesome.com/icons/times?style=solid

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
            method:'POST',
            data:{
                text: val
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
                alert('Si è verificato un errore');
            }
        }
    )
}
