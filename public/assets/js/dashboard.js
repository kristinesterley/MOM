var modal = document.getElementById("helpModal");
var btn = document.getElementById("help");
var span = document.getElementsByClassName("close")[0];

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var userName = "";
  var userId = "";


  var messageInput = $('[name=reminder]');
  var beginDateInput = $('[name=begin_date]');
  var beginTimeInput = $('[name=when]');
  // var frequencyInput = $("#frequency-input");
  var reminderForm = $("#setup");

  $.get("/api/user-data").then(function(data) {
    // $(".user-name").text(data.name);
    userName = data.name;
    userId = data.id;
    reminderForm.attr("data-userId", userId);


    alert(userName);
    alert(userId);
  });





  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user-data", function(data) {
  //   var userID = data.id;
  //   reminderForm.attr("data-userId", userID);
  //   var queryUrl = "/api/reminder-data/" + userID;
  //   //now that you have the id, go get any existing reminders for this user.
  //   $.get(queryUrl, function(dbReminders){
  //     if (dbReminders){
  //       var reminderList = "<ul>";
  //     for(var p in dbReminders)
  //     {
  //         reminderList += "<li>" + dbReminders[p].message + "</li>";
  //     }
  //     reminderList += "</ul>";
  //       $(".user-reminders").html(reminderList);
  //     }

  //   });

  //   });



  $(reminderForm).on("submit", handleFormSubmit);

    function handleFormSubmit(event){
      event.preventDefault();

    var newReminder = {
      message: messageInput.val().trim(),
      begin_date: "2017-03-26",
      begin_time: "00:00:00",
      frequency: "once",
      // frequency: frequencyInput.val().trim(),
      UserId: reminderForm.attr("data-UserId")
    }
    submitReminder(newReminder);

}

function submitReminder(reminder) {
  $.post("/api/reminder", reminder, function(){
    window.location.href="/dashboard";
  });
}


//function to call to delete a reminder
  
  function DeleteReminder(reminderId){
    $.ajax({
      method: "DELETE",
      url: "/api/reminder/" + reminderId
    })
    .done(function() {
      window.location.href="/dashboard";
    });

}

  //function to update a reminder

    var uReminder = {
      message: "update testing",
      id: "4"
    };


    function updateReminder(reminder) {
    $.ajax({
      method: "PUT",
      url: "/api/reminder",
      data: reminder
    })
    .done(function() {
      window.location.href = "/reminder";
    });
  }


























  // //When alt sign up button is clicked(if user doesn't have login yet)
  // btn.onclick = function() {
  //   modal.style.display = "block";
  // }

  // //When user clicks on <span> x, close the modal
  // span.onclick = function() {
  //   modal.style.display = "none";
  // }

  // //When user clicks outside of modal, close it
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // }

});
