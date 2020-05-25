// Import de base
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Mongo } from 'meteor/mongo';

// Import des fichiers html (pour les templates) et pour le fichier CSS
import '../lib/routing.js';
import '../import/api/login/login.html';
import '../import/api/login/login.js';

import '../import/api/signup/signup.html';
import '../import/api/signup/signup.js';

import '../import/api/profile/profile.html';
import '../import/api/profile/profile.js';

import '../import/api/sidebar/sidebar.html';
import '../import/api/sidebar/sidebar.js';

import '../import/api/classement/classement.html';
import '../import/api/classement/classement.js';

import './main.html';
import './main.css';

// Import pour bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import pour les trackers
// Ne sont plus utilisés
import { Tracker } from 'meteor/tracker';

// Import pour les animations
import { gsap } from 'gsap';
import { TimelineMax, Power2 } from 'gsap/gsap-core';


// Import pour les collections
import Timer from 'easytimer.js';
import { Base } from '../import/api/base.js';
import { Intermediate } from '../import/api/intermediate.js';
import { Hard } from '../import/api/hard.js';
import { Level_1 } from '../import/api/level_1.js';


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Entrer ceci dans Base :
/*

Aller dans le terminal : ctrl+¨, puis taper : meteor mongo. Entrer les lignes de codes suivantes les unes après les autres.

db.base.insertMany([{exercice : "pompes", nombre : 20, points : 50 }, {exercice : "tractions", nombre : 15, points : 100 }, {exercice : "abdos", nombre : 20, points : 50 }]);

*/


// Entrer ceci dans B :
/*
db.intermediate.insertMany([{exercice : "pompes", nombre : 40, points : 100 }, {exercice : "tractions", nombre : 30, points : 200 }, {exercice : "abdos", nombre : 40, points : 100 }]);
*/


// Entrer ceci dans Base :
/*
db.hard.insertMany([{exercice : "pompes", nombre : 80, points : 200 }, {exercice : "tractions", nombre : 60, points : 400 }, {exercice : "abdos", nombre : 80, points : 200 }]);
*/


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//  Variables globales
const tl = new TimelineMax({ paused: true });
const tl2 = new TimelineMax({ paused: true });


// Ces trackers permettent de changer certaines choses même après que la page ait été chargée. --> remplacé par des fields dans le profil de l'utilisateur


if (Meteor.isClient) {
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


  // Définit les events qui se déroulent sur le template Home

  Template.Home.events({

    'click #beginner'() {

      Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.difficulty': "beginner" } });

    },

    'click #intermediate'() {

      Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.difficulty': "intermediate" } });

    },

    'click #hard'() {

      Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.difficulty': "hard" } });

    },

    'click #btn2'() {
    
      //  Lorsqu'on clique sur le bouton 'PLAY' à l'accueil il faut que l'utilisateur soit redirigé vers le jeu, c-à-d la carte avec les exercices à /PLAY.
      FlowRouter.go('play');

    
      //  Faire une boucle pour tirer au hasard un exercice pour chaque bouton sur la map.
      for (i = 0; i <= 4; i++) {


      // Regarder dans le profil de l'utilisateur quel niveau de difficulté il a choisi 
      let difficulty = Meteor.user().profile.difficulty;
      console.log(difficulty);

      // Selon le niveau de difficulté, aller chercher les exercices dans la base de donnée "Base", "Intermediate" ou "Hard"
      // Transformer en object avec des array pour permettre la recherche avec un index.
        if (difficulty == "beginner"){

          liste_exercices = Base.find().fetch();
          console.log(liste_exercices);

        } else if (difficulty == "intermediate") {

          liste_exercices = Intermediate.find().fetch();
          console.log(liste_exercices);

        } else {

          liste_exercices = Hard.find().fetch();
          console.log(liste_exercices);

        }
        
        // Chercher la longueur de
        const limite = liste_exercices.length;
        console.log(limite);

        //  Générer un nombre aléatoire entre 0 et la limite (nombre d'objets dans la BDD -1).
        // let rand_nb = Math.floor(Math.random() * (limite-0.00001) );
        const rand_nb = Math.round(Math.random() * (limite - 1));
        console.log(rand_nb);

        //  Chercher l'object qui correspond à l'index : rand_nb .
        const row = liste_exercices[rand_nb];
        console.log(row);

        //  Chercher le nom de l'exercice à cette index.
        const rand_exercice = row.exercice;
        console.log(rand_exercice);


        //  Définir pour chaque exercice généré aléatoirement l'id où le field 'exercice' devra être imprimé. (les id des zone de text dans le svg sont appelés text + 1-5)
        const identity = `text${i + 1}`;
        console.log(identity);

        //  Chercher avec l'id la zone de texte
        const text_a_afficher = document.getElementById(identity);
        console.log(text_a_afficher);

        //  Afficher l'exercice
        text_a_afficher.innerHTML = rand_exercice;

        //  Chercher l'id de l'exerice tel qu'il est dans la BDD "Base".
        const identification = row._id._str;

        //  Effacer l'Id (pas l'Id de l'exercice dans la BDD "Base" mais dans liste_exercices).
        delete row._id;


        // Ajouter des propriété à l'object qu'est l'exercice choisi au hasard.

        // On attribue l'id original de document tiré au hasard dans un field pour pouvoir ensuite chercher l'exercice dans 'Base' avec un id.
        row.exercice_choisi = identification;

        // Attribuer un field pour qu'on sache pour quel bouton est prévu  l'exercice
        const active_on = `btn${i + 1}`;
        row.on_button = active_on;


        // On veut savoir quand l'exercice à été généré pour ensuite trier Level_1 chronologiquement
        d = new Date();
        row.date_création = d.getTime();
        console.log(identification);
        console.log(row);

        // On veut également savoir qui a créé cet exercice
        row.owner = Meteor.user()._id;

        // Ajouter cet l'exercice choisi au hasard avec les nouvelles propritétés dans la BDD Level_1
        Level_1.insert(row);


        // Selon le niveau de difficulté on veut changer l'apparence de la map. Ici on change la couleur des boutons

        if (difficulty == "beginner"){

          document.getElementById(active_on).setAttribute('fill', '#f2ff00');
          document.getElementById(active_on).setAttribute('stroke', '#000000');

        } else if (difficulty == "intermediate") {

          document.getElementById(active_on).setAttribute('fill', '#fcb900');
          document.getElementById(active_on).setAttribute('stroke', '#000000');

        } else {

          document.getElementById(active_on).setAttribute('fill', '#ff0d00');
          document.getElementById(active_on).setAttribute('stroke', '#000000');

        }
      }
    },

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

  // on Rendered permet de définir des variables et plus avant que la page soit chargée

  Template.canvas.onRendered(function() {
    const svg1 = document.getElementById('svg1');
    tl.to(svg1, 1, { x: '-100%', ease: Power2.easeInOut });

    const instructions = document.getElementById('instructions');
    tl2.to(instructions, 1, { x: '-70%', ease: Power2.easeInOut, opacity: 1 });
  });


  // On retourne le score à chaque fois qu'il change pour que l'html soit ajusté en conséquence

  Template.score.helpers({

    total_score() {
    // Aller chercher le score de l'utlisateur.

      return Meteor.user().profile.score;
    }

  });
}


// Defini future variable
const timer = new Timer();

// Définit ce qu'il se passe lorsqu'il y a un événement sur le template canvas

Template.canvas.events({


  //  Se lance lorsqu'un bouton sur la map est clické

  'click .bouton'(event) {
    // Défini le target
    const { target } = event;
    console.log(target);


    //  On regarde quel bouton a été cliqué
    const button_choice = target.id;

    Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.active_button': button_choice } });


    //  On va chercher l'html où les instructions sur l'exercice à faire seront données
    const display_choix = document.getElementById('display_choix');


    //  On cherche le dernier exercice généré pour le bouton cliqué (active_button est une variable globale)
    const exercice_on_button = Level_1.find({ on_button: Meteor.user().profile.active_button, owner: Meteor.user()._id }, { limit: 1, sort: { date_création: -1 } }).fetch();
    console.log(exercice_on_button);
    console.log(exercice_on_button[0].exercice);


    // On cherche les fields qu'on a besoin
    const { nombre } = exercice_on_button[0];
    const { exercice } = exercice_on_button[0];
    const { points } = exercice_on_button[0];


    // Et on les affiches
    display_choix.innerHTML = `Si tu fais ${nombre} ${exercice} tu recevras ${points} points !`;


    // On veut maintenant ajouter un field à ce document : created_at, qui nous sera utile pour calculer le temps mis pour compléter un exercice.
    /* let choix_id = exercice_on_button[0]._id;
    console.log(choix_id);

    d2 = new Date();
    d2_ms = d2.getTime();

    Level_1.update({"_id": choix_id}, {$set: {"clicked_at": d2_ms}}); */


    // Lorsqu'un bouton sur la map est cliqué on veut que l'animation commence. La map glisse sur la gauche tandis que le template 'instructions' glisse sur la gauche tout devenant visible

    // La map se déplace à gauche
    if (tl.progress() === 0) {
      tl.play();
    }

    /*
    if(tl.progress() === 1) {
      tl.reverse();
    }
    */


    // Lorsque la map se déplace à gauche les instructions font la même chose
    if (tl.progress() === 0) {
      tl2.play();
    }

    /*
    if(tl.progress() === 1) {
      tl2.reverse();
    }
    */
  },

  //  Définit ce qu'il se passe quand on clique sur start


  'click #btn_debut'() {
    timer.start({ precision: 'secondTenths' });
    timer.addEventListener('secondTenthsUpdated', function (e) {
      $('#total_temps').html(timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']));
    });

    const exercice_on_button = Level_1.find({ on_button: Meteor.user().profile.active_button, owner: Meteor.user()._id }, { limit: 1, sort: { date_création: -1 } }).fetch();

    const choix_id = exercice_on_button[0]._id;
    console.log(choix_id);

    d2 = new Date();
    d2_ms = d2.getTime();

    Level_1.update({ _id: choix_id }, { $set: { clicked_at: d2_ms } });
  },
  //  Définit ce qu'il se passe lorsqu'on dit qu'on a fini l'exercice

  'click #btn_fini'() {
    timer.pause();
    timer.addEventListener('started', function(e) {
      $('#total_temps').html(timer.getTimeValues().toString());
    });

    //  Lorsque le bouton est cliqué on veut que la map et les instructions reprennent leur position initiale.
    //  Ceci est fait en faisant l'inverse de l'animation faites en cliquant sur la map.
    if (tl.progress() === 1) {
      tl.reverse();
    }

    if (tl.progress() === 1) {
      tl2.reverse();
    }


    // On va chercher les derniers exercices qui ont été générés pour ce bouton
    const exercice_on_button = Level_1.find({ on_button: Meteor.user().profile.active_button, owner: Meteor.user()._id }, { limit: 1, sort: { date_création: -1 } }).fetch();

    // On cherche ensuite le nombre de points qui est attribué lorsque cet exercice est effectué
    const tab_choix = exercice_on_button[0];
    points_gained = tab_choix.points;


    // Modifier le score du user actif
    const score_actuel = Meteor.user().profile.score + points_gained;
    console.log(score_actuel);
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.score': score_actuel } });


    // On veut maintenant ajouter un field à ce document : finished_at, qui, mis avec clicked_at, nous sera utile pour calculer le temps mis pour compléter un exercice.

    console.log(exercice_on_button);
    const choix_id = exercice_on_button[0]._id;
    console.log(choix_id);

    console.log(exercice_on_button[0].clicked_at);

    d3 = new Date();
    d3_ms = d3.getTime();

    // On ajoute aussi 'completed_in'
    const completed_in = (d3_ms - exercice_on_button[0].clicked_at) / 1000;
    console.log(completed_in);

    // On intègre ces modifications à la base de donnée en utilisant l'id de l'exercice généré pour ce bouton
    Level_1.update({ _id: choix_id }, { $set: { finished_at: d3_ms, completed_in } });


    // On va maintenant chercher le dernier exercice complété par l'utilisateur et ajouter à la variable globale 'score_temps' le temps mis pour compléter cet exercice

    // 1. Chercher le html, où on mettra le total du temps, par id.
    // let total_temps = document.getElementById('total_temps');

    // 2. Trier BDD pour trouver le dernier exercice qui contient le fields : "completed_in"
    // demander comment trier parmi les 5 derniers documents dans les fichiers.
    const exercices_faits = Level_1.find({ completed_in: { $exists: true }, owner: Meteor.user()._id, on_button: Meteor.user().profile.active_button }, { limit: 1, sort: { date_création: -1 } }).fetch();
    console.log(Meteor.user().profile.active_button);
    console.log(exercices_faits);
    console.log(Meteor.user().profile.active_button);

    // Chercher la valeur de completed_in et l'additioner à la valeur du champs temps de l'utilisateur actif
    console.log(exercices_faits[0].completed_in);
    console.log(exercices_faits[0]);
    console.log(completed_in);

    const temps_actuel = Meteor.user().profile.temps + exercices_faits[0].completed_in;
    console.log(temps_actuel);
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.temps': temps_actuel } });

    // L'afficher dans l'html

    // total_temps.innerHTML = temps_actuel + " s";

    // Lorsqu'un exercice est fini on veut changer l'apparence du bouton pour cet exercice
    document.getElementById(Meteor.user().profile.active_button).setAttribute('fill', '#00ff22');
    document.getElementById(Meteor.user().profile.active_button).setAttribute('stroke', '#f6ff00');
  },
});
