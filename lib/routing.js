
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Défini les routes pour l'application les packages kadira:flow-router et kadira:blaze-layout

  // Route pour l'écran d'accueil. (avec les deux boutons : Classement et Play)
  FlowRouter.route('/', {
    name: 'home',
    action() {
      BlazeLayout.render('Home');
    },
  });

  // Route pour amener depuis l'écran d'accueil (en cliquant sur le bouton Play) jusqu'à la map
  FlowRouter.route('/PLAY', {
    name: 'play',
    action() {
      BlazeLayout.render('score', { main: 'canvas' });
    },
  });

  // Route pour amener depuis l'écran d'accueil (en cliquant sur le bouton classement) jusqu'au classement
  FlowRouter.route('/classement', {
    name: 'classement',
    action() {
      BlazeLayout.render('classement');
    },
  });
  // Route pour amener depuis l'écran d'accueil (en cliquant sur le bouton Se Connecter) jusqu'à la pag de login
  FlowRouter.route('/login', {
    name: 'login',
    action() {
      BlazeLayout.render('login');
    },
  });

  // Route pour amener depuis l'écran d'accueil (en cliquant sur le bouton Créer un compte) jusqu'à la pag de signup
  FlowRouter.route('/signup', {
    name: 'signup',
    action() {
      BlazeLayout.render('signup');
    },
  });

  // Route pour le login
  FlowRouter.route('/LOGIN', {
    name: 'login',
    action() {
      BlazeLayout.render('login');
    },
  });

  // Route pour le signup
  FlowRouter.route('/SIGNUP', {
    name: 'signup',
    action() {
      BlazeLayout.render('signup');
    },
  });

  // Route pour la page du profile
  FlowRouter.route('/profile', {
    name: 'profile',
    action() {
      BlazeLayout.render('profile');
    },
  });

  // Route pour le classement
  FlowRouter.route('/classement', {
    name: 'classement',
    action() {
      BlazeLayout.render('classement');
    },
  });
