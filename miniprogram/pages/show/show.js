var util = require('../../util/util.js')
import * as echarts from '../../commpents/ec-canvas/echarts.js';
var initChart = null
var app = getApp()
function setOption(chart, ylist) {
	var options = {
		title: {
			left: 'center'
		},
		color: ["#37A2DA"],
		grid: {
			top: 20,
			right: 20,
			bottom: 30
		},
		tooltip: {
			show: true,
			trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				type: 'line'      // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		xAxis:[{
			type: 'category',
			boundaryGap: false,
			data: ['1', '2', '3', '4', '5', '6', '7'],
			splitLine: {
				show: true,
				lineStyle: {
					color: ['#ffffff'],
					width: 1,
					type: 'soild'
				}
			　　},
				axisLabel:{
					textStyle:{
						color:'white'
					}
				},
			axisLine: {
				lineStyle: {
					color: '#fff',
					width: 1,   //这里是坐标轴的宽度,可以去掉
				}
			}
		}],
		yAxis: [{
			x: 'center',
			type: 'value',
			splitLine: {
				lineStyle: {
					color: ['#ffffff'],
					width:1,
					type: 'soild'
				},
			axisLabel: {
					textStyle: {
						color: 'white'
					}
				}
			},
			axisLine: {
				lineStyle: {
					color: '#fff',
					width: 1,   //这里是坐标轴的宽度,可以去掉
				}
			}
		}],
		series: [{
			type: 'line',
			smooth: true,
			data: ylist
		}]
	}
	chart.setOption(options);
}

Page({
	data: {
		nvabarData: {
			showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
			title: '数据', //导航栏 中间的标题
		},

		// 此页面 页面内容距最顶部的距离
		height: app.globalData.height * 2 + 20,

		time: '',
		fjnum: ["100", "108", "121", "133", "147", "160", "172", "188", "200", "212", "225", "237", "249", "261"],
		array: ['机组1', '机组2', '机组3', '机组4', '机组5', '机组6', '机组7', '机组8', '机组9', '机组10', '机组11', '机组12', '机组13', '机组14'],
		array2: ["驱动端振动", "风扇端振动", "工作转速"],
		index: 0,
		index2: 0,
		labels: [],
		result: [],
		file_name:[],
		use: [],
		test_file_name: [],
		teatresult:[],
		series: [1.85999, 1.91162, 1.63502, 1.78623, 1.78623, 2.02226, 2.20297],
		i: 0,
		timer: '',
		timer2: '',
		chartTimer: '',
		ec: {
			lazyLoad: true
		}
	},
	onLoad: function () {
		this.setDatas(100)
		this.setData({
			time: util.formatTime(new Date()),
		})
		this.oneComponent = this.selectComponent('#mychart-dom-line');
		this.getOneOption(this.data.series);
		//this.onRequest("https://api.phmlearn.com/component/ML/predict/7")
		this.getLabel('100')
	},
	init_one: function (ylist) {           //初始化第一个图表
		this.oneComponent.init((canvas, width, height) => {
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			setOption(chart, ylist)  //赋值给echart图表
			this.chart = chart;
			return chart;
		});
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
				'result[0]':{
					key: '驱动端振动',
					max: Math.max.apply(null,res.data.data.data).toFixed(5),
					min: Math.min.apply(null,res.data.data.data).toFixed(5),
					arr: this.setArrData(res.data.data.data)
				}
			})
		})
		this.getDatas(fanId, 'FE_time', res => {
			this.setData({
				'result[1]': {
					key: '风扇端振动',
          max: Math.max.apply(null,res.data.data.data).toFixed(5),
          min: Math.min.apply(null,res.data.data.data).toFixed(5),
          arr: this.setArrData(res.data.data.data)
				}
			})
		})
		this.getDatas(fanId, 'RPM', res => {
			this.setData({
				'result[2]': {
					key: '工作转速',
          max: Math.max.apply(null,res.data.data.data),
          min: Math.min.apply(null,res.data.data.data),
          arr: this.setArrData(res.data.data.data)
				}
			})
			this.startTimer()
			this.setDate()
		})
	},
	getChartdata: function (args) {
		let array = args
		let series1 = []
		for (let i = 0; i < 7; i++) {
			series1.push(array[i])
		}
		this.setData({
			series: series1
		})
	},
	getOneOption: function (series) {
		this.setData({
			ylist: series,
		})
		this.init_one(this.data.ylist)
	},
	setDate: function () {
		this.setData({
			timer2: setInterval(() => {
				this.setData({
					time: util.formatTime(new Date())
				})
			}, 1000)
		})
	},
	startTimer: function () {
		this.setData({
			i: 0
		})
		this.setData({
			timer: setInterval(() => {
				if (this.data.i <= 3000) {
					this.setData({
						i: this.data.i + 1
					})
				}
				else {
					this.setData({
						i: 0
					})
					this.closeTimer(this.data.timer)
					this.closeTimer(this.data.timer2)
				}
			}, 1000)
		})
	},
	closeTimer: function (time) {
		clearInterval(time)
	},
	bindPickerChange: function (e) {
		let arr = [100, 108, 121, 133, 147, 160, 172, 188, 200, 212, 225, 237, 249, 261]
		this.closeTimer(this.data.timer)
		this.closeTimer(this.data.timer2)
		this.setData({
			index: e.detail.value
		})
		let j = this.data.index
		let fanid = this.data.fjnum[j]
		this.getLabel(j)
		this.setDatas(arr[j])
		this.getOneOption(this.data.series);
		this.gettoast(j)
	},
	bindPickerChange2: function (e) {
		this.setData({
			index2: e.detail.value
		})
		let index = e.detail.value
		let arr = this.data.result[index].arr
		this.getChartdata(arr)
		this.getOneOption(this.data.series)
	},

	getLabeloneDatas: function (test_file_name, callback) {
		var that = this
		wx.request({
			url: ' https://api.phmlearn.com/component/upload/2/69',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				file_name: test_file_name,
				access_token: app.globalData.access_token
			},
			success: function (res) {
				console.log(res.data.data.file_name);
				callback(res)
			}
		})
	},
	setLabeloneDatas: function (index) {
		for (let x = index*10+1;x<(index+1)*10+1;x++){
		  let test_file_name='TEST'+x+'.csv'
			this.getLabeloneDatas(test_file_name, res => {
				this.setData({
					'file_name[index][x]': {
						key: x,
						arr: this.setArrData(res.data.data.data)
					}
				})
			})
		}
	},
	getLabeltwoDatas: function (index,file_name, callback) {
		var that = this
		wx.request({
			url: ' https://api.phmlearn.com/component/upload/ML/model/127/203',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				file_name: file_name,
				access_token: app.globalData.access_token
			},
			success: function (res) {
				console.log(res.data.data.predict);
				callback(res)
			}
		})
	},
	setLabeltwoDatas: function (index,file_name) {
		for (let x = 0; x < 10; x++) {
			this.getLabeltwoDatas(index,file_name[index][x].arr, res => {
				this.setData({
					'labels[index]': {
						key: '机组'+(index+1),
						predict: this.setArrData(res.data.data.data)
					}
				})
			})
		}
	},
	getLabel: function (j) {
		this.setLabeloneDatas(j),
		this.setLabeltwoDatas(j)
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力')
		} 
		else {
			wx.cloud.init({
				traceUser: true,
			})
		}
		wx.cloud.callFunction({
			name: 'fns',
			success: function (res) {
				console.log(res)

			},
			fail: function (err) {
				console.log("fail" + err)
			}
		}).then(res => {
			this.setData({
				labels: res.data
			})
		})
},
gettoast:function(j){
	if(this.data.use[j]==0){}
	else{
		wx.showToast({
			title: '故障',
			icon: 'none',
		})}
},
	
	onUnload: function () {
		clearInterval(this.data.timer2)
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