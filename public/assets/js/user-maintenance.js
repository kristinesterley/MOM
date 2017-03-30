
var userId;
var url = window.location.search;
var message = $("#message");

function showUserData(){

	  $.get("/api/user-data").then(function(data) {

	  	$(".user-name").text(data.name);
	  	$("[name=phone]").val(data.phone);
	  	userId = data.id;

	  	$(".member-name").text(data.name);

	});
}	  




function kickOut(){
	 window.location.href = '/logout';
}

function deleteUserAccount(){
	var result = confirm("Are you sure you want to delete your account?");
	if (result) { 
    	$.ajax({
     		 method: "DELETE",
      		url: "/api/user/" + userId
    	})
    		.done(function(){
    			//all previously scheduled texts must be deleted from Twilio!!!!!
    			kickOut();
    		});
  		}
	}

function updatePassword(){
	var user = {
		password: $("#password-inputUM").val().trim(),
		id: userId
	}
	$.ajax({
      	method: "PUT",
      	url: "/api/user",
      	data: user
	})
	.done(function(){
		message.text("Your password has been successfully updated.")
	});
}


function updatePhone(){

	var user = {
		phone: $("#phone-input").val().trim(),
		id: userId
	}

	$.ajax({
      	method: "PUT",
      	url: "/api/user",
      	data: user

	})
	.done(function(){
		showUserData();
		message.text("Your phone number has been successfully updated. You will receive a verifiation text shortly.")
		///need to update existing scheduled texts
		//this is non trivial - previously scheduled texts need to be deleted or updated with the new phone number.
		// if deleted, we need to loop through all reminders listed in the database and for reminders that
		// the user is expecting in the future, new reminders must be scheduled with the new phone number
		});
}


//begin code execution here
  
$(document).ready(function() {
	
	showUserData();
	$("#deleteact").on("click", deleteUserAccount);
	$("#change-password").on("click", updatePassword);
	$("#cancel").on("click", function(e){
		e.preventDefault();
		window.location.href = '/dashboard';
	});
	$("#change-phone").on("click", updatePhone);


});