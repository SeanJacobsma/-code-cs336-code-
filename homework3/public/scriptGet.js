$(document).ready(function() {
  $('form').submit(function( event ){
    $( "p" ).remove();
    event.preventDefault();

    $.ajax({
      url: "/getPersonResponse",
      type: "POST",
      data: {loginID: $("#loginID").val()}
    })
    .done(function (result){
      $("body").prepend( "firstname: " + result.content.firstname + "<br> lastname: " +result.content.lastname);
      $("body").append("<br> startDate: " + result.content.startDate);
    })
    .fail(function(xhr, status, errorThrown){
      console.log ('you cant do that...')
          $("body").append("<p>no data yet...</p>");
    })
  });
});
