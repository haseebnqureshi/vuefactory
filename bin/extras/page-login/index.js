'use strict';

/*==============
Dependencies
==============*/



/*==============
Vuex Store
==============*/

var store = module.exports.store = {};


/*==============
Vue Routes
==============*/

var routes = module.exports.routes = [];
routes.push({
	path: '/login',
	name: 'pageLogin',
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

