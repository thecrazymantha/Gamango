import './profile.html';
import './profile.css';

import '../signup/signup.html';
import '../signup/signup.js';



Template.profile.helpers({

  username() {
    return Meteor.user().username;
  },
  user_score() {
    return Meteor.user().profile.score;
  },
  user_temps() {
    return Meteor.user().profile.temps;
  },
  user_difficulty() {
    return Meteor.user().profile.difficulty;
  },
  user_finished_maps1() {
    let length= Meteor.user().profile.finished_maps.length;
    let half = Math.ceil((length-1)/2);
    return Meteor.user().profile.finished_maps.slice(0, half);
  },
  user_finished_maps2() {
    let length= Meteor.user().profile.finished_maps.length;
    let half = Math.floor((length-1)/2);
    return Meteor.user().profile.finished_maps.slice(half+1);
  },
  user_finished_maps_nb() {
    return Meteor.user().profile.finished_maps.length;
  },

});