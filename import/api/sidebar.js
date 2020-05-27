

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Mongo } from 'meteor/mongo';

// Import pour bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import pour les collections

import { Base } from './collections/base.js';
import { Intermediate } from './collections/intermediate.js';
import { Hard } from './collections/hard.js';
import { Level_1 } from './collections/level_1.js';

// import du CSS et du HTML
import '../templates/sidebar/sidebar.css';
import '../templates/sidebar/sidebar.html';


// Import pour les routes
import '../../lib/routing.js';

/*
Template.sidebar.rendered = function(){

}
*/

Template.sidebar.events({
	"click .logout": function(event){
		Meteor.logout(function(err){
			if(err) {
				Bert.alert(err.reason, "danger", "growl-top-right");
			} else {
				FlowRouter.go('/');
				Bert.alert("Vous êtes maintenant déconnecté.", "success", "growl-top-right");
			}
		});
  },
  
  // On va maintenant modifier la valeur du champs 'difficulty' en fonction du choix de l'utilisateur

	"click #beginner-link"() {
  
		Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.difficulty': "beginner" } });
		

  },

  'click #intermediate-link'() {

    Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.difficulty': "intermediate" } });

  },

  'click #hard-link'() {

    Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.difficulty': "hard" } });

  },

  
  // Ce qu'il doit se passer lorsque l'utilisateur veut commencer une partie

  'click #map-link'() {
  
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
});

Template.sidebar.helpers({

  difficulty_level() {
  // Aller chercher le score de l'utlisateur.

    return Meteor.user().profile.difficulty;
  }

});
