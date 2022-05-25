<template>
	<view class="address" @click="btnaddress">
		<view class="address-title">
			邮寄地址
		</view>
		<view class="address-content">
			<view class="leftcontentxx">
				<image src="../../static/paper/addressicon.png" style="width: 56rpx;height: 56rpx;"></image>
				<view v-if="formdata.userName" class="contentext">
					<view class="toptext textcc">
						收件人：{{formdata.userName}}  {{formdata.telNumber}}
					</view>
					<view class="bottomtextxx textcc">
						{{formdata.provinceName}}-{{formdata.cityName}}-{{formdata.countyName}} {{formdata.detailInfo}}
					</view>
				</view>
				<view v-else class="contentext tetxcc">
					请选择报纸邮寄地址
				</view>
			</view>
			<view class="sanjiao">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				formdata : {
					userName : '张三',
					telNumber : '17645278832',
					provinceName : '浙江省',
					cityName : '杭州市',
					countyName : '西湖区',
					detailInfo : '文一西路数娱大厦801室'
				}
			}
		},
		methods:{
			btnaddress(){
				let that = this
				uni.chooseAddress({
				  success(res) {
				    console.log(res.userName)
				    console.log(res.provinceName)
				    console.log(res.cityName)
				    console.log(res.countyName)
				    console.log(res.detailInfo)
				    console.log(res.telNumber)
					Object.assign(that.formdata,res)
				  }
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.address{
		margin: 0 auto;
		width: 710rpx;
		height: 210rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		.address-title{
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1px solid #F1F1F1;
			box-sizing: border-box;
			padding: 0 20rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		.address-content{
			width: 100%;
			flex: 1;
			box-sizing: border-box;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.tetxcc{
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			.leftcontentxx{
				display: flex;
				align-items: center;
				max-width: 640rpx;
				.contentext{
					flex: 1;
					margin-left: 30rpx;
					.toptext{
						
					}
					.bottomtextxx{
						margin-top: 8rpx;
					}
					.textcc{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
					}	
				}
			}
			.sanjiao{
				width: 12rpx;
				height: 12rpx;
				border-top: 2rpx solid #B2B2B2;
				border-right: 2rpx solid #B2B2B2;
				transform: rotate(45deg);
			}
		}
	}
</style>
