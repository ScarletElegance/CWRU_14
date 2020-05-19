var util = require('../../util/util.js')
import * as echarts from '../../commpents/ec-canvas/echarts.js';
var initChart = null
var app = getApp()

Page({
	data: {
		nvabarData: {
			showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
			title: '数据报表', //导航栏 中间的标题
		},

		// 此页面 页面内容距最顶部的距离
		height: app.globalData.height * 2 + 20,
		listData: [],
		listData1: [],
		time: '',
		fjnum: ["100", "108", "121", "133", "147", "160", "172", "188", "200", "212", "225", "237", "249", "261"],
		array: ['机组1', '机组2', '机组3', '机组4', '机组5', '机组6', '机组7', '机组8', '机组9', '机组10', '机组11', '机组12', '机组13', '机组14'],
		array2: ["驱动端振动", "风扇端振动", "工作转速"],
		index: 0,
		index2: 0,
		labels: [],
		result: [],
		i: 0,
		ec: {
			lazyLoad: true
		}
	},
	onLoad: function () {
		this.setDatas(100)
	},

	getDatas: function (fanId, attr, callback) {
		var that = this
		wx.request({
			url: 'https://api.phmlearn.com/component/data/zhoucheng',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				divice_id: fanId,
				atrribute: attr,
				access_token: app.globalData.access_token
			},
			success: function (res) {
				console.log(res.data.data);
				callback(res)
			}
		})
	},
	setArrData: function (arr) {
		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].toFixed(5)
		}
		return arr
	},
	setDatas: function (fanId) {
		this.getDatas(fanId, 'DE_time', res => {
			this.setData({
				'result': {
					de: this.setArrData(res.data.data.data)
				}
			})
		})
		this.getDatas(fanId, 'FE_time', res => {
			this.setData({
				'result': {
					fe: this.setArrData(res.data.data.data)
				}
			})
		})
		this.getDatas(fanId, 'RPM', res => {
			this.setData({
				'result': {
					rpm: this.setArrData(res.data.data.data)
				}
			})
		})
	},

	bindPickerChange: function (e) {
		let arr = [100, 108, 121, 133, 147, 160, 172, 188, 200, 212, 225, 237, 249, 261]
		this.setData({
			index: e.detail.value
		})
		let j = 0
		let fanid = this.data.fjnum[j]
		this.setDatas(arr[j])
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