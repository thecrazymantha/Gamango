# Gamango - README
### *Gamango ver. 1.0*
Par *Matthieu Perring, Thomas Rywalski, Zakari Rabet et Samantha Allendes*

Projet réalisé dans le cadre du cours
*Programmation pour Internett II - Meteor.jy* donné par Loïc Cattani et Loris Rimaz

Faculté des Lettres - Université de Lausanne - Février à Mai 2020 Github
## Description
Le projet Gamango a pour but de proposer des exercices physiques de manière ludique afin de favoriser la pratique sportive réguilière. Lorsqu'il joue, l'utilisateur accède à une map selon son niveau sportif sur laquelle divers exerices lui sont proposer. Au fur et à mseure qu'il progresse dans la map, l'utilisateur reçois des points score. Les points données ne reflètent pas la performance mais la continuité des entraînements. L'utilisateur a égalment accès à un classement des utilisateurs selon leurs scores.

Le public ciblé est les personnes souhaitant s'initier au sport ou mainternir une régulation dans la pratique des exercies. L’application offrant plusieurs niveaux d'exercices, elle permet de ciblé des personnes complètement débutante à des personnes ayant un niveau intermédiaire dans la pratique journalières de sport. Le côté gamification de l’application qui permet de fidéliser les utilisateurs est plutôt destiné à un public jeune. La tranche d’âge visée serait donc de 15 à 35 ans.L’application étant en français, le public cible est francophone.
## Interface
Cette section décrite les différents étapes d'utilisation.
* L'utilisateur, à l'écran d'accueil, peut soit se créer un compte, soit se connecter.
![Alt text](https:// "Login")
* Une fois connecté, il est ensuite dirigé vers la page home où il peut choisir sont niveau (Beginner, Intermediate, Hard) et cliquer sur "jouer" ou consulter le classement en appuyant sur le bouton "classement".
![Alt text](https://github.com/sorchawalsh/projetgr4/raw/master/projet_g4/compromise/Capture_compromise_main_page_indisponible.PNG "Page home")
* Une Sidebar est aussi afficher sur les différents pages. Elle permet d'accèder au profil utilisateur, au classement, à la map des exercies, revenir à la page home et de se déconnecter.
* L'utilisateur peut consulter le classement des utilisateurs. Ceci sont classés selon leurs scores avec leurs username.
![Alt text](https://github.com/sorchawalsh/projetgr4/raw/master/projet_g4/compromise/Capture_compromise_comparaison_utilisateur_groupe.PNG "Page classement")
* Lorsqu'il clique sur "jouer" l'utilisateur accède à une map avec différents exercice proposé. lorsqu'un exercie est terminer le bouton correspendant change de couleur pour indiquer qu'il a été effectuer et l'utilisateur reçois des points scores après chaque exercice effectué.
* Il y a également un Header sur la map contenant la progression de l'utilisateur, la progression du level, son score, le temps qu'il a passé à effectuer ses exercies sur la map.
 ![Alt text](https://github.com/sorchawalsh/projetgr4/raw/master/projet_g4/compromise/Capture_compromise_groupe_membre.PNG "Page map")
* Lorsqu'il appuie sur un exercie, il apparaît sur la page avec les explications de l'exercice à effectuer, le nombre de point de score qu'il va apporter, un funfact, un bouton "start" pour lancer le chrono lorqu'il débute l'exercice et un bouton "j'ai fini!" pour arrêter le chrono.
![Alt text](https://github.com/sorchawalsh/projetgr4/raw/master/projet_g4/compromise/Capture_compromise_groupe_membre.PNG "exercice")
* lorsque l'utilisateur click sur le bouton "j'ai fini!" de l'exercice. l'exercice disparaît et la map est à nouveau disponible. le bouton de l'exercice effectué devient vert, le nouveau score et le temps sont enregistré sur le header.
![Alt text](https://github.com/sorchawalsh/projetgr4/raw/master/projet_g4/compromise/Capture_compromise_groupe_membre.PNG "Page map")
* Lorsqu'il consulte son profil l'utilisateur peut aussi voir son score et le temps effectué sur les exercices. 
![Alt text](https://github.com/sorchawalsh/projetgr4/raw/master/projet_g4/compromise/Capture_compromise_groupe_membre.PNG "Page mon profil")
## Base de données
L'application contient 5 collections MongoDB. la première est gérée par un des plugins (Accounts-base) et gère les comptes utilisateurs. 
Base, intermediate et hard contiennent les exercices a tiré au sort par la map selon le niveau de cette dernière.
Level_1 gère les exercices qui sont tirés au sors par la map

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

