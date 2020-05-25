// import du CSS et du HTML
import './login.html';
import './login.css';

// import { Accounts } from 'meteor/accounts-base';

// PART v.2
/*
Tracker.autorun(function(){
	if(Meteor.userId()){
		console.log(Meteor.userId);
	}
});
*/
//
Template.login.rendered = function() {
  $('#login-link').addClass('selected');
  $('#profile-link').removeClass('selected');
  $('#classement-link').removeClass('selected');
  $('#map-link').removeClass('selected');
};

// Les events page login
Template.login.events({
  'submit .form-signin'(event) {
    const email = trimInput(event.target.email.value);
    const password = trimInput(event.target.password.value);

    if (isNotEmpty(email)
			&& isNotEmpty(password)
			&& isEmail(email)
			&& isValidPassword(password)) {
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          Bert.alert(err.reason, 'danger', 'growl-top-right');
          return false;
        }
        FlowRouter.go('home');
        Bert.alert('You are now logged in', 'success', 'growl-top-right');
      });
    }

    return false; // Prevent Submit
  },

});


// Règles de validation pour le formulaire

// Trim Helper
let trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, '');
};

let isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  Bert.alert('Please fill in all fields', 'danger', 'growl-top-right');
  return false;
};

// Validate Email
isEmail = function(value) {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  Bert.alert('Please use a valid email address', 'danger', 'growl-top-right');
  return false;
};

// Check Password Field
isValidPassword = function(password) {
  if (password.length < 6) {
    Bert.alert('Password must be at least 6 characters', 'danger', 'growl-top-right');
    return false;
  }
  return true;
};

// Match password
areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    Bert.alert('Passwords do not match', 'danger', 'growl-top-right');
    return false;
  }
  return true;
};
