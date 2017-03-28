var userId;
var url = window.location.search;

function showUserData(){

	  $.get("/api/user-data").then(function(data) {


	  	$(".user-name").text(data.name);
	  	$("[name=phone]").val(data.phone);
	  	userId = data.id;

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
    		.done(kickOut);
  		}
	}

function updatePassword(){
	var user = {
		password: $("#password-input").val().trim(),
		id: userId
	}

	$.ajax({
      	method: "PUT",
      	url: "/api/user",
      	data: user

	})
	.done(alert("success"));
}





// function updateReminder(reminder) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/reminder",
//       data: reminder
//     })
//     .done(function() {

//         //ditto the above comment for the delete. the data y ou need to add a new scheduled reminder should be accessible here.
//       window.location.href = "/dashboard";
//     });
//   }

  
$(document).ready(function() {
	showUserData();

	$("#delete").on("click", deleteUserAccount);
	$("#change-password").on("click", updatePassword);
	$("#cancel").on("click", function(e){
		e.preventDefault();
		window.location.href = '/dashboard';
	});



  // if (url.indexOf("?user_id=") !== -1) {
  //   userId = url.split("=")[1];
  //   alert("userID pulled from url :" + userId);
  //   getUser(userId);
  // }
  // // If there's no authorId we just get all posts as usual
  // else {
  //   alert("error occured");
  // }

});