
<template lang="pug">

div.bordered
	div(v-show="!actions.forgot")
		input(type="text", v-model="user.username", placeholder="username")
		input(type="password", v-model="user.password", placeholder="password")
		button(v-show="maybeForgotPassword", @click="forgot") Forgot Password?
		button(v-show="formValidated", @click="login") Login
	div(v-show="actions.forgot")
		p
			small 
				span Alright! Emailed your temporary password. 
				span
					a(@click="ready") Login when you're ready.

</template>

<script>

var lib = require('../lib');

module.exports = {
	data() {
		return {
			actions: {
				forgot: false
			},
			user: {
				username: '',
				password: ''
			}
		}
	},
	computed: {
		formValidated() {
			return this.user.username !== '' && this.user.password !== '';
		},
		maybeForgotPassword() {
			return this.user.username !== '' && this.user.password === '';
		}
	},
	methods: {
		login() {
			lib.$.ajax({
				url: lib.config.API_ENDPOINT + '/login/user',
				type: 'post',
				data: {
					username: this.user.username,
					password: this.user.password
				},
				success: res => {
					lib.cookies.set(lib.config.USER_AUTH_API_TOKEN, res.data.accessToken);
					this.$router.push({ name: 'user' });
				},
				error: xhr => {

				}
			});
		},
		forgot() {
			this.actions.forgot = true;
			lib.$.ajax({
				url: lib.config.API_ENDPOINT + '/forgot/user',
				type: 'post',
				data: {
					username: this.user.username
				},
				success: res => {
					this.actions.forgot = true;
				},
				error: xhr => {

				}
			});
		},
		ready() {
			this.actions.forgot = false;
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

a {
	text-decoration: underline;
	cursor: pointer;
}

</style>
