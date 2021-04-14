/*
 * @Description: 这是***页面（组件）
 * @Date: 2020-06-02 15:08:28
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-02 15:12:01
 */ 
//定义全局变量
var Chart1 = null;
var Chart2;
var Charttemple;
var subChardata = new Array();
var secondgraphobj;
var ChartDataSource;
var ChartCalResult;
var ChartDataItem;
var Language;
var vvv;
var option = option = {
	animation: false
};

var allchartlist2 = []

//替换不相同属性
function DashAddOrModify(target, source) {
	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			const ele = source[key];
			var modify = false;
			if (target.hasOwnProperty(key)) {
				if (typeof(ele) != "object") {
					target[key] = ele;
					modify = true;
					console.log("modify to ->");
				}
			} else {
				target[key] = {};
			}
			if(Array.isArray(ele)){
			    target[key] = ele;
			}
			else if (typeof(ele) == "object") {
				DashAddOrModify(target[key], source[key]);
			} else if (!modify) {
				target[key] = ele;
			}
		}
	}
}

var DashBoardChartShow = true
var DashData
// 修改仪表盘
function DashchartEcharts(PieChartData,PieChartNameData) {
	
	PieChartData = JSON.parse(JSON.stringify(PieChartData))
	for(let i=0;i<PieChartData.length;i++){
		let indexName = PieChartNameData.indexOf(PieChartData[i].name)
		if(indexName == -1){
			continue;
		}

		var data

		DashData = PieChartData[i].option
		data = DashData
		DashBoardChartShow = false

		var Title = data.Title.Title
		var TitleFontColor = data.Title.Color.HtmlColor
		var TitleFontSize = data.Title.FontSize
		var TitlePosition = data.Title.Position
		var TitleShow = data.Title.Show
		var backgroundColor2 = data.BackgroundColor.HtmlColor
		var ToolTipm
		var formatterShow = false
		if(data.Label.ValueShow == true){
			ToolTipm = '{b}' 
			formatterShow = true
		}
		if(data.Label.DimensionShow == true){
		   ToolTipm = '{c}'
		   formatterShow = true
		}
		if(data.Label.ValueShow == true && data.Label.DimensionShow == true){
			ToolTipm = '{b}: {c}'
			formatterShow = true
		}
		var AxisLabelFontSize = data.Variable.Tooltip.AxisLabelFontSize
		var SeriesDetailFontSize = data.Variable.Tooltip.SeriesDetailFontSize
		var DimensionName = data.Variable.DimensionName
		var Max = data.Variable.Range.Max
		var Min = data.Variable.Range.Min
		var SplitNumber = data.Variable.Range.SplitSegments
		var AreaColorOne = data.Variable.Range.NormalScale  
		var AreaColorTwo = data.Variable.Range.WarnScale
		var SeriesDetailShow = data.Variable.Tooltip.SeriesDetailShow
		var AxisLabelShow = data.Variable.Tooltip.AxisLabelShow
		var ValueDigit = data.Variable.ValueDigit
		var Dashvalue 
		if(data.IsOriginal){
			Dashvalue= Number(data.Datas)
		}else{
			Dashvalue= Number(data.Datas) / data.originalMax * 100
			console.log('Dashvalue',Dashvalue,Number(data.Datas),data.originalMax)
		}
		var Dashvalue2
		if(Dashvalue == 0){
			Dashvalue2 = 0
		}else{
			Dashvalue2 = (Dashvalue - Min)>(Max - Min)? (Max - Min) : (Dashvalue - Min)
		}
		if(Dashvalue < Min){
			Dashvalue2 = Min
		}
		if(ValueDigit != undefined){
			Dashvalue = Dashvalue.toFixed(ValueDigit)
		}else{
			Dashvalue = Dashvalue.toFixed(0)
		}
		//区间格式
		let axisLineArr = data.Variable.Range.axisLineArr
		var axisArr = []
		for(let i=0;i<axisLineArr.length;i++){
			let arr = []
			arr[0] = (axisLineArr[i].Max  - data.Variable.Range.Min) / (data.Variable.Range.Max - data.Variable.Range.Min)
			arr[1] = data.SelectedColorScheme[i%10]
			axisArr.push(arr)
		}
		axisLineArr = axisArr
		
		var Unit = data.Variable.Unit
		var AxisSplitNumber = data.Variable.Range.Scale
		var dom 
		var titleColor = data.Variable.Color.HtmlColor
        if(document.getElementById(`${PieChartData[i].name}`)){
            dom = document.querySelector(`#${PieChartData[i].name}`).clientWidth
			Chart1 = echarts.init(document.getElementById(`${PieChartData[i].name}`));
		}

		Chart1.clear()
		Chart1.resize()
		var optionF = {
			title:{
				text: Title,
				left: TitlePosition.toLowerCase(),
				show:TitleShow,
				textStyle:
					{
						fontFamily:'宋体',
						color: TitleFontColor,
						fontSize: TitleFontSize,
					},
				padding:[12,10]
			}, 
			backgroundColor: backgroundColor2,
			animation:true,
			tooltip: {
				formatter: ToolTipm,
				show:formatterShow
			},
			series: [
				{
					name: '业务指标',
					type: 'gauge',
					radius: '90%',
					center: ['50%','60%'],
					min: Min,
					max: Max,
					pointer: {              // 仪表盘指针。
						show: true,             
						length: "90%",         
						width: 5,               
					},
					title:{   //改变颜色
						textStyle:{
							color:titleColor
						}
					},
					 axisLabel: {
						show: AxisLabelShow,
						color: '#B1B1B2',
						distance: dom * 0.067,
						fontSize:AxisLabelFontSize
					}, //刻度标签。
					 axisTick: {
						show: false,
					},
					splitLine: {           // 分隔线
						length: 0,         // 属性length控制线长
						lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
							color: 'auto'
						},
					},
					 axisLine: {
						show: true,
						lineStyle:{
							color: axisLineArr,
							width:10,
							shadowColor : '#000', //默认透明
							shadowBlur: 0,
						}
					}, //仪表盘轴线
					itemStyle: {            // 仪表盘指针样式。
						color: "auto",         
					},
					"z": 7,
					detail: {
						show:SeriesDetailShow,
						formatter: '{value} ' + Unit,
							textStyle:{
							"fontSize": SeriesDetailFontSize,
						}
					},
					data: [{ value: Dashvalue, name: DimensionName }],
					
				},
				 { 
					name: '刻度',
					type: 'gauge',
				   radius: '85%',
				   center: ["50%", "60%"], //整体的位置设置
					  axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							color: axisLineArr,
							width: 35,
							opacity: 0, //刻度背景宽度
						}
					},
					splitLine: {
						length: 25, //刻度节点线长度
						lineStyle: {
							width: 3,
							color: 'auto'
						} //刻度节点线
					},
					splitNumber:Number(SplitNumber),
					axisTick: {
						show: true,
						lineStyle: {
							color: '#C9C9C9',
							width: 3
						},
						length: 8,
						splitNumber: Number(AxisSplitNumber),
					},
					 z:6,
					detail: {
						show: false
					},
					data: [{show: false,}],
					axisLabel: {
						show: false
					},
					pointer: {
						show: false
					},
					tooltip: {
						show: false
					},
				},
				{ 
					"name": '圆形',
					"type": 'pie',
					"hoverAnimation": false,
					"legendHoverLink": false,
					center: ['50%','60%'],
					"z": 9,
					"radius": ['2.5%', '4%'],
					"labelLine": {
						"normal": {
							"show": false
						}
					},
					"data": [{
						"value": 100,
						itemStyle: {
							normal: {
								color: "#aaa"
							},
							emphasis: {
								color: "#aaa"
							}
						}
					}],
					 detail: {              
						show: false,            
					},
					tooltip: {
						show: false
					},
				},
				{  
					"name": '空白圆形',
					"type": 'pie',
					"hoverAnimation": false,
					"legendHoverLink": false,
					center: ['50%','60%'],
					"radius": ['0%', '3%'],
					"z": 8,
					"data": [{
						"value": 100,
						itemStyle: {
							normal: {
								color: data.BackgroundColor.HtmlColor
							},
							emphasis: {
								color: data.BackgroundColor.HtmlColor
							}
						}
					}],
					"label": {
						"normal": {
							"show": false,
						},
						"emphasis": {
							"show": false
						}
					},
					"labelLine": {
						"normal": {
							"show": false
						}
					},
					 tooltip: {
						show: false
					},
					  detail: {              
						show: false,            
					 },
				},
				{  //阴影
					type: 'gauge',
					startAngle: 225,
					endAngle: 225 - (Dashvalue2/(Max - Min))*270,
					radius:'90%',
					center: ['50%','60%'],
					axisLine: {
						show: true,
						lineStyle: {
							width: dom * 0.1,
							color: [
								[1,'rgba(170,196,247,0.35)']
							]
						}
					},
					 "z": 5,
					 detail: {              
						show: false,            
					 },
					   splitLine:{
						show:false  
					  },
					  axisTick:{
						  show:false
					  },
					  axisLabel:{
						show:false  
					  },
					  pointer:{
						show:false  
					  },
					  detail: {              
						show: false,            
					 },
					 tooltip: {
						show: false
					},
					 data: [{show: false,}],
				}
			]
		}
		Chart1.setOption(optionF);
		allchartlist.push([Chart1, PieChartData[i].name])
	}

}