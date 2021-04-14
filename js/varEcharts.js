/*
 * @Description: 这是图表 表格选择（组件）
 * @Date: 2021-03-10 14:52:54
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-02 14:25:57
 */
//折线图改变
function LineEchartsFun2(BarChartData){
    let data = []
    data.push(BarChartData)
    parent.LinechartEcharts(data,BarChartData.name)
}
//柱形图改变
function BarEchartsFun2(BarChartData){
    let data = []
    data.push(BarChartData)
    parent.BarchartEcharts(data,BarChartData.name)
}
//仪表盘
function DashEchartsFun2(BarChartData){
    let data = []
    data.push(BarChartData)
    parent.DashchartEcharts(data,BarChartData.name)
}
//饼图
function PieEchartsFun2(BarChartData){
    let data = []
    data.push(BarChartData)
    parent.PiechartEcharts(data,BarChartData.name)
}

//变量配置
function varEchartsFun(data,type){
    BarChartData = data
    let defaultVar
    //默认数据
    var defaultXData =  ["设计缺陷","操作失误", "部件品质"]
    var defaultVarArr =  [ {
        "CurrentAxis": {
          "AxisType": "Y",
          "Value": 0
        },
        "Smooth": false,
        "DataType": "Line",
        "Show": true,
        "Unit": null,
        "Color": {
          "HtmlColor": "#ffa3a3ff"
        },
        "VariableName": "选择",
        "DimensionName": "设计缺陷",
        "moreAxis":'y轴1',
        "moreAxisArr":['y轴1']
      },
      {
        "CurrentAxis": {
          "AxisType": "Y",
          "Value": 0
        },
        "Smooth": false,
        "DataType": "Line",
        "Show": true,
        "Unit": null,
        "Color": {
          "HtmlColor": "#ffe08cff"
        },
        "VariableName": "选择",
        "DimensionName": "操作失误",
        "moreAxis":'y轴1',
        "moreAxisArr":['y轴1']
      },
      {
        "CurrentAxis": {
          "AxisType": "Y",
          "Value": 0
        },
        "Smooth": false,
        "DataType": "Line",
        "Show": true,
        "Unit": null,
        "Color": {
          "HtmlColor": "#55baf9ff"
        },
        "VariableName": "选择",
        "DimensionName": "部件品质",
        "moreAxis":'y轴1',
        "moreAxisArr":['y轴1']
      }]
    var defaultYData =  [{
          "name": "设计缺陷",
          "YData": [
            "599",
            "520",
            "181"
          ]
        },{
          "name": "操作失误",
          "YData": [
            "597",
            "357",
            "111"
          ]
        },{
          "name": "部件品质",
          "YData": [
            "292",
            "514",
            "489"
          ]
        }]
    var DashdefaultVar = [{  //仪表盘默认数据
        "NO":1,
        "wdName":'完成率',
        "selsectVar":'选择',
        "VariableName": "选择",
        "describe":'完成率',
        "DashDecimal":0,
        "unit":'%',
        "color":''
       }]
        initTableData()
        let defaultVarData = cloneDate()
      
   //初始图表json数据
   function initTableData(){
       if(type != 'dash'){   
                defaultVar = []
               for(let i=0;i<BarChartData.option.Variables.length;i++){
                let value
                if(type == 'pie' || type == 'bar'){
                   value = {
                        "NO":i+1,
                        "lableName":BarChartData.option.Variables[i].DimensionName,
                        "selsectVar":BarChartData.option.Variables[i].VariableName,
                        "VariableName":'选择',
                        "describe":BarChartData.option.Variables[i].describe==undefined?'湿度':BarChartData.option.Variables[i].describe,
                        "decimal":BarChartData.option.Variables[i].d==undefined?0:BarChartData.option.Variables[i].d,
                        "color":BarChartData.option.Variables[i].Color.HtmlColor
                   }
                }else if(type == 'line'){
                    value = {  //折线图默认数据
                        "NO":i+1,
                        "lableName":BarChartData.option.Variables[i].DimensionName,
                        "selsectVar":BarChartData.option.Variables[i].VariableName,
                        "VariableName":'选择',
                        "describe":BarChartData.option.Variables[i].describe==undefined?'湿度':BarChartData.option.Variables[i].describe,
                        "decimal":BarChartData.option.Variables[i].d==undefined?0:BarChartData.option.Variables[i].d,
                        "moreAxis":BarChartData.option.Variables[i].moreAxis == undefined?'y轴1':BarChartData.option.Variables[i].moreAxis == undefined,
                        "moreAxisArr":BarChartData.option.Variables[i].moreAxisArr,
                        "color":BarChartData.option.Variables[i].Color.HtmlColor
                       }
                }
                defaultVar.push(value)
               }
               $('#varTitle').html(`纵轴/度量(${BarChartData.option.Variables.length}/10)`)
           }else{
               DashdefaultVar = []
               let value = {  //仪表盘默认数据
                "NO":1,
                "wdName":BarChartData.option.Variable.DimensionName==undefined?'湿度':BarChartData.option.Variable.DimensionName,
                "selsectVar":'选择',
                "VariableName": "选择",
                "describe":BarChartData.option.Variable.describe==undefined?'湿度':BarChartData.option.Variable.describe,
                "DashDecimal":BarChartData.option.Variable.ValueDigit==undefined?0:BarChartData.option.Variable.ValueDigit,
                "unit":BarChartData.option.Variable.Unit==undefined?'%':BarChartData.option.Variable.Unit,
                "color":BarChartData.option.Variable.Color.HtmlColor
               }
               DashdefaultVar.push(value)
           }
   }

    var colsData   //layui 表头数据
    if(echartsType == 'line' ||echartsType == 'pie' || echartsType == 'bar' || echartsType == 'lineBar'){
        let numText
        if(echartsType == 'line'){
            numText = 55
        }else{
            numText = 70
        }
        colsData= [[ //表头
            {field: 'NO', title: '序号', width: numText,size:12,color:'red'}
            ,{field: 'VariableName', title: '变量',width: numText,} //templet: '#titleTpl'
           ,{field: 'lableName', title: '名称',edit:'text',width: numText,templet: '#lableName'}
           ,{field: 'describe', title: '描述',width: numText,edit:'text'}
           ,{field: 'decimal', title: '小数',width: numText,edit:'text'}
           ,{field: 'color', title: '颜色',templet: '#titleColor'} 
         ]]
         if(echartsType == 'line'){
            let seleteAxis = {field: 'moreAxis', title: '对比轴', Width: 60,templet:'#selectAxis'}
            colsData[0].splice(4,0,seleteAxis)
         }
    
    }else if(echartsType == 'dashboard'){
        defaultVar = DashdefaultVar
        colsData= [[ //表头
            {field: 'NO', title: '序号',Width: 55}
            ,{field: 'VariableName', title: '变量', Width: 55,} //templet: '#titleTpl'
           ,{field: 'wdName', title: '名称',Width: 55,edit:'text',templet: '#lableName'}
           ,{field: 'describe', title: '描述', Width: 55,edit:'text'}
           ,{field: 'DashDecimal', title: '小数', Width: 55,edit:'text'}
           ,{field: 'unit', title: '单位',Width: 55,edit:'text'}
           ,{field: 'color', title: '颜色',templet: '#titleColor'} 
         ]]
    }

    //克隆图表数据
    function cloneDate(){  //删除表格数据为空时，默认展示初始数据
        if(echartsType != 'dashboard'){
            for(let i=0;i<defaultYData.length;i++){
                if(echartsType == 'bar'){
                    defaultYData[i].DataType = 'Bar'
                    defaultVarArr[i].DataType  = 'Bar'
                }else if(echartsType == 'line'){
                    defaultYData[i].DataType = 'Line'
                    defaultVarArr[i].DataType = 'Line'
                }
            }
            let YDataCollection = defaultYData
            let Variables = defaultVarArr
            let XData = defaultXData
            let value ={
                "YDataCollection":YDataCollection,
                "Variables":Variables,
                "XData":XData
            }
            let pieDataArr = JSON.parse(JSON.stringify(defaultVar))
            value.data = pieDataArr
            return value
        }
    }
   //初始化颜色
    var defaultColor = BarChartData.option.color

    //渲染表格
    tableFun()
    function tableFun(){
        table = layui.table //表格
          table.render({
            elem: '#demo'
            ,height: 152
            ,data: defaultVar //数据接口
            ,cols: colsData,
            done: function (res, curr, count) {
                colorpickerFun(res.data,defaultVar)
            }
          });
    }
    //修改默认数据 defaultVar数组
    function changeData(data,echartsType,val){
        for(let i=0;i<defaultVar.length;i++){
            if(defaultVar[i].NO == data.NO){
                defaultVar[i] = data
                if(echartsType == 'line'){
                    val = Number(val) + 1
                    defaultVar[i].moreAxis = `Y轴${val}`
                    BarChartData.option.Variables[i].moreAxis = `Y轴${val}`
                }
            }
        }
    }
    //修改表格 图例名称 变量配置 维度名称
    function VariablesFun(data,value,field,text){
        let VariablesArr = BarChartData.option.Variables
        let VariableArr = BarChartData.option.Variable
        let YDataCollectionArr = BarChartData.option.YDataCollection
        let XDataArr = BarChartData.option.XData
        if(field == 'lableName'){
            VariablesArr[(data.NO-1)].DimensionName = value
            YDataCollectionArr[(data.NO-1)].name = value
            if(echartsType == 'pie'){
                XDataArr[(data.NO-1)] = value
            }
        }else if(field == 'selsectVar'){
            if(echartsType == 'dashboard'){
                BarChartData.option.VariableName.Color = value
                if(type == 'line'){
                    LineEchartsFun2(BarChartData)
                }else if(type == 'bar'){
                    BarEchartsFun2(BarChartData)
                }else if(type == 'dash'){
                    DashEchartsFun2(BarChartData)
                }else if(type == 'pie'){
                    PieEchartsFun2(BarChartData)
                }
            }else{
                VariablesArr[(data.NO-1)].VariableName = value
            }
        }else if(field == 'wdName'){
            VariableArr.DimensionName = value
        }
        if(type == 'line'){
            LineEchartsFun2(BarChartData)
        }else if(type == 'bar'){
            BarEchartsFun2(BarChartData)
        }else if(type == 'dash'){
            DashEchartsFun2(BarChartData)
        }else if(type == 'pie'){
            PieEchartsFun2(BarChartData)
        }
    }
    //新增 重新渲染折线图 表格类型选择
    YAxisesFun()
    function YAxisesFun(){
        if(type == 'line'){
            var YAxisesArr = BarChartData.option.YAxises
            var yArr = []
            for(let i=0;i<YAxisesArr.length;i++){
                if(i==0){
                    YAxisesArr[i].yIndex = 1
                }
                let value = `Y轴${YAxisesArr[i].yIndex}`
                yArr.push(value)
            }
            for(let j=0;j<defaultVar.length;j++){
                defaultVar[j].moreAxisArr = yArr
            }
        }
        tableFun()
    }
    //删除 重新渲染折线图 表格类型选择
    function DeleteYAxisesFun(index,yIndex){
        var YAxisesArr = BarChartData.option.YAxises
        var yArr = []
        for(let i=0;i<YAxisesArr.length;i++){
            let value = `Y轴${YAxisesArr[i].yIndex}`
            yArr.push(value)
        }
        let VarArr = BarChartData.option.Variables
        for(let j=0;j<defaultVar.length;j++){
            var index = yArr.indexOf(defaultVar[j].moreAxis)
            if(index == -1){
                defaultVar[j].moreAxis = 'Y轴1'
                VarArr[defaultVar[j].NO - 1].CurrentAxis.Value = '0'
            }else{
                let numV = VarArr[defaultVar[j].NO - 1].CurrentAxis.Value
                if(numV >= yIndex){
                    VarArr[defaultVar[j].NO - 1].CurrentAxis.Value = Number(numV)-1
                }
            }
            if(type == 'line'){
                LineEchartsFun2(BarChartData)
            }else if(type == 'bar'){
                BarEchartsFun2(BarChartData)
            }else if(type == 'dash'){
                DashEchartsFun2(BarChartData)
            }else if(type == 'pie'){
                PieEchartsFun2(BarChartData)
            }
        }
    }
    //渲染表格颜色选择器
    function colorpickerFun(data,defaultData){
        for(let i=0;i<data.length;i++){
            var colorIndex = (defaultData[i].NO-1) % 6
            var color
            if(data[i].color == ''){
                color = defaultColor[colorIndex]
            }else{
                color = data[i].color
            }
            if(echartsType == 'dashboard'){
                if(data[i].color == ''){
                    color = '#000000'
                }else{
                    color = data[i].color
                }
            }
            colorpicker.render({
                elem: `#color${data[i].NO}`
                ,color: `${color}` //hex
                ,alpha: true //开启透明度
                ,format: 'rgb'
                ,predefine: true 
                ,done: function(color){
                    var aa =  hexify(color)
                    data[i].color = color
                    if(echartsType != 'dashboard'){
                        let VariablesArr = BarChartData.option.Variables
                        VariablesArr[(data[i].NO-1)].Color.HtmlColor = color
                    }else{
                        BarChartData.option.Variable.Color.HtmlColor=color
                    }
                    if(type == 'line'){
                        LineEchartsFun2(BarChartData)
                    }else if(type == 'bar'){
                        BarEchartsFun2(BarChartData)
                    }else if(type == 'dash'){
                        DashEchartsFun2(BarChartData)
                    }else if(type == 'pie'){
                        PieEchartsFun2(BarChartData)
                    }
                    changeData(data)
                }
            });
        }
    }
    /*表格列表操作*/
    table.on('tool(demo)', function(obj){
        var data = obj.data, 
        layEvent = obj.event;
        if(layEvent == 'var'){
            layui.$(this).on('input porpertychange',function(e){
                let val= layui.$(this).val()
                let name= layui.$(this).attr('name');
                data[name]=val
                VariablesFun(data,val,'selsectVar','selsectVar')
                obj.update(data);//更新行对象数据
                changeData(data)
            })
        }else if(layEvent == 'delete'){
            tableDelete(data)
        }else if(layEvent == 'type'){
            let that = layui.$(this)
            let val = layui.$(this).val()
            changeData(data,echartsType,val)
            tableType(data,that)
        }
        colorpickerFun(defaultVar,defaultVar)
    })
    //表格选择类型
    function tableType(data,that){
        let VarArr = BarChartData.option.Variables
        if(echartsType == 'line'){
            VarArr[data.NO-1].CurrentAxis.Value = that[0].value
        }
        if(type == 'line'){
            LineEchartsFun2(BarChartData)
        }else if(type == 'bar'){
            BarEchartsFun2(BarChartData)
        }else if(type == 'dash'){
            DashEchartsFun2(BarChartData)
        }else if(type == 'pie'){
            PieEchartsFun2(BarChartData)
        }
    }
    //表格删除数据
    function tableDelete(data){
        for(let i=0;i<defaultVar.length;i++){
             if(defaultVar[i].NO == data.NO){
                defaultVar.splice(i,1)
                i--
             }else{
                defaultVar[i].NO = i+1
             }
        }
            BarChartData.option.Variables.splice(data.NO-1,1)
            var YData = BarChartData.option.Variables
            var YDataArr = YDataFun(YData)
            BarChartData.option.YDataCollection = YDataArr
            if(echartsType == 'bar'){
                if(BarChartData.option.IsBarType){
                    BarChartData.option.XData.splice(data.NO-1,1)
                }else{
                    BarChartData.option.AxisChartYAxis.yAxisData.splice(data.NO-1,1)
                }
            }else{
                BarChartData.option.XData.splice(data.NO-1,1)
            }
            if(defaultVar.length == 0){
                defaultVar =  JSON.parse(JSON.stringify(defaultVarData.data))
                BarChartData.option.XData = JSON.parse(JSON.stringify(defaultVarData.XData))
                if(BarChartData.option.YDataCollection){
                    BarChartData.option.YDataCollection = JSON.parse(JSON.stringify(defaultVarData.YDataCollection))
                }
                BarChartData.option.Variables = JSON.parse(JSON.stringify(defaultVarData.Variables))
            }
            if(type == 'line'){
                LineEchartsFun2(BarChartData)
            }
            else if(type == 'bar'){
                console.log('BarChartData',BarChartData)
                BarEchartsFun2(BarChartData)
            }else if(type == 'dash'){
                DashEchartsFun2(BarChartData)
            }else if(type == 'pie'){
                PieEchartsFun2(BarChartData)
            }
            tableFun()
    }
    //保留小数位
    function decimalFun(obj,data,value,field,text){
        var num = parseInt(value)
        if(String(num) == 'NaN'){
          num = ''
        }
        data[text] = num
        obj.update(data);
        table.reload('demo')
        if(field == 'decimal'){
            let YDataCollection = BarChartData.option.YDataCollection[data.NO-1].YData
            BarChartData.option.Variables[data.NO-1].d = num
            for(let i=0;i<YDataCollection.length;i++){
                YDataCollection[i] = Number(YDataCollection[i]).toFixed(num)
            }
        }else{
            BarChartData.option.Variable.ValueDigit=num
        }
        if(type == 'line'){
            LineEchartsFun2(BarChartData)
        }else if(type == 'bar'){
            BarEchartsFun2(BarChartData)
        }else if(type == 'dash'){
            DashEchartsFun2(BarChartData)
        }else if(type == 'pie'){
            PieEchartsFun2(BarChartData)
        }
    }
    //描述
    function describeFun(obj,data,value,field,text){
        if(echartsType != 'dashboard'){
            data[text] = value
            obj.update(data);
            table.reload('demo')
            BarChartData.option.Variables[data.NO-1].describe = value
        }else{
            BarChartData.option.Variable.describe=value
        }
    }
    // 监听单元格编辑
    table.on('edit(demo)', function(obj){
        var value = obj.value //得到修改后的值
        data = obj.data //得到所在行所有键值
        field = obj.field; //得到字段
        if(field == 'decimal'){
            decimalFun(obj,data,value,field,'decimal')
        }else if(field == 'DashDecimal'){
            decimalFun(obj,data,value,field,'DashDecimal')
        }
        if(field == 'lableName'){
            VariablesFun(data,value,field,'lableName')
        }else if(field == 'wdName'){
            VariablesFun(data,value,field,'wdName')
        }else if(field == 'unit'){
            BarChartData.option.Variable.Unit = value
            if(type == 'line'){
                LineEchartsFun2(BarChartData)
            }else if(type == 'bar'){
                BarEchartsFun2(BarChartData)
            }else if(type == 'dash'){
                DashEchartsFun2(BarChartData)
            }else if(type == 'pie'){
                PieEchartsFun2(BarChartData)
            }
        }else if(field == 'describe'){
            describeFun(obj,data,value,field,'describe')
        }
        changeData(data)
    });
    //监听排序事件 
    table.on('sort(demo)', function(obj){
       colorpickerFun(defaultVar,defaultVar)
    });
    //三位数的随机数
    function randomFun(){
        var num = '';
        for(var i=0;i<3;i++)
        {
            num+=Math.floor(Math.random()*10);
        }
        return Number(num)
    }
    //折线图、折线柱状图数据
    function line(index,colorIndex){
        return{
            "CurrentAxis": {
              "AxisType": "Y",
              "Value": 0
            },
            "Smooth": false,
            "DataType": "Line",
            "Show": true,
            "Unit": null,
            "Color": {
              "HtmlColor": defaultColor[colorIndex]
            },
            "VariableName": "选择",
            "DimensionName": `图例${index}`,
            "moreAxis":'y轴1',
            "moreAxisArr":['y轴1']
          }
    }
    //饼图数据
    function pie(index,colorIndex){
        return{
            "Show": true,
            "Unit": null,
            "Color": {
              "HtmlColor": defaultColor[colorIndex]
            },
            "VariableName": "选择",
            "DimensionName": `图例${index}`
          }
    }
    //柱形图数据
    function bar(index,colorIndex){
        return{
            "BarWidth": null,
            "BarMaxWidth": 25.0,
            "DataType": "Bar",
            "Show": true,
            "Unit": null,
            "Color": {
              "HtmlColor": defaultColor[colorIndex]
            },
            "VariableName": "选择",
            "DimensionName": `图例${index}`
          }
    }
    //新增或删除数据 更改YDataCollection格式
    function YDataFun(YData){
        var YDataArr = []
        for(let i=0;i<YData.length;i++){
            var num = []
            var dShow = false
            if(YData[i].d != undefined){
              dShow = true
            }
            for(let j=0;j<YData.length;j++){
                var dNum = randomFun()
                 if(dShow){
                     dNum = Number(dNum).toFixed(YData[i].d)
                 }
               num.push(dNum)
            }
            let value = {
                "name":YData[i].DimensionName,
                "YData":num
            }
            YDataArr.push(value)
        }
        $('#varTitle').html(`纵轴/度量(${defaultVar.length}/10)`)
       return YDataArr
    }
     //新增变量点
     $('.newAdd').unbind()
      $('.newAdd').on('click',function(){
          if(defaultVar.length == 10){
              return
          }
          var index = Number(defaultVar[defaultVar.length-1].NO) + 1
          var colorIndex = index % 6
          var varArr = {
            "NO":index,
            "lableName":`图例${index}`,
            "selsectVar":'选择',
            "VariableName": "选择",
            "describe":'',
            "decimal":0,
            "color":defaultColor[colorIndex]
           }
            //表格增加数据
            if(echartsType == 'line'){
                varArr.moreAxis='y轴1'
                varArr.moreAxisArr = defaultVar[0].moreAxisArr
            }
            defaultVar.push(varArr)
            if(echartsType == 'line' || echartsType == 'lineBar'){
                VariablesArr = line(index,colorIndex)
            }else if(echartsType == 'pie'){
                VariablesArr = pie(index,colorIndex)
            }else if(echartsType == 'bar'){
                VariablesArr = bar(index,colorIndex)
            }
           BarChartData.option.Variables.push(VariablesArr)  //新增图例名
           var YData = BarChartData.option.Variables
           var YDataArr = YDataFun(YData)
    
           BarChartData.option.YDataCollection = YDataArr  //新增数值
           if(echartsType == 'line' || echartsType == 'lineBar'){
                BarChartData.option.XData.push(`${moment().format('YYYY-MM-DD')}`)
           }else if(echartsType == 'pie'){
                BarChartData.option.XData.push(`图例${index}`)  //新增图例名
           }else if(echartsType == 'bar'){
               if(BarChartData.option.IsBarType){
                BarChartData.option.XData.push(`${moment().format('YYYY-MM-DD')}`)
               }else{
                BarChartData.option.AxisChartYAxis.yAxisData.push(`${moment().format('YYYY-MM-DD')}`)
               }
           }
        if(type == 'line'){
            LineEchartsFun2(BarChartData)
        }else if(type == 'bar'){
            BarEchartsFun2(BarChartData)
        }else if(type == 'dash'){
            DashEchartsFun2(BarChartData)
        }else if(type == 'pie'){
            PieEchartsFun2(BarChartData)
        }
        tableFun()
      })
         //rgba转为16进制
         function hexify(color) {
            var values = color
            .replace(/rgba?\(/, '')
            .replace(/\)/, '')
            .replace(/[\s+]/g, '')
            .split(',');
            var a = parseFloat(values[3] || 1),
            r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
            g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
            b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
            return "#" +
            ("0" + r.toString(16)).slice(-2) +
            ("0" + g.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2) + 
            ("0" + a.toString(16)).slice(-2)
        }
}