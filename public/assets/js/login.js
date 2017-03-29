$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var nameInput = $("input#name-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's a name and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.name || !userData.password) {
      return;
    }

    // If we have an name and password we run the loginUser function and clear the form
    loginUser(userData.name, userData.password);
    nameInput.val("");
    passwordInput.val("");
  });


  // loginUser does a post to our "api/login" route and if successful, redirects us the the dashboard 

  function loginUser(name, password) {
    $.post("/api/login", {
      name: name,
      password: password
    }).then(function(data) {
      //******************************************************************************
      // here we need to also check to see if the user has responded okay to receiving texts.
      // if not, we should not let then enter in to the application - we should send them a message
      // to respond to the verification text before they can schedule any reminders.
      //*******************************************************************************
      // window.location.replace(data);
      window.location.href = '/dashboard';
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

});


