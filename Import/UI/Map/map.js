

import './map.html';
import './map.css';
import '../../lib/routing.js';



Template.canvas.events({
  'click .bouton': function(event) {
      const target = event.target;
      const exercice = 0;
      if (exercice == 0){
      target.setAttribute('fill', '#3103fc');
      console.log("it worked"); 
      }
      FlowRouter.go('TEST');
  }

});