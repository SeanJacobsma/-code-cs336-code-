"use strict";

$( document ).ready(function() {
    //alert( "welcome" );

    $( "#myButton" ).click(function() {

      $.ajax({
        url: "http://127.0.0.1:3000/hello",
        data: {
          "text": "lab07"
        },
        type: "GET",
        dataType: "json",
      })

      .done(function( json ){
          var stuff = json['text'];
          $("<em>", {html: stuff}).appendTo("body");
      })

      .fail(function( xhr, status, errorThrown){
          alert( "You done messed up A A ron!" );
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
      })

      .always(function( xhr, status) {
        //alert ( "I swear it shall be done.");
      });
  });
});
