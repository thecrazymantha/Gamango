// import du CSS et du HTML
import '../templates/profile/profile.css';
import '../templates/profile/profile.html';

import './signup.js';


// On définit ici tous les helpers qui vont simplement chercher des information dans le profil de l'utilisateur avec, parfois, quelques manipulations
Template.profile.helpers({

  username() {
    return Meteor.user().username;
  },
  user_score() {
    return Meteor.user().profile.score;
  },
  user_temps() {
    let raw = Meteor.user().profile.temps;
    let heures = Math.floor(raw/3600);
    raw %= 3600;
    let minutes = Math.floor(raw/60);
    let secondes = (raw%60).toFixed(0);
    return heures + " heures " + minutes + " minutes " + secondes + " secondes";

  },
  user_difficulty() {
    return Meteor.user().profile.difficulty;
  },

  // On coupe la liste des dates des maps finies en deux tout en s'assurant que c'est la colonne de gauche qui comporte toujours une rangée de plus si leur nombre est impaire

  // Colonne 1
  user_finished_maps1() {
    let length= Meteor.user().profile.finished_maps.length;
    let half = Math.floor((length-1)/2)+1;
    return Meteor.user().profile.finished_maps.slice(0, half);
  },

  // Colonne 2
  user_finished_maps2() {
    let length= Meteor.user().profile.finished_maps.length;
    let half = Math.floor((length-1)/2+1);
    return Meteor.user().profile.finished_maps.slice(half);
  },

  user_finished_maps_nb() {
    return Meteor.user().profile.finished_maps.length;
  },

});