const app = getApp()



Page({
	data: {
		// 组件所需的参数
		nvabarData: {
			showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
			title: '我的', //导航栏 中间的标题
		},

		// 此页面 页面内容距最顶部的距离
		height: app.globalData.height * 2 + 20,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	onLoad: function () {
		// 查看是否授权
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserInfo({
						success: function (res) {
							console.log(res.userInfo)
						}
					})
				}
			}
		})
	},
	onLoad() {
		console.log(this.data.height)
	},

	methods: {
		// 返回上一页面
		_navback() {
			wx.navigateBack()
		},
		//返回到首页
		_backhome() {
			wx.switchTab({
				url: '/pages/index/index',
			})
		}
	},
	bindGetUserInfo(e) {
		// 获取到用户信息
		console.log(e.detail.userInfo)
	}
})

