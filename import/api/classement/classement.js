
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

  users() {
    /*    Meteor.users.find({}, { sort: { score: -1 } }); */

    Meteor.users.find().forEach(function(oneUser) {
      const affichage = `nom : ${oneUser.username} score : ${oneUser.profile.score}`;
      console.log(affichage);
      console.log(oneUser.profile.score);
      console.log(oneUser);
    });

    return Meteor.users.find();
  },


});

/* Meteor.users.find({}, { sort: { score: [['a', 'desc'], ['b', 'asc']] } }); */
