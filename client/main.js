
// Import des fichiers html (pour les templates) et pour le fichier CSS

import '../import/api/score.js';

import '../import/api/map.js';

import '../import/api/home.js';

import '../lib/routing.js';

import '../import/api/login.js';

import '../import/api/signup.js';

import '../import/api/profile.js';

import '../import/api/sidebar.js';

import '../import/api/classement.js';

import './main.html';

import './main.css';




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Entrer ceci dans Base :
/*

Aller dans le terminal : ctrl+¨, puis taper : meteor mongo. Entrer les lignes de codes suivantes les unes après les autres.

db.base.insertMany([{exercice : "pompes", nombre : 20, points : 50 }, {exercice : "tractions", nombre : 15, points : 100 }, {exercice : "abdos", nombre : 20, points : 50 }]);

*/


// Entrer ceci dans intermediate :
/*
db.intermediate.insertMany([{exercice : "pompes", nombre : 40, points : 100 }, {exercice : "tractions", nombre : 30, points : 200 }, {exercice : "abdos", nombre : 40, points : 100 }]);
*/


// Entrer ceci dans hard :
/*
db.hard.insertMany([{exercice : "pompes", nombre : 80, points : 200 }, {exercice : "tractions", nombre : 60, points : 400 }, {exercice : "abdos", nombre : 80, points : 200 }]);
*/


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

