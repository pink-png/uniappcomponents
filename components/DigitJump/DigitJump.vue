<template>
	<view>{{digit}}</view>
</template>

<script>
	export default {
		data() {
			return {
				speed: 100,
				digit: 0,
			};
		},
		props: {
			digitTo: {
				type: Number,
				default: 1000,
			},
			digitFrom: {
				type: Number,
				default: 0,
			},
			runTime: {
				type: Number,
				default: 10000,
			},
			digitFiex: {
				type: Number,
				default: 0,
			},
			digitDelay: {
				type: Number,
				default: 1000,
			}
		},
		methods: {
			start() {
				let that = this;
				that.digit = that.digitFrom
				var times = that.runTime / that.speed;
				var dValue = (that.digitTo - that.digitFrom) / times;
				// console.log(dValue);
				// for(var i = 0;i<times;i++){
				// 	console.log(i);
				// 	setTimeout(function(){
				// 		that.digit = that.digitFrom + dValue*i;
				// 	},1000);
				// }
				let i = 0;
				let time = setInterval(function() {
					that.digit = parseFloat((that.digitFrom + dValue * i)).toFixed(that.digitFiex);
					if (times == i) {
						clearInterval(time);
					}
					i++;
				}, that.speed)
			}
		},
		created() {
			let that = this;
			setTimeout(function() {
				that.start();
			}, that.digitDelay);
		}
	}
</script>

<style>
</style>
