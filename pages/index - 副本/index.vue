<template>
	<view class="modal_box" v-if="visible">
		{{shi[value[0]]}}时{{fen[value[1]]}}分{{miao[value[2]]}}秒
		<view class="selectProvince">
			<view @click='visible = false'>
				<text class="font_size9">取消</text>
			</view>
			<view @click='sure'>
				<text class="font_size14">确定</text>
			</view>
		</view>
		<view class="picker-view">
			<picker-view :value="value" @change="bindChange"  style="text-align: center;">
				<picker-view-column>
					<view class="item" v-for="(item,index) in shi" :key="index">{{item}}时</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in fen" :key="index">{{item}}分</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in miao" :key="index">{{item}}秒</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible: true,
				value: [0, 0, 0],
				fen: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
					28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
					51, 52, 53, 54, 55, 56, 57, 58, 59, 60
				],
				shi: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				miao: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
					28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
					51, 52, 53, 54, 55, 56, 57, 58, 59, 60
				]
			}
		},
		methods: {
			bindChange(e) {
				console.log(e)
				this.value = e.detail.value
			},
			kaisi() {
				this.visible = true
			},
			sure() {
				this.visible = false
			}
		}
	}
</script>


<style  lang="scss">
	.item {
		height: 50px;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.modal_box {
		position: fixed;
		width: 100%;
		height: 100%;
		background: red;
		top: 0;
		bottom: 0;
		z-index: 900;
	
		.picker-view {
			width: 100%;
			height: 600rpx;
			margin-top: 20rpx;
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;

			.selectProvince {
				width:750rpx;
				height : 100rpx;
				display: flex;
				justify-content: space-between;
				padding: 30rpx;
				border-bottom: 1rpx solid #F2F2F2;
				background-color: red;

				.font_size9 {
					font-size: 32rpx;
					color: #535353;
				}

				.font_size14 {
					font-size: 32rpx;
					color: #2FB42E
				}
			}


		}


	}
