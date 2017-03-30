var modal = document.getElementById("helpModal");
var btn = document.getElementById("help");
var span = document.getElementsByClassName("close")[0];


  var userName = "";
  var userId = "";

  var messageInput = $('[name=reminder]');
  var beginDateInput = $('[name=begin-date]');
  var beginTimeInput = $('[name=when]');
  var frequencyInput = $('[name=freq]');


function clearSubmitForm(){
  $("#remind").attr("data-mode","create").text("Remind Me");
  $("#mode-title").text("create");
  messageInput.val("");
  beginDateInput.val("");
  beginTimeInput.val("");
  frequencyInput.val("once");
}

//function to add a new reminder

function submitReminder(reminder) {
  $.post("/api/reminder", reminder, function(data){

    var reminderId = data.id;
     $.get("/api/reminder/"+ data.id, function(dbTasks){
    });
  
    window.location.href="/dashboard";
  });
}

//function to call to delete a reminder


  
function deleteReminder(reminderId){

    $.ajax({
      method: "DELETE",
      url: "/api/reminder/" + reminderId
    })
    .done(function() {
      window.location.href="/dashboard";
    });

}



function updateReminder(reminder) {
    $.ajax({
      method: "PUT",
      url: "/api/reminder",
      data: reminder
    })
    .done(function() {
      window.location.href = "/dashboard";
    });
  }


// handleFormSubmit is used to both add a reminder and to update a reminder.
function handleFormSubmit(event){
    event.preventDefault();

    if ($("#remind").attr("data-mode")==="create") {

      var newReminder = {
        message: messageInput.val().trim(),
        begin_date: beginDateInput.val().trim() + "T" + beginTimeInput.val().trim() + ":00",
        begin_time: beginTimeInput.val().trim() + ":00",
        frequency: frequencyInput.val().trim(),
        UserId: userId
      } //end newReminder
        submitReminder(newReminder);
    } //end if

    else if ($("#remind").attr("data-mode") === "update"){
      var uReminder = {
        message: messageInput.val().trim(),
        begin_date: beginDateInput.val().trim() + "T" + beginTimeInput.val().trim() + ":00",
        begin_time: beginTimeInput.val().trim() + ":00",
        frequency: frequencyInput.val().trim(),
        UserId: userId,
        id: $("#remind").attr("data-id")
      } //end uReminder
        $("#remind").attr("data-mode", "create").text("Remind Me");
        $("#mode-title").text("create");
        updateReminder(uReminder);
    }//end else if

}


//when a user asks to update an existing reminder, this function gets that chosen reminder and displays
// its data in the form for editing. We do a fresh get on this reminder id just in case the user deleted it
// or updated it from a different window. I know - unlikely, but still....

function editReminder(reminderId){
  $.get("/api/reminder/" + reminderId).then(function(data){
    messageInput.val(data.message);
    beginDateInput.val(data.begin_date.substring(0,10));
    beginTimeInput.val(data.begin_time.substring(0,5));
    frequencyInput.val(data.frequency);
    $("#remind").attr("data-id",data.id);
  });

}


// these tasks show up in the template window as suggested tasks for making reminders
function displayTasks(){
  $.get("/api/tasks", function(dbTasks){
      if (dbTasks){
        var taskDisplay = "";
        for (var task in dbTasks){

          taskDisplay += "<div class='templatex task-item'><p class='templateHead'>" + dbTasks[task].message + "</p></div><br><br>";

        }
        $("#tasks").append(taskDisplay);
      }

  });

}


// get any reminders that use has made in the past and display them for the user

function displayReminders(){
    //figure out which user is logged in and save off the user id for use later. Can't get the reminders without
    // the userId, so put the get for reminders in the call back.

  $.get("/api/user-data").then(function(data) {
    // $(".user-name").text(data.name); this line was for welcoming the user by name in on old vesion
      userName = data.name;
      userId = data.id;


      $(".member-name").text(userName);

      //now get any reminders that this user has already created

      var queryUrl = "/api/reminder-data/" + userId;

        $.get(queryUrl, function(dbReminders){
           if (dbReminders){

            var reminderDisplay = "";
            for (var rem in dbReminders){
              //reformat date and time from the database
              var dateTime = dbReminders[rem].begin_date 

              //begin_date has been saved into the database by sequelize, which assumes and stores the time as UTC date and time. We are displaying in UTC
              //so as not to confuse the user (moment converts the database time to local time, which for us subtracts 4 hours)

              var dateReformat = moment.utc(dateTime).format('MM/DD/YYYY hh:mm a');
             
              reminderDisplay = "<div class='reminderx'>"
              reminderDisplay += "<p class='reminderHead'>" + dbReminders[rem].message + "</p>";
              reminderDisplay += "<p class='reminderInfo' id='date'>" + dateReformat + "</p>";

              //maybe need time here
              reminderDisplay += "<p class='reminderInfo' id='freq'>" + dbReminders[rem].frequency + "</p>";
              reminderDisplay += "<div class='dropdown'>"
              reminderDisplay += "<button class='mngBtn'></button><div id='mngRect'></div>"
              reminderDisplay += "<div class='dropdown-content'>"
              reminderDisplay += "<button id='update' class='edit' data-id=" + dbReminders[rem].id + ">update</button><br>" //<!-- INCLUDE THIS BREAK -->
              reminderDisplay += "<button id='delete' class='delete' data-id=" + dbReminders[rem].id + ">delete</button>"
              reminderDisplay += "</div>"
              reminderDisplay += "</div>"
              reminderDisplay += "</div><br>"


              $("#userReminders").append(reminderDisplay);

            }
         }   

    });
  }); 
}

//code execution begins here

$(document).ready(function() {


  displayReminders();
  displayTasks();   

  $("#clear").on("click", clearSubmitForm);

  $("#remind").on("click", handleFormSubmit);

  $("#user-maintenance").on("click", function(){
     // window.location.href = "/user-maintenance?user_id=" + userId; don't need to send the user id to user-maintenance
     // passport is holding on the the user info for us
     window.location.href = "/user-maintenance";
  });


  $(document).on("click", ".delete", function(e){
        e.preventDefault();
       deleteReminder($(this).attr("data-id"));
      });

  $(document).on("click", ".edit", function(e){
        e.preventDefault();
        $("#remind").attr("data-mode", "update").text("Update")
        $("#mode-title").text("update");
        editReminder($(this).attr("data-id"));
      });
  
  $(document).on("dblclick", ".task-item", function(){
        
        clearSubmitForm();
        messageInput.val($(this).text());
      });


});
