<template>
	<view class="goodsSwiperBox" v-show="detail">
		<view class='gswTitle'>
			<view class="gswTL" v-if="detail.title||detail.subLable">
				<text>{{detail.title}}</text>
				<text v-show="detail.subLable">{{detail.subLable}}</text>
			</view>
			<view class="gswTR" @tap='tapFun' data-type="more" v-if="config.more">更多<image
					src='/static/pyh-goodsSwiper/goIcon.png' style="margin-right: -10rpx;"></image>
				<image src='/static/pyh-goodsSwiper/goIcon.png'></image>
			</view>
		</view>
		<swiper class="gswSw" v-if="detail.list&&detail.list.length>0" :display-multiple-items="config.multiple||3"
			:autoplay="config.autoplay" next-margin="100rpx" @change="swiperChange" :disable-touch="disable">
			<swiper-item v-for="(list,i) in detail.list" :key="i">
				<view class='swiper-item gswGoods' @tap='tapFun' data-type="goods" :data-id="list.id" :data-index="i">
					<image :src='list.img' mode="aspectFit"></image>
					<view class='goodsTxt'>{{list.name}}</view>
					<view class='goodsPrice'><text class="currency">￥</text>{{list.price}}</view>
				</view>
			</swiper-item>
		</swiper>
		<block v-if="config.shadow">
			<view class="shadowLeft" v-show="current>0"></view>
			<view class="shadowRight" v-show="detail.list.length>config.multiple||3"></view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "goodsSwiper",
		props: {
			datas: {},
			config: {}
		},
		data() {
			return {
				detail: this.datas,
				current: 0,
				disable: this.datas.list.length < (this.config.multiple || 3) //App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
			}
		},
		created() {
			// console.log(this.detail)
		},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current
				this.$emit("change", e.detail.current)
			},
			tapFun(e) {
				var type = e.currentTarget.dataset.type,
					id = parseInt(e.currentTarget.dataset.id) || 0,
					index = parseInt(e.currentTarget.dataset.index) || 0;
				this.$emit("tapFun", {
					type: type,
					id: id,
					index: index
				})
			}
		}
	}
</script>

<style>
	.goodsSwiperBox {
		width: 710rpx;
		margin: 20rpx;
		border-radius: 20rpx;
		background: #fff;
		padding: 0 20rpx 0 10rpx;
		position: relative;
		box-sizing: border-box;
	}

	.goodsSwiperBox .gswTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		color: #999;
		padding-left: 10rpx;
	}

	.goodsSwiperBox .gswTitle .gswTL {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.goodsSwiperBox .gswTitle .gswTL text:first-child {
		font-weight: bold;
		font-size: 36rpx;
		margin-right: 5rpx;
		color: #000;
	}

	.goodsSwiperBox .gswTitle .gswTL text:nth-child(2) {
		background: red;
		color: #fff;
		border-radius: 16rpx;
		line-height: 33rpx;
		font-size: 22rpx;
		padding: 0 12rpx;
	}

	.goodsSwiperBox .gswTitle .gswTR {
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}

	.goodsSwiperBox .gswTitle .gswTR image {
		width: 24rpx;
		height: 24rpx;
	}

	.gswSw {
		height: 250rpx;
		padding-bottom: 20rpx;
	}

	.gswGoods {
		width: 100%;
		padding-left: 10rpx;
		font-weight: bold;
	}

	.gswGoods image {
		width: 100%;
		height: 176rpx;
		border-radius: 10rpx;
		display: block;
	}

	.gswGoods .goodsTxt {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 24rpx;
		line-height: 33rpx;
		text-align: center;
	}

	.gswGoods .goodsPrice {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		color: #FF3636;
		font-size: 30rpx;
		line-height: 42rpx;
		display: flex;
		justify-content: center;
	}

	.shadowLeft {
		position: absolute;
		left: 0;
		top: 80rpx;
		width: 125rpx;
		height: 250rpx;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 225, 0));
	}

	.shadowRight {
		position: absolute;
		right: 0;
		top: 80rpx;
		width: 125rpx;
		height: 250rpx;
		background-image: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 225, 0));
	}
</style>
