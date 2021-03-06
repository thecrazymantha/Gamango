# Gamango - README
### *Gamango version 1.0*
Par *Matthieu Perring, Thomas Rywalski, Zakari Rabet et Samantha Allendes*

Projet réalisé dans le cadre du cours
*Programmation pour Internet II - Meteor.js* donné par Loïc Cattani et Loris Rimaz

Faculté des lettres - Université de Lausanne - Février à Mai 2020 Github
## Description

**Afin d'assurer le bon fonctionnement de l'app, il est nécessaire _d'ajouter manuellement le contenu de 3 collections_ (base, intermediate et hard) comme indiqué dans le fichier main.js du client.**

Le projet Gamango a pour but de proposer des exercices physiques de manière ludique afin de favoriser la pratique sportive réguilière. Lorsqu'il joue, l'utilisateur accède à une map selon le niveau de difficulté choisi sur laquelle divers exercices lui sont proposés. Au fur et à mseure qu'il progresse dans la map, l'utilisateur reçois des points. L'utilisateur a également accès à un classement des utilisateurs selon leurs scores.

Le public ciblé est les personnes souhaitant s'initier au sport ou mainternir une régulation dans la pratique des exercices. L’application offrant plusieurs niveaux d'exercices, elle permet de cibler des personnes complètement débutantes à des personnes ayant un niveau intermédiaire dans la pratique journalières de sport. Le côté gamification de l’application qui permet de fidéliser les utilisateurs est plutôt destiné à un public jeune. L’application étant en français, le public cible est francophone.

## Interface
Cette section décrit les différentes étapes d'utilisation.
* À l’écran de démarrage,l'utilisateur peut soit se créer un compte, soit se connecter.
![Alt text](https://github.com/thecrazymantha/Gamango/blob/master/gamango/gamango%20page%200.PNG "démarrage")
![Alt text](https://github.com/thecrazymantha/Gamango/blob/master/gamango/gamango%20page%20login.PNG "login")
* Une fois connecté, il est ensuite dirigé vers la page home avec un petit message de bienvenue. Il peut accéder aux différentes pages de l'application grâce à la sidebar.
![Alt text](https://github.com/thecrazymantha/Gamango/blob/master/gamango/gamango%20page%20accueil.PNG "Page home")
* L'utilisateur peut consulter son profil dans lequel les informations concernant son score, le temps de passé à effectuer des exercies et le nombre de map qu'il aura termniné seront affichées.
![Alt text](https://github.com/thecrazymantha/Gamango/blob/master/gamango/gamango%20page%20accueil.PNG "Page profile")
* L'utilisateur peut consulter le classement des utilisateurs. Ceci sont classés selon leurs scores avec leurs username. Il est possible, en cliquant sur le username dans le classement, de consulter les 5 dernières dates (au maximum) où cet utilisateur à fini une map.
![Alt text](https://github.com/thecrazymantha/Gamango/blob/master/gamango/gamango%20page%20classement.PNG "Page classement")
* Depuis la sidebar l'utilisateur peut séléctionner le niveau de difficulté (beginner, intermediate, et hard)
![Alt text](https://github.com/thecrazymantha/Gamango/blob/master/gamango/gamango%20s%C3%A9l%C3%A9ction%20niveau.PNG "niveau")
* Lorsqu'il clique sur l'icône de la carte, l'utilisateur accède à une map avec différents exercices proposés. Ceux-ci sont tirés au sort selon le niveau de difficulté selectionné.
* Il y a également une en-tête sur la map avec le score de l'utilisateur et le temps passé à effectuer les exercices de la map. L'objectif de ce chrono est purement informatif.
 ![Alt text](https://github.com/thecrazymantha/Gamango/blob/master/gamango/gamango%20page%20map.PNG "Page map")
* Lorsqu'il appuie sur un bouton de la map, l'exercice apparaît sur la page avec les explications de l'exercice à effectuer, le nombre de point de score qu'il va apporter, un bouton "start" pour lancer le chrono lorqu'il débute l'exercice et un bouton "j'ai fini!" pour arrêter le chrono.
![Alt text](https://github.com/thecrazymantha/Gamango/blob/master/gamango/gamango%20page%20exercice.PNG "exercice")
* Lorsque l'utilisateur click sur le bouton "j'ai fini!" de l'exercice, l'exercice disparaît et la map est à nouveau disponible. Le bouton de l'exercice effectué devient vert, le nouveau score et le temps sont enregistré sur l'en-tête.
![Alt text](https://github.com/thecrazymantha/Gamango/blob/master/gamango/gamango%20page%20exercice%20termin%C3%A9.PNG "Page map")

## Base de données
L'application contient 5 collections MongoDB. La première est gérée par un des plugins (Accounts-base) et gère les comptes utilisateurs. 
Les collections Base, Intermediate et Hard contiennent les exercices a tirer au sort par la map selon le niveau de cette dernière.
Level_1 gère les exercices qui sont tirés au sort sur chaque bouton par la map. 

## License
Ce programme est un logiciel gratuit.

Gamango a été développé avec le framework de développement web en Javascript Meteor dans sa version 1.10.2

Les principaux modules Meteor utilisés dans ce projet sont :
* reactiveVar (variables réactives)
* FlowRouter (les liens)
* Blaze Layout (render des templates)
* Accounts-base & Accounts-password (gestion des comptes utilisateurs)
* Bootstrap (style)
* Mongo (base de données)
* Tracker (pour les tracker)
* gsap (pour les ainmations)
* easytimer (pour les timer)

Certaines libraries et modules utilisés pour le développement sont parfois soumis à un copyright par leurs auteurs respectifs.

Copyright © 2020 - l'équipe de développement de Gamango : *Matthieu Perring, Thomas Rywalski, Zakari Rabet et Samantha Allendes*

