'use strict';

// initial state
var state = {

	//we've decided to keep all items in our state's 'all'
	all: [
		{
			id: 1,
			name: 'Example Item',
			desc: 'Our getters are returning items with show=true.',
			show: true
		},
		{
			id: 0,
			name: 'Another Example Item',
			desc: 'This won\'t show, since show is set to false.',
			show: false
		}
	]
};

/*
getter methods related to these store items

you can easily call getter methods from you Vue components
by this.$store.getters.all or this.$store.getters.total
*/

var getters = {

	//only returns items that are set to 'show'
	all: function(state, getters) {
		return state.all.filter(function(item) {
			return item.show;
		});
	},

	/*
	your getters can also return methods that take
	any parameter, such as a find method. we then use
	find to return any items that match our id.
	*/

	find: function(state, getters) {
		return function(id) {
			return getters.all.find(function(item) {
				return item.id === id;
			});
		};
	},

	//gets the total count of our items
	total: function(state, getters) {
		return getters.all.length;
	}

};

/*
you must store.commit('mutation_method_name') to make
changes to your store. these operations must be performed
synchronously.
*/

var mutations = {

	//simply takes a payload of 'item' and appends to our state's 'all' array
	add: function(state, payload) {
		payload.id = state.all.length;
		state.all.push(payload);
	},

	remove: function(state, payload) {
		state.all = state.all.filter(function(item) {
			return item.id !== payload.id;
		});
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

	add: function(context, payload) {
		context.commit('add', payload)
	},

	remove: function(context, payload) {
		context.commit('remove', payload)
	}

};

module.exports = { state, getters, mutations, actions };
