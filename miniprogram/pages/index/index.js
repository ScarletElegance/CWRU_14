//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		// 组件所需的参数
		nvabarData: {
			showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
			title: '首页', //导航栏 中间的标题
		},

		// 此页面 页面内容距最顶部的距离
		height: app.globalData.height * 2 + 20,
	},
	onLoad() {
		console.log(this.data.height)
	},

	goTochart: function () {
		wx.navigateTo({
			url: '/pages/chartone/chartone',
		})
	},

	goToshow: function () {
		wx.navigateTo({
			url: '/pages/show/show',
		})
	},

	goTomy:function(){
		wx.navigateTo({
			url: '/pages/my/my',
		})
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
	}
})
