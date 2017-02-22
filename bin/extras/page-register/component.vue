
<template lang="pug">

div.bordered
	Header

	h3 User Register
	div(v-show="!actions.emailsent")
		input(type="text", v-model="user.username", placeholder="username")
		input(type="email", v-model="user.email", placeholder="email")
		button(v-show="formValidated", @click="register") Register
	div(v-show="actions.emailsent")
		p
			small Great! Check your email. Login when you're ready.

	Footer
</template>

<script>

module.exports = {
	data() {
		return {
			actions: {
				emailsent: false
			},
			user: {
				username: '',
				email: ''
			}
		}
	},
	components: {
		Header: require('../header/component.vue'),
		Footer: require('../footer/component.vue'),
	},
	computed: {
		formValidated() {
			return this.user.username !== '' && this.user.email !== ''
		}
	},
	methods: {
		register() {
			this.actions.emailsent = true;
			// var url = config.api.endpoint('/register/user');
			// var body = {
			// 	username: this.user.username,
			// 	email: this.user.email
			// };
			// this.$http.post(url, body).then(res => {
			// 	console.log(res.body);
			// 	this.actions.emailsent = true;
			// }, res => {

			// })
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
