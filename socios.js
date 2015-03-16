var mensajesPendientes = 0;

jQuery(document).ready(function() {
    $(function() {
        $( "#tabs" ).tabs();
    });
    
    $.getJSON("json-update.json", function(data) {
        pendientes = data.update.length;
        $( ".jumbotron" ).prepend("<p>" + "Mensajes pendientes:  " + pendientes + "</p>");
  });
});
