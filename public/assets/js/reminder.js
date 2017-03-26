$(document).ready(function() {


	var messageInput = $("#message-input");
	var beginDateInput = $("#begin-date-input");
	var beginTimeInput = $("#begin-time-input");
	var frequencyInput = $("#frequency-input");
	var reminderForm = $("#reminder");






  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user-data", function(data) {
  	var userID = data.id;
  	reminderForm.attr("data-userId", userID);
  	var queryUrl = "/api/reminder-data/" + userID;
  	//now that you have the id, go get any existing reminders for this user.
  	// $.get(queryUrl, function(dbReminders){
  	// 	if (dbReminders){
  	// 		var reminderList = "<ul>";
			// for(var p in dbReminders)
			// {
			//     reminderList += "<li>" + dbReminders[p].message + "</li>";
			// }
			// reminderList += "</ul>";
  	// 		$(".user-reminders").html(reminderList);
  	// 	}

  	// });

  	});



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
      window.location.href = "/dashboard";
    });
  }







  });


