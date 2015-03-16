var mensajesPendientes = 0;


jQuery(document).ready(function() {

    $("#boton1").hide();

    $(function() {
        $( "#tabs" ).tabs();
    });
    
    //funcion que muestra los mensajes descargados
    function mostrarMensaje (data){ 
        for (var i in data){
            $( "#mens" ).append("<div><p>" + '<img id="img" src='+ data[i].Avatar + ' />' + "  " + data[i].Autor + "  ---  " + data[i].Titulo + "  ---<div><p>");
            $( "#mens" ).append("<div><p>" + data[i].Contenido + "<li>" + data[i].Fecha + "</li>" + "</p></div>");
        }
        $("#mens").accordion();
    };
    
    //Primero descargo los mensajes del timeline
    $.getJSON("timeline.json", function(data) {
        console.log("11111111111111!");
        mostrarMensaje(data.Mensajes);    
    });
    
    
    
    //Miro a ver los mensajes que hay pendientes
    $.getJSON("update.json", function(data) {
        mensajesPendientes = data.Mensajes.length;
        console.log(mensajesPendientes);
        if(mensajesPendientes != 0){
            $( "#tabs-1" ).prepend("<p>" + "Mensajes pendientes:  " + mensajesPendientes + "</p>");
            $("#boton1").show();
        }else{
            $( "#tabs-1" ).prepend("<p>" + "No hay mensajes pendientes</p>");
        }
    });
});
