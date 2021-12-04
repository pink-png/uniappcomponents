<template>
	<view :id="[popupId?'lupopupWrapper'+popupId:'']" class="lu-popup-wrapper" :class="popupClass"
		:style="[popupStyles]">
		<view class="lu-popup-content" :class="popupContentClass"
			:style="[{height:height,width:width,backgroundColor:backgroundColor}]">
			<slot></slot>
		</view>
		<view v-if="maskShow" class="lu-popup-mask" :class="popupMaskClass" @tap="close(maskClick)"></view>
	</view>
</template>

<script>
	export default {
		name: "lu-popup-wrapper",
		props: {
			type: {
				type: String,
				default: "center" // left right top bottom center
			},
			transition: {
				type: String,
				default: "none" //none slider fade
			},
			backgroundColor: {
				type: String,
				default: 'transparent' //transparent
			},
			active: {
				type: Boolean,
				default: false
			},
			height: {
				type: [String],
				default: "100%"
			},
			width: {
				type: [String],
				default: "100%"
			},
			top: {
				type: [String],
				default: "0"
			},
			bottom: {
				type: [String],
				default: "0"
			},
			left: {
				type: [String],
				default: "0"
			},
			right: {
				type: [String],
				default: "0"
			},
			popupId: {
				type: [String, Number],
				default: 0
			},
			maskShow: {
				type: Boolean,
				default: true
			},
			maskClick: {
				type: Boolean,
				default: true
			},
			closeCallback: {
				type: Function,
			},
		},
		data() {
			return {
				newActive: this.active,
				newTransition: true
			};
		},
		computed: {
			popupClass: function() {
				let _class = "";
				if (this.newActive) {
					_class += "lu-popup-active";
				}
				let arrType = ["left", "right", "top", "bottom", "center"];
				if (arrType.indexOf(this.type) !== -1 && this.type !== 'center') {
					_class += " lu-popup-" + this.type;
				}
				return _class;
			},
			popupStyles: function() {
				const patt = /(%|in|cm|mm|em|pt|pc|px|vw|vh)$/i;
				const testTop = patt.test(this.top);
				const testBottom = patt.test(this.bottom);
				const testLeft = patt.test(this.left);
				const testRight = patt.test(this.right);
				let width = 'calc(100%';
				width += testLeft ? ' - ' + this.left : '';
				width += testRight ? ' - ' + this.right : '';
				width += ')';
				let height = 'calc(100%';
				height += testTop ? ' - ' + this.top : '';
				height += testBottom ? ' - ' + this.bottom : '';
				height += ')';
				let _style = {};
				if (testLeft || testRight) {
					_style.width = width
				};
				if (testTop || testBottom) {
					_style.height = height
				};
				if (testTop) {
					_style.top = this.top
				};
				if (testBottom) {
					_style.bottom = this.bottom
				};
				if (testLeft) {
					_style.left = this.left
				};
				if (testRight) {
					_style.right = this.right
				};
				return _style;
			},
			popupContentClass: function() {
				let _class = "";
				let arrTransition = ["none", "slider", "fade"];
				if (!!this.newTransition && arrTransition.indexOf(this.transition) !== -1 && this.transition !==
					'none') {
					_class += "lu-popup-transition-" + this.transition;
				}
				return _class;
			},
			popupMaskClass: function() {
				let _class = "";
				if (!!this.newTransition) {
					_class += "lu-popup-mask-fade";
				}
				return _class;
			}
		},
		methods: {
			show: function() {
				this.newActive = true;
				let _this = this;
				setTimeout(function() {
					_this.newTransition = false;
				}, 50)
			},
			close: function(v) {
				let close = v == false ? false : true;
				if (close) {
					this.newTransition = true;
					let _this = this;
					setTimeout(function() {
						_this.newActive = false;
						if (typeof(_this.closeCallback) == "function") {
							_this.closeCallback();
						}
					}, 300)
				}
			}
		}
	}
</script>

<style lang="scss">
	lu-popup-wrapper {
		position: absolute;
	}

	.lu-popup-wrapper {
		position: fixed;
		z-index: 998;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		display: none;
		overflow: hidden;

		&.lu-popup-active {
			display: flex;
		}

		&.lu-popup-left {
			justify-content: flex-start;

			.lu-popup-transition-slider {
				transform: translate3d(-100%, 0, 0);
			}
		}

		&.lu-popup-right {
			justify-content: flex-end;

			.lu-popup-transition-slider {
				transform: translate3d(100%, 0, 0);
			}
		}

		&.lu-popup-top {
			align-items: flex-start;

			.lu-popup-transition-slider {
				transform: translate3d(0, -100%, 0);
			}
		}

		&.lu-popup-bottom {
			align-items: flex-end;

			.lu-popup-transition-slider {
				transform: translate3d(0, 100%, 0);
			}
		}

		.lu-popup-content {
			z-index: 2;
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			align-content: flex-start;
			transform: translate3d(0, 0, 0) scale(1);
			opacity: 1;
			overflow: scroll;
			transition: transform .3s ease-in-out, opacity .3s ease-in-out;

			&.lu-popup-transition-fade {
				transform: translate3d(0, 0, 0) scale(0.3);
				opacity: 0;
			}
		}

		.lu-popup-mask {
			position: absolute;
			z-index: 1;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			height: 100%;
			width: 100%;
			background-color: rgba(#000, 0.75);
			transition: background .3s ease-in-out;

			&.lu-popup-mask-fade {
				background-color: rgba(#000, 0);
			}
		}

	}
</style>
