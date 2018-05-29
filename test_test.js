/***** TO LOAD TWITTER DATA FOR PAGE *****/

// pre render js from node
//     load twitter data before page

// endpoint that front end can call backend to run method to get twiiter data
//     ajax request onload

// Test with writting ajax call with access token hard coded in the console






var nome = $("#nome").val();
var email = $("#email").val();
var assunto = $("#assunto").val();
var mensagem = $("#mensagem").val();

var info = {"nome":nome, "email":email, "assunto":assunto, "mensagem":mensagem};

$.ajax({
  type: "POST",
  url: "/contact",
  data: { info: JSON.stringify(info) }
}).done(function(retorno){
  //do something important
});




https://docs.google.com/document/d/1lLLdO5Sb8MtMx5vVWTzveGFQlL_BhVrfdXENeo5W5Lg/edit
https://docs.google.com/document/d/15SVNQSMZkPk3NWFR6APOEcIrWsxep4dS_IGlYt7NPX0/edit



https://publish.twitter.com/#
https://twitter.com/Interior/status/988161272758919169