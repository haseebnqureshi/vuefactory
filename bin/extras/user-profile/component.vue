
<template lang="pug">

div.bordered
	h3 User Profile 

	div
		label Username
		input(type="text", v-model="user.username" disabled="disabled")

	div
		label Firstname
		input(type="text", v-model="user.firstname")

	div
		label Lastname
		input(type="text", v-model="user.lastname")

	div
		label Email
		input(type="email", v-model="user.email")

	button(@click="save") Save

</template>

<script>

var lib = require('../lib');

module.exports = {
	data() {
		return {
			
		}
	},
	computed: {
		user() {
			return this.$store.getters.getUser
		}
	},
	methods: {
		save() {
			this.$store.dispatch('saveUser', this.user);
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
