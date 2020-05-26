// import du CSS et du HTML
import '../templates/signup/signup.css';
import '../templates/signup/signup.html';

Template.signup.rendered = function() {

};

Template.signup.events({
  'submit .form-signup'(event) {
    const username = trimInput(event.target.username.value);
    const email = trimInput(event.target.email.value);
    const password = trimInput(event.target.password.value);
    const password2 = trimInput(event.target.password2.value);

    if (isNotEmpty(email)
			&& isNotEmpty(username)
			&& isNotEmpty(password)
			&& isEmail(email)
			&& areValidPasswords(password, password2)) {
      Accounts.createUser({
        username,
        email,
        password,
        profile: {
          score: 0,
          temps: 0,
          difficulty: 'beginner',
					active_button: '',
					finished_maps : []
        },

      }, function(err) {
        if (err) {
          Bert.alert(err.reason, 'danger', 'growl-top-right');
        } else {
          Bert.alert('Account Created! You Are Now Logged In', 'success', 'growl-top-right');
          FlowRouter.go('home');
        }
      });
    }

    return false;
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
