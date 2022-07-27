<template>
	<view class="container">
		<view class="textcontent">
			<!-- 左右滚动 -->
			<view v-if="udlr" class="texttext" :style="{ right:`${right}rpx`}">
				{{text}}
			</view>
			<!-- 上下滚动 -->
			<view v-else class="texttext" :style="{ top:`${top}rpx`}">
				{{text}}
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * gsq-scroll-text-bar
	 * @property {Number | Stirng | Object} text 显示的数据
	 * @property {Number} Textscrollingspeed = 500 滚动的速度
	 * @property {Boolean} bold = [true | false] 是否文字滚动
	 * @property {String} udlr = [true | false] 上下滚动还是左右滚动
	 */
	export default {
		data() {
			return {
				right: 0,
				top: 0,
				time: null
			}
		},
		props: {
			text: {
				type: String | Number | Array,
				default: '测试数据~~~~~~~~~~~~~~~~~~~~~~~~~'
			},
			Textscrollingspeed: {
				type: Number,
				default: 500
			},
			bold: {
				type: Boolean,
				default: true
			},
			udlr: {
				type: Boolean,
				default: false
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				if (this.bold) {
					if(this.udlr){
						let time = setInterval(() => {
							if (this.right == 500) {
								this.right = -750
							} else {
								this.right += 25
							}
						}, this.Textscrollingspeed)
					}else{
						let time = setInterval(() => {
							if (this.top == -50) {
								this.top = 0
							} else {
								this.top -= 5
							}
						}, this.Textscrollingspeed)
					}
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;

		.textcontent {
			width: 750rpx;
			height: 50rpx;
			line-height: 50rpx;
			background-color: yellow;
			position: relative;

			.texttext {
				background-color: yellow;
				position: absolute;
				top: 0;
				right: 0;
				width: 750rpx;
				height: 50rpx;
			}
		}
	}
</style>
