var mensajesPendientes = 0;
var timeline = "";

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
        timeline = data.Mensajes;
        mostrarMensaje(data.Mensajes, "#mens");    
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
    
    $.getJSON("myline.json", function(data) {
        mostrarMensaje(data.Mensajes, "#tabs-2");    
    });
    
    $("#boton1").click(function(){
        if (mensajesPendientes != 0){
            mensajesPendientes = 0;
            $( "#tabs-1 p" ).html("Mensajes pendientes:  " + mensajesPendientes);
            $.getJSON("update.json", function(data) {
              
                mostrarMensaje(data.Mensajes, "#upd");       
            });
        }
    });
});
