
<template lang="pug">

div.bordered
	h2 {{brand}} (Header)
	<%= html %>
</template>

<script>

module.exports = {
	data() {
		return {
			brand: `VueFactory`
		}
	},
	components: {
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
