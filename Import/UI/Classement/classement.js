
// import du CSS et du HTML
import './classement.html';
import './classement.css';

Meteor.user().profile.score.sort(fonction compare (a, b) {
    retourne ab;
  })