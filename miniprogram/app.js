//app.js
App({
	onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
				env: 'ykf-t8r4z',
        traceUser: true,
      })
    }

    this.globalData = {
			access_token: "e23b1ca1c90d469ca32427df4efebcd4.ddd96869d2f86e4ce710b5a9e4363ad8",
			resultArray: []
    }

		wx.getSystemInfo({
			success: (res) => {
				this.globalData.height = res.statusBarHeight
			}
		})
	},

	globalData: {
		statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
		height: 0
	}
})
