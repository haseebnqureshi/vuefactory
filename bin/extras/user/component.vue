
<template lang="pug">

div.bordered
	h3 User Dash 
	p Nice to see you today, {{user.username}}!
</template>

<script>

module.exports = {
	data() {
		return {
			user: {
				username: 'username'
			}
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
