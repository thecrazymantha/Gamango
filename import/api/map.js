// Import de base
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Mongo } from 'meteor/mongo';


// Import pour les animations
import { gsap } from 'gsap';
import { TimelineMax, Power2 } from 'gsap/gsap-core';

// Import pour bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import html et css
import '../templates/map/map.css';
import '../templates/map/map.html';


// Import pour les collections
import Timer from 'easytimer.js';
import { Base } from './collections/base.js';
import { Intermediate } from './collections/intermediate.js';
import { Hard } from './collections/hard.js';
import { Level_1 } from './collections/level_1.js';

// Import pour les routes
import '../../lib/routing.js';





//  Variables globales
const tl = new TimelineMax({ paused: true });
const tl2 = new TimelineMax({ paused: true });

// on Rendered permet de définir des variables et plus avant que la page soit chargée

Template.canvas.onRendered(function() {
  const svg1 = document.getElementById('svg1');
  tl.to(svg1, 1, { x: '-100%', ease: Power2.easeInOut });

  const instructions = document.getElementById('instructions');
  tl2.to(instructions, 1, { x: '-70%', ease: Power2.easeInOut, opacity: 1 });
});

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
    let choix_id = exercice_on_button[0]._id;
    console.log(choix_id);

    d2 = new Date();
    d2_ms = d2.getTime();

    Level_1.update({"_id": choix_id}, {$set: {"clicked_at": d2_ms}}); 


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
      $('#total_temps').html(timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']) + "0");
    });

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

    console.log(Meteor.user().profile.temps);
    const temps_actuel = Meteor.user().profile.temps + exercices_faits[0].completed_in;
    console.log(temps_actuel);
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.temps': temps_actuel } });

    // L'afficher dans l'html

    // total_temps.innerHTML = temps_actuel + " s";

    // Lorsqu'un exercice est fini on veut changer l'apparence du bouton pour cet exercice
    document.getElementById(Meteor.user().profile.active_button).setAttribute('fill', '#00ff22');
    document.getElementById(Meteor.user().profile.active_button).setAttribute('stroke', '#f6ff00');
    const dernier_exercices = Level_1.find({ owner: Meteor.user()._id }, { limit: 5, sort: { date_création: -1 } }).fetch();
    console.log(dernier_exercices);
    let exercices = []
    dernier_exercices.forEach(element => {
    // devrait retourner "false" si l'élément n'existe pas dans l'objet
    if(element.completed_in) {
      exercices.push(element)
    }
  })
  console.log(exercices);


    // Lorsque l'utilisateur finit tous les exercices sur la map on veut qu'il soit dirigé à l'accueil.
    // On veut également garder trace de quand la map a été achevée

    if (exercices.length == 5){

    let d4 = new Date();
    let year = d4.getFullYear();
    // +1 car getMonth() donne un mois entre 0 et 11
    let mois = d4.getMonth()+1;
    let jour = d4.getDate();
    let heures = d4.getHours();
    let minutes = d4.getMinutes();
    let secondes = d4.getSeconds();


    // On va chercher le tableau 'finished_maps' dans le profil de l'utilisateur et on y insère la date et heure où la map a été finie

    let finished_maps = Meteor.user().profile.finished_maps
    finished_maps.push(jour + "." + mois + "." + year + " à " + heures + ":" + minutes + ":" + secondes);
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.finished_maps': finished_maps } });
    
    alert("Bravo vous avez fini la MAP !");

    // Utilisateur redirigé à l'accueil

    setTimeout(function(){ FlowRouter.go('profile'); }, 1000);
  }
    
  }
});