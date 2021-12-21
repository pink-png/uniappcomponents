<template>
	<view class="modal_box" v-if="visible">
		<view class="picker-view">
			<view class="selectProvince">
				<view @click='cancelSelect'>
					<text class="font_size9">取消</text>
				</view>
				<view @click='sure'>
					<text class="font_size14">确定</text>
				</view>
			</view>
			<picker-view :value="value" @change="bindChange" class="picker-view">
				<picker-view-column>
					<view class="textstyle" v-for="(item, index) in cityData" :key="index">{{item.text}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="textstyle" v-for="(child, index) in cityData[selectIndex].children" :key="index">
						{{child.text}}
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>

</template>

<script>
	import cityData from "./citydata.js"

	export default {
		data() {
			return {
				value: [], //省市的序列
				cityData: null, //省市的数据
				selectIndex: 0, //选择的省份是第几个
				selectCityIndex: 0, //选择的城市是第几个
				visible : false, 
				locationCity: '', //定位的城市和选择的城市
				locationDistrict: '', //定位的区
				selectProvince: '', //选择的省份
			}
		},
		created() {
			this.cityData = cityData
		},
		methods: {
			 /**
			  * 显示省市选择框
			  */
			 showsspicker(){
			 	this.visible = true
			 },
			/*
			 * 选择取消按钮
			 * **/
			 cancelSelect() {
			 	this.visible = false
			 },
			/**
			 * 选择确定按钮
			 * **/
			sure() {
				let selectIndex = this.selectIndex
				let province = this.cityData[selectIndex].text
				let selectCityIndex = this.selectCityIndex
				let city = this.cityData[selectIndex].children[selectCityIndex].text

				this.locationCity = city
				this.selectProvince = province
				this.visible = false
				this.value[0] = selectIndex
				this.value[1] = selectCityIndex
								
				this.$emit('sure',this.selectProvince + '-' +  this.locationCity)				
								
				// console.log('province',province)
				// console.log('city',city)
			},
			/**
			 * 切换省市区
			 */
			bindChange(e) {
				this.value = []
				this.value[0] = e.detail.value[0]
				this.value[1] = e.detail.value[1]
				this.selectIndex = e.detail.value[0]
				if ((this.cityData[this.selectIndex].children.length - 1) >= e.detail.value[1]) {
					this.value[1] = e.detail.value[1]
					this.selectCityIndex = e.detail.value[1]
				} else {
					this.value[1] = 0
					this.selectCityIndex = 0
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.picker-view {
		width: 100%;
		height: 600rpx;
		margin-top: 20rpx;
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;

		.textstyle {
			color: #555555;
			text-align: center;
		}
	}

	.modal_box {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		top: 0;
		bottom: 0;
		z-index: 900;


		.selectProvince {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 30rpx;
			border-bottom: 1rpx solid #F2F2F2;
			position: relative;
			z-index: 1000;
			background: #ffffff;

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
</style>
