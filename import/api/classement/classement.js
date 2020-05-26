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


/* Meteor.users.find({}, { sort: { 'profile.score': -1 } }); */
/*
Template.classement.helpers({

  users() {
    Meteor.users.find().forEach(function(oneUser) {
      const affichage = `nom : ${oneUser.username} score : ${oneUser.profile.score}`;
      console.log(affichage);
      console.log(oneUser.profile.score);
      console.log(oneUser);
    });

    return Meteor.users.find();
  },
}); */

Template.classement.helpers({

  users () {
    const tableau_classement = Meteor.users.find({}, { sort: { 'profile.score': -1 } }).fetch();
    console.log(tableau_classement);
    console.log(tableau_classement[0].profile);
    console.log(tableau_classement[0].username);
    const tableau_classement_length = tableau_classement.length -1;
    const classement = [];
    for (i = 0; i <= tableau_classement_length; i++) {
      classement.push({ rang: i+1, utilisateur: tableau_classement[i].username, score: tableau_classement[i].profile.score });
    }
    console.log(classement);
    return classement;
  },
});
