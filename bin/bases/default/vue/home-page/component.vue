
<template lang="pug">

div.bordered
	Header

	h2 {{welcome}}
	p {{message}}
	<%= html %>

	Footer
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
		Header: require('../header/component.vue'),
		Footer: require('../footer/component.vue'),
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
