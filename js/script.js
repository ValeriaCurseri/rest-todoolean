// Completare l’esercizio iniziato a lezione sulla todo-list.
// Utilizzare l’API di esempio http://157.230.17.132:3008
// e fare le 4 operazioni Create, Read, Update e Delete.

$(document).ready(function(){

    ottieniTodo();

    // $('form#post-todo button').click(function(){
    //     aggiungiTodo();
    // });
    //
    // $('form#post-todo input').keyup(function(event){
    //     if(event.keyCode == 13 || event.which == 13){
    //         aggiungiTodo();
    //     }
    // });

})

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
            todo: data[i].text
        };
        var html = template(context);
        $('#to-dos').append(html);
    }
}

// function aggiungiTodo(){
//     var nuovoTodo = $('form#post-todo input').val();
// }
