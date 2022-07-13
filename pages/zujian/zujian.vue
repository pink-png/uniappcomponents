<template>
	<view>
		<!-- <web-view src="https://message.9tax.com/message/sysPage/index.html"></web-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			// getApp().globalData.isshow = false
		},
		onHide() {
			uni.switchTab({
				url:'../index/index'
			})
		}
	}
</script>

<style lang="scss">

</style>
