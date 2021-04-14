/*
 * @Description: 这是***页面（组件）
 * @Date: 2020-06-08 14:35:08
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-02 11:48:03
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
	animation: false,
}
var allchartlist = []

function allchartlistFun(){
	return allchartlist
}

//替换不相同属性
function PieAddOrModify(target, source) {
	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			const ele = source[key];
			var modify = false;
			if (target.hasOwnProperty(key)) {
				if (typeof(ele) != "object") {
					target[key] = ele;
					modify = true;
				}
			} else {
				target[key] = {};
			}
			if(Array.isArray(ele)){
			    target[key] = ele;
			}
			else if (typeof(ele) == "object") {
				PieAddOrModify(target[key], source[key]);
			} else if (!modify) {
				target[key] = ele;
			}
		}
	}
}
var PieChartShow = true
var PieData
var ShowOutter
// 修改扇形图
function PieChartFun(e){
	var newStr=" ";
	var start,end;
　　　　var name_len=e.name.length;    　　　　　　　　　　　　   //每个内容名称的长度
　　　　var max_name=4;    　　　　　　　　　　　　　　　　　　//每行最多显示的字数
　　　　var new_row = Math.ceil(name_len / max_name); 　　　　// 最多能显示几行，向上取整比如2.1就是3行
　　　　if(name_len>max_name){ 　　　　　　　　　　　　　　  //如果长度大于每行最多显示的字数
　　　　　　for(var i=0;i<new_row;i++){ 　　　　　　　　　　　   //循环次数就是行数
　　　　　　　　var old='';    　　　　　　　　　　　　　　　　    //每次截取的字符
　　　　　　　　start=i*max_name;    　　　　　　　　　　     //截取的起点
　　　　　　　　 end=start+max_name;    　　　　　　　　　  //截取的终点
　　　　　　　　if(i==new_row-1){    　　　　　　　　　　　　   //最后一行就不换行了
　　　　　　　　　　old=e.name.substring(start);
　　　　　　　　}else{
　　　　　　　　　　old=e.name.substring(start,end)+"\n";    
　　　　　　　　 }
　　　　　　　　　　 newStr+=old; //拼接字符串
　　　　　　  }
　　　   }else{                                          //如果小于每行最多显示的字数就返回原来的字符串
　　　　　　newStr=e.name; 
　　　  }
	return newStr
}

function PiechartEcharts(PieChartData,PieChartNameData){
	PieChartData = JSON.parse(JSON.stringify(PieChartData))
	for(let i=0;i<PieChartData.length;i++){
		let indexName = PieChartNameData.indexOf(PieChartData[i].name)
		if(indexName == -1){
			continue;
		}
		console.log('indexName',indexName,PieChartData,PieChartData[i].option,PieChartNameData)
		var data
		PieData = PieChartData[i].option
		data = PieData
		PieChartShow = false

		if(data.Label.ShowOutter == true){
			ShowOutter = true
		}else{
			ShowOutter = false
		}
		var Title = data.Title.Title
		var TitleFontColor = data.Title.Color.HtmlColor
		var TitleFontSize = data.Title.FontSize
		var TitleFontFamily = data.Title.FontFamily
		var TitleWeight = data.Title.FontWeight
		var TitlePosition = data.Title.Position
		var TitleShow = data.Title.Show
		var BackGroundColor = data.BackgroundColor.HtmlColor
		var BackGroundColor2
		var PieLabelLineShow = data.PieLabelLine.Show
		if(ShowOutter){
			BackGroundColor2 = data.BackgroundColor.HtmlColor
		}else{
			BackGroundColor2 = ''
		}
		var LabelformatterShow = false
		var Lableformatter
		var IsUseVariables2 = data.IsUseVariables2
		var Unit = data.PieConfiguration.Unit==null?'':data.PieConfiguration.Unit
		 if(data.Label.ValueShow == true){  //数值
			  Lableformatter = function(e){
				　　　　var newStr = PieChartFun(e)
				 　　　 return  e.value + ' ' + Unit
				　　}  
			  LabelformatterShow = true
		  }
		  if(data.Label.DimensionShow == true){   //维度
			  Lableformatter = function(e){
				　　var newStr = PieChartFun(e)
				   if(ShowOutter){
					   return newStr + ' ' + Unit
				   }else{
					return ''
				   }
			　　}  
			  LabelformatterShow = true
		  }
		  if(data.Label.PercentageShow == true){  //百分比
			  Lableformatter = function(e){
				　　　　 var newStr = PieChartFun(e)
				 　　　  if(ShowOutter){
					 　　　 return '' + e.percent + '%' + ' ' + Unit
						 }else{
							return  + e.percent + '% ' + Unit
						 }
				　　}  
			  LabelformatterShow = true
		  }
		  if(data.Label.ValueShow == true && data.Label.DimensionShow == true){  //数值+维度
			  Lableformatter =  function(e){
				　　var newStr = PieChartFun(e)
				   if(ShowOutter == true){
					   　return newStr +'\n' + e.value + ' ' + Unit
				   }else{
						return  e.value + ' ' + Unit
				   }
			　　}  
			  LabelformatterShow = true
		  }
		  if(data.Label.ValueShow == true && data.Label.PercentageShow == true){  //数值+百分比
			  Lableformatter = function(e){
				　　 var newStr = PieChartFun(e)
			 　　　  if(ShowOutter){
				 　　　 return  e.value + '\n'+ '' + e.percent + '%' + ' ' + Unit
					 }else{
						return  e.value + '\n' + e.percent + '%' + ' ' + Unit
					 }
			　　}  
			  LabelformatterShow = true
		  }
		   if(data.Label.DimensionShow == true && data.Label.PercentageShow == true){  //维度+百分比
			  Lableformatter = function(e){
				　　 var newStr = PieChartFun(e)
			 　　　  if(ShowOutter){
				 　　　 return newStr +'\n'+ '' +  e.percent + '%' + ' ' + Unit
					 }else{
						return   e.percent + '%' + ' ' + Unit
					 }
			　　}  
			  LabelformatterShow = true
		  }
		   if(data.Label.DimensionShow == true && data.Label.PercentageShow == true && data.Label.ValueShow == true){
			  Lableformatter = function(e){
				　　 var newStr = PieChartFun(e)
			 　　　  if(ShowOutter == true){
				 　　　 return newStr +'\n' + e.value + '\n' + '' + e.percent + '%' + ' ' + Unit
					 }else{
						return e.value + '\n' + '' + e.percent + '%' + ' ' + Unit
					 }
	
			　　}  
			  LabelformatterShow = true
		  }
		 if(data.Label.DimensionShow == false && data.Label.PercentageShow == false && data.Label.ValueShow == false){
			  Lableformatter = ''
			  LabelformatterShow = true
		  }
		  var LabelFontSize = data.Label.FontSize
		  var LabelFontFamily = data.Label.FontFamily
		  var TooltipformatterShow = false
		  var Tooltipformatter
			if (data.PieTooltip.ValueShow == true) {   //数值
				Tooltipformatter = '{c}'
				TooltipformatterShow = true
			}
			if (data.PieTooltip.DimensionShow == true) {  //维度
				if(ShowOutter== true){
					Tooltipformatter = '{b}'
				}else{
					Tooltipformatter = '{b}'
					Tooltipformatter2 = ''
				}
				TooltipformatterShow = true
			}
			if (data.PieTooltip.PercentageShow == true) {  //百分比
				Tooltipformatter = '{d}%'
				TooltipformatterShow = true
			}
			if (data.PieTooltip.ValueShow == true && data.PieTooltip.DimensionShow == true) {  //数值+维度
				if(ShowOutter== true){
					Tooltipformatter = '{b}: {c}'
				}else{
					Tooltipformatter = '{b}: {c}'
					Tooltipformatter2 = '{c}'
				}
				TooltipformatterShow = true
			}
			if (data.PieTooltip.ValueShow == true && data.PieTooltip.PercentageShow == true) {  //数值+百分比
				Tooltipformatter = '{c} \n ({d}%)'
				TooltipformatterShow = true
			}
			if (data.PieTooltip.DimensionShow == true && data.PieTooltip.PercentageShow == true) {  //维度+ 百分比
				if(ShowOutter== true){
					Tooltipformatter = '{b}: ({d}%)'
				}else{
					Tooltipformatter = '{b}: ({d}%)'
					Tooltipformatter2 = '({d}%)'
				}
				TooltipformatterShow = true
			}
			if (data.PieTooltip.DimensionShow == true && data.PieTooltip.PercentageShow == true && data.PieTooltip.ValueShow == true) {
				if(ShowOutter== true){
					Tooltipformatter = '{b}: {c} ({d}%)'
				}else{
					Tooltipformatter = '{b}: {c} ({d}%)'
					Tooltipformatter2 = '{c} ({d}%)'
				}
				TooltipformatterShow = true
			}
		
			if(data.Label.DimensionShow == false){  //在外显示没维度隐藏线
				if(ShowOutter == false){
					PieLabelLineShow = false
				}
			}
			if(data.Label.DimensionShow == false && data.Label.PercentageShow == false && data.Label.ValueShow == false){ //在内显示没维度隐藏线
				if(ShowOutter == true){
					PieLabelLineShow = false
				}
			}
			var ItemHeight = data.Legend.ItemHeight
			var ItemWidth = data.Legend.ItemWidth
			var FontWeight = data.Legend.FontWeight
			var FontFamily = data.Legend.FontFamily
			var LengendShow = data.Legend.Show
			var LengenColor = data.Legend.Color.HtmlColor
			var lengenPosition = data.Legend.Position
			var lengenFontSize = data.Legend.FontSize
			var LengenB
			var lengenT
			var lengenL
			var LengenR
			var LPtb
			var LPlr
			var LegendData = []
			var legendColor = []
			var VariablesData2
		    var lengendScroll
			if(IsUseVariables2 == true){
				VariablesData2 = data.Variables2
			}else{
				VariablesData2 = data.Variables
			}
			for(var j=0;j<VariablesData2.length;j++){
				LegendData.push(VariablesData2[j].DimensionName)
				legendColor.push(VariablesData2[j].Color.HtmlColor)
				// .slice(0,7)
			}
			if(lengenPosition == 'LeftCenter'){
				LengenB = null
				lengenT = "center"
				lengenL = "left"
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
			if(lengenPosition == 'TopCenter'){
				LengenB = null
				lengenT = "top"
				lengenL = 'center'
				LengenR = null
				LPtb =30 
				LPlr = 10
				lengendScroll = 'horizontal'
			}
			if(lengenPosition == 'BottomCenter'){
				LengenB = "bottom"
				lengenT = null
				lengenL = 'center'
				LengenR = null
				LPtb = 10
				LPlr = 10
				lengendScroll = 'horizontal'
			}
		  var PieLabelLine1 = data.PieLabelLine.Length
		  var PieLabelLine2 = data.PieLabelLine.Length2
		  var InRadius = data.PieConfiguration.InRadius
		  var OutRadius = data.PieConfiguration.OutRadius
		  var OutRadius2 = parseInt(data.PieConfiguration.OutRadius) + 5 + '%'
		  var VariablesData 
		  if(IsUseVariables2 == true ){
			  VariablesData = data.Variables2
		  }else{
			  VariablesData = data.Variables
		  }
		  var seriesArr = []
		  var seriesArr2 = []
		  var YDataCollection = data.YDataCollection
		  if (YDataCollection) {	
			  for(let v=0;v<VariablesData.length;v++){
				  for(let v1=0;v1<YDataCollection.length;v1++){
					  console.log('aass',VariablesData[v].DimensionName,YDataCollection[v1].name)
					  if(VariablesData[v].DimensionName == YDataCollection[v1].name){
						  if (VariablesData[v].DimensionName != '') {
							  var value = {
								  "value": YDataCollection[v1].YData[0],
								  "name": VariablesData[v].DimensionName,
								  "label": {
									  "normal": {
										  "fontSize": LabelFontSize,
										  "fontFamily":LabelFontFamily,
										  "formatter": Lableformatter
									  }
								  }
							  }
							  seriesArr.push(value)
							  var value2 = {
								  value:YDataCollection[v1].YData[0],
								  name:VariablesData[v].DimensionName,
								  label:{
									  "normal":{
										  "show": data.Label.DimensionShow,
										  "textStyle":{
											"fontSize": LabelFontSize,
											"fontFamily":LabelFontFamily,
											  color:legendColor[v1]
										  }
									  }
								  },
								  labelLine:{
									"normal":{
										width:1,
										lineStyle:{
											width:1,
											color:legendColor[v1]
										}
									}
								}
							  }
							  seriesArr2.push(value2)
						  }
					  }
				  }
			  }  
		  }else {
			  for(let v=0;v<VariablesData.length;v++){
				  var value = {
					  "value": null,
					  "name":VariablesData[v].DimensionName,
					  "label": {
						  "normal": {
							  "fontSize": LabelFontSize,
							  "fontFamily":LabelFontFamily,
							  "formatter": Lableformatter
						  }
					  }
				  }
				  seriesArr.push(value)
				  var value2 = {
					value:null,
					name:VariablesData[v].DimensionName,
					label:{
						"normal":{
							"textStyle":{
								"fontSize": LabelFontSize,
								"fontFamily":LabelFontFamily,
								color:legendColor[v]
							}
						}
					},
					labelLine:{
					  "normal":{
						  width:1,
						  lineStyle:{
							  width:1,
							  color:legendColor[v]
						  }
					  }
				  }
				}
				seriesArr2.push(value2)
			  }
		  }
		  var isInner
		  if(ShowOutter == true){
			 isInner= {
				 normal:''
			 }
		  } else{
			 isInner = {            //饼图图形上的文本标签
				 normal:{
					 show:true,
					 color:'#000',
					 position:'inner', //标签的位置
					 textStyle : {
						 fontWeight : 500 ,
						 fontSize : 16    //文字的字体大小
					 },
					 formatter:Tooltipformatter2
				 }
			 }
		  }
		  console.log('dom==>',document.getElementById(`${PieChartData[i].name}`),PieChartData[i].name)
		if(document.getElementById(`${PieChartData[i].name}`)){
			Chart1 = echarts.init(document.getElementById(`${PieChartData[i].name}`));
			Chart2 = echarts.init(document.getElementById(`${PieChartData[i].name}pie`));
		}
		Chart1.clear()
		Chart1.resize()
		const Piename = PieChartData[i].name
		Chart1.setOption(
			{
				animation:false,
				"color": legendColor,
				"name":Piename,
				"backgroundColor": BackGroundColor2,
				"legend": {
					"type": 'scroll',
					"orient":lengendScroll,
					"data": LegendData,
					"itemHeight":ItemHeight,
					"itemWidth":ItemWidth,
					formatter:function(params) {
						let tip1 = "";
						let tip = "";
						let le = params.length  //图例文本的长度
						if(le > 6){   //几个字换行大于几就可以了
							let l = Math.ceil(le/6)  //有些不能整除，会有余数，向上取整
							for(let i = 1;i <= l;i++){ //循环
								if(i < l){ //最后一段字符不能有\n
									tip1 += params.slice(i*6-6,i*6)+'\n'; //字符串拼接
								}else if(i === l){  //最后一段字符不一定够6个
									tip = tip1 + params.slice((l-1)*6,le) //最后的拼接在最后
								}
							}
							return tip;
						}else{
							tip = params  //前面定义了tip为空，这里要重新赋值，不然会替换为空
							return tip;
						}
					},
					"textStyle": {
						"fontWeight": FontWeight,
						"fontFamily": FontFamily,
						"color": LengenColor,
						"fontSize": lengenFontSize
					},
					"show": LengendShow,
					"left": lengenL,
					"right": LengenR,
					"top": lengenT,
					"bottom": LengenB,
					"padding": [LPtb,LPlr],
					
				},
				"series": {
				  "type": "pie",
				  "radius": [InRadius,OutRadius],
				  "center": ["50%","50%"],
				  "itemStyle": {
					"normal": {
					  "shadowBlur": 18,
					  "shadowColor": "rgba(127,128,128,0.2)",
					  "shadowOffsetX": 0,
					  "shadowOffsetY": 4
					}
				  },
				  "selectedMode": "single",
				 
				  "data":seriesArr,
				  label:isInner,
				  "labelLine": {
					"show": PieLabelLineShow,
					"length": PieLabelLine1,
					"length2": PieLabelLine2
				  },
				},
			   
				"tooltip": {
				  "formatter": Tooltipformatter,
				  "show":TooltipformatterShow
				},
				"title": {
				  "textStyle": {
					"color": TitleFontColor,
					"fontSize": TitleFontSize,
					"fontFamily":TitleFontFamily,
					"fontWeight":TitleWeight,
				  },
				  "padding":[12,10],
				  "x": TitlePosition.toLowerCase(),
				  "show": TitleShow,
				  "text": Title
				}
			  }

		,true);

		

		allchartlist.push([Chart1, PieChartData[i].name])

		Chart2.clear()
		Chart2.resize()
		if(ShowOutter == false){
			Chart2.setOption({
				"backgroundColor": BackGroundColor,
				legend:{
					"data": LegendData,
					show:false
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						"radius": [InRadius,OutRadius2],
						"center": ["50%","50%"],
						selectedMode: 'single',
						color:['transparent'],
						seriesLayoutBy: 'row',
						"labelLine": {
							"length": 50,
						},
						data: seriesArr2,
						"labelLine": {
							"show": PieLabelLineShow,
							"length": PieLabelLine1,
							"length2": PieLabelLine2
						  },
					}
				]
			},true)
			allchartlist.push([Chart2, PieChartData[i].name+'pie'])
			const piecs =Chart1
			
			Chart1.on('legendselectchanged', function (obj) {
				var pieOption = piecs.getOption()
				var listName = pieOption.name + 'pie'
				for(let f1=0;f1<allchartlist.length;f1++){
					if(listName == allchartlist[f1][1]){
						var option2 = allchartlist[f1][0].getOption()
						option2.legend[0].selected = obj.selected
						allchartlist[f1][0].setOption(option2,true)
					}
				}
			})
		}
	}
}


