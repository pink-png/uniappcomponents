<template>
	<canvas class="canvasBox" :id="'canvasId_' + canvasId"></canvas>
</template>

<script>
export default {
	props: {
		canvasId: {
			type: String,
			default: '1'
		}
	},
	data() {
		return {
			canvasObj: null
		};
	},
	created() {
		// 保存画布对象
		this.canvasObj = uni.createCanvasContext('canvasId' + this.canvasId, this);
		
		// 获取可使用窗口宽度
		let width = uni.getSystemInfoSync().windowWidth 
		this.width = `${width}px` 
		
	}
};
</script>

<style>
	.canvasBox{
		width: 110rpx;
		height: 370rpx;
	}
	
</style>
