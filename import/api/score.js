// Import de base
import { Template } from 'meteor/templating';

// Import html et css
import '../templates/score/score.css';
import '../templates/score/score.html';

// Import pour les routes
import '../../lib/routing.js';





// On retourne le score à chaque fois qu'il change pour que l'html soit ajusté en conséquence

Template.score.helpers({

  total_score() {

  // Aller chercher le score de l'utlisateur.
    return Meteor.user().profile.score;
  }

});



