//home.vue

<style lang="sass">
	h2 {
		color: #acacac;

		&.red {
			color: #f00;
		}
	}
</style>

<template lang="pug">
	h2.red {{msg}}
</template>

<script>
	module.exports = {
		data() {
			return {
				msg: 'Hello, from home.vue!'
			}
		}
	}
</script>