<template>
	<view class="gsq_swipe_action">
		<!-- 外层 -->
		<view class="swipe_content">
			<!-- 循环item -->
			<view class="swipe_item" v-for="(v,i) in Tabs" :key="v.id">
				<!-- 底部按钮 -->
				<view class="swipe_item_bt">
					<view class="swipe_item_bt_item yellowcolor" @click.stop="btnitem(v,i,'shoucang')">
						收藏
					</view>
					<view class="swipe_item_bt_item greencolor" @click.stop="btnitem(v,i,'zhiding')">
						置顶
					</view>
					<view class="swipe_item_bt_item redcolor" @click.stop="btnitem(v,i,'shanchu')">
						删除
					</view>
				</view>
				<!-- 头部展示数据 -->
				<view :data-index="i" :data-item="v" @touchmove.stop.prevent="touchmove"
					@touchcancel.stop.prevent="touchcancel" @touchstart.stop.prevent="touchstart"
					@touchend.stop.prevent="touchend" @click="btnclass(i)" class="swipe_item_tp"
					:style="{transform: (ismove & tindex==i) ? movex : 'translateX(0rpx)' }">
					<slot>

					</slot>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "gsq-swipe-action",
		props: {
			value: {
				type: Number,
				default: 0
			},
			tabs: {
				type: Array,
				default () {
					return [{
							id: 1,
							name: '1111'
						}, {
							id: 2,
							name: '2222'
						},
						{
							id: 3,
							name: '3333'
						},
						{
							id: 4,
							name: '4444'
						}
					]
				}
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			padding: {
				type: String,
				default: '0'
			},
			color: {
				type: String,
				default: '#333'
			},
			activeColor: {
				type: String,
				default: '#F86767'
			},
			fontSize: {
				type: String,
				default: '28rpx'
			},
			activeFontSize: {
				type: String,
				default: '32rpx'
			},
			bold: {
				type: Boolean,
				default: true
			},
			scroll: {
				type: Boolean,
				default: true
			},
			height: {
				type: String,
				default: '70rpx'
			},
			lineColor: {
				type: String,
				default: '#F86767'
			},
			lineHeight: {
				type: String,
				default: '5rpx'
			},
			lineScale: {
				type: Number,
				default: 0.5
			},
			lineRadius: {
				type: String,
				default: '10rpx'
			},
			pills: {
				type: Boolean,
				deafult: false
			},
			pillsColor: {
				type: String,
				default: '#2979ff'
			},
			pillsBorderRadius: {
				type: String,
				default: '10rpx'
			},
			field: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: false
			},
			paddingItem: {
				type: String,
				default: '0 22rpx'
			}
		},
		data() {
			return {
				kaishiX: 0,
				movet: ['translateX(-', 0, 'rpx)'],
				movex: 'translateX(0rpx)',
				ismove: true,
				tindex: Number,
				Tabs: [],
				yidongtypex: 0
			}
		},
		created() {
			this.Tabs = JSON.parse(JSON.stringify(this.tabs))
		},
		methods: {
			// 判断当前这项
			btnclass(index) {
				this.tindex = index
				this.movex = 'translateX(0rpx)'
			},
			touchstart(e) {
				console.log('手指触摸动作开始', e)
				//刚开始滑动的时候拿到当前手指在横向的坐标值
				this.kaishiX = e.changedTouches[0].clientX
				//通过data-index 得到当前的索引值
				this.tindex = e.target.dataset.index
			},
			touchmove(e) {
				// console.log('手指触摸后移动',  e.changedTouches[0].clientX)
				//移动当中得到当前手指在横向的坐标值
				this.moveX = e.changedTouches[0].clientX
				// 判断用户往那边滑动 小于0的时候是往右边滑动
				let yidongtypex = this.kaishiX - this.moveX
				console.log('yidongtypex', yidongtypex)
				this.yidongtypex = yidongtypex
				// 判断滑动的距离值做出一系列操作
				if (yidongtypex < 0) {

					// if(this.movex != 'translateX(0rpx)'){
					//  console.log(this.movet)
					//  this.movet[1] = this.movet[1] + this.yidongtypex
					//  this.movex = this.movet.join('')
					// }

					this.movex = 'translateX(0rpx)'
				} else if (yidongtypex > 240) {
					this.movet[1] = 240
					this.movex = this.movet.join('')
				} else {
					this.movet[1] = yidongtypex
					this.movex = this.movet.join('')
				}
			},
			touchend(e) {
				// console.log('手指触摸动作结束，如松开按钮', e)
				let x = this.yidongtypex

				if (x < 80 && x > 0) {
					this.movex = 'translateX(0rpx)'
				} else if (x < 160 && x >= 80) {
					if (Math.abs(160 - x) >= Math.abs(x - 80)) {
						this.movex = 'translateX(-80rpx)'
					} else {
						this.movex = 'translateX(-160rpx)'
					}
				} else {
					this.movex = 'translateX(-240rpx)'
				}

			},
			touchcancel(e) {
				// console.log('手指触摸被打断，如来电提醒，弹窗 ', e)
			},
			//删除按钮
			btnitem(v, i, t) {
				console.log('v', v)
				console.log('i', i)
				console.log('t', t)

				if (t == 'shanchu') {
					this.Tabs.splice(i, 1)
					this.$emit('btntype', i)
				} else if (t == 'zhiding') {
					this.$emit('btntype', i)
				} else {
					this.$emit('btntype', i)
				}

				this.movex = 'translateX(0rpx)'
			}
		},

	}
</script>

<style lang="scss" scoped>
	.gsq_swipe_action {
		width: 100%;
		height: 100%;

		.swipe_content {
			width: 100%;
			height: calc(100vh);

			.swipe_item {
				width: 100%;
				height: 130rpx;

				.swipe_item_bt {
					width: 100%;
					height: 130rpx;
					position: relative;
					display: flex;
					justify-content: flex-end;
					z-index: 998;

					.swipe_item_bt_item {
						height: 130rpx;
						width: 80rpx;
						text-align: center;
						line-height: 130rpx;
					}

					.redcolor {
						background-color: red;
					}

					.greencolor {
						background-color: green;
					}

					.yellowcolor {
						background-color: yellow;
					}
				}

				.swipe_item_tp {
					width: 100%;
					height: 130rpx;
					position: relative;
					top: -130rpx;
					z-index: 999;
					background-color: pink;
				}
			}
		}
	}
</style>
