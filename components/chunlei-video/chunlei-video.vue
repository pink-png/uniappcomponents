<template>
	<view>
		<!-- #ifdef APP-PLUS|MP -->
		<!-- <video
			:src="src"
			:controls="controls"
			:style="{ height: height ,width:'100%' }"
			:loop="true"
			@waiting="waiting"
			:objectFit="objectFit"
			id="video_0"
			ref="video_0"
			class="video"
			@timeupdate="timeupdate"
			x5-video-player-type="h5"
			x5-video-player-fullscreen="false"
			x-webkit-airplay="true"
			webkit-playsinline="true"
			playsinline="true"
			x5-playsinline
			@bindfullscreenchange='changeVideoBox'
		></video> -->
		<!-- #endif -->
		<!-- #ifdef H5 -->
			<video
				id="video_0"
				ref="video_0"
				:controls="controls"
				:loop="true"
				preload="auto"
				:autoplay="true"
				:objectFit="objectFit"
				webkit-playsinline
				x-webkit-airplay="true"
				playsinline
				x5-playsinline
				:src="src"
				:style="{ height: height ,width:'100%' }"
				@fullscreenchange='changeVideoBox'
				:v-if="videoShow"
			></video>
			<cover-view id="wrapper">
			    <!-- 遮罩图 -->
			    <image class="bg" :src="poster" alt="" style="width: 750upx;height: 750upx;">
			    <!-- 播放按钮（vue语法） -->
			    <view @click="videoPlay2">
			        <image class="play" src="/static/img/play.png" alt="">
			    </view>
			</cover-view>
		<!-- #endif -->
		<!-- <cover-view class="top"></cover-view>
		<cover-view class="bottom"></cover-view> -->
		<!-- 进度条 -->
		<cover-view class="progressBar" :style="{ width: barWidth }"></cover-view>
	</view>
</template>

<script>
export default {
	props: {
		// 视频封面
		poster: {
			type: String,
			default: ''
		},
		// 是否显示控件
		controls: {
			type: Boolean,
			default: false
		},
		// 视频地址
		src: {
			type: String,
			default: ''
		},
		// 视频id
		videoId: {
			type: Number,
			default: 0
		},
		// 播放状态
		play: {
			type: Boolean,
			default: false
		},
		// 视频高度
		height: {
			type: String,
			default: ''
		},
		// 视频宽度
		width: {
			type: String,
			default: ''
		},
		// 初始开始时间
		initialTime: {
			type: Number,
			default: 0
		},
		// 已经播放了的时间
		gDuration: {
			type: Number,
			default: 999
		}, //大概时长使进度条更准确
		// 视频显示状态
		objectFit: {
			type: String,
			default: 'fill' //当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖
		},
		actionPrice: 0, //默认选中商品价格
	},
	data() {
		return {
			time: 0,
			duration: 0,
			playFirst: true,
			videoShow: false
		};
	},
	mounted() {
		// 获取当前对象视频上下文用于操作视频
		this.videoCtx = uni.createVideoContext('video_0', this);
	},
	// onReady: function(res) {
	// 	// 获取当前对象视频上下文用于操作视频
	// 	this.videoCtx = uni.createVideoContext('video_0', this);
	// 	// console.log(this.videoCtx);
	// },
	onLoad() {
		const video = document.getElementById('video')
		video.style.display = 'none'
	},
	methods: {
		// 重写的play方法
		videoPlay2() {
		    const wrapper = document.getElementById('wrapper')
		    const video = document.getElementById('video')
		    // video.addEventListener('pause', function () {
		    //     wrapper.style.display = 'block'
		    // })
		    // 视频播放结束触发
		    video.addEventListener('ended', function () {
		        wrapper.style.display = 'block'
		    })
		    // 退出全屏播放触发
		    video.addEventListener("x5videoexitfullscreen", function () {
		        wrapper.style.display = 'block'
		    })
		    video.style.display = 'block'
		    wrapper.style.display = 'none'
		    video.play()
		},
		// 监听视频是否全屏
		changeVideoBox(data){
			this.$emit('bindfullscreenchange',data.detail.fullScreen);
		},
		// 播放进度跟踪
		timeupdate(event) {
			// 保存该视频播放时长
			this.duration = event.detail.duration;
			// 判断是否暂停播放
			if (!this.play) {
				return;
			}
			// 判断是否已经播放结束
			if (this.time >= this.duration) {
				this.time = 0;
			}
			// 保存当前播放了的时长
			this.time = event.detail.currentTime;
		},
		// 视频播放
		videoPlay() {
			let obj = this;
			// 判断视频是否需要播放
			if (obj.play) {
				// 播放视频
				try {
					obj.videoCtx.play();
				} catch (e) {
					console.log(e);
					//TODO handle the exception
				}
				// 是为初次加载视频
				if (obj.playFirst) {
					// 设置播放开始位置
					obj.videoCtx.seek(obj.startTime);
					obj.playFirst = false;
				}
			} else {
				// 暂停视频
				obj.videoCtx.pause();
				// 触发暂停视频事件
				obj.$emit('pause', obj.time);
			}
		},
		waiting() {}
	},
	watch: {
		// 监听视频播放状态
		play(newVal, oldVal) {
			this.videoPlay();
		},
		// 监听开始时间变化
		startTime: {
			immediate: true,
			handler(newVal, oldVal) {
				this.time = newVal;
			}
		},
		// 获取进度条长度
		gDuration: {
			immediate: true,
			handler(newVal, oldVal) {
				this.duration = newVal;
			}
		}
	},
	computed: {
		// 底部进度条长度
		barWidth() {
			// 获取当前进度条显示进度
			let width = (this.time / this.duration) * parseInt(this.width);
			return `${width}px`;
		},
		//视频播放开始时间
		startTime() {
			return this.initialTime;
		}
	}
};
</script>

<style scoped>
.video {
	width: 750rpx;
}

.top {
	position: absolute;
	top: 0;
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
	width: 750rpx;
	height: 300rpx;
}
.bottom {
	position: absolute;
	bottom: 0;
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
	width: 750rpx;
	height: 300rpx;
}
.progressBar {
	border-radius: 2upx;
	height: 4upx;
	background-color: #ffffff;
	z-index: 999999;
	position: absolute;
	bottom: 40upx;
	/* #ifdef APP-NVUE */
	animation: flicker 4s linear infinite;
	animation-direction: alternate;
	/* #endif */
}
/* #ifdef APP-NVUE */

@keyframes flicker {
	0% {
		box-shadow: 0 0 0 #ffffff;
	}
	/** 暂停效果 */
	10% {
		box-shadow: 0 0 2upx #ffffff;
	}
	50% {
		box-shadow: 0 0 10upx #ffffff;
	}
	60% {
		box-shadow: 0 0 12upx #ffffff;
	}
	90% {
		box-shadow: 0 0 18upx #ffffff;
	}
	100% {
		box-shadow: 0 0 20upx #ffffff;
	}
}
/* #endif */
</style>
