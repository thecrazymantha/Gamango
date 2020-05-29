// import du CSS et du HTML
import '../templates/login/login.html';



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
        Bert.alert('Vous êtes maintenant connecté !', 'success', 'growl-top-right');
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
  Bert.alert("S'il-vous-plaît remplissez tout les champs !", 'danger', 'growl-top-right');
  return false;
};

// Validate Email
isEmail = function(value) {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  Bert.alert("S'il-vous-plaît utilisez un eadresse E-mail valide !", 'danger', 'growl-top-right');
  return false;
};

// Check Password Field
isValidPassword = function(password) {
  if (password.length < 6) {
    Bert.alert("Le mot de passe doit contenir 6 charactères au minimum", 'danger', 'growl-top-right');
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
    Bert.alert("Les mots de passe ne correspondent pas", 'danger', 'growl-top-right');
    return false;
  }
  return true;
};
