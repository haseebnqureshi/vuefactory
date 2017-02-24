
<template lang="pug">

div.bordered
	h3 User Dash 
	p Nice to see you today, {{user.username}}!
</template>

<script>

var lib = require('../lib');

module.exports = {
	data() {
		return {
			user: {
				username: 'username'
			}
		}
	},
	created() {
		this.getUser();
	},
	watch: {
		'$route': 'getUser'
	},
	methods: {
		getUser() {
			var headers = {};
			headers[lib.config.USER_AUTH_API_TOKEN_HEADER] = lib.cookies.get(lib.config.USER_AUTH_API_TOKEN);

			lib.$.ajax({
				url: lib.config.API_ENDPOINT + '/user',
				type: 'get',
				headers: headers,
				success: res => {
					console.log(res);
					this.user = res.data;
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
