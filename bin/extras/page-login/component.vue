
<template lang="pug">

div.bordered
	Header

	h2 User Login
	MiniLogin

	Footer
</template>

<script>

module.exports = {
	data() {
		return {

		}
	},
	components: {
		Header: require('../header/component.vue'),
		Footer: require('../footer/component.vue'),
		MiniLogin: require('../mini-login/component.vue')
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
