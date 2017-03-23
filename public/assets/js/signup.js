$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("input#name-input");
  var passwordInput = $("input#password-input");
  var phoneInput = $("input#phone-input");

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
    nameInput.val("");
    passwordInput.val("");
    phoneInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, password, phone) {
    $.post("/api/signup", {
      name: name,
      password: password,
      phone: phone
    }).then(function(data) {
      window.location.replace(data);
    }).catch(function(err) {
      console.log(err);
    });
  }

});