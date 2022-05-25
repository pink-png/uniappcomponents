<template>
	<view class="modal_box" v-if="visible">
		<view class="picker-view">
			<view class="selectProvince">
				<view @click='visible = false'>
					<text class="font_size9">取消</text>
				</view>
				<view @click='sure'>
					<text class="font_size14">确定</text>
				</view>
			</view>
			<picker-view :value="value" @change="bindChange" class="picker-view">
				<picker-view-column>
					<view class="item" v-for="(item,index) in cityData" :key="index">{{item.text}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(child,index) in cityData[selectIndex].children" :key="index">
						{{child.text}}
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>

</template>

<script>
	// import cityData from "@/common/js/citydata.js"
	// import {
	// 	addDataRecord
	// } from "@/common/data/dataRecord.js"
	export default {
		data() {
			return {
				visible: false,
				value: [0, 0],
				cityData: cityData,
				locationCity: '', //定位的城市和选择的城市
				selectProvince: '', //选择的省份
				selectIndex: 0, //选择的省份是第几个
				selectCityIndex: 0, //选择的城市是第几个
	
				isgetLocation : false, //判断是否有授权定位
			}
		},
		created() {
			let that = this
			uni.getSetting({
				success(res) {
					// #ifdef MP-ALIPAY
					that.isgetLocation = res.authSetting.location
					// #endif 
			
					// #ifdef MP-TOUTIAO | MP-WEIXIN
					that.isgetLocation = res.authSetting['scope.userLocation']
					// #endif
			
					// #ifdef MP-BAIDU
					that.isgetLocation = res.authSetting['scope.userLocation']
					// #endif
			
					console.log('是否已经授权地理位置', that.isgetLocation)
					that.getLocation()
				}
			})
		},
		methods: {
			ifshow(type){
				if(typeof type != 'boolean'){
					type = false
				}
				this.visible = type
			},
			bindChange(e) {
				console.log('e', e)
				let slelectedindextwoarr = e.detail.value
				this.value = []
				this.value[0] = slelectedindextwoarr[0]
				this.selectIndex = slelectedindextwoarr[0]

				if ((this.cityData[this.selectIndex].children.length - 1) >= slelectedindextwoarr[1]) {
					this.value[1] = slelectedindextwoarr[1]
					this.selectCityIndex = slelectedindextwoarr[1]
				} else {
					this.value[1] = 0
					this.selectCityIndex = 0
				}
			},
			sure() {
				let cityData = this.cityData
				let selectIndex = this.selectIndex
				let province = cityData[selectIndex].text
				let selectCityIndex = this.selectCityIndex
				let city = cityData[selectIndex].children[selectCityIndex].text
				this.locationCity = city
				this.selectProvince = province
				this.value[0] = selectIndex
				this.value[1] = selectCityIndex
				this.setCityAndProvinceGlobal()
				this.formCityAndProvince(city, province)
				this.visible = false
				this.addRecord('切换城市')
			},
			// vuex 存全局数据
			setCityAndProvinceGlobal() {
				let cityInfo = {}
				cityInfo.city = this.locationCity
				cityInfo.province = this.selectProvince
				cityInfo.district = this.locationDistrict
				this.setCityAndProvince(cityInfo)
			},
			formCityAndProvince(city, province) {
				// 这个是直接定位存的省市地区用于picker回显
				this.selectProvince = province
				this.locationCity = city
				
				let data = {
					province : province.replace("省", ""),
					city : city.replace("市", ""),
					locationCity : city
				}
				this.$emit('changesheng',data)				
			},
			// 定位
			getLocation() {
				let that = this
				uni.showNavigationBarLoading()
				uni.getLocation({
					success: (res) => {
						that.$network.POST({
							url: that.$config.getLocationUrl,
							params: {
								"latitude": res.latitude,
								"longitude": res.longitude
							},
							success: (result) => {
								console.log("定位数据返回成功", result);
								if (result.data.code == 200) {
									this.locationFailOrSuccess('定位到您在【' + result.data.data.result
										.addressComponent.city + '】', result.data.data
										.result.addressComponent.city, result.data.data.result
										.addressComponent.province);
									that.locationDistrict = result.data.data.result
										.addressComponent
										.district
								} else {
									console.log('定位数据返回失败')
									that.locationFailOrSuccess('定位失败，将自动切换至南京市', '南京市', '江苏省')
								}
							},
							fail: (res) => {
								console.log('定位失败----', res)
								uni.hideNavigationBarLoading()
							}
						})
					},
					fail: (res) => {
						console.log('isgetLocation22222fail', that.isgetLocation)
						if (!that.isgetLocation) {
							uni.hideNavigationBarLoading()
							that.locationFailOrSuccess('定位失败，将自动切换至南京市', '南京市', '江苏省')
							return
						}
						uni.request({
							url: 'https://open.onebox.so.com/dataApi?type=ip&src=onebox&tpl=0&num=1&query=ip&url=ip',
							header: {
								"content-type": "text/json; charset=utf-8",
							},
							timeout: 3000,
							success: (res) => {
								console.log('定位数据', res.data[1], res.data[2]);
								if (res.data[1] != '') {
									this.locationFailOrSuccess('定位到您在【' + res.data[2] + '】', res
										.data[2], res.data[1]);
			
									that.locationDistrict = ''
									uni.hideNavigationBarLoading()
								} else {
									uni.hideNavigationBarLoading()
									that.locationFailOrSuccess('定位失败，将自动切换至南京市', '南京市', '江苏省')
								}
							},
							fail: (err) => {
								uni.hideNavigationBarLoading()
								that.locationFailOrSuccess('定位失败，将自动切换至南京市', '南京市', '江苏省')
							}
						});
			
			
					}
				})
			},
			// 提交定位信息
			locationFailOrSuccess(title, city, province) {
				// console.log('1212',arguments)
				// 返回父组件的数据
				this.formCityAndProvince(city, province)
				this.setCityAndProvinceGlobal()
				this.getProvinceByCity()
				// 首页进行数据埋点
				this.addRecord('进入首页')
				this.getRemark()
				uni.hideNavigationBarLoading()
			},
			getProvinceByCity() {
				let that = this
				let location = that.locationCity //当前定位的城市
				// console.log('2323',location)
				var proviceData = that.cityData
				for (var i in proviceData) {
					var city = proviceData[i].children
					for (var j in city) {
						if (location === city[j].text) {
							that.value[0] = parseInt(i)
							that.value[1] = parseInt(j)
							that.selectIndex = parseInt(i)
							that.selectCityIndex = parseInt(j)
							break;
						}
					}
				}
			},
			getRemark() {
				this.$common.showLoading('加载中')
				this.$network.GET({
					url: this.$config.getRemark,
					success: (res) => {
						console.log('备注信息', res)
						let {
							code,
							data
						} = res.data
						if (code == 200) {
							if (data != null) {
								this.$common.showModal('时间:' + data.timequantum, data.remark, false)
							}
						} else {
							this.$common.showModal('提示', '请求服务器异常，请稍后', false)
						}
					},
					fail: (res) => {
						this.$common.showModal('提示', '请求服务器异常，请稍后', false)
					},
					complete: (res) => {
						this.$common.hideLoading()
					}
				})
			},
			addRecord(desc) {
				let _this = this
				let source = _this.source
				let pageId //微信首页是1，支付宝是7
				let openid = _this.openid
				let city = _this.cityInfo
				let appid
				if (source == 'weixin') {
					appid = _this.weixinAppid
					pageId = 15
				}
				if (source == 'alipay') {
					appid = _this.alipyAppid
					pageId = 22
				}
				let params = {
					"appid": appid,
					"source": source,
					"openid": openid,
					"city": city,
					"pageid": pageId,
					"operation": desc
				}
				addDataRecord(params)
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
