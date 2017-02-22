
<template lang="pug">

div.bordered
	AppHeader

	h2 {{welcome}}
	p {{message}}
	<%= html %>

	AppFooter
</template>

<script>

module.exports = {
	data() {
		return {
			welcome: `Hello!`,
			message: `Welcome to our home component.`
		}
	},
	components: {
		AppHeader: require('../header/component.vue'),
		AppFooter: require('../footer/component.vue'),
		<%= components %>
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
