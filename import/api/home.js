import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Mongo } from 'meteor/mongo';

// Import pour bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import pour les collections
import Timer from 'easytimer.js';
import { Base } from './collections/base.js';
import { Intermediate } from './collections/intermediate.js';
import { Hard } from './collections/hard.js';
import { Level_1 } from './collections/level_1.js';


// import du CSS et du HTML
import '../templates/home/home.css';
import '../templates/home/home.html';

// Import pour les routes
import '../../lib/routing.js';


// Définit les events qui se déroulent sur le template Home

Template.Home.events({

  'click #btn3'() {
    FlowRouter.go('login');
  },

  'click #btn4'() {
    FlowRouter.go('signup');
  },

  'click #btn1'() {
    FlowRouter.go('classement');
  },

});

Template.Home.helpers({

  difficulty_level() {
  // Aller chercher le score de l'utlisateur.

    return Meteor.user().profile.difficulty;
  }

});