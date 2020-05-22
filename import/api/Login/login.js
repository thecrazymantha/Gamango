// import du CSS et du HTML
import './login.html';
import './login.css';
//import { Accounts } from 'meteor/accounts-base';
// Les events page login
/*
// eslint-disable-next-line no-undef
Template.login.events({
  'click #createAcc'(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
  },
});
*/

//PART v.2
/*
Tracker.autorun(function(){
	if(Meteor.userId()){
		Router.go("/PLAY");
	}
});

Template.login.rendered = function() {
	$("#login-link").addClass('selected');
	$("#New-Account-link").removeClass('selected');
}

Template.login.events({
	"submit .form-signin": function(event){
		let email = trimInput(event.target.email.value);
		let password = trimInput(event.target.password.value);

		if(isNotEmpty(email) &&
			isNotEmpty(password) &&
			isEmail(email) &&
			isValidPassword(password)){

			Meteor.loginWithPassword(email, password, function(err){
				if(err) {
					Bert.alert(err.reason, "danger", "growl-top-right");
					return false;
				} else {
					Router.go("/PLAY");
					Bert.alert("You are now logged in", "success", "growl-top-right");
				}
			});

		}

		return false // Prevent Submit
	}

});


Template.signup.rendered = function(){
  
};
*/
Template.signup.events({
  "submit .form-signup": function(event){
   let username = trimInput(event.target.username.value);
   let email = trimInput(event.target.email.value);
   let password = trimInput(event.target.password.value);
   let password2 = trimInput(event.target.password2.value);

   if(isNotEmpty(email) && isNotEmpty(username) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, password2)) {
	   Accounts.createUser({
		   username: username,
		   email: email,
		   password: password,
		   profile: {

		   }
	   }, function(err){
		   if(err){
			   Bert.alert(err.reason, "danger", "growl-top-right");
		   } else {
			   Bert.alert("Account Created ! You are now logged in", "success", "growl-top-right");
			   Router.go("/PLAY");
		   }
	   });
   }
   return false;
  }
});



//Règles de validation pour le formulaire

// Trim Helper
let trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
};

let isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
	return false;
};

// Validate Email
isEmail = function(value) {
	let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(value)) {
		return true;
	}
	Bert.alert("Please use a valid email address", "danger", "growl-top-right");
	return false;
};

// Check Password Field
isValidPassword = function(password){
	if(password.length <6) {
		Bert.alert("Password must be at least 6 characters", "danger", "growl-top-right");
		return false;
	}
	return true;
};

// Match password 
areValidPasswords = function(password, confirm) {
	if(!isValidPassword(password)) {
		return false;
	}
	if(password !== confirm) {
		Bert.alert("Passwords do not match", "danger", "growl-top-right");
		return false;
	}
	return true;
}