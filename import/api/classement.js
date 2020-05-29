
// import du html
import '../templates/classement/classement.html';
import '../templates/classement/classement.css';

// import pour les collections
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';





// On définit cette variable en dehors des fonctions pour qu'elle soit accessible dans toutes les fonctions
let this_user = "";

// Tracker pour  le this user pour aller refaire les fonctions lorsque cette variable change
const this_userDep = new Tracker.Dependency;


// Ce qu'il se passe lors d'un event sur le template classement, ici 'mouseenter' et 'mouseleave'


Template.classement.events({

  // Lorsque la souris est sur le bouton, on veut aller chercher l'innerhtml de son enfant pour ensuite aller chercher la description de cet utilisateur

  'mouseenter .popover_classement'(event) {

    // Active les popover
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
    this_user = event.target.getElementsByTagName('small')[0].innerHTML;
    this_userDep.changed();
  },

  // On desactive le popover lorsque l'utilisateur quitte le bouton avec sa souris
  'mouseleave .popover_classement'(event) {
    $(function () {
      $('[data-toggle="popover"]').popover('hide')
    })
    
  }
});

Template.classement.helpers({
  current_user() {
    return Meteor.user().username;
  },
  user_score() {
    return Meteor.user().profile.score;
  },

  users () {
    const tableau_classement = Meteor.users.find({}, { sort: { 'profile.score': -1 } }).fetch();
    console.log(tableau_classement);
    console.log(tableau_classement[0].profile);
    console.log(tableau_classement[0].username);
    tableau_classement_length = tableau_classement.length - 1;
    let classement = [];
    for (i = 0; i <= tableau_classement_length; i++) {
      classement.push({ rang: i + 1, utilisateur: tableau_classement[i].username, score: tableau_classement[i].profile.score });
    }
    console.log(classement);
    return classement;
  },

  // C'est ici que la fonction est refaites chaque fois que la variable 'this_user' change
  controle() {
    this_userDep.depend();
    let this_user_description = Meteor.users.find({username: this_user}).fetch();
    let this_user_maps = this_user_description[0].profile.finished_maps;
    let this_user_maps_length = this_user_maps.length;
    console.log(this_user_maps_length);
    console.log(this_user_maps);

    // On veut seulement afficher au maximum les 5 dernières maps complétées
    if (this_user_maps_length<=5){
      return this_user_maps;
    } else {
      let slice1 = this_user_maps_length-5;
      let slice2 = this_user_maps_length
      return this_user_maps.slice(slice1,slice2);
    }
    
  }

});
