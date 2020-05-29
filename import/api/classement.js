
// import du html
import '../templates/classement/classement.html';
import '../templates/classement/classement.css';

// import pour les collections

import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

let this_user = "";
const this_userDep = new Tracker.Dependency;

Template.classement.events({

  'mouseenter .username'(event) {
    this_user = event.target.innerHTML;
    this_userDep.changed();
    console.log(event.target.innerHTML);
    console.log(Meteor.users.find({username: this_user}).fetch());
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  },
  
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

  controle() {
    this_userDep.depend();
    let this_user_description = Meteor.users.find({username: this_user}).fetch();
    let this_user_maps = this_user_description[0].profile.finished_maps;
    let this_user_maps_length = this_user_maps.length;
    console.log(this_user_maps_length);
    console.log(this_user_maps);
    if (this_user_maps_length<=5){
      return this_user_maps;
    } else {
      let slice1 = this_user_maps_length-5;
      let slice2 = this_user_maps_length
      return this_user_maps.slice(slice1,slice2);
    }
    
  }

});
