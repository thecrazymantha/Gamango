import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

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

});
