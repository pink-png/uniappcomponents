<template>
	<view class="container">
		<view class="container-item">
			<text>姓名</text>
			<input type="text" placeholder="请输入姓名">
		</view>
		<view class="container-item">
			<text>手机号</text>
			<input type="text" placeholder="请输入手机号">
		</view>
		<view class="container-item">
			<text>电子邮箱</text>
			<input type="text" placeholder="请输入姓名">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		.container-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			text{
				width: 150rpx;
			}
			input{
				flex: 1;
			}
		}
	}
</style>
