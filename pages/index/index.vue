<template>
	<view class="content">
		<gsq-tab-list
		
		/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		async onLoad() {
			let res = await this.$https(this.$api.hh)
			// console.log('res',res)
		},
		methods: {
		},
	}
</script>

<style>
	.content {
		/* background-color: #C8C7CC; */
		display: flex;
		flex-direction: column;
	}
</style>
