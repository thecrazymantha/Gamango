// import des fichiers js
import '../login/login.js';
import '../signup/signup.js';

// import du CSS et du HTML
import './classement.css';
import './classement.html';

// Import pour les collections

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Mongo } from 'meteor/mongo';
import { Base } from '../base.js';


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
    const tableau_classement_length = tableau_classement.length - 1;
    const classement = [];
    for (i = 0; i <= tableau_classement_length; i++) {
      classement.push({ rang: i + 1, utilisateur: tableau_classement[i].username, score: tableau_classement[i].profile.score });
    }
    console.log(classement);
    return classement;
  },
});
