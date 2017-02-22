//list.vue

<style lang="sass">

</style>

<template lang="pug">
	div
		h2.red {{message}}
		p Here are the top stories from HN. Sorry they're only by each story's id! Go click and explore.
		button(@click="refresh") Refresh Stories
		ul
			li(v-for="item in data")
				router-link(:to= "{ name: 'list-item', params: { id: item } }") {{item}}
</template>

<script>
	module.exports = {
		data () {
			return {
				loading: false,
				data: [],
				error: null,
				message: 'List View!'
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
				if (this.data.length > 0) { return; }
				this.loading = true;
				this.$http.get('https://hacker-news.firebaseio.com/v0/topstories.json').then(res => {
					this.data = res.body;
					this.loading = false;
				}, res => {
					this.error = res;
					this.loading = false;
				})
			},
			refresh () {
				this.data = [];
				this.fetchData();
			}
		}
	}
</script>