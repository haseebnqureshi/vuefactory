
<template lang="pug">

div.bordered
	h3 User Login
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
			// var url = config.api.endpoint('/login/user');
			// var body = {
			// 	username: this.user.username,
			// 	password: this.user.password
			// };
			// this.$http.post(url, body).then(res => {
			// 	cookies.save('vuefactory_user_access_token', res.body.data.accessToken);
			// 	this.$router.push({ name: 'user' });
			// }, res => {

			// })
		},
		forgot() {
			this.actions.forgot = true;
			// var url = config.api.endpoint('/forgot/user');
			// var body = {
			// 	username: this.user.username
			// };
			// this.$http.post(url, body).then(res => {
			// 	this.actions.forgot = true;
			// }, res => {

			// })
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
