
<template lang="pug">

div.bordered
	AppHeader

	h2 User Register
	Register

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
		Register: require('../register/component.vue')
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
