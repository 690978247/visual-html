/*
 * @Description: 这是图表 默认JSON和初始化图表方法（组件）
 * @Date: 2021-03-23 11:10:53
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-02 13:23:45
 */
//饼图
function PieChartData(name){
    return {
        "name": name,
        "variable": [
            {
                "Show": true,
                "Unit": null,
                "Color": {
                    "HtmlColor": "#12a8fc"
                },
                "VariableName": "选择",
                "DimensionName": "设计缺陷"
            },
            {
                "Show": true,
                "Unit": null,
                "Color": {
                    "HtmlColor": "#8290e0"
                },
                "VariableName": "选择",
                "DimensionName": "操作失误"
            },
            {
                "Show": true,
                "Unit": null,
                "Color": {
                    "HtmlColor": "#ffb871"
                },
                "VariableName": "选择",
                "DimensionName": "部件品质"
            }
        ],
        "option": {
            "color":['#ffa3a3','#ffe08c','#55baf9','#91E2FF','#81F4DC','#C4FFEE'],
            "IsUseVariables2": false,
            "Variables": [
              {
                "Show": true,
                "Unit": null,
                "Color": {
                  "HtmlColor": "#ffa3a3"
                },
                "VariableName": "选择",
                "DimensionName": "设计缺陷"
              },
              {
                "Show": true,
                "Unit": null,
                "Color": {
                  "HtmlColor": "#ffe08c"
                },
                "VariableName": "选择",
                "DimensionName": "操作失误"
              },
              {
                "Show": true,
                "Unit": null,
                "Color": {
                  "HtmlColor": "#55baf9"
                },
                "VariableName": "选择",
                "DimensionName": "部件品质"
              }
            ],
            "Variables2": [
              {
                "Show": true,
                "Unit": null,
                "Color": {
                  "HtmlColor": "#ffa3a3"
                },
                "VariableName": "选择",
                "DimensionName": "配置图例"
              }
            ],
            "PieConfiguration": {
              "InRadius": "30%",
              "OutRadius": "55%",
              "Unit": null
            },
            "Title": {
              "Color": {
                "HtmlColor": "#3333ff33"
              },
              "FontSize": 14,
              "Position": "Center",
              "FontFamily":"思源黑体",
              "FontWeight":400,
              "Show": true,
              "Title": "饼图"
            },
            "PieLabelLine": {
              "Length": 10.0,
              "Length2": 20.0,
              "Show": true
            },
            "Legend": {
              "Type": "plain",
              "ShowArray": null,
              "ItemHeight": 14,
              "ItemWidth": 14,
              "FontWeight": 400.0,
              "FontFamily": "思源黑体",
              "Show": true,
              "Position": "RightCenter",
              "Color": {
                "HtmlColor": "#333333"
              },
              "FontSize": 14
            },
            "Label": {
              "ShowOutter": false,
              "ValueShow": true,
              "FontFamily":"思源黑体",
              "DimensionShow": true,
              "PercentageShow": false,
              "FontSize": 14
            },
            "PieTooltip": {
              "ValueShow": true,
              "DimensionShow": true,
              "PercentageShow": false
            },
            "BackgroundColor": {
              "HtmlColor": "#ffffffff"
            },
            "name": "PieChart3",
            "YDataCollection": [
              {
                "name": "设计缺陷",
                "YData": [
                  "599",
                  "520",
                  "181"
                ]
              },
              {
                "name": "操作失误",
                "YData": [
                  "597",
                  "357",
                  "111"
                ]
              },
              {
                "name": "部件品质",
                "YData": [
                  "292",
                  "514",
                  "489"
                ]
              }
            ],
            "XData": [
              "设计缺陷",
              "操作失误",
              "部件品质"
            ],
            "Datas": {
              "IsUseVariables2": false,
              "Variables": [
                {
                  "Show": true,
                  "Unit": null,
                  "Color": {
                    "HtmlColor": "#12a8fcff"
                  },
                  "VariableName": "选择",
                  "DimensionName": "设计缺陷"
                },
                {
                  "Show": true,
                  "Unit": null,
                  "Color": {
                    "HtmlColor": "#8290e0ff"
                  },
                  "VariableName": "选择",
                  "DimensionName": "操作失误"
                },
                {
                  "Show": true,
                  "Unit": null,
                  "Color": {
                    "HtmlColor": "#ffb871ff"
                  },
                  "VariableName": "选择",
                  "DimensionName": "部件品质"
                }
              ],
              "Variables2": [
                {
                  "Show": true,
                  "Unit": null,
                  "Color": {
                    "HtmlColor": "#ffa3a3ff"
                  },
                  "VariableName": "选择",
                  "DimensionName": "配置图例"
                }
              ],
              "PieConfiguration": {
                "InRadius": "30%",
                "OutRadius": "55%",
                "Unit": null
              },
              "Title": {
                "Color": {
                  "HtmlColor": "#3333ff33"
                },
                "FontSize": 14,
                "Position": "Center",
                "Show": true,
                "Title": "饼图"
              },
              "PieLabelLine": {
                "Length": 10.0,
                "Length2": 20.0,
                "Show": true
              },
              "Legend": {
                "Type": "plain",
                "ShowArray": null,
                "ItemHeight": 14,
                "ItemWidth": 14,
                "FontWeight": 400.0,
                "FontFamily": "思源黑体",
                "Show": true,
                "Position": "RightCenter",
                "Color": {
                  "HtmlColor": "#333333ff"
                },
                "FontSize": 14
              },
              "Label": {
                "ShowOutter": false,
                "ValueShow": true,
                "DimensionShow": true,
                "PercentageShow": false,
                "FontSize": 14
              },
              "PieTooltip": {
                "ValueShow": true,
                "DimensionShow": true,
                "PercentageShow": false
              },
              "BackgroundColor": {
                "HtmlColor": "#ffffffff"
              },
              "name": "PieChart11",
              "YDataCollection": [
                {
                  "name": "设计缺陷",
                  "YData": [
                    "599",
                    "520",
                    "181"
                  ]
                },
                {
                  "name": "操作失误",
                  "YData": [
                    "597",
                    "357",
                    "111"
                  ]
                },
                {
                  "name": "部件品质",
                  "YData": [
                    "292",
                    "514",
                    "489"
                  ]
                }
              ],
              "XData": [
                "设计缺陷",
                "操作失误",
                "部件品质"
              ]
            },
            "IsTime": false
          }
    }
}
//仪表盘
function DashBoardChartData(name){
    return{
        "name": name,
        "variable": [
            {
                "Value": null,
                "Range": {
                    "Scale": 10,
                    "SplitSegments": 10,
                    "WarnScale": 20,
                    "NormalScale": 20,
                    "Max": 100.0,
                    "Min": 0.0
                },
                "Tooltip": {
                    "SeriesDetailFontSize": 14,
                    "AxisLabelFontSize": 14,
                    "SeriesDetailShow": true,
                    "AxisLabelShow": true
                },
                "Show": true,
                "Unit": "%",
                "Color": {
                    "HtmlColor": "#000000ff"
                },
                "VariableName": "a1",
                "DimensionName": "完成率"
            }
        ],
        "option": {
          "color":['#12a8fc','#8290e0','#e60012','#456812','#df8445','#46B467','#EDE536','#29F0B2','#76E015','#F7ED08'],
            "Title": {
              "Color": {
                "HtmlColor": "#333333ff"
              },
              "FontSize": 14,
              "Position": "Center",
              "Show": true,
              "Title": "仪表盘"
            },
            "Label": {
              "ValueShow": true,
              "DimensionShow": true
            },
            "SelectedColorScheme": ['#12a8fc','#8290e0','#e60012','#456812','#df8445','#46B467','#EDE536','#29F0B2','#76E015','#F7ED08'],
            "Variable": {
              "Value": 50.0,
              "Range": {
                "Scale": 10,
                "SplitSegments": 10,
                "WarnScale": 20,
                "NormalScale": 20,
                "Max": 100.0,
                "Min": 0.0,
                "axisLineArr":[
                  {"Max":33.33,"Color":'#12a8fc'},
                  {"Max":66.66,"Color":'#8290e0'},
                  {"Max":100,"Color":'#e60012'}
                ]
              },
              "Tooltip": {
                "SeriesDetailFontSize": 14,
                "AxisLabelFontSize": 14,
                "SeriesDetailShow": true,
                "AxisLabelShow": true
              },
              "Show": true,
              "Unit": "%",
              "Color": {
                "HtmlColor": "#000000ff"
              },
              "VariableName": "选择",
              "DimensionName": "完成率"
            },
            "BackgroundColor": {
              "HtmlColor": "#ffffffff"
            },
            "Datas": 44.8755,
            "IsTime": false,
            "IsOriginal":true,
            "originalMax":100
          }
    }
}
//柱形图
function BarrChartData(name){
    return{
        "name": name,
        "variable": [
            {
                "BarWidth": null,
                "BarMaxWidth": 25.0,
                "DataType": "Bar",
                "Show": true,
                "Unit": "%",
                "Color": {
                    "HtmlColor": "#ffa3a3ff"
                },
                "VariableName": "a1",
                "DimensionName": "设计缺陷"
            },
            {
                "BarWidth": null,
                "BarMaxWidth": 25.0,
                "DataType": "Bar",
                "Show": true,
                "Unit": "%",
                "Color": {
                    "HtmlColor": "#ffe08cff"
                },
                "VariableName": "a2",
                "DimensionName": "操作失误"
            },
            {
                "BarWidth": null,
                "BarMaxWidth": 25.0,
                "DataType": "Bar",
                "Show": true,
                "Unit": "%",
                "Color": {
                    "HtmlColor": "#55baf9ff"
                },
                "VariableName": "a3",
                "DimensionName": "部件品质"
            }
        ],
        "option": {
          "color":['#ffa3a3','#ffe08c','#55baf9','#91E2FF','#81F4DC','#C4FFEE'],
          "Variables": [
            {
              "BarWidth": null,
              "BarMaxWidth": 25.0,
              "DataType": "Bar",
              "Show": true,
              "Unit": "%",
              "Color": {
                "HtmlColor": "#ffa3a3"
              },
              "VariableName": "E1",
              "DimensionName": "设计缺陷"
            },
            {
              "BarWidth": null,
              "BarMaxWidth": 25.0,
              "DataType": "Bar",
              "Show": true,
              "Unit": "%",
              "Color": {
                "HtmlColor": "#ffe08c"
              },
              "VariableName": "E0",
              "DimensionName": "操作失误"
            },
            {
              "BarWidth": null,
              "BarMaxWidth": 25.0,
              "DataType": "Bar",
              "Show": true,
              "Unit": "%",
              "Color": {
                "HtmlColor": "#55baf9"
              },
              "VariableName": "E2",
              "DimensionName": "部件品质"
            }
          ],
          "Title": {
            "Color": {
              "HtmlColor": "#000000"
            },
            "FontSize": 14,
            "FontFamily":'思源黑体',
            "FontWeight":400,
            "Position": "Center",
            "Show": true,
            "Title": "柱形图"
          },
          "Legend": {
            "Type": "plain",
            "ShowArray": null,
            "ItemHeight": 14,
            "ItemWidth": 14,
            "FontWeight": 400.0,
            "FontFamily": "思源黑体",
            "Show": true,
            "Position": "RightCenter",
            "Color": {
              "HtmlColor": "#333333ff"
            },
            "FontSize": 14
          },
          "Label": {
            "Color": {
              "HtmlColor": "#000000ff"
            },
            "FontSize": 14,
            "FontFamily":'思源黑体',
            "Show": true
          },
          "XAxis": {
            "Color": {
              "HtmlColor": "#333333ff"
            },
            "FontColor": {
              "HtmlColor": "#333333ff"
            },
            "AxisColor": {
              "HtmlColor": "#333333ff"
            },
            "FontWeight": "400",
            "SplitLine": false,
            "FontFamily": "思源黑体",
            "SplitLineFontWeight": null,
            "SplitLineWidth": 1.0,
            "SplitLineColor": {
              "HtmlColor": "#999999ff"
            },
            "SplitLineShow": false,
            "FontSize": 14
          },
          "AxisChartYAxis": {
            "yAxisData":null,
            "ShowSeparator": true,
            "Name": null,
            "Unit": null,
            "Min": null,
            "Max": null,
            "Adaptive": true,
            "Color": {
              "HtmlColor": "#000000ff"
            },
            "FontColor": {
              "HtmlColor": "#000000ff"
            },
            "AxisColor": {
              "HtmlColor": "#000000ff"
            },
            "FontWeight": null,
            "SplitLine": false,
            "FontFamily": "思源黑体",
            "SplitLineFontWeight": null,
            "SplitLineWidth": 1.0,
            "SplitLineColor": {
              "HtmlColor": "#999999ff"
            },
            "SplitLineShow": false,
            "FontSize": 14,
            "ShowTitle":true,
            "ShowUnit":true,
          },
          "DrawContent": {
            "LeftMargin": 55.0,
            "RightMargin": 120.0,
            "BottomMargin": 55.0,
            "TopMargin": 60.0
          },
          "AuxiliaryLines": [],
          "BackgroundColor": {
            "HtmlColor": "#ffffffff"
          },
          "name": "BarChart4",
          "YDataCollection": [
            {
              "name": "设计缺陷",
              "YData": [
                "348",
                "353",
                "400"
              ]
            },
            {
              "name": "操作失误",
              "YData": [
                "533",
                "135",
                "545"
              ]
            },
            {
              "name": "部件品质",
              "YData": [
                "365",
                "512",
                "251"
              ]
            }
          ],
          "XData": [
            "2021-03-02",
            "2021-03-02",
            "2021-03-02"
          ],
          "IsTime": true,
          "IsBarType": true
        }
    }
}

//折线图
function LineChartData(name){
    return{
        "name": name,
        "variable": [
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
                    "HtmlColor": "#ffa3a3"
                },
                "VariableName": "a1",
                "DimensionName": "湿度"
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
                    "HtmlColor": "#ffe08c"
                },
                "VariableName": "a2",
                "DimensionName": "温度"
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
                    "HtmlColor": "#55baf9"
                },
                "VariableName": "a3",
                "DimensionName": "液位"
            }
        ],
        "option": {
          "color":['#ffa3a3','#ffe08c','#55baf9','#91E2FF','#81F4DC','#C4FFEE'],
          "ShowTootip": true,
          "AxisPointer": {
            "Trigger": "axis",
            "Type": "line",
            "Color": {
              "HtmlColor": "#999999ff"
            }
          },
          "Legend": {
            "Type": "plain",
            "ShowArray": null,
            "ItemHeight": 14,
            "ItemWidth": 14,
            "FontWeight": 400.0,
            "FontFamily": "思源黑体",
            "Show": true,
            "Position": "RightCenter",
            "Color": {
              "HtmlColor": "#333333ff"
            },
            "FontSize": 14
          },
          "Title": {
            "Color": {
              "HtmlColor": "#333333ff"
            },
            "FontSize": 14,
            "FontWeight":400,
            "FontFamily":'思源黑体',
            "Position": "Center",
            "Show": true,
            "Title": "折线图"
          },
          "YAxises": [
            {
              "ShowSeparator": true,
              "Name": null,
              "Unit": null,
              "Min": null,
              "Max": null,
              "Adaptive": true,
              "Color": {
                "HtmlColor": "#333333ff"
              },
              "FontColor": {
                "HtmlColor": "#333333ff"
              },
              "AxisColor": {
                "HtmlColor": "#333333ff"
              },
              "FontWeight": null,
              "SplitLine": false,
              "FontFamily": "思源黑体",
              "SplitLineFontWeight": null,
              "SplitLineWidth": 1.0,
              "SplitLineColor": {
                "HtmlColor": "#999999ff"
              },
              "SplitLineShow": false,
              "FontSize": 14,
              "ShowTitle":true,
              "ShowUnit":true,
              "yIndex":'1'
            }
          ],
          "Label": {
            "Color": {
              "HtmlColor": "#000000ff"
            },
            "FontSize": 14,
            "Show": true,
            "FontFamily":'思源黑体'
          },
          "AuxiliaryLines": [],
          "XAxis": {
            "Color": {
              "HtmlColor": "#333333ff"
            },
            "FontColor": {
              "HtmlColor": "#333333ff"
            },
            "AxisColor": {
              "HtmlColor": "#333333ff"
            },
            "FontWeight": "400",
            "SplitLine": false,
            "FontFamily": "思源黑体",
            "SplitLineFontWeight": null,
            "SplitLineWidth": 1.0,
            "SplitLineColor": {
              "HtmlColor": "#999999ff"
            },
            "SplitLineShow": false,
            "FontSize": 14
          },
          "DrawContent": {
            "LeftMargin": 55.0,
            "RightMargin": 100.0,
            "BottomMargin": 55.0,
            "TopMargin": 60.0
          },
          "Toolbox": {
            "FeatureShow": false,
            "FeatureDataZoomYAxisIndex": "none"
          },
          "Variables": [
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
                "HtmlColor": "#ffa3a3ff"
              },
              "VariableName": "选择",
              "DimensionName": "湿度",
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
              "DimensionName": "温度",
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
              "DimensionName": "液位",
              "moreAxis":'y轴1',
              "moreAxisArr":['y轴1']
            }
          ],
          "BackgroundColor": {
            "HtmlColor": "#ffffffff"
          },
          "name": "LineChart6",
          "YDataCollection": [
            {
              "name": "湿度",
              "YData": [
                "176",
                "577",
                "567"
              ]
            },
            {
              "name": "温度",
              "YData": [
                "577",
                "131",
                "309"
              ]
            },
            {
              "name": "液位",
              "YData": [
                "430",
                "494",
                "171"
              ]
            }
          ],
          "XData": [
            "2021-03-05",
            "2021-03-05",
            "2021-03-05"
          ],
          "Datas": {
            "ShowTootip": true,
            "AxisPointer": {
              "Trigger": "axis",
              "Type": "line",
              "Color": {
                "HtmlColor": "#999999ff"
              }
            },
            "Legend": {
              "Type": "plain",
              "ShowArray": null,
              "ItemHeight": 14,
              "ItemWidth": 14,
              "FontWeight": 400.0,
              "FontFamily": "思源黑体",
              "Show": true,
              "Position": "RightCenter",
              "Color": {
                "HtmlColor": "#333333ff"
              },
              "FontSize": 14
            },
           
          },
          "IsTime": true
        }
    }
}

let BarChartData  //存储图表json
let chartType  //图表类型
let chartName //图表名字

let PieChartDataArr = []
let PieChartNameData = []

let DashChartDataArr = []
let DashChartNameData = []

let BarChartDataArr = []
let BarChartNameData = []

let LineChartDataArr = []
let LineChartNameData = []

//饼图初始数据
function PieChartDataFun(){
        PieChartDataArr = []
        PieChartNameData = []
        for(let i=0;i<Controls.Data.PieChartItemList.length;i++){
                PieChartDataArr.push(Controls.Data.PieChartItemList[i])
                PieChartNameData.push(Controls.Data.PieChartItemList[i].name)
        }
        PiechartEcharts(PieChartDataArr,PieChartNameData)
}
 //仪表盘初始数据
 function DashChartDataFun(){
    DashChartDataArr = []
    DashChartNameData = []
    for(let i=0;i<Controls.Data.DashBoardChartItemList.length;i++){
            DashChartDataArr.push(Controls.Data.DashBoardChartItemList[i])
            DashChartNameData.push(Controls.Data.DashBoardChartItemList[i].name)
    }
    DashchartEcharts(DashChartDataArr,DashChartNameData)
}

 //柱形图初始数据
 function BarChartDataFun(){
    BarChartDataArr = []
    BarChartNameData = []
    for(let i=0;i<Controls.Data.BarChartItemList.length;i++){
        BarChartDataArr.push(Controls.Data.BarChartItemList[i])
        BarChartNameData.push(Controls.Data.BarChartItemList[i].name)
    }
    BarchartEcharts(BarChartDataArr,BarChartNameData)
}

 //折线图初始数据
 function LineChartDataFun(){
      LineChartNameData = []
      LineChartDataArr = []
     for(let i=0;i<Controls.Data.LineChartItemList.length;i++){
         LineChartDataArr.push(Controls.Data.LineChartItemList[i])
         LineChartNameData.push(Controls.Data.LineChartItemList[i].name)
     }
   
    LinechartEcharts(LineChartDataArr,LineChartNameData)
}