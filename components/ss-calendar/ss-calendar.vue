<template>
	<view class="calendar__wrap">
		<view class="header">
			<view class="current-date">{{ currentDate }}</view>
		</view>
		<view class="body">
			<view class="weeks">
				<view class="week__item" v-for="week in weeks" :key="week">{{ week }}</view>
			</view>
			<view class="day__list">
				<view class="day__item" v-for="(item, index) in dateData" :key="index">
					<view class="checked-box" :class="[checksClass]" v-if="item === 'checked'">
						<text class="checked iconfont iconfavor" v-if="!checksIcon"></text>
						<image v-else :src="checksIcon" mode="aspectFit"></image>
						<view class="check_text" v-if="checkTextShow">{{ index }}</view>
					</view>
					<text class="current-box" :class="[item === day ? (actionClass ? actionClass : 'current') : '']"
						v-else>{{ item }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//选中的日期数据
			checks: {
				type: Array,
				default () {
					// 例子[1,2,3,4],表示本月1,2,3,4号4天被选中
					return [];
				}
			},
			// 选中物品的样式类
			checksClass: {
				type: String,
				default: ''
			},
			// 选中时图标
			checksIcon: {
				type: String
			},
			// 选中时是否显示文字
			checkTextShow: {
				type: Boolean,
				default: false
			},
			// 表示当前日期的样式
			actionClass: {
				type: String,
				default: ''
			}
		},
		data() {
			const {
				year,
				month,
				day
			} = this.getDate();
			const dateData = this.getDateData(year, month);
			return {
				year,
				month,
				day,
				dateData,
				weeks: ['日', '一', '二', '三', '四', '五', '六']
			};
		},
		computed: {
			// 获取当前日期
			currentDate() {
				return `${this.year}-${this.format(this.month)}`;
			}
		},
		watch: {
			checks(val) {
				const {
					year,
					month
				} = this.getDate();
				const dateData = this.getDateData(year, month);
				this.dateData = dateData;
			}
		},
		methods: {
			getDate(current) {
				const date = current ? new Date(current) : new Date();
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return {
					year,
					month,
					day
				};
			},
			getDateData(year, month) {
				const date = new Date('${year}/${month}/1');
				const firstDayWeek = date.getDay();
				const data = [...this.getEmptys(firstDayWeek), ...this.getDays(firstDayWeek)];
				return data;
			},
			getEmptys(count) {
				let arr = [];
				if (count) {
					for (let i = 0; i < count; i++) {
						arr.push('');
					}
				}
				return arr;
			},
			getLastDay() {
				let {
					year,
					month
				} = this.getDate();
				month += 1;
				if (month > 11) {
					year += 1;
					month = 1;
				}
				let firstDayTimeStamp = new Date(`${year}/${month}/1`).getTime();
				let oneDayTimeStamp = 24 * 60 * 60 * 1000;
				let lastDay = new Date(firstDayTimeStamp - oneDayTimeStamp).getDate();
				return lastDay;
			},
			getDays() {
				const lastDay = this.getLastDay();
				const days = [];
				for (let i = 1; i <= lastDay; i++) {
					days.push(this.checks.includes(i) ? 'checked' : i);
				}
				return days;
			},
			format(num) {
				return num < 10 ? `0${num}` : num;
			}
		}
	};
</script>

<style lang="scss" scoped>
	$uni-text-color : red;
	$font-color-light : red;
	$font-lg : 12;
	$base-color : red;

	.calendar__wrap {
		background-color: #fff;
		color: $uni-text-color;

		.header {
			padding: 0 24rpx;

			.current-date {
				text-align: center;
				font-size: $font-lg + 2rpx;
				// border-bottom: 2rpx solid #eee;
				padding: 32rpx 0;
			}
		}

		.body {
			.weeks {
				display: flex;
				font-size: $font-lg;
				padding: 10rpx 0;
				background-color: #f4f7ff;

				.week__item {
					flex: 1;
					text-align: center;
				}
			}

			.day__list {
				display: flex;
				flex-wrap: wrap;

				.day__item {
					display: flex;
					justify-content: center;
					width: 14.285%;
					text-align: center;
					padding: 30rpx 0;
					font-size: 34rpx;
					color: $font-color-light;

					.checked-box,
					.current-box {
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 100%;
						box-sizing: border-box;
						position: relative;
					}

					image,
					.checked-box,
					.current-box,
					.check_text {
						width: 56rpx;
						height: 56rpx;
						line-height: 56rpx;
					}

					image,
					.check_text {
						position: absolute;
						top: 0;
						left: 0;
					}

					.checked {
						font-size: 40rpx;
						background-color: #3f9dff;
						color: #fff;
					}

					.current {
						padding: 12rpx;
						background-color: $base-color;
						color: #fff;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>
