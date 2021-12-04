<template>

	<view :class="['piaodashi_modal',isshowModal?'show':'']" @click.stop.prevent="closeModal"
		@touchmove.stop.prevent="moveHandle">
		<!-- 日期选择内容部分 -->
		<view :class="['container',isshowModal?'show':'']" @click.stop.prevent="">
			<!-- 头部 -->
			<view class="header">
				<view class="reset" @click="reset">
					重置
				</view>
				<!-- 标题 -->
				<view class="title" v-if="title">
					{{title}}
				</view>
				<view class="week">
					<view class="orangeColor">日</view>
					<view>一</view>
					<view>二</view>
					<view>三</view>
					<view>四</view>
					<view>五</view>
					<view class="orangeColor">六</view>
				</view>
			</view>
			<scroll-view scroll-y style="height: calc(100% - 170rpx);overflow-anchor: none;" trap-scroll
				:scroll-into-view="currentId" @scrolltoupper="loadMore">
				<view class="section" id="section_page">
					<block v-for="(res, line) in date" :key="line">
						<view class="item" :id="'date' + res.year + res.month">
							<view class="year">{{res.year}}年{{res.month}}月</view>
							<view class="day">
								<block v-for="(week, index) in res.oneDayWeek" :key="index">
									<view class="day-list" :style="'width:' + ((dayWidth-15)/7) + 'px;height:80rpx;'">
									</view>
								</block>
								<block v-for="(item, index) in res.day" :key="index">
									<view class="day-list" :style="'width:' + ((dayWidth-15)/7) + 'px;height:80rpx;'"
										@tap="selectDay" :data-line="line" :data-index="index">
										<view :class="'day-list-item' + 
										(line==start[0]&&index==start[1]||line==end[0]&&index==end[1]?' bg-orange select-style':'') + ' ' + 
										(line==date.length-1&&index+1>nowDay?'time-out':'')">
											<view style="padding-top:2px;padding-bottom:2px;">{{item}}</view>
										</view>
										<view class="day-list-bg"
											v-if="line>=start[0]&&line<=end[0]&&index>start[1]&&index<end[1]||line>=start[0]&&index>start[1]&&line<end[0]||line<=end[0]&&index<end[1]&&line>start[0]||line<end[0]&&line>start[0]">
										</view>
										<view class="day-list-bg-start"
											v-if="start[0]&&end[0]&&line==start[0]&&index==start[1]"></view>
										<view class="day-list-bg-end"
											v-if="start[0]&&end[0]&&line==end[0]&&index==end[1]"></view>
									</view>
								</block>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				isshowModal: false,
				out: 0,
				type: '-',
				//日期分隔符
				date: [],
				//日期数组对象
				dayWidth: 0,
				//日期的宽度
				nowDay: 0,
				//当前时间的日
				start: [],
				//入住时间
				count: 12,
				//显示月的数量
				startDay: '',
				//入住日期
				startWeek: '',
				//入住时间的周几
				end: [],
				//离开时间
				endDay: '',
				//离开日期
				endWeek: '',
				//离开时间的周几
				day: 0,
				//多少晚
				priceStauts: [],
				//价格状态
				lastNot: [0, 10],
				//前置的无房操作
				isSub: true,
				startTime: "",
				endTime: "",
				year: '',
				currentId: ''
			};
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			syDate: { //时间格式 '-' '/'
				type: String,
				default: '-'
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		created: function(options) {
			var that = this;
			uni.getSystemInfo({
				success: function success(res) {
					that.setData({
						dayWidth: res.windowWidth
					});
				}
			});
			console.log('pickerDate -- created')
			that.setDate();
			that.nowDay = new Date().getDate();
			/* 默认入住离店日期，今日入住明日离店，此处应在setDefaultDate函数内传入vuex里保存的日期进行默认操作
			 *不推荐使用本地缓存，下边只是使用缓存的示例 */

			uni.getStorage({
				key: 'Time',
				success: function success(res) {

					if (res && res.data) {
						var obj = JSON.parse(res.data);
						that.setData({
							start: that.setDefaultDate(obj.start),
							end: that.setDefaultDate(obj.end)
						});
					}
				},
				fail: function fail() {
					// that.setData({
					// 	start: that.setDefaultDate(that.getDefaultDate(-30)),
					// 	end: that.setDefaultDate(that.getDefaultDate(0))
					// });
					// that.startFun(that.start);
					// that.endFun(that.end);
				}
			}); //如果需要日期的价格

		},
		methods: {
			moveHandle() {},
			closeModal() {
				this.isshowModal = false
			},
			init(start, end) {
				this.isshowModal = true
				if (start && end) {
					this.setData({
						start: this.setDefaultDate(start),
						end: this.setDefaultDate(end)
					});
					// this.startFun(this.start);
					// this.endFun(this.end);
				} else {
					this.setData({
						start: [],
						end: [],
						startDay: '',
						endDay: '',
						day: 0,
						startTime: '',
						endTime: ''
					})
				}
			},
			//开始和结束选择完毕提交结果
			submitResult() {
				var _this = this;

				if (!_this.isSub) {
					return;
				}

				const {
					startDay,
					endDay,
					day,
					startTime,
					endTime
				} = _this;
				this.isshowModal = false
				this.$emit('getvalue', {
					startTime,
					endTime
				})
			},
			//核心方法 小程序this.setDate()转化
			setData: function(obj) {
				let that = this;
				let keys = [];
				let val, data;
				Object.keys(obj).forEach(function(key) {
					keys = key.split('.');
					val = obj[key];
					data = that.$data;
					keys.forEach(function(key2, index) {
						if (index + 1 == keys.length) {
							that.$set(data, key2, val);
						} else {
							if (!data[key2]) {
								that.$set(data, key2, {});
							}
						}
						data = data[key2];
					})
				});
			},
			//离店日期
			endFun(newVal) {
				if (this.end.length != 0) {
					//计算天数
					var startDay = this.date[this.start[0]].year + '/' + this.date[this.start[0]].month + '/' + this
						.isFestival(this.start[
							0], this.start[1]);
					var endDay = this.date[newVal[0]].year + '/' + this.date[newVal[0]].month + '/' + this.isFestival(this
						.end[0],
						this.end[1]); //计算选择离店日期

					this.setData({
						endDay: this.setMonth(newVal[0]) + this.isFestival(newVal[0], newVal[1]) + '日',
						endWeek: this.getWeek(this.date[newVal[0]].year + '/' + this.date[newVal[0]].month + '/' +
							this.isFestival(
								newVal[0], newVal[1])),
						day: this.getDay(startDay, endDay),
						startTime: startDay,
						endTime: endDay
					});
				} else {
					this.setData({
						day: 0
					});
				}
			},

			//入住日期
			startFun(newVal) {
				if (this.start.length > 0) {
					this.setData({
						startDay: this.setMonth(newVal[0]) + this.isFestival(newVal[0], newVal[1]) + '日',
						startWeek: this.getWeek(this.date[newVal[0]].year + '/' + this.date[newVal[0]].month +
							'/' + this.isFestival(
								newVal[0], newVal[1]))
					});
				}

				if (this.priceStauts.length > 0) {
					for (var i = newVal[0]; i < this.priceStauts.length; i++) {
						if (i == newVal[0]) {
							for (var j = newVal[1]; j < this.priceStauts[i].length; j++) {
								if (this.priceStauts[i][j] == -1) {
									console.log(j);
									this.lastNot = [i, j];
									return this.setData({
										lastNot: [i, j]
									});
								}
							}
						} else {
							for (var j = 0; j < this.priceStauts[i].length; j++) {
								if (this.priceStauts[i][j] == -1) {
									this.lastNot = [i, j];
									return this.setData({
										lastNot: [i, j]
									});
								}
							}
						}
					}
				}
			},

			setYear(dateIndex) {
				return this.date[dateIndex].year;
			},

			//月份补零
			setMonth(dateIndex) {
				let month = this.date[dateIndex].month;

				if (month < 10) {
					month = '0' + month;
				}

				return month + '月';
			},

			//如果是节假日名称则返回选择的日期天数
			isFestival(line, index, push = false) {
				var date = this.date[line].day[index];

				if (isNaN(date)) {
					var newIndex = this.date[line].day.indexOf(date) + 1;
					if (push) return newIndex;
					return newIndex < 10 ? '0' + newIndex : newIndex;
				} else {
					if (push) return date;
					return date < 10 ? '0' + date : date;
				}
			},

			//获取今天明天的日期
			getDefaultDate(AddDayCount) {
				var dd = new Date();
				dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期

				var year = dd.getFullYear();
				var mon = dd.getMonth() + 1; //获取当前月份的日期

				var day = dd.getDate();
				return year + '-' + mon + '-' + day;
			},

			//设置入住时间 如果没有传值则根据默认值设置
			setDefaultDate(data) {

				var that = this;
				var arr = [0, parseInt(that.nowDay - 1)];
				var start = data.indexOf('-') != -1 ? data.split('-') : data.split('/');
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1; // console.log("22222", that.data.date)

				for (var i = 0; i < that.date.length; i++) {
					if (that.date[i].year == start[0] && that.date[i].month == start[1]) {
						if (year == start[0] && month == start[1] && start[2] > that.nowDay) {
							arr = [i, parseInt(that.nowDay - 1)];
						} else {
							arr = [i, parseInt(start[2] - 1)];
						}

						break;
					}
				}
				console.log(arr)
				return arr;
			},

			//计算天数
			getDay(date1, date2) {
				console.log(date1, date2, '时间'); //获得天数
				//date1：开始日期，date2结束日期

				var a1 = Date.parse(new Date(date1));
				var a2 = Date.parse(new Date(date2));
				var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数

				return day;
			},

			//计算周几
			getWeek(date) {
				var weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
				var myDate = new Date(Date.parse(date));
				return weekDay[myDate.getDay()];
			},

			//选择入住离开
			selectDay(e) {
				var that = this;
				var line = e.currentTarget.dataset.line;
				var index = e.currentTarget.dataset.index;
				console.log(line, index);
				//大于当前日期不能选择
				if (line == this.date.length - 1 && index + 1 > this.nowDay) return;
				that.setData({
					isSub: false
				}); //如果没有入住时间

				if (that.start.length == 0) {
					//填充入住时间
					that.setData({
						start: [line, index]
					});
				} else {
					//如果没有离开时间
					if (that.end.length == 0) {
						//如果有价格和入住离开情况则需要进行判断所选的离店时间时候包含无房日期
						if (line < that.start[0] || line == that.start[0] && index < that.start[1]) {
							that.setData({
								end: that.start,
								start: [line, index],
								isSub: true
							});
						} else {
							//如果离开时间比入住时间晚则填充
							that.setData({
								end: [line, index],
								isSub: true
							});
						}
					} else {
						//如果有离开时间则清空离开时间重新填充入住时间
						that.setData({
							start: [line, index],
							end: []
						});
					}
				}

				that.startFun(that.start);
				that.endFun(that.end);
				that.submitResult();
			},
			loadMore() {
				this.year = this.year ? this.year - 1 : new Date().getFullYear() - 1;
				this.setDate({
					count: 12,
					year: this.year,
					success: res => {

						this.$set(this.start, 0, this.start[0] + 12);
						this.$set(this.end, 0, this.end[0] + 12);
					}
				});
				console.log('触发了loadMore方法')
			},
			//设置日历
			setDate({
				count = 12,
				year = new Date().getFullYear(),
				success = () => {}
			} = {}) {

				var month = new Date().getMonth(); //月份

				var all = [];

				for (let i = count - 1; i >= 0; i--) {
					var day = []; //天数   

					var week = 0; //星期

					var date = {}; //

					for (var j = 0; j < new Date(year, month + 1, 0).getDate(); j++) {
						day.push(j + 1);
					}

					date = {
						year: year,
						month: month + 1,
						str: year + '' + (month + 1),
						day: day,
						oneDayWeek: new Date(Date.parse(year + '/' + (month + 1) + '/' + '01')).getDay()
					};

					if (month == 0) {
						year = year - 1;
						month = 11;
					} else {
						month--;
					}

					all[i] = date;
				}
				this.date.unshift(...all)
				// this.setData({
				// 	date: [...all,...this.date]
				// });
				this.currentId = 'date' + this.date[11].year + this.date[11].month
				success();
				// setTimeout(() => {
				// 	uni.createSelectorQuery().select('#section_page').boundingClientRect(function (rect) {
				// 		console.log(rect)
				// 		 // 使页面滚动到底部
				// 		 uni.pageScrollTo({
				// 		   scrollTop: rect.bottom
				// 		 })
				// 	}).exec()
				// },200)
			},

			//确定入住离店事件提交
			submit() {
				var obj = {
					start: this.date[this.startFun[0]].year + this.type + this.date[this.startFun[0]].month + this
						.type + this.isFestival(
							this.startFun[0], this.startFun[1], true),
					end: this.date[this.endFun[0]].year + this.type + this.date[this.endFun[0]].month + this.type +
						this.isFestival(
							this.endFun[0], this.endFun[1], true),
					startDay: this.date[this.startFun[0]].month + '月' + this.isFestival(this.startFun[0], this
							.startFun[1], true) +
						'日',
					endDay: this.date[this.endFun[0]].month + '月' + this.isFestival(this.endFun[0], this.endFun[1],
						true) + '日',
					day: this.day
				};
			},

			/**
			 * 确定入驻日期时间段
			 */
			togetSelectData: function() {
				var _this = this;

				if (!_this.isSub) {
					return;
				}

				const {
					startDay,
					endDay,
					day,
					startTime,
					endTime
				} = _this;
				console.log('已选择入驻日期范围' + _this.startDay + '--' + _this.endDay); // wx.navigateTo({
				//   url: 'detail',
				// })
				//获取页面路由

				// var pages = getCurrentPages(); //当前页面

				// var currPage = pages[pages.length - 1]; //上一个页面

				// var prevPage = pages[pages.length - 2];
				// prevPage.setData({
				// 	startDay,
				// 	endDay,
				// 	day,
				// 	startTime,
				// 	endTime
				// });
				// uni.navigateBack();
			},
			reset() {
				this.setData({
					start: [],
					end: [],
					startDay: '',
					endDay: '',
					day: 0,
					startTime: '',
					endTime: ''
				})
				// this.isshowModal = false
				this.$emit('getvalue', {
					startTime: '',
					endTime: ''
				})
			},
			/**
			 * 
			 * */
		}
	};
</script>
<style scoped lang="scss">
	view {
		box-sizing: border-box;
	}

	.title {}

	.piaodashi_modal {
		position: fixed;
		width: 100%;
		height: 100vh;
		bottom: 0px;
		left: 0px;
		background: rgba(0, 0, 0, 0.6);
		z-index: 1000;
		overflow-y: hidden;
	}

	.reset {
		font-size: 28rpx;
		padding: 0 40rpx;
		line-height: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 0;
		top: 0;
		color: #999999;
	}

	/**确认按钮**/
	.piaodashi_modal {
		bottom: -100vh;
		opacity: 0;
		transition: opacity .3s ease-out;
	}

	.piaodashi_modal.show {
		bottom: 0;
		opacity: 1;
		transition: opacity .3s ease-out;
		overflow: hidden;
	}

	.container {
		position: fixed;
		bottom: -80vh;
		left: 0;
		right: 0;
		width: 100%;
		height: 70vh;
		background-color: #FFFFFF;
		transition: all .3s ease-in;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		overflow: hidden;

	}

	.container.show {
		transition: all .3s ease-in-out;
		bottom: 0;
	}

	.submit {
		width: 100%;
		background: white;
		position: fixed;
		bottom: 0;
		height: 150rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 26rpx;
		box-sizing: border-box;
	}

	.submit .btn {
		width: 320rpx;
		height: 98rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		letter-spacing: 4rpx;
		border-radius: 10rpx;
		font-weight: bold;

	}

	.submit_sub {
		border: 2rpx solid #0089FF;
		background-color: #0089FF;
		color: white;
	}

	.submit_reset {
		border: 2rpx solid #E3E3E3;
		color: #171717;
	}

	.sub-btn {
		height: auto;
		border-radius: 10rpx;
		background-color: #0089FF;
		color: white;
	}

	/**不能预订**/
	/* 入住离开时间的color */
	.bg-orange {
		background-color: #FF990D;
		font-size: 18rpx;
	}

	.bg-higlt-orange {
		background-color: rgba($color: #FF990D, $alpha: .6);
	}

	/* 节假日的日期样式 */
	.is-festival {
		font-size: 18rpx;
		color: #0089FF;
	}

	/** 非节假日的日期样式**/
	.not-festival {
		font-size: 18rpx;
		color: white;
	}

	/***入住离开时间的日历样式*/
	.not-sub {
		color: #222222;
		background: #dddddd;
	}

	.select-out-item {
		background: #ffffff;
	}

	.select-style {
		color: white;
		font-size: 24rpx;
		padding-top: 4rpx;
	}

	.time-out {
		// text-decoration: line-through;
		color: #C4C4C4;
	}

	/**
* 点击日期的样式
*/
	.bg {
		background: #0089FF;
	}

	/**
* 日期部分
*/
	.section {
		width: 100%;
		padding-bottom: 150rpx;
		/* padding-top: 100rpx; */
		background-color: #ffffff;
	}

	.section>.item {
		padding: 10px 6px;
		border-bottom: 2rpx solid rgba(153, 153, 153, .15);
	}

	.section>.item>.year {
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #535353;
	}

	.section>.item>.day {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		color: #535353;
		font-size: 24rpx;
	}

	.section>.item>.day>.day-list {
		/* margin-top: 30rpx;
  margin-bottom: 30rpx; */
		position: relative;
		display: flex;
		font-size: 24rpx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.day-list-item {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.day-list-bg {
		width: 100%;
		height: 26px;
		position: absolute;
		left: 0;
		right: 0;
		top: calc((100% - 26px)/2);
		background-color: rgba($color: #FF990D, $alpha: .15);
	}

	.day-list-bg-start {
		width: 50%;
		height: 26px;
		position: absolute;
		right: 0;
		top: calc((100% - 26px)/2);
		background-color: rgba($color: #FF990D, $alpha: .15);
	}

	.day-list-bg-end {
		width: 50%;
		height: 26px;
		position: absolute;
		left: 0;
		top: calc((100% - 26px)/2);
		background-color: rgba($color: #FF990D, $alpha: .15);
	}

	/**
* 头部固定
*/
	.header {
		/* position: fixed;
		top: 0;
		width: 100%; */
		background: white;
	}

	.bar {
		width: 100%;
		height: var(--status-bar-height);
		background: #222222;
	}

	/**
* 关闭清空
*/
	.set {
		height: 100rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;

		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	/**
* 入住离开时间
*/
	.in-and-out {
		height: 210rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/**
* 入住离开的view
*/
	.in-and-out>.item {
		display: flex;
		flex-direction: column;
		height: 100rpx;
	}

	/**
* 未选择入离时间时的文字样式
*/
	.in-and-out>.text {
		margin-top: 100rpx;
		font-weight: bold;
		font-size: 36rpx;
		color: #c0c0c0;
	}

	/**
* 一共选择了多少晚的样式
*/
	.in-and-out>.item>.count-border {
		width: 200rpx;
		font-size: 28rpx;
		height: 40rpx;
		margin-top: 48rpx;
		text-align: center;
	}

	.gray {
		color: #c0c0c0;
		border-bottom: 1px solid #c0c0c0;
	}

	.orange {
		color: #0089FF;
		border-bottom: 1px solid #0089FF;
	}

	/**
* 共多少晚
*/
	.in-and-out>.item>.count-border>.count {
		font-size: 10px;
	}

	/**
* 周一到周日
*/
	.week {
		height: 70rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 25px;
		padding-right: 25px;
		font-size: 24rpx;
		background-color: #F7F7F7;
		color: #999999;
		box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.15);

		.orangeColor {
			color: #FF990D;
		}
	}

	.title {
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		font-weight: bold;
		letter-spacing: 2rpx;
		color: #535353;
	}

	.isa {
		color: red;
	}

	.isa2 {
		color: red;
	}
</style>
