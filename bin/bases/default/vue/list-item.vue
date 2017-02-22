//list-item.vue

<style lang="sass">

</style>

<template lang="pug">
	div
		h2.red {{msg}} {{$route.params.id}}
		h3
			a(v-bind:href="data.url", target="_blank") {{data.title}}
</template>

<script>
	module.exports = {
		data: function() {
			return {
				loading: false,
				data: {},
				error: null,
				msg: 'List Item View!'
			}
		},
		created () {
			this.fetchData();
		},
		watch: {
			'$route': 'fetchData'
		},
		methods: {
			fetchData () {
				this.data = {};
				this.loading = true;
				this.$http.get(`https://hacker-news.firebaseio.com/v0/item/${this.$route.params.id}.json`).then(res => {
					this.data = res.body;
					this.loading = false;
				}, res => {
					this.error = res;
					this.loading = false;
				})
			}
		}
	}
</script>