import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './map.html';
import './map.css';

Template.canvas.events({
  'click .bouton'(event) {
    console.log(event);
    const { target } = event;
    const exercice = 0;
    if (exercice === 0) {
      target.setAttribute('fill', '#3103fc');
      console.log('it worked');
    }
    FlowRouter.go('TEST');
  },

});
