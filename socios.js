var mensajesPendientes = 0;
var mensajesP = "";

jQuery(document).ready(function() {

    $("#boton1").hide();

    $(function() {
        $( "#tabs" ).tabs();
    });
    
    //funcion que muestra los mensajes de timeline
    function mostrarMensaje (data, identificador){ 
        for (var i in data){
            $( identificador ).append("<div>" + '<img id="img" src='+ data[i].Avatar + ' />' + "  " + data[i].Autor + "  ---  " + data[i].Titulo + "  ---<div>");
            $( identificador ).append("<div>" + data[i].Contenido + "<li>" + data[i].Fecha + "</li>" + "</div>");
        }
        $(identificador).accordion({collapsible: true, active:false, heightStyle: "content"});
    };
   
    
    //Primero descargo los mensajes del timeline
    $.getJSON("timeline.json", function(data) {
        mostrarMensaje(data.Mensajes, "#mens");    
    });
       
    //Miro a ver los mensajes que hay pendientes
    $.getJSON("update.json", function(data) {
        mensajesPendientes = data.Mensajes.length;
        mensajesP = data.Mensajes;
        console.log(mensajesPendientes);
        if(mensajesPendientes != 0){
            $( "#tabs-1" ).prepend("<p>" + "Mensajes pendientes:  " + mensajesPendientes + "</p>");
            $("#boton1").show();
        }else{
            $( "#tabs-1" ).prepend("<p>" + "No hay mensajes pendientes</p>");
        }
    });
    
    //Descargo los mensajes del usuario para el myline
    $.getJSON("myline.json", function(data) {
        mostrarMensaje(data.Mensajes, "#tabs-2");    
    });
    
    //Cuando me pulsan el boton, muestro los mensajes que hay pendientes en update
    $("#boton1").click(function(){
        if (mensajesPendientes != 0){
            mensajesPendientes = 0;
            $( "#tabs-1 p" ).html("Mensajes pendientes:  " + mensajesPendientes);
            mostrarMensaje(mensajesP, "#upd");                 
        }
    });
});
