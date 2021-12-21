<template>
	<view class="container">
		<view class="panum webkit_flex">
			<view class="spanS" style="border-radius:4px 0px 0px 4px ;">
				<button class="btns" style="border-radius:4px 0px 0px 4px;" type="primary"
					:disabled="pnummeiqi<=min?true:false" @click="changenum('jian')">-</button>
			</view>
			<view class="spanN font_size4" v-if="isinput">{{pnummeiqi}}</view>
			<view class="spanN font_size4" v-else>
				<input type="number" v-model="pnummeiqi" @blur="blurpnummeiqi" />
			</view>
			<view class="spanS" style="border-radius:  0px 4px 4px 0px;">
				<button class="btns" style="border-radius:  0px 4px 4px 0px;" type="primary"
					:disabled="pnummeiqi>=max?true:false" @click="changenum('jia')">+</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pnummeiqi: 0
			}
		},
		props: {
			// 最大值
			max: {
				type: Number,
				default: 999999
			},
			// 最小值
			min: {
				type: Number,
				default: 0
			},
			// 是否支持输入
			isinput: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			changenum(type) {
				if (type == 'jian') {
					this.pnummeiqi += -1

				} else {
					this.pnummeiqi += 1
				}
				this.$emit('changenum', this.pnummeiqi)
			},
			blurpnummeiqi() {
				if (this.pnummeiqi <= 0) {
					this.pnummeiqi = this.min
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.font_size4 {
		font-size: 32rpx;
		color: #313131;
	}

	.container {
		display: flex;
		flex-direction: column;

		.panum {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			width: 236rpx;
			height: 52rpx;

			.spanS {
				width: 60rpx;
				height: 60rpx;
				line-height: 60rpx;

				.btns {
					border-radius: 0;
					height: 60rpx;
					line-height: 60rpx;
					padding: 0;
				}
			}

			.spanN {
				height: 56rpx;
				line-height: 56rpx;
				border-top: 1rpx solid #108EE9;
				border-bottom: 1rpx solid #108EE9;
				width: 120rpx;
				text-align: center;
			}
		}

		.webkit_flex {
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;
		}
	}
</style>
