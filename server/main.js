import { Meteor } from 'meteor/meteor';

import '../import/api/collections/base.js';
import '../import/api/collections/intermediate.js';
import '../import/api/collections/hard.js';

import '../import/api/collections/level_1.js';




Meteor.startup(() => {
  // code to run on server at startup
});


if (Meteor.isServer){
  //Base = new Mongo.Collection('base');

  
}