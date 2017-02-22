
<template lang="pug">

div.bordered
	p
		strong Register
	div(v-show="!actions.emailsent")
		input(type="text", v-model="user.username", placeholder="username")
		input(type="email", v-model="user.email", placeholder="email")
		button(v-show="formValidated", @click="register") Register
	div(v-show="actions.emailsent")
		p
			small Great! Check your email. Login when you're ready.

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
	computed: {
		formValidated() {
			return this.user.username !== '' && this.user.email !== ''
		}
	},
	methods: {
		register() {
			this.actions.emailsent = true;
			$.ajax({
				url: lib.config.API_ENDPOINT + '/register/user',
				type: 'post',
				data: {
					username: this.user.username,
					email: this.user.email
				},
				success: res => {
					console.log(res)
					this.actions.emailsent = true;
				},
				error: xhr => {

				}
			});
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
