import {
	mapState,
	mapMutations
} from 'vuex'

export default {
	install(Vue) {
		Vue.mixin({
			computed: {
				// ...mapState('app', ['isbinding', 'phone', 'ALIPAYopenid', 'WEIXINopenid', 'userId', 'way',
				// 	'appsecret','openid',
				// 	'isVip', 'isPay', 'endtime', 'avatar', 'nickName', 'appsecret'
				// ]),
				// ...mapState('mockdata', ['listjiadata'])
			},
			onShow() {
				// let routes = getCurrentPages()
				// let dangqian = routes[routes.length - 1].route
				// let pagebaimingdan = ['pages/index/index',
				// 	'pages/invoice/invoice',
				// 	'pages/my/my',
				// 	'pages/login/login',
				// 	'pages/loginphone/loginphone',
				// 	'pages/indexchayan/indexchayan',
				// 	'pages/indexchayankongbai/indexchayankongbai'
				// ]; //未登录白名单
				// let panduan = pagebaimingdan.includes(dangqian)
				// if (!this.isbinding) {
				// 	// 如果不在白名单中，就跳转回login页面
				// 	if (panduan) {
				// 		// console.log('没登录但是在白名单中')
				// 	} else {
				// 		// console.log('没登录不在白名单中')
				// 		uni.redirectTo({
				// 			url: '/pages/login/login'
				// 		})
				// 	}
				// } else {
				// 	// console.log('已经登录了')
				// }
				// this.consolevuexdata(dangqian)
			},
			methods: {
				// ...mapMutations('app', ['ISBINGING', 'PHONE', 'WAY', 'USERID', 'ALIPAYOPENID', 'WEIXINOPENID',
				// 	'ISVIP','OPENID',
				// 	'ISPAY', 'ENDTIME', 'NICKNAME', 'AVATAR'
				// ]),
				// ...mapMutations('mockdata', ['LISTJIADATASAHNCHU', 'UNLOGINCLONEDATA']),

				// 未登录跳转login页面
				isbindingfalsenavtologin() {
					if (!this.isbinding) {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				},
				// 打印vuex数据
				consolevuexdata(dangqian) {
					const vuexdata = {
						'phone': this.phone,
						'ISVIP': this.isVip,
						'ISPAY': this.isPay,
						'ENDTIME': this.endtime,
						'isbinding': this.isbinding,
						'USERID': this.userId
					}
					console.log('------' + dangqian.split('/')[2] + '------页面vuex里的数据', vuexdata)
				},
				// 跳转相关方法
				navto(e,type){
					
					console.log('e',e)
					console.log('type',type)
					
					let {
						key
					} = e.currentTarget.navname
					
					let urlindex = {
						'home': '/pages/index/index.vue',
						'about': '/pages/animation/animation.vue' ,
						'my': '/pages/my/my.vue'
					}
					
					// uni.navigateTo({
					// 	url: urlindex[key]
					// })
					
				}
			}
		})
	}
}
