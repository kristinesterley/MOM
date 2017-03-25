var modal = document.getElementById("helpModal");
var btn = document.getElementById("help");
var span = document.getElementsByClassName("close")[0];

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.name);
  });

  //When alt sign up button is clicked(if user doesn't have login yet)
  btn.onclick = function() {
    modal.style.display = "block";
  }

  //When user clicks on <span> x, close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  //When user clicks outside of modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

});
