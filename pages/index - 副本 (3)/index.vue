<template>
	<view class="continor">
		<view class="topheader">
		</view>	
		
		<view class="chatop">
			<view class="twotop">
				<view class="left-l">
					
				</view>
				<view class="right-l">
					<view class="ri">
						<view class="aaaa">
							马晓燕
						</view>
						<view class="bbbb">
							111111
						</view>
					</view>
					<view class="le">
						<view class="">
							
						</view>
					</view>
				</view>
			</view>
			
			<view class="twotitle">
				<view class="" v-for="(item,index) in info" :key="index">
					{{item}}
					<text v-if="index!=info.length-1" style="margin-left: 30rpx;opacity: 0.5;">|</text>
				</view>
			</view>
			
			<view class="twoshanchang">
				<view class="aaaaaa">
					擅长领域
				</view>
				<view class="eeee">
					<view class="dddd" v-for="(item,index) in tags" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			
			<view class="toptext">
				<view class="">
					￥198/30分钟
				</view>
				<view class="">
					咨询量：8次
				</view>
			</view>
			
		</view>
		
		<view class="xxxxxx">
			<view class="timexuanze" style="margin: 600 auto;">
				<view class="box">
					<view class="b-l">
						2022年03月24日
					</view>
					<view class="b-r">
						<view class="ccc" :class="[!item.status?'sele':'nose']" 
						@click="nav(item.id)"
						v-for="(item,index) in timeone" :key="index">
							{{item.item}}
						</view>
					</view>
				</view>
			</view>
		</view>
				
		<!-- 底部按钮 -->
		<view class="bottombutton" v-if="1">
			立即预约
		</view>
		<view class="bottombutton" v-else>
			立即预约(4个时间段)
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				info: ["正面管教讲师", "家庭咨询师", "心理咨询师"],
				tags: ["家庭关系", "个人成长", "亲子养育", "亲密关系"],
				timeone: [{id:1,item:'11:30-12:00',status:false},
							{id:2,item:'11:30-12:00',status:false},
							{id:3,item:'11:30-12:00',status:false}],
				dates: [
				       ["2022-03-24 21:00:00", "2022-03-24 21:30:00"],
				       ["2022-03-24 21:30:00", "2022-03-24 22:00:00"],
				       ["2022-03-25 16:00:00", "2022-03-25 16:30:00"],
				       ["2022-03-25 16:30:00", "2022-03-25 17:00:00"],
				       ["2022-03-25 20:30:00", "2022-03-25 21:00:00"],
				       ["2022-03-26 16:00:00", "2022-03-26 16:30:00"],
				       ["2022-03-27 16:00:00", "2022-03-27 16:30:00"],
				]
			}
		},
		methods: {
			nav(id){
				console.log('id',id)
				this.timeone.forEach((item,index)=>{
					if(id == item.id){
						item.status = !item.status
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: rgb(248,248,248);
	}
	.continor{
		display: flex;
		flex-direction: column;
		.topheader{
			width: 100%;
			height: 260rpx;
			position: relative;
			background-color: rgb(90,189,186);
		}
		
		.chatop{
			position: absolute;
			top: 40rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 670rpx;
			min-height: 500rpx;
			background-color: rgb(255,255,255);
			border-radius: 10rpx;
			.twotop{
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 20rpx;
				.left-l{
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
					background-color: red;
				}
				.right-l{
					flex: 1;
					margin-left: 20rpx;
					display: flex;
					justify-content: space-between;
					.ri{
						.aaaa{
							
						}
						.bbbb{
							margin-top: 30rpx;
						}
					}
					.le{
						view{
							width: 70rpx;
							height: 70rpx;
							background-color: yellow;
							border-radius: 50%;
						}
					}
				}
			}
		
			.twotitle{
				margin-top: 30rpx;
				display: flex;
				flex-wrap: wrap;
				view{
					margin-left: 40rpx;
				}
			}
			
			.twoshanchang{
				// background-color: red;
				margin-top: 60rpx;
				display: flex;
				flex-direction: column;
				// justify-content: space-between;
				flex-wrap: wrap;
				.aaaaaa{
					margin-left: 40rpx;
					// background-color: blue;
				}
				.eeee{
					// background-color: green;
					display: flex;
					flex-wrap: wrap;
					// margin-left: 40rpx;
					.dddd{
						min-width: 80rpx;
						// height: 50rpx;
						text-align: center;
						// line-height: 50rpx;
						margin-left: 40rpx;
						border: 1rpx solid rgb(90,189,186);
						box-sizing: border-box;
						padding: 10rpx;
						border-radius: 30rpx;
						color: rgb(90,189,186);
						margin-top: 10rpx;
					}
				}

			}
			
			.timexuanze{
				margin-top: 30rpx;
				.box{
					margin-top: 60rpx;
					.b-r{
						display: flex;
						margin-top: 30rpx;
						.ccc{
							min-width: 100rpx;
							height: 60rpx;
							text-align: center;
							margin-left: 40rpx;
							border: 1rpx solid #808080;
							box-sizing: border-box;
							padding: 10rpx;
							border-radius: 30rpx;
						}
					}
				}
			}
		
			.toptext{
				width: 100%;
				box-sizing: border-box;
				padding: 0 30rpx;
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
			}
		}
		
		.xxxxxx{
			margin-top: 400rpx;
			margin-left: 50rpx;
			.timexuanze{
				margin-top: 30rpx;
				.box{
					.b-r{
						display: flex;
						margin-top: 30rpx;
						.ccc{
							min-width: 100rpx;
							text-align: center;
							margin-left: 20rpx;
							border: 1rpx solid #808080;
							box-sizing: border-box;
							padding: 5rpx;
							border-radius: 30rpx;
						}
						.nose{
							background-color: #F2F3F5;
						}
						.sele{
							background-color: #ff6e1a;
						}
					}
				}
			}
		}
		
		.bottombutton{
			position: fixed;
			bottom: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			background-color: rgb(90,189,186);
			width: 670rpx;
			height: 80rpx;
			border-radius: 100rpx;
			text-align: center;
			line-height: 80rpx;
			color: #F8F8F8;
		}
		
	}
</style>
