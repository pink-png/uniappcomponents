<template>
	<view>
		<view :style="bgStyle" class="shanxing">
			<view v-if="percent != 0 && percent != 100" class="sx1" :style="sx1Style"></view>
			<view v-if="percent != 50 && percent != 0 && percent != 100" class="sx2" :style="sx2Style"></view>
			<view class="sx_t" :style="circleStyle">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			width: { //宽高
				type: Number,
				default: 50,
			},
			bgcolor: { //进度环背景色
				type: String,
				default: '#30D0C3'
			},
			quancolor: { //进度圈颜色
				type: String,
				default: '#E3E2E2'
			},
			circleBg: {
				type: String,
				default: '#ffffff'
			},
			borderW: { //边线宽度
				type: Number,
				default: 10
			},
			percent: { //进度
				type: Number | String,
				default: 0
			},
		},
		data() {
			return {};
		},
		computed: {
			circleStyle() { //背景底色
				let circleBg = this.circleBg
				let width = this.width
				let borderW = this.borderW
				return `width:${width-borderW}px;height:${width-borderW}px;background:${circleBg}`
			},
			bgStyle() { //背景颜色
				let percents = this.percent
				let quancolor = this.quancolor
				let bgcolor = this.bgcolor
				let width = this.width
				let style = ''
				if ((percents < 50 && percents != 0) || percents == 100) {
					style = `background:${bgcolor};width:${width}px;height:${width}px`
				} else {
					style = `background:${quancolor};width:${width}px;height:${width}px`
				}
				return style
			},
			sx1Style() { //sx1样式
				let percents = this.percent
				let quancolor = this.quancolor
				let bgcolor = this.bgcolor
				let style = ''
				let width = this.width
				if ((percents < 50 && percents != 0) || percents == 100) {
					style =
						`background:${quancolor};width:${width}px;height:${width}px;clip: rect(0, ${width/2}px,${width}px, 0);`
				} else {
					style =
						`-webkit-transform: rotate(180deg);background:${bgcolor};width:${width}px;height:${width}px;clip: rect(0, ${width/2}px,${width}px, 0);`
				}
				return style
			},
			sx2Style() {
				let percents = this.percent
				let quancolor = this.quancolor
				let bgcolor = this.bgcolor
				let style = ''
				let width = this.width
				if ((percents < 50 && percents != 0) || percents == 100) {
					style =
						`background:${quancolor};clip: rect(0, ${width/2}px,${width}px, 0);width:${width}px;height:${width}px;transform: rotate(${percents < 50 ? ((360 * percents / 100) - 180):(360 * (percents - 100) / 100)}deg)`;
				} else {
					style =
						`-webkit-transform: rotate(180deg);background:${bgcolor};clip: rect(0, ${width/2}px,${width}px, 0);width:${width}px;height:${width}px;transform: rotate(${percents < 50 ? ((360 * percents / 100) - 180):(360 * (percents - 100) / 100)}deg);`;
				}
				return style
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.shanxing {
		position: relative;
		border-radius: 100px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.sx1,
	.sx2 {
		position: absolute;
		top: 0;
		left: 0;
	}

	.sx1 {
		z-index: 1;
	}

	.sx2 {
		z-index: 2;
	}

	.sx_t {
		border-radius: 100px;
		z-index: 3;
	}
</style>
