import { Bike } from './../js/bike.js';

$(document).ready(function() {
  $("#form").submit(function() {
    event.preventDefault();
    let zip = parseInt($("#zip").val());
    let bike = new Bike();
    bike.apiCall(zip);
  });
});
