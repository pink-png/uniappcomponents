import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

// 导入请求地址
import https from '@/common/request.js'
Vue.prototype.$https = https

// 注册请求方法
// import * as api from '@/common/api.js'
// Vue.prototype.$api = api

// 封装工具方法
import * as util from '@/common/util.js'
Vue.prototype.$util = util

// 封装 uniapp 内置的方法
import * as uniapputils from '@/common/uniapputils.js'
Vue.prototype.$uniapputils = uniapputils

// 注册全局路由管理
import GsqMixins from "@/mixins/GsqMixins.js"
Vue.use(GsqMixins)

// 全局过滤器
import {
	formatDate,
	applyStatus
} from '@/common/filters.js'
Vue.filter('formatDate', formatDate) //时间转换
Vue.filter('applyStatus', applyStatus) //订单状态


// 注册全局组件
import GsqHeader from "@/components/gsq-header/gsq-header.vue"
import GsqTabbar from "@/components/gsq-tabBar/TabBar.vue"
import HFromAlert from "@/components/h-form-alert/h-form-alert.vue"
import KXDateTime from "@/components/kx-datetime/kx-datetime.vue"
import UniAddressSelector from "@/components/Luke-UniappAddressSelector/components/UniAddressSelector.vue"
import MarkSlideList from "@/components/mark-slide-list/mark-slide-list.vue"
import MingPop from "@/components/ming-pop/ming-pop.vue"
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue"
import PickerDate from "@/components/pickerDate/pickerDate.vue"
import Vtabs from "@/components/v-tabs/v-tabs.vue"
import GsqSwipeAction from "@/components/gsq-swipe-action/gsq-swipe-action.vue"
import GsqTabList from "@/components/gsq-tab-list/gsq-tab-list.vue"
import GsqCitypicker from "@/components/gsq-citypicker/gsqCityPicker.vue"
import Animation from "@/components/Animation/FadeAnimation.vue"
import BetterSticky from "@/components/better-sticky/better-sticky.vue"
import BoboMessage from "@/components/bobo-message/bobo-message.vue"
import CanvasLove from "@/components/canvasLove/canvasLove.vue"
import ChunleiVideo from "@/components/chunlei-video/chunlei-video.vue"
import DigitJump from "@/components/DigitJump/DigitJump.vue"
import DragBall from "@/components/drag-ball/drag-ball.vue"
import LinnianCountDown from "@/components/linnian-CountDown/uni-countdown.vue"
import LuPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue"
import PyhGoodsSwiper from "@/components/pyh-goodsSwiper/pyh-goodsSwiper.vue"
import SsCalendar from "@/components/ss-calendar/ss-calendar.vue"
import TkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
import UploadImages from "@/components/uploadimgas/upload-images.vue"
import GsqShengShiPicker from "@/components/gsq-shengshipicker/gsq-shengshipicker.vue"
import GsqNumberBox from "@/components/gsq-number-box/gsq-number-box.vue"
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
import unipopup from '@/components/uni-popup/uni-popup.vue'
import unisection from '@/components/uni-section/uni-section.vue'
import CodeKeyBoard from '@/components/CodeKeyboard/CodeKeyboard.vue'
import DialogBox from '@/components/DialogBox/DialogBox.vue'
import TcolorPicker from '@/components/lu-popup-wrapper/lu-popup-wrapper.vue'
import GsqGeneralform from '@/components/gsq-Generalform/gsq-Generalform.vue'
import GsqPassworldInputDiy from '@/components/gsq-passworldinput-diy/gsq-passworldinput-diy.vue'
import GsqSwitchDiy from '@/components/gsq-switch-diy/gsq-switch-diy.vue'
import cCircle from "@/components/Your_Exios-Circle/Your_Exios-Circle.vue"
import Circle from "@/components/circle/circle.vue"
import GsqScrollTextBar from "@/components/gsq-Scroll-text-bar/gsq-Scroll-text-bar.vue"



Vue.component('GsqScrollTextBar',GsqScrollTextBar) // 文字滚动条
Vue.component('Circle',Circle) // 进度环 全部可用
Vue.component('cCircle',cCircle) // 进度环 不支持小程序
Vue.component('GsqSwitchDiy',GsqSwitchDiy) // switch diy 颜色
Vue.component('GsqPassworldInputDiy',GsqPassworldInputDiy) // 自定义密码输入框 仅限实现逻辑
Vue.component('GsqCitypicker', GsqCitypicker) //省市区选择
Vue.component('GsqShengShiPicker', GsqShengShiPicker) //省市选择
Vue.component('GsqNumberBox', GsqNumberBox) //数字选择器
Vue.component('GsqSwipeAction', GsqSwipeAction) //多功能滑动组件(还在开发中，支持最简单的滑动删除)
Vue.component('GsqHeader', GsqHeader) // 头部通用
Vue.component('GsqTabbar', GsqTabbar) //自定义tabbar
Vue.component('GsqTabList', GsqTabList) // 左右滑动tab列表
Vue.component('BoboMessage', BoboMessage) //头部消息提示 succsee err info warn   暂支持4种情况
Vue.component('MingPop', MingPop) //弹框1   - onReady生命周期才能直接弹窗
Vue.component('Vtabs', Vtabs) // 高级tab列表滑动可各种拓展
Vue.component('HFromAlert', HFromAlert) //可输入提交弹框
Vue.component('UniAddressSelector', UniAddressSelector) //城市列表选择需要配置数据
Vue.component('MarkSlideList', MarkSlideList) //列表滑动操作   - 小程序不支持
Vue.component('CodeKeyBoard', CodeKeyBoard) //简易数字键盘
Vue.component('DialogBox', DialogBox) //弹框2
Vue.component('MxDatePicker', MxDatePicker) //多类型时间选择器
Vue.component('PickerDate', PickerDate) //上下滑动时间选择器
Vue.component('KXDateTime', KXDateTime) //时间选择 年月日时分    - 需依赖 uni-popup
Vue.component('LinnianCountDown', LinnianCountDown) // 天 时 分 秒 定时器
Vue.component('SsCalendar', SsCalendar) //日历只显示当前月当天
Vue.component('Animation', Animation) // 只支持H5  transition
Vue.component('BetterSticky', BetterSticky) //只支持H5 
Vue.component('CanvasLove', CanvasLove) // 画布
Vue.component('ChunleiVideo', ChunleiVideo) //视频播放器
Vue.component('DigitJump', DigitJump) //小到大定时器
Vue.component('DragBall', DragBall) //自定义拖动容器
Vue.component('LuPopupWrapper', LuPopupWrapper)
Vue.component('PyhGoodsSwiper', PyhGoodsSwiper) // 列表滑动展示
Vue.component('TkiQrcode', TkiQrcode) //H5生成二维码
Vue.component('UploadImages', UploadImages) //uniapp 上传图片到服务器
Vue.component('unisection', unisection) //就一个数据展示而已
Vue.component('uniSwipeAction', uniSwipeAction) //滑动列表外壳
Vue.component('uniSwipeActionItem', uniSwipeActionItem) //滑动列表子项
Vue.component('unipopup', unipopup) //弹框     - 需依赖 uni-transition
Vue.component('TcolorPicker', TcolorPicker) //颜色选择器
Vue.component('GsqGeneralform', GsqGeneralform) // 多功能表单

const app = new Vue({
	...App
})
app.$mount()
