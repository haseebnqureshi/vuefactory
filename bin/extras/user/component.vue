
<template lang="pug">

div.bordered
	h3 User Dash 
	p Nice to see you today, {{user.username}}!
	
	UserProfile
</template>

<script>

var lib = require('../lib');

module.exports = {
	data() {
		return {

		}
	},
	components: {
		UserProfile: require('../user-profile/component.vue')
	},
	computed: {
		user() {
			return this.$store.getters.getUser
		}
	},
	created() {
		this.fetchUser();
	},
	watch: {
		'$route': 'fetchUser'
	},
	methods: {
		fetchUser() {
			this.$store.dispatch('fetchUser');
		}
	}
}

</script>

<style lang="sass">

.bordered {
	border: dashed 1px gray;
	padding: 20px;
	margin: 10px;
}

</style>
