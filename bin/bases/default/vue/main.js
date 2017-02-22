'use strict';

// config
var config = {};
{{{config}}}

// deps
var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var Vuex = require('vuex');
var _ = require('underscore');
var home = require('./home');
{{{deps}}}

// configuring
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
{{{configuring}}}

// store
var stores = {};
{{{stores}}}

// routes
var routes = [];
routes = _.extend(routes, home.routes);
{{{routes}}}

// middlewares
var middlewares = [];
middlewares = _.extend(middlewares, home.middlewares);
{{{middlewares}}}

// creating single vuex store
var store = new Vuex.Store({
	modules: stores
});

// creating single vue router
var router = new VueRouter({
	routes: routes,

	// on any page change, starts us back to the top of page
	scrollBehavior: function(to, from, savedPosition) {
		return savedPosition ? savedPosition : { x:0, y:0 };
	}
});

// inserting waterfalling middlewares
router.beforeEach(function(to, from, next) {
	_.each(middlewares, function(middleware) {

		// it's completely up to middleware to pass 'next'
		middleware(to, from, next);
	});
});

// mount app
var app = new Vue({ store, router }).$mount('#app');


/*===============================================
 This project was generated by vuefactory (0.1.x)
 https://npmjs.com/package/vuefactory
===============================================*/

