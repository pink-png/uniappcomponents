<template>
	<view class="container">
		<!-- <view class="childbox" v-for="(item,index) in commponentslist" :key="index" @click="navcomponets(item)">
			{{item}}
		</view> -->
		<button type="default" @click="btn">按钮</button>
		<!-- <GsqCitypicker ref='citypicker' @onConfirm="onConfirm" @onCancel="onCancel"></GsqCitypicker> -->
		<!-- <GsqShengShiPicker ref='citypicker' @sure="onConfirm"></GsqShengShiPicker> -->
		<!-- <CodeKeyBoard ref='citypicker' @KeyInfo='onConfirm'/> -->
		<!-- <MxDatePicker type="data" show="true"></MxDatePicker> -->
		<lu-popup-wrapper ref='citypicker'>
			
			11
		</lu-popup-wrapper>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onReady() {
			
		},
		methods: {
			btn(){
				this.$refs.citypicker.show()
			},
			onConfirm(e){
				console.log(e)
			},
			onCancel(e){
				console.log(e)
			},
			navcomponets(item){
				uni.navigateTo({
					url:'../zujian/zujian'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.container{
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 20rpx;
		.childbox{
			width: 100%;
			height: 90rpx;
			border: 1rpx solid #808080;
			border-radius: 25rpx;
			margin-top: 10rpx;
			text-align: center;
		}
	}
</style>
