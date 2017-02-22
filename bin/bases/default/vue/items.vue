//items.vue

<style lang="sass">

</style>

<template lang="pug">
	div
		h2 Functioning Vuex Example
		p Using our very simple items store, we're showcasing how you can keep your Vue applications stateful by using Vuex, an intuitive and straightforward state manager.
		ul
			li(v-for="item in data")
				div
					strong {{item.name}}
				div
					small {{item.desc}}
				div
					button(@click="remove(item.id)") Remove

		input(v-model="item.name", type="text", placeholder="Name")
		textarea(v-model="item.desc", placeholder="Desc")
		button(@click="add") Add New Item
</template>

<script>
	module.exports = {
		data() {
			return {
				data: [],
				item: {
					id: 0,
					name: '',
					desc: ''
				}
			}
		},
		computed: {
			data() {
				return this.$store.getters.all;
			}
		},
		methods: {
			add() {
				if (!this.validated()) { return; }
				this.$store.dispatch('add', {
					name: this.item.name,
					desc: this.item.desc,
					show: true
				}).then(() => {
					this.reset();
				})
			},
			remove(id) {
				this.$store.dispatch('remove', { id }).then(() => {
					console.log('removed item with id', id);
				});
			},
			reset() {
				this.item.name = '';
				this.item.desc = '';
			},
			validated() {
				if (this.item.name === '' || this.item.desc === '') { 
					alert('please fill out the fields!');
					return false;
				}
				return true;
			}
		}
	}
</script>