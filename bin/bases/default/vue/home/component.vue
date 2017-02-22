
<template lang="pug">

div.bordered
	h2 {{welcome}}
	p {{message}}

</template>

<script>

module.exports = {
	data() {
		return {
			welcome: `Hello!`,
			message: `Welcome to our home component.`
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
