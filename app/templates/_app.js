'use strict';
var <%= shortName %> = {
  common: { //Common is run on every page
	init: function() {

	}
  },

  home: { //'home' is a sample controller
	init: function() { //Init is run first everytime this controller is called with data-controller on body tag
		//you can run other actions with '<%= shortName %>.controller.action()'
	},
	sampleAction: function() { //This is run

	}
  },
};


//Extending Paul Irish’s comprehensive DOM-ready execution
// http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution
var UTIL = {
  exec: function( controller, action ) {
	var ns = <%= shortName %>;
	action = ( action === undefined ) ? 'init' : action;

	if ( controller !== '' && ns[controller] && typeof ns[controller][action] === 'function' ) {
	  	ns[controller][action]();
	}
  },

  init: function() {
	var body = document.body,
		controller = body.getAttribute( 'data-controller' ),
		action = body.getAttribute( 'data-action' );

	UTIL.exec( 'common' );
	UTIL.exec( controller );
	UTIL.exec( controller, action );
  }
};

$( document ).ready( UTIL.init );
