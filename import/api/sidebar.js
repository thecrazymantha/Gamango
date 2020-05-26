
// import du CSS et du HTML
import '../templates/sidebar/sidebar.css';
import '../templates/sidebar/sidebar.html';

Template.sidebar.rendered = function(){

}

Template.sidebar.events({
	"click .logout": function(event){
		Meteor.logout(function(err){
			if(err) {
				Bert.alert(err.reason, "danger", "growl-top-right");
			} else {
				FlowRouter.go('/');
				Bert.alert("You Are Now Logged Out", "success", "growl-top-right");
			}
		});
	},
});
