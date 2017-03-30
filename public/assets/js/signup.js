$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");


  var nameInput = $("#name-signup-input");
  var passwordInput = $("#password-signup-input");
  var phoneInput = $("#phone-signup-input");


  var modal = document.getElementById("signupModal");
  var btn = document.getElementById("altSignUpBtn");
  var span = document.getElementsByClassName("close")[0];

    // Does a post to the signup route. If succesful, we will send a text to the new user to verify that the phone number is correct
    // the user will be notified that he/she must respond positively to the text before being allowed to log in
  function signUpUser(name, password, phone) {


    $.post("/api/signup", {
      name: name,
      password: password,
      phone: phone
    }).then(function(data) {

      if (data.errors){
        alert("Your " + data.errors[0].path + " has issues.");
        return;
        }
      //this needs to be changed to a page/pop up with instructions about responding to the text
      //this is where a text needs to be sent to the user's phone with a request to respond 'Y'

      nameInput.val("");
      passwordInput.val("");
      phoneInput.val("");
    
      window.location.replace(data);
      
    }).catch(function(err) {
      console.log(err);
    });
  }


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

     // When the signup button is clicked, we validate the name and password are not blank
  signUpForm.on("submit", function(event) {

    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      password: passwordInput.val().trim(),
      phone: phoneInput.val().trim()
    };


    if (!userData.name || !userData.password || !userData.phone) {
      return;
    }
    // If we have an email and password, run the signUpUser function

    signUpUser(userData.name, userData.password, userData.phone);


  });




});