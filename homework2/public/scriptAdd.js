$( 'form' ).submit(function( event){
  event.prevent default();

  var form = $( this );

  console.log(form.serialize());

  $.ajax({
    type: 'POST',
    url: '/data/save',
    data: form.serialize(),
    dataType: 'json',
    success: funtion(res) {
      console.log( "successfully posted" + res);
    }
  });
});
