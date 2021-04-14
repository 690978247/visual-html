/*
 * @Description: 这是***页面（组件）
 * @Date: 2021-03-02 16:34:08
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-01 15:19:57
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
var option = {
	animation: false
};
let allchartlist3 = []

//替换不相同属性
function BarAddOrModify(target, source) {
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
				BarAddOrModify(target[key], source[key]);
			} else if (!modify) {
				target[key] = ele;
			}
		}
	}
}


// 修改柱状堆叠图
var BarChartShow = true
var BarData

function BarchartEcharts(PieChartData,PieChartNameData) {
 
	PieChartData = JSON.parse(JSON.stringify(PieChartData))
	for(let i=0;i<PieChartData.length;i++){
		let indexName = PieChartNameData.indexOf(PieChartData[i].name)
		if(indexName == -1){
			continue;
		}

		var data
		BarData = PieChartData[i].option
		data = BarData
		BarChartShow = false

		var Title = data.Title.Title
		var TitlePosition = data.Title.Position
		var TitleIsChecked = data.Title.Show
		var TitleFontColor = data.Title.Color.HtmlColor
		var TitleFontSize =  data.Title.FontSize
		var TitleFamily = data.Title.FontFamily
		var TitleFontWeight = data.Title.FontWeight
	
		var ItemHeight = data.Legend.ItemHeight
		var ItemWidth = data.Legend.ItemWidth
		var FontWeight = data.Legend.FontWeight
		var FontFamily = data.Legend.FontFamily
		var LengendShow = data.Legend.Show
		var LengenColor = data.Legend.Color.HtmlColor
		var lengenPosition = data.Legend.Position
		var lengenFontSize = data.Legend.FontSize
		var LengenB = null
		var lengenT = "center"
		var lengenL = null
		var LengenR ="right"
		var LPtb = 10 
		var LPlr = 30
	
		var LegendData = []
		var TooColorArr = []
		for(var j=0;j<data.Variables.length;j++){
			LegendData.push(data.Variables[j].DimensionName)
			TooColorArr.push(data.Variables[j].Color.HtmlColor)
			// .slice(0,7)
		}
		if(lengenPosition == 'LeftCenter'){
			LengenB = null
			lengenT = "center"
			lengenL = 'left'
			LengenR = null
			LPtb = 10 
			LPlr = 10
			lengendScroll = 'vertical'
		}
		if(lengenPosition == 'RightCenter'){
			LengenB = null
			lengenT = "center"
			lengenL = null
			LengenR ="right"
			LPtb = 10 
			LPlr = 30
			lengendScroll = 'vertical'
		}
		if(lengenPosition == 'RightTop'){
			LengenB = null
			lengenT = "top"
			lengenL = null
			LengenR = 'left'
			LPtb =30 
			LPlr = 10
			lengendScroll = 'horizontal'
		}
		if(lengenPosition == 'RightBottom'){
			LengenB = "bottom"
			lengenT = null
			lengenL = null
			LengenR = 'left'
			LPtb = 10
			LPlr = 10
			lengendScroll = 'horizontal'
		}
		 var gridLeft = data.DrawContent.LeftMargin
		 var gridRight = data.DrawContent.RightMargin
		 var gridBottom = data.DrawContent.BottomMargin
		 var gridTop = data.DrawContent.TopMargin
	
		 var labelShow = data.Label.Show
		 var labelFontSize = data.Label.FontSize
		 var TextFontFamily = data.Label.FontFamily
		 var labelColor = data.Label.Color.HtmlColor
	
		 backgroundColor = data.BackgroundColor.HtmlColor
		 //x
		 var XfontSize = data.XAxis.FontSize
		 var Xcolor =data.XAxis.Color.HtmlColor
		 var XfontFamily =data.XAxis.FontFamily
		 var XfontWeight =data.XAxis.FontWeight
		 var XSplitLine = data.XAxis.SplitLine
		 var XSplitLineFontWeight = data.XAxis.XSplitLineFontWeight
		 var XSplitLineWidth = data.XAxis.SplitLineWidth
		 var XSplitLineColor = data.XAxis.SplitLineColor.HtmlColor
		 var XSplitLineShow = data.XAxis.SplitLineColor.SplitLineShow
	
		 //y
		 var Yname = data.AxisChartYAxis.Name
		 var Adaptive = data.AxisChartYAxis.Adaptive
		 var YAxisMax = data.AxisChartYAxis.Max
		 var YAxisMin = data.AxisChartYAxis.Min
		 if(Adaptive == true){
			 YAxisMax = null
			 YAxisMin = null
		 }
		 var YsplitLine = data.AxisChartYAxis.SplitLineShow
		 var YfontSize = data.AxisChartYAxis.FontSize
		 var Ycolor = data.AxisChartYAxis.Color.HtmlColor
		 var Unit = data.AxisChartYAxis.Unit == null ? '' : data.AxisChartYAxis.Unit
		 var SplitLineFontWeight = data.AxisChartYAxis.SplitLineFontWeight
		 var SplitLineWidth = data.AxisChartYAxis.SplitLineWidth
		 var SplitLineColor = data.AxisChartYAxis.SplitLineColor.HtmlColor
		 var YFontFamily =  data.AxisChartYAxis.FontFamily
		 var ShowSeparator = data.AxisChartYAxis.ShowSeparator
	
		 var yAxisData = data.AxisChartYAxis.yAxisData
		
		 
	
		 var IsTime = data.IsTime == true?null:'1'
		
		 console.log('UnitUnit',Unit,Yname,data.AxisChartYAxis)

		 if(!data.AxisChartYAxis.ShowUnit){
			Unit = ''
		}
		if(!data.AxisChartYAxis.ShowTitle){
			Yname = ''
		}
		
		  //折线图数据
		 var seriesDatas = data.YDataCollection
		 var Xdata = []
		 var seData = []
	
		 if(seriesDatas != undefined){
	
			 Xdata =data.XData
			 var arr = []
			 for(var v2=0;v2<seriesDatas.length;v2++){
				let value = {
					data:Object.values(seriesDatas[v2].YData),
					name:seriesDatas[v2].name
				}
				seData.push(value)
			 }
		 }
	
	  console.log('seData',seData)
		 var VariablesData = data.Variables
		 //折线图样式
		 var seriesArr = []
		 
		 for(var v=0;v<VariablesData.length;v++){
	
			let name11 = []
			 for(let a=0;a<seData.length;a++){
				name11.push(seData[a].name)
			 }
			 let index = name11.indexOf(VariablesData[v].DimensionName)
			 if(index != -1){
				 var data11 = seData[v].data
			 } 
	
			var value = {
				name:VariablesData[v].DimensionName,
				data:data11,
				barWidth:VariablesData[v].BarWidth,
				barMaxWidth: VariablesData[v].BarMaxWidth,
				stack:IsTime,
				type: VariablesData[v].DataType.toLowerCase(),
	
				itemStyle: {
					 shadowColor: "rgba(85,85,85,0.2)",
					 shadowBlur: 2,
					 shadowOffsetX: 2,
					 color: VariablesData[v].Color.HtmlColor
					//  .slice(0,7)
				 },
				 lineStyle: {
					 color: VariablesData[v].Color.HtmlColor,
					//  .slice(0,7),
					 width: 4
				 },
				 label: {
					color: labelColor,
					fontSize: labelFontSize,
					show: labelShow,
					fontFamily:TextFontFamily
				},
				  markLine:''
			}
			seriesArr.push(value)
		 }
		 //辅助线
		 var AuxiliaryLinesData = data.AuxiliaryLines
		 var markLineData= {
			symbol:'none',
			 data:[]
		 }
		 if(AuxiliaryLinesData.length){
	
			 for(var v1=0;v1<AuxiliaryLinesData.length;v1++){
				 var value1 = {
					  yAxis:AuxiliaryLinesData[v1].Value,
					  lineStyle:{
						  type:AuxiliaryLinesData[v1].Type,
						  color:AuxiliaryLinesData[v1].Color.HtmlColor
					  }
				 }
				 markLineData.data.push(value1)
			 }
		 }
		 console.log('markLineData',markLineData,AuxiliaryLinesData)
		 if(seriesArr.length){
			  seriesArr[0].markLine = markLineData
		 }

	
	    if(document.getElementById(`${PieChartData[i].name}`)){
			Chart1 = echarts.init(document.getElementById(`${PieChartData[i].name}`));
		}
		
	
			Chart1.on('legendselectchanged', function (obj) {
				var a = Chart1.getOption();
				var seriesData = a.series
				var yIndex
				var markLine
				var show
				var s1
				var s2
				var s
				for (let i = 0; i < seriesData.length; i++) {
					if (seriesData[i].name == obj.name) {
						yIndex = seriesData[i].yAxisIndex
						s = seriesData[i]
						if (!obj.selected[obj.name]) {
							if (seriesData[i].markLine != '' && seriesData[i]?.markLine?.data?.length) {
								show = true
								markLine = seriesData[i].markLine
								s = seriesData[i]
								console.log('dsa', s)
							} else {
								show = false
	
							}
						} else if (s.markLine == '' || s.markLine.data.length == 0) {
							let x = seriesData.filter(x => x.name != obj.name && x.yAxisIndex == yIndex && x.markLine != '');
							if (x.length) {
								let m = x[0].markLine;
								s.markLine = m;
								x[0].markLine = '';
								Chart1.setOption(a, true);
							}
						}
					}
				}
				for (let i = 0; i < seriesData.length; i++) {
					if (seriesData[i].name != obj.name) {
						if (!obj.selected.hasOwnProperty(seriesData[i].name) ||
							obj.selected[seriesData[i].name]) {
							if (show) {
								var isShow = seriesData[i].yAxisIndex == yIndex
								if (isShow) {
									seriesData[i].markLine = markLine
									s.markLine = []
									Chart1.setOption(a, true);
									console.log('www', markLine)
									return
								}
							}
						}
					}
				}
			})
	
		Chart1.clear()
		Chart1.resize()
		Chart1.setOption(
			{
				animation: false,
				color:TooColorArr,
				tooltip:{
					trigger: 'axis',
					formatter:function (params) {
						var div = document.createElement('div');
						var children = [];
						var title = '';
						for (let i = 0; i < params.length; i++) {
							const element = params[i];
							if (element.data!==null&&element.data!==undefined) {//0也需要显示
								var block = document.createElement('div');
								block.innerHTML = element.marker;
								var txt = document.createElement('span');
								txt.innerText = element.seriesName + ": " + element.data;
								block.append(txt);
								children.push(block);
								title = element.name;
							}
						}
						var titleBlock = document.createElement('div');
						titleBlock.innerText = title;
						div.append(titleBlock);
						children.forEach(ele => {
							div.append(ele);
						});
						if (children.length===0) {
							return null;
						}
						return div.innerHTML;
					}
			   },
				xAxis: {
				data: Xdata,
				axisLabel: {
					fontWeight: XfontWeight,
					fontFamily:XfontFamily,
					textStyle: {
					fontWeight: XfontWeight,
					},
					fontSize: XfontSize,
					color: Xcolor
				},
				splitLine: {
					lineStyle: {
					color: {
						HtmlColor: XSplitLineColor
					}
					},
					show: XSplitLineShow
					},
					"axisLine": {
						"lineStyle": {
							"color": Xcolor
						}
					},
				},
				series:seriesArr,
				legend: {
					"type": 'scroll',
					"orient":lengendScroll,
					data:LegendData,
					itemHeight: ItemHeight,
					itemWidth: ItemWidth,
					textStyle: {
						fontWeight: FontWeight,
						fontFamily: FontFamily,
						color: LengenColor,
						fontSize: lengenFontSize
					},
					show: LengendShow,
					left:lengenL,
					right: LengenR,
					top: lengenT,
					bottom: LengenB,
					padding: [LPtb,LPlr]
				},
	
				yAxis: {
					name: Yname,
					data:yAxisData,
					axisLabel: {
						formatter: "{value} " + Unit,
						color:Ycolor,
						fontFamily: YFontFamily,
						fontWeight: 400,
						fontSize: YfontSize,
						textStyle: {
							fontWeight: 400
						}
					},
					label: {
						textStyle: {
							color: Ycolor
						}
					},
					min: YAxisMin,
					max: YAxisMax,
					nameTextStyle: {
						fontSize: YfontSize,
						color:Ycolor
					},
					axisLine: {
						lineStyle: {
							color: Ycolor
						}
					},
					splitLine: {
						show: ShowSeparator,
						color:SplitLineColor
					}
				},
				backgroundColor: backgroundColor,
				title: {
					textStyle: {
						color: TitleFontColor,
						fontSize: TitleFontSize,
						fontFamily:TitleFamily,
						fontWeight:TitleFontWeight
					},
					 padding:[12,10],
					x: TitlePosition.toLowerCase(),
					show: TitleIsChecked,
					text: Title
				},
				
				grid: {
					left: gridLeft,
					right: gridRight,
					bottom: gridBottom,
					top: gridTop
				}
			}
		,true);
		allchartlist3.push([Chart1, PieChartData[i].name])
	}


}
