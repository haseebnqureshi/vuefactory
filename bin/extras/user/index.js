'use strict';

/*==============
Dependencies
==============*/



/*==============
Vuex Store
==============*/

var store = module.exports.store = {};
store.user = require('./store.js');


/*==============
Vue Routes
==============*/

var routes = module.exports.routes = [];
routes.push({
	path: '/user',
	name: 'user',
	component: require('./component.vue')
});


/*==============
Vue Middlewares
==============*/

var middlewares = module.exports.middlewares = [];
middlewares.push(function(to, from, next) {
	console.log({ to, from });
	next();
});

