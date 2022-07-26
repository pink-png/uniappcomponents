<template>
	<view>
		<switch color="red"  ref="switchaa" @change="changeswitch" :style="sty" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sty: ''
			}
		},
		onReady() {
		},
		methods: {
			changeswitch(e) {
				console.log('e', this.$root)
				if (!e.detail.value) {
					this.sty = 'background-color: rgb(0, 122, 255)'
				}
				console.log('switchaa', this.$refs.switchaa)
			}
		}
	}
</script>
<style>
</style>
