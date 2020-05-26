// Import de base
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Mongo } from 'meteor/mongo';



// Import html et css
import '../templates/score/score.css';
import '../templates/score/score.html';


// Import pour les collections
import Timer from 'easytimer.js';
import { Base } from './collections/base.js';
import { Intermediate } from './collections/intermediate.js';
import { Hard } from './collections/hard.js';
import { Level_1 } from './collections/level_1.js';

// Import pour les routes
import '../../lib/routing.js';


// On retourne le score à chaque fois qu'il change pour que l'html soit ajusté en conséquence

Template.score.helpers({

  total_score() {
  // Aller chercher le score de l'utlisateur.

    return Meteor.user().profile.score;
  }

});



