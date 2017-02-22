
<template lang="pug">

div.bordered
	AppHeader

	h2 User Login
	Login

	AppFooter
</template>

<script>

module.exports = {
	data() {
		return {

		}
	},
	components: {
		AppHeader: require('../header/component.vue'),
		AppFooter: require('../footer/component.vue'),
		Login: require('../login/component.vue')
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
