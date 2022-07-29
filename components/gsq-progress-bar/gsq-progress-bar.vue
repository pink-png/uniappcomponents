<template>
	<view class="container" :style="{width:`${widthcontainer}rpx`}">
		<view class="yuan" 
		:style="{width: `${widthx}rpx`}" 
		@touchmove="touchmove" @touchstart="touchstart">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				widthcontainer : 500, //外层的宽度
				widthx : 60 ,// 内层要改变的宽度
				tempx : 0
			}
		},
		mounted() {
			// const info = uni.getSystemInfoSync()
			// console.log('info',info)
		},
		methods: {
			touchstart(e) {
				console.log('刚开始', e)
			},
			touchmove(e) {
				console.log('移动中', e)
				let x = e.touches[0].clientX
				if( x - this.tempx > 0 ){
					if(this.widthx >= this.widthcontainer){
						this.widthx = this.widthcontainer
					}else{
						this.widthx +=4
					}
				}else{
					if(this.widthx <= 60){
						this.widthx = 60
					}else{
						this.widthx -=4
					}
				}
				this.tempx = x
	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 60rpx;
		background-color: red;
		position: relative;

		.yuan {
			height: 60rpx;
			background-color: yellow;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>
