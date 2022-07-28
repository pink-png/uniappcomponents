<template>
	<view @touchstart.stop.prevent="touchstart">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {return {}},
		methods: {
			touchstart(e) {
				console.log('开始触摸', e)
			}
		}
	}
</script>

<style>
	@keyframes myfirst {
		0% {
			background: red;
		}

		25% {
			background: yellow;
		}

		50% {
			background: blue;
		}

		100% {
			background: green;
		}
	}

	@-webkit-keyframes myfirst

	/* Safari 与 Chrome */
		{
		0% {
			background: red;
		}

		25% {
			background: yellow;
		}

		50% {
			background: blue;
		}

		100% {
			background: green;
		}
	}
	
	view
	{
		width:100px;
		height:100px;
		background:red;
		animation:myfirst 5s;
		-moz-animation:myfirst 5s; /* Firefox */
		-webkit-animation:myfirst 5s; /* Safari and Chrome */
		-o-animation:myfirst 5s; /* Opera */
	}
	
	
</style>
