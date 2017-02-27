'use strict';

// deps
var lib = require('../lib');

// initial state
var state = {

	data: {}

};

/*
getter methods related to these store items

you can easily call getter methods from you Vue components
by this.$store.getters.all or this.$store.getters.total
*/

var getters = {

	getUser: function(state, getters) {
		return state.data;
	}

};

/*
you must store.commit('mutation_method_name') to make
changes to your store. these operations must be performed
synchronously.
*/

var mutations = {

	fetch: function(state) {
		lib.ajax.get({
			resource: '/user',
			cookieHeaders: {
				cookieName: lib.config.USER_AUTH_API_TOKEN,
				headerName: lib.config.USER_AUTH_API_TOKEN_HEADER
			},
			success: res => {
				console.log(res);
				state.data = res.data;
			},
			error: xhr => {
				state.data = {};
			}
		});
	},

	save: function(state, payload) {
		state.data = lib._.extend(state.data, payload || {});
	}

};

/*
actions may seem redundant when looking to mutations, but
these allow you to asynchronously mutate your data, as
actions can be async whereas mutations MUST be sync.

actions get called by dispatch. for instance in your Vue
components, you'd call this.$store.dispatch('methodName', )
*/

var actions = {

	fetchUser: function(context) {
		context.commit('fetch');
	},

	saveUser: function(context, payload) {
		context.commit('save', payload || {});
	}

};

module.exports = { state, getters, mutations, actions };
