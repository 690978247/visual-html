/* 此处放置中间画布事件 */

// 当点击画布空白元素部分时，切换到检视：画布部分
function clickWrap (e) {
  e.preventDefault()
  // console.log(e)
  if (e.target.id && e.target.id === 'canvas-wrap'&&firsright) {
    initCommon()
  }else{
    var list = [...document.getElementsByClassName('commonModule')]
    let select = [...document.querySelectorAll('.global-select input')]
    selectdata = []
    localdata.ControlList = []
    list.forEach((item) => {
      item.classList.remove("activeItem")
    })
    var childs = [...document.getElementsByClassName('edit-shape-point')]
    childs.forEach(item => {
      item.parentNode.removeChild(item)
    })
    select.forEach(item => {
      item.addEventListener('blur', hideDrop)
    })
  }
  
  firsright = true
}
// 画布禁止鼠标右键点击
function forbidMouse(e) {
  e.preventDefault()
}
// // 打开右侧菜单
function openRightMenu (e, index) {
  e.preventDefault()
  // menu.style.left = e.clientX + 'px';
  // menu.style.top = e.clientY + 'px';
  // //改变自定义菜单的宽，让它显示出来
  // menu.style.display = 'block'
  // delIndex = index
}
// //关闭右键菜单，很简单
// window.onclick = function(e){
// //用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
//   menu.style.display = 'none'
// }
// 删除画布元素
// function delElement (event) {
//   Controls.ControlList.splice(delIndex, 1)
//   initCommon()
//   childElement()
// }
// 8个圆点拖放事件
function handleMouseDownOnPoint (point, event, type, index) {
  if(selectdata.length>1){
    return
  }
  
  let nowindex1 = JSON.parse(JSON.stringify(index))
  // let dait = JSON.parse(JSON.stringify(localdata))
  let zindex = 0
  Controls.ControlList.forEach((item,nowindex)=>{
    if(nowindex1 == item.PropertyList.ZIndex){
      zindex = item.PropertyList.ZIndex
      index = nowindex
    }
  })
  let downEvent = event
  // 抛出事件让父组件设置当前元素选中状态
  downEvent.stopPropagation()
  downEvent.preventDefault() // Let's stop this event.
  const pos = {... Controls.ControlList[index].PropertyList}
  let Height = pos.Height
  let Width = pos.Width
  let Top = pos.Top
  let Left = pos.Left
  let startX = downEvent.clientX
  let startY = downEvent.clientY
  // 当前模块的最小宽度值
  let minWidth = 0
  if (pos.minWidth) {
    minWidth = pos.minWidth
  }
  // 当前模块的最小高度值
  let minHeight = 0
  if (pos.minHeight) {
    minHeight = pos.minHeight
  }
  let move = moveEvent => {

      let currX = moveEvent.clientX
      let currY = moveEvent.clientY
      let disY = currY - startY
      let disX = currX - startX
      let hasT = /t/.test(point)
      let hasB = /b/.test(point)
      let hasL = /l/.test(point)
      let hasR = /r/.test(point)
      let newHeight = + Height + (hasT ? -disY : hasB ? disY : 0)
      let newWidth = + Width + (hasL ? -disX : hasR ? disX : 0)
      pos.Width = newWidth > 0 ? newWidth : 0
      pos.Left = + Left + (hasL ? disX : 0)
      pos.Top = + Top + (hasT ? disY : 0)
      // 拖动类型为文本则不可改变高度
      if (type !== 'text') {
        pos.Height = newHeight > 0 ? newHeight : 0
      }
      if (Controls.ControlList[index].ControlType === 'line' && pos.Width < 10 ) {
        pos.Width = 10
        return
      } 
      // 如果宽度小于最小宽度就直接返回
      if (pos.Width < minWidth) return
      // 如果高度小于最小高度就直接返回
      if (pos.Height < minHeight) return
      resize(pos, index,zindex)
        var list = [...document.getElementsByClassName('commonModule')]
             
        list.forEach((item) => {
          if(zindex==item.dataset.id){
            // item.className += ' activeItem'
           }
        })
      
 
    // this.$emit('resize', pos, index)
  }
  let up = (e) => {
    e.stopPropagation()
    firsright = false
    // Controls.ControlList[index].PropertyList.ZIndex = 10
    setClass(zindex)
   
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    //重新渲染图表
    setTimeout(()=>{
      if(Controls.ControlList[index].ControlType == 'piechart' ){
        PieChartDataFun()
      }
      if(Controls.ControlList[index].ControlType == 'dashboardchart' ){
        DashChartDataFun()
      }
      if(Controls.ControlList[index].ControlType == 'barchart' ){
        BarChartDataFun()
      }
      if(Controls.ControlList[index].ControlType == 'linechart' ){
        LineChartDataFun()
      }
      back(selectdata,Controls)
    },300)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
function resize (pos, index,zindex) {

  if (Controls.ControlList[index]) {
    Controls.ControlList[index].PropertyList = pos
    changeCommon({...pos, ControlType: Controls.ControlList[index].ControlType} , index,'init')
    localdata.ControlList.forEach((item)=>{
      if(item.PropertyList.ZIndex == Controls.ControlList[index].PropertyList.ZIndex){
        item.PropertyList = pos
      }
    })
  
    // setTimeout(()=>{
    //判断拖动的是否是图表
    if(Controls.ControlList[index].ControlType == 'piechart' 
    || Controls.ControlList[index].ControlType == 'dashboardchart'
    || Controls.ControlList[index].ControlType == 'barchart'
    || Controls.ControlList[index].ControlType == 'linechart'){
      childElement(index,'init')
    }else{
      childElement(index,'init')
    }
    // })

    
  }
}
// 创建生成画布元素
function childElement (index,text,all) {
  $('.select-pass').hide()
  // console.log('text',text)
  let ind = index
  // 画布添加颜色
  let canvasWrap = document.getElementById('canvas-wrap')
  canvasWrap.style.backgroundColor=commonList.BackColor
  let html = ''
  let wrap = document.getElementById('wrap')
  if(Controls.ControlList.length==0){
    $('#wrap').empty()
   }
  if (localdata.ControlList.length !== 0&&text !='init') {
  let data = localdata
    if(all=='all'){
      document.getElementById('wrap').innerHTML = ''
      data = Controls
    
    }

    data.ControlList.forEach((item, index) => {
      index = item.PropertyList.ZIndex

      // if(ind == index){
        if (item.ControlType === 'solidrectangle') {  //矩形样式
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
          border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;
          background-color: ${item.PropertyList.BackColor};box-shadow: ${item.PropertyList.BoxShadow};transform: rotate(${item.PropertyList.Rotate}deg); height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          opacity: ${Number(item.PropertyList.Opacity) / 100};">
            <div class="moduleShape"></div>
          </div>
          `
        } else if (item.ControlType === 'line') {  //直线样式
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px; z-index: ${item.PropertyList.ZIndex};
          border-top-style: ${item.PropertyList.Style}; border-top-color: ${item.PropertyList.BorderColor}; border-top-width: ${item.PropertyList.BorderWidth}px;
          opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape">
            </div>
          </div>
          `
        } else if (item.ControlType === 'staticimage' || item.ControlType === 'image') {  //静态图片和动态图片
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="transform: rotate(${item.PropertyList.Rotate}deg);left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
          height: ${item.PropertyList.Height}px; border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;
          z-index: ${item.PropertyList.ZIndex};border-radius: ${item.PropertyList.BorderRadius}px;opacity: ${Number(item.PropertyList.Opacity) / 100};">
            <img class="moduleShape" src="${item.PropertyList.Img}" style="box-shadow: ${item.PropertyList.BoxShadow}; alt="图片" />
          </div>
          `
        } else if (item.ControlType === 'datatextblock') {  //数值显示
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
          height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};opacity: ${Number(item.PropertyList.Opacity) / 100}; 
          border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px; 
          font-family: ${item.PropertyList.FontFamily};color: ${item.PropertyList.Color}; font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}"
          >
          <span class="moduleShape numShow" style="font-family: ${item.PropertyList.FontFamily};font-size: ${item.PropertyList.FontSize}px" >
            数值显示
          </span>
          </div>
          `
        } else if (item.ControlType === 'statictextblock') {  //静态文本
          // <input class="moduleShape common-input" style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          //   font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onblur="handleblur(event, ${index}, 'Text')" 
          //   value="${item.PropertyList.Text}"
          // />
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height}px;
          height: ${item.PropertyList.Height}px;color: ${item.PropertyList.Color}; z-index: ${item.PropertyList.ZIndex};opacity: ${Number(item.PropertyList.Opacity) / 100};
          border: none"
          >
          <div class="moduleShape common-input" contenteditable="true" style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
            font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onblur="handleblur(event, ${index}, 'Text')" >
            <span>${item.PropertyList.Text}</span>
          </div>
          </div>
          `
        } else if(item.ControlType ===  'dynamictext') {  //动态文本
          // <input class="moduleShape common-input" style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          //   font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onblur="handleblur(event, ${index}, 'Text')" 
          //   value="${item.PropertyList.Text}"
          // />
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height}px;
          height: ${item.PropertyList.Height}px;transform: rotate(${item.PropertyList.Rotate}deg); box-shadow: ${item.PropertyList.BoxShadow}; color: ${item.PropertyList.Color};z-index: ${item.PropertyList.ZIndex};opacity: ${Number(item.PropertyList.Opacity) / 100};
          border: none"
          >
          <div class="moduleShape common-input" contenteditable="true" style="border-radius: ${item.PropertyList.BorderRadius}px;background-color: ${item.PropertyList.BackColor};border-style: ${item.PropertyList.Style};
          border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;font-weight: ${item.PropertyList.FontWeight};box-sizing: border-box;
          text-decoration: ${item.PropertyList.TextDecoration};font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};
          text-align:${item.PropertyList.TextAlign}" onblur="handleblur(event, ${index}, 'Text')" >
            <span>${item.PropertyList.Text}</span>
          </div>
          </div>
          `
        } else if (item.ControlType ===  'solidellipse') { //圆形
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: 50%;
          border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;
          background-color: ${item.PropertyList.BackColor};box-shadow: ${item.PropertyList.BoxShadow}; height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          opacity: ${Number(item.PropertyList.Opacity) / 100};">
            <div class="moduleShape">
            </div>
          </div>
          `
        } else if (item.ControlType === 'ellipselamp') {  //圆形状态灯
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: 50%;
          height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};background-color: #DDDDDD;
          opacity: ${Number(item.PropertyList.Opacity) / 100};">
            <div class="moduleShape">
            </div>
          </div>
          `
        } else if (item.ControlType === 'commonlamp') { //矩形状态灯
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: ${item.PropertyList.BorderRadius}px;
          height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};background-color: #DDDDDD;
          opacity: ${Number(item.PropertyList.Opacity) / 100};">
            <div class="moduleShape">
            </div>
          </div>
          `
        } else if (item.ControlType === 'cornerbutton') { //控制按钮
          html += `<div class="commonModule div-btn" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px;color: ${item.PropertyList.Color}; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape common-input" contenteditable="true"  style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
            font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};box-shadow: ${item.PropertyList.BoxShadow};" onblur="handleblur(event, ${index}, 'Text')" >
            <span>${item.PropertyList.Text}</span>
          </div>
          </div>`
        } else if (item.ControlType === 'rwtextbox') {  //读写框
          html += `<div class="commonModule div-text" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px;color: ${item.PropertyList.Color}; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape common-input" contenteditable="true"  style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
            font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};box-shadow: ${item.PropertyList.BoxShadow};" onblur="handleblur(event, ${index}, 'Text')" >
            <span>${item.PropertyList.Text}</span>
          </div>
          </div>`
        } else if (item.ControlType === 'jumplink') { //跳转链接
          html += `<div class="commonModule div-text" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px;color: ${item.PropertyList.Color}; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape common-input"  style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
            font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" >
            <span>跳转链接 ></span>
          </div>
          </div>`
        } else if (item.ControlType === 'textsearch') { //文本查询
          let dropList = DataSearchList.map(d => {
            return `<li class="dropdown-item ${d.value === item.PropertyList.Value ? 'selected' : ''}">${d.value}</li>`
          }).join('')
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div style="width: ${item.PropertyList.Width}px;display: flex">
            <div class="global-select" style="height: ${item.PropertyList.Height}px; margin-right: 10px;" >
              <div class="global-input" onclick="toggleItem(event, ${index})" >
                <input type="text" class="search-input input-inner" value="${item.PropertyList.Value}" readonly="readonly" autocomplete="off"
                style="height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="请选择" ></input>
                <span class=""input-suffix >
                  <span class="input-suffix-inner" >
                    <i class="iconfont iconxialajiantou" ></i>
                  </span>
                </span>
              </div>
              <ul class="select-dropdown" onmousedown="selectValue(event, ${index}, 'Value')" style="width: ${item.PropertyList.Width}px;" >
                  ${dropList}
              </ul>
            </div>
            <input class="search-input" style="box-shadow: ${item.PropertyList.BoxShadow};height: ${item.PropertyList.Height}px;color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="${item.PropertyList.Placeholder}"
          value="${item.PropertyList.Text}" onblur="changeText(event, ${index}, 'Text')" />
          </div>
          </div>`
        } else if (item.ControlType === 'associatedatetimepicker') {  //日期时间
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <input class="search-input" type="text" id="date${index}" style="box-shadow: ${item.PropertyList.BoxShadow};width: ${item.PropertyList.Width}px;color: ${item.PropertyList.Color};height: ${item.PropertyList.Height}px;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};"
          value="${item.Date}" onfocus="handleFocus(event, ${index})" />
          </div>`
        } else if (item.ControlType === 'datasearch') {  //数值查询
          let emptys = ['为空', '不为空']
          let equals = ['等于','不等于','大于等于','小于等于']
          let dropList = DataSearchList.map(d => {
            return `<li class="dropdown-item ${d.value === item.PropertyList.Value ? 'selected' : ''}">${d.value}</li>`
          }).join('')
          html += `<div class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div style="width: ${item.PropertyList.Width}px;display: flex">
          <div class="global-select" style="height: ${item.PropertyList.Height}px; margin-right: 10px; flex: 2" >
            <div class="global-input" onclick="toggleItem(event, ${index})" >
              <input type="text" class="search-input input-inner" value="${item.PropertyList.Value}" readonly="readonly" autocomplete="off"
              style="box-shadow: ${item.PropertyList.BoxShadow};height: ${item.PropertyList.Height}px;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="请选择" ></input>
              <span class=""input-suffix >
                <span class="input-suffix-inner" >
                  <i class="iconfont iconxialajiantou" ></i>
                </span>
              </span>
            </div>
            <ul class="select-dropdown" onmousedown="selectValue(event, ${index}, 'Value')" style="width: ${item.PropertyList.Width}px;" >
                ${dropList}
            </ul>
          </div>
          <input class="search-input" ${emptys.includes(item.PropertyList.Value) ? 'disabled': ''}  style="flex: 1;box-shadow: ${item.PropertyList.BoxShadow};height: ${item.PropertyList.Height}px;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="${item.PropertyList.Placeholder}"
            value="${item.PropertyList.Num1}" onblur="changeText(event, ${index}, 'Num1')" />
          <span class="short" > - </span>
          <input class="search-input" ${emptys.includes(item.PropertyList.Value) || equals.includes(item.PropertyList.Value)  ? 'disabled': ''} style="flex: 1;box-shadow: ${item.PropertyList.BoxShadow};height: ${item.PropertyList.Height}px;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="${item.PropertyList.Placeholder}"
            value="${item.PropertyList.Num2}" onblur="changeText(event, ${index}, 'Num2')" />
        </div>
        </div>`
        } else if (item.ControlType === 'dropsearch') {  //下拉查询
          let dropList = DropSearchList.map(d => {
            return `<li class="dropdown-item ${d.value === item.PropertyList.Value ? 'selected' : ''}">${d.value}</li>`
          }).join('')
          let filterList = DropSearchFilterList.map(d => {
            return `<li class="dropdown-item ${item.ChoiceList.includes(d.value) ? 'selected' : ''}">${d.value}</li>`
          }).join('')
          let dataList = item.ChoiceList.map(d => {
            return `<span class="tag" ><span >${d}</span><i onclick="delChoice(event, ${index})" class="iconfont iconguanbi2"></i></span>`
          }).join('')
          html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
            <div style="width: ${item.PropertyList.Width}px; display: flex" >
              <div class="global-select" style="height: ${item.PropertyList.Height}px; flex: 0.9; margin-right: 10px" >
                <div class="global-input" onclick="toggleItem(event, ${index})" >
                  <input type="text" value="${item.PropertyList.Value}" readonly="readonly" autocomplete="off" 
                  style="box-shadow: ${item.PropertyList.BoxShadow};height: ${item.PropertyList.Height}px;color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="请选择" class="input-inner" ></input>
                  <span class=""input-suffix >
                    <span class="input-suffix-inner" >
                      <i class="iconfont iconxialajiantou" ></i>
                    </span>
                  </span>
                </div>
                <ul class="select-dropdown" onmousedown="selectValue(event, ${index}, 'Value')" style="width: ${item.PropertyList.Width/2}px;" >
                  ${dropList}
                </ul>
              </div>
              <div class="global-select" style="height: ${item.PropertyList.Height}px; flex: 1.1" >
              <div class="select__tags">
                <span>
                  ${dataList}
                </span>
                <input type="text" style="color: ${item.PropertyList.Color};" placeholder="${item.ChoiceList.length === 0 ? '请选择' : ''}" ${item.Disabled ? 'disabled' : '' } class="${item.Disabled ? 'is-forbid' : '' }" onfocus="toggleItem(event, ${index}, 'filter')" onInput="textInput(event, ${index})" ></input>
              </div>
              <div class="global-input ${item.Disabled ? 'is-triger' : '' }" onclick="toggleItem(event, ${index})" >
                <input type="text" ${item.Disabled ? 'disabled' : '' }  class="input-inner ${item.Disabled ? 'is-forbid' : '' }  " value="${item.PropertyList.CheckedValue}" autocomplete="off" readonly="readonly")"
                style="box-shadow: ${item.PropertyList.BoxShadow};height: ${item.PropertyList.Height}px;color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" ></input>
                <span class="input-suffix ${item.Disabled ? 'is-forbid' : '' } ">
                  <span class="input-suffix-inner" >
                    <i class="iconfont iconxialajiantou" ></i>
                  </span>
                </div>
                <ul class="select-dropdown" onmousedown="addSelectChoice(event, ${index}, 'CheckedValue')" style="width: ${item.PropertyList.Width/2}px;" >
                  ${filterList}
                </ul>
              </div>
            </div>
            </div>
          </div>`
        } else if (item.ControlType === 'searchbutton') { //查询按钮
          html += `<div class="commonModule div-btn" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="box-shadow: ${item.PropertyList.BoxShadow};left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape common-input" contenteditable="true" style="color: ${item.PropertyList.Color};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
            font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onblur="handleblur(event, ${index}, 'Text')" >
            <span>${item.PropertyList.Text}</span>
          </div>
          </div>`
        } else if (item.ControlType === 'resetbutton') { //重置按钮
          html += `<div class="commonModule div-btn" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="box-shadow: ${item.PropertyList.BoxShadow};left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape common-input" contenteditable="true"  style="color: ${item.PropertyList.Color};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
            font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onblur="handleblur(event, ${index}, 'Text')" >
            <span>${item.PropertyList.Text}</span>
          </div>
          </div>`
        }
        else if(item.ControlType === 'piechart'){
          html += `<div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index},'${item.Name}','piechart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};">
          <div id="${item.Name}" style="width:100%;height:100%"></div>
          </div>
          <div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index},'${item.Name}','piechart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex-1};">
          <div id="${item.Name}pie" style="width:100%;height:100%;z-index:99999"></div>
          </div>`
        }else if(item.ControlType === 'dashboardchart'){
          html += `<div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index},'${item.Name}','dashboardchart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};">
          <div id="${item.Name}" style="width:100%;height:100%;"></div>
          </div>`
        }else if(item.ControlType === 'barchart'){
          html += `<div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index},'${item.Name}','barchart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};">
          <div id="${item.Name}" style="width:100%;height:100%;"></div>
          </div>`
        }else if(item.ControlType === 'linechart'){
          html += `<div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index},'${item.Name}','linechart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};">
          <div id="${item.Name}" style="width:100%;height:100%;"></div>
          </div>`
        }
       
      // }
    })
  }
  try{
    //在此运行代码
    let div = ""
    localdata.ControlList.forEach((item)=>{
      if(text !='init'){
     
        $(`.commonModule[data-id=${item.PropertyList.ZIndex}]`).remove()
 


      }else{ 
        div = div+`$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','backgroundColor':'${item.PropertyList.BackColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`
   
      }
   
    })
    if(text == 'init'){
      eval(div)
    }else{
      $('#wrap').append(html)
    }
 


  } catch(err) {
    //在此处理错误
  }
  // wrap.insertAdjacentHTML('afterend',html)   insertAdjacentHTML方法往html中插入模板字符串
  // wrap.innerHTML = html
  if (index||index==0) {
  
   
  setTimeout(()=>{
    localdata.ControlList.forEach((item,index1)=>{
      localdata.ControlList.forEach((item1)=>{
          if(item.Name == item1.Name){
            if(Controls.ControlList[index1].Date){
              laydate.render({
                elem: '#date' + index1, //指定元素
                type: 'datetime',
                value: Controls.ControlList[index1].Date,
                done: function(value, date, endDate){
                  Controls.ControlList[index1].Date = value
                }
              });
            }
          }
      })
      if(text !='init'){
        let indexarr = []
        localdata.ControlList.forEach((item, index) => {
          indexarr.push(item.PropertyList.ZIndex)
        })
        if(indexarr.length>0){
          setClass(indexarr)
        
        }
      }
    })
  })


  
   
  }
  
  


}
// 下拉框
function toggleItem (e, index, type) {
  e.stopImmediatePropagation()
  let width = e.currentTarget.offsetWidth
  e.currentTarget.parentElement.lastElementChild.style.width = width + 'px'
  let suffix = ''
  let dropdown = ''
  if (type && type ==='filter') {
    suffix = e.currentTarget.parentNode.nextElementSibling.lastElementChild.firstElementChild
    dropdown = e.currentTarget.parentNode.nextElementSibling.nextElementSibling
  } else {
    suffix = e.currentTarget.lastElementChild.firstElementChild
    dropdown = e.currentTarget.nextElementSibling
  }
  if (suffix.className.indexOf('is-reverse') === -1) {
    suffix.classList.add('is-reverse')
    dropdown.style.display = 'block'
  } else {
    e.target.blur()
    suffix.classList.remove('is-reverse')
    dropdown.style.display = 'none'
  }
}
// 删除搜索下拉多选标签
function delChoice (e, index) {
  let i = Controls.ControlList[index].ChoiceList.indexOf(e.target.parentNode.innerText.trim())
  Controls.ControlList[index].ChoiceList.splice(i, 1)
  // $(`.commonModule[data-id=${i}]`).remove()
  childElement()
}
function textInput (e, index) {
  let value = e.target.value
  // let dropdown = e.target.parentNode.nextElementSibling
  let dropdown = e.target.parentNode.nextElementSibling.nextElementSibling
  let html = ``
  DropSearchFilterList.forEach(item => {
    if (item.value.indexOf(value) != -1) {
      html += `<li class="dropdown-item ${Controls.ControlList[index].ChoiceList.includes(item.value) ? 'selected' : ''}"" >${item.value}</li>`
    }
  })
  dropdown.innerHTML = html
  if (dropdown.innerHTML === '') {
    dropdown.innerHTML = `<p class="select-dropdown__empty" onclick="emptyClick(event)">无匹配数据</p>`
  }
}
function emptyClick(e) {
  e.stopImmediatePropagation() //阻止事件的冒泡
}
// 搜索多选值添加
function addSelectChoice(e, index) {
  e.stopImmediatePropagation()
  if (Controls.ControlList[index].ChoiceList.indexOf(e.target.innerText) !== -1) {
    let i = Controls.ControlList[index].ChoiceList.indexOf(e.target.innerText)
    Controls.ControlList[index].ChoiceList.splice(i, 1)
  } else {
    Controls.ControlList[index].ChoiceList.push(e.target.innerText)
  }
  let tag = e.currentTarget.parentNode.firstElementChild.firstElementChild
  let input = e.currentTarget.parentNode.firstElementChild.lastElementChild
  let li = [...e.currentTarget.children]
  let dataList = Controls.ControlList[index].ChoiceList.map(d => {
    return `<span class="tag" ><span>${d}</span><i onclick="delChoice(event, ${index})" class="iconfont iconguanbi2"></i></span>`
  }).join('')
  li.forEach(item => {
    if (Controls.ControlList[index].ChoiceList.includes(item.innerText)) {
      item.classList.add('selected')
    } else {
      item.classList.remove('selected')
    }
  })
  if (Controls.ControlList[index].ChoiceList.length !== 0) {
    input.removeAttribute('placeholder')
  }
  tag.innerHTML = dataList
  if (input.value) {
    input.value = ''
    childElement(index)
  }
}
function selectValue (e, index, prop) {
  if (e.target !== e.currentTarget) {
    let list = ['为空', '不为空']
    Controls.ControlList[index].PropertyList[prop] = e.target.innerText
    if(list.includes(e.target.innerText)) {
      Controls.ControlList[index].ChoiceList = []
      Controls.ControlList[index].Disabled = true
    } else {
      Controls.ControlList[index].Disabled = false
    }
    // let value = document.getElementById('selectInput' + index)
    // let dropdown = document.getElementById('dropdown' + index)
    // let items = [...dropdown.children]
    // Controls.ControlList[index].PropertyList.Value = e.target.innerText
    // value.value =  e.target.innerText
    // items.forEach(item => {
    //   if (item.innerText === e.target.innerText) {
    //     item.classList.add('selected')
    //     // 此处使用jq移除兄弟元素的class
    //     $(item).siblings().removeClass('selected')
    //   }
    // })
    // toggleItem(index)
    childElement(index)
  }
  // setClass(index)
}

// 画布元素拖拽
function handleDown (e) {
  handtrue = true
  type = ''
  if(e.ctrlKey){
    if(e.button==0){
      let index = e.currentTarget.dataset.id
        type = 'ctrl'
        setClass(index)
        
    }           
  }
  if(selectdata.length<=1){
    let nowindex = 0
  let index = e.currentTarget.dataset.id
  let childItem = ''
  Controls.ControlList.forEach((item,index1)=>{
    if(index == item.ZIndex){
      nowindex = index1
    }
    if(item.PropertyList.ZIndex == index){
        childItem = item
    }
  })
  //  return
  //echartType 判断单击是否重新渲染右侧图表
  let echartType = ''
  if(index){
    
    if(localdata.ControlList.length == 1){
      if(localdata.ControlList[0].Name == childItem.Name){
        echartType = 'init'
      }else{
        echartType = ''
      }
    }
  }
  if(type!=='ctrl'){
    
    rightCommon(childItem.title, childItem.Name, index)

    changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, index,echartType)
  
  }else{
    initCommon()
  }

  const { PropertyList: pos } = childItem
  let startY = e.clientY
  let startX = e.clientX
  let startTop = Number(pos.Top)
  let startLeft = Number(pos.Left)
  let firstTime = ''
  let lastTime = ''
  let echartsInit = false
  let move = moveEvent => {
    // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
    moveEvent.stopPropagation()
    moveEvent.preventDefault()
    let currX = moveEvent.clientX
    let currY = moveEvent.clientY
    pos.Top = currY - startY + startTop
    pos.Left = currX - startX + startLeft
    // this.styleObj.top = pos.Top + 'px'
    // this.styleObj.left = pos.Left + 'px'

    laydate.render({
      elem: '#date' + index, //指定元素
      type: 'datetime',
      value: childItem
    });
    childItem.PropertyList.Top = pos.Top
    childItem.PropertyList.Left = pos.Left
    changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, index,'init')
    localdata.ControlList.forEach((item)=>{
     
      if(item.ZIndex == childItem.ZIndex){
        item = childItem
      }
    })


    if(Controls.ControlList[nowindex].ControlType == 'piechart' 
    || Controls.ControlList[nowindex].ControlType == 'dashboardchart'
    || Controls.ControlList[nowindex].ControlType == 'barchart'
    || Controls.ControlList[nowindex].ControlType == 'linechart'){
      childElement(nowindex,'init')
    }else{
      childElement(nowindex,'init')
    }
    var list = [...document.getElementsByClassName('commonModule')]

        list.forEach((item) => {
          if(index.indexOf(item.dataset.id)>-1){
            // item.className += ' activeItem'
           }
        })
         if(selectdata.length<=1){
              setClass(index)
            }else{
              let tmp = []
              selectdata.forEach((item)=>{
                tmp.push(item.PropertyList.ZIndex)
              })
              setClass(tmp)
            }
      
    echartsInit = true
     
  }
  let up = () => {
  
    lastTime = new Date().getTime()
  
    if ((lastTime - firstTime) > 200) {
      // //重新渲染图表
      // console.log('ee',Controls.ControlList[nowindex].ControlType)
      if(echartsInit){
        setTimeout(()=>{
          if(Controls.ControlList[nowindex].ControlType == 'piechart' ){
            PieChartDataFun()
          }
          if(Controls.ControlList[nowindex].ControlType == 'dashboardchart' ){
            DashChartDataFun()
          }
          if(Controls.ControlList[nowindex].ControlType == 'barchart' ){
            BarChartDataFun()
          }
          if(Controls.ControlList[nowindex].ControlType == 'linechart' ){
            LineChartDataFun()
          }
        },300)

        echartsInit = false
        
        chartsChangFun('style')
      }
    }
    back(selectdata,Controls)
    document.removeEventListener('mousemove', move, true)
    document.removeEventListener('mouseup', up, true)
  }
  

  document.addEventListener('mousemove', move, true)
  document.addEventListener('mouseup', up, true)
  return true
  }else{
     
     let index = []
     let saveindex = []
     localdata.ControlList.forEach((item)=>{
       index.push(item.PropertyList.ZIndex)
     })
     

      // let childItem = Controls.ControlList[parseInt(item.index)]
    
    
      // const { PropertyList: pos } = childItem
      let startY = e.clientY
      let startX = e.clientX
      // let startTop = Number(pos.Top)
      // let startLeft = Number(pos.Left)
      let firstTime = ''
      let movestatus = ''
      let lastTime = ''
      let daiti = JSON.parse(JSON.stringify(selectdata))
      // console.log("ssssss")
      let move = moveEvent => {
      
      movestatus = '移动中'
        // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
        moveEvent.stopPropagation()
        moveEvent.preventDefault()
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        // console.log("currX",JSON.parse(JSON.stringify(daiti[0].PropertyList.Top)))
        // console.log("startX",startX)
        localdata.ControlList.forEach((item,nowindex)=>{
          item.PropertyList.Top = currY - startY + JSON.parse(JSON.stringify(daiti[nowindex].PropertyList.Top))
          item.PropertyList.Left = currX - startX + JSON.parse(JSON.stringify(daiti[nowindex].PropertyList.Left))
          eval( `$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','backgroundColor':'${item.PropertyList.BackColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`)
          saveindex.push(item.PropertyList.ZIndex)
          selectdata[nowindex].PropertyList.Top =  item.PropertyList.Top
          selectdata[nowindex].PropertyList.Left =  item.PropertyList.Left
          Controls.ControlList.forEach((item1)=>{
  if(item.PropertyList.ZIndex == item1.PropertyList.ZIndex){
            item1.PropertyList.Top  =  item.PropertyList.Top
            item1.PropertyList.Left  =  item.PropertyList.Left
          }
          })
        
        })
        if(localdata.ControlList.length<1){
          changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, parseInt(item.index))
        }
        document.addEventListener('mouseup', up, true)
      }
      let up = (e) => {
            if(selectdata.length!==0){
            setTimeout(()=>{
             
              if(type !== 'ctrl'){
                if(index.indexOf(parseInt(e.path[1].dataset.id))<=-1){
              
                  selectdata = []
                  localdata = {
                    ControlList:[],
                    Data:{
                      PieChartItemList:[],
                      DashBoardChartItemList:[],
                      BarChartItemList:[],
                      LineChartItemList:[]
                    }
                  }
                }else{
                 
                  setClass(saveindex)
                }
              
              }
       
            })
          }
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
        movestatus = ''
        back(selectdata,Controls)
      }
      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
      return true
    
    
  }

}
// 给选中的画布元素添加选中效果
function setClass(i,EchartsName,EchartsType) {
  // console.log("i1111",i,type)
  var list = [...document.getElementsByClassName('commonModule')]
  var str = ``
  if(type=='ctrl'){
    if(!(i instanceof Array)){
      let d = [];
      d.push(i)
      i = d
     localdata.ControlList.forEach((item)=>{
       if(i.indexOf(item.PropertyList.ZIndex)<=-1){
         i.push(item.PropertyList.ZIndex)
       }
     })
    }else{
      localdata.ControlList.forEach((item)=>{
        if(i.indexOf(item.PropertyList.ZIndex)<=-1){
          i.push(item.PropertyList.ZIndex)
        }
      })
    }

  }
  // 判断是否为多选或者单个
  if(!(i instanceof Array)){

    if(type !== 'ctrl'){
        selectdata = []
       
        localdata.ControlList = []
      }
   setTimeout(() => {
    
    list.forEach((item) => {
      
      if (item.dataset.id == i) {
        let wantindex = '不选中'
        Controls.ControlList.forEach((nowitem,nowindex)=>{
          if (nowitem.PropertyList.ZIndex == i) {
            wantindex = nowindex
          }
        })
      
        if(wantindex!=='不选中'){
      
              // item.classList.remove("activeItem")
              // item.className += ' activeItem'
        
          if (Controls.ControlList[wantindex].pointList && Controls.ControlList[wantindex].pointList.length !== 0) {
            Controls.ControlList[wantindex].pointList.forEach((p) => {
              // str += `<div class="edit-shape-point"> </div>`
              let style = getPointStyle(p, wantindex)
              str += `<div class="edit-shape-point" onmousedown="handleMouseDownOnPoint('${p}',event, 'div', ${i})" style="left: ${style.left};top: ${style.top};margin-left: ${style.marginLeft};margin-top: ${style.marginTop};
              cursor: ${style.cursor}"> </div>`
            })
          }
        
          Controls.ControlList[wantindex].index = wantindex
          localdata.ControlList.push(Controls.ControlList[wantindex])
       
            $('.edit-shape-point').remove()
          
          selectdata.push(Controls.ControlList[wantindex])
          item.insertAdjacentHTML('beforeend', str) 
        }
      } else {
       
        if(type !== 'ctrl'){

          item.classList.remove("activeItem")
          item.classList.remove("edit-shape-point")
          let child = [...item.children]
          child.forEach(item => {
            if (item.className === 'edit-shape-point') {
              item.parentNode.removeChild(item)
            }
          })
        }
     
      }
    })
   });
  

  }else{
  
    if(type !== 'ctrl'){
      selectdata = []
      localdata.ControlList = []
     
    }
    i = [... new Set(i)]
        setTimeout(()=>{
    i.forEach((itemi)=>{
  
        list.forEach((item) => {
          if (item.dataset.id == itemi) { // 注意：此处用== 不用===
            // item.className += ' activeItem'
            str = ``
            let nowindex = ''
            Controls.ControlList.forEach((item,index1)=>{
              if(item.PropertyList.ZIndex == itemi){
                nowindex = index1
              }
           })
            if (Controls.ControlList[nowindex].pointList && Controls.ControlList[nowindex].pointList.length !== 0) {
              Controls.ControlList[nowindex].pointList.forEach((p) => {
                  let style = getPointStyle(p, nowindex)
                  str += `<div class="edit-shape-point" onmousedown="handleMouseDownOnPoint('${p}',event, 'div', ${i})" style="left: ${style.left};top: ${style.top};margin-left: ${style.marginLeft};margin-top: ${style.marginTop};
                   cursor: ${style.cursor}"> </div>`
               
              })
            }
            Controls.ControlList[nowindex].index = nowindex
            selectdata.push(Controls.ControlList[nowindex])
            localdata.ControlList.push(Controls.ControlList[nowindex])
            item.insertAdjacentHTML('beforeend', str) 
          } else {
            if(i.indexOf(parseInt(item.dataset.id))<0&&type !== 'ctrl'){
              item.classList.remove("activeItem")
              item.classList.remove("edit-shape-point")
              let child = [...item.children]
              child.forEach(item => {
                if (item.className === 'edit-shape-point') {
                  item.parentNode.removeChild(item)
                }
              })
            }
          }
        })
      })

    })
  }
  setTimeout(() => {
    selectdata = [... new Set(selectdata)]
    localdata.ControlList = [... new Set( localdata.ControlList)]
    Controls.Data.PieChartItemList =  [... new Set( Controls.Data.PieChartItemList)]
    localdata.Data = Controls.Data
    // console.log(localdata)
    // if(type == 'ctrl'){ 
    //   selectdata = selectdata.reverse()
    // } 
  });
  //点击改变图表
  echartsDataInit(EchartsType,EchartsName)

}
function getPointStyle (point, index) {
  return this.convertPointStyle(point, Controls.ControlList[index].PropertyList, index)
}
// 绘制8个小圆点
function convertPointStyle (point, defaultStyle, index, directionKey = {t: 'n', b: 's', l: 'w', r: 'e'}, ) {
  const pos = defaultStyle
  const height = pos.Height
  const width = pos.Width
  const borderWidth = pos.BorderWidth
  let types = ['textsearch', 'datasearch', 'dropsearch']
  let hasT = /t/.test(point)
  let hasB = /b/.test(point)
  let hasL = /l/.test(point)
  let hasR = /r/.test(point)
  let newLeft = 0
  let newTop = 0
  if (Controls.ControlList[index].ControlType === 'line') { // 当元素为直线时特殊处理
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : borderWidth * 2
      // 当有border-Width时需要减去borderWidth的大小
      if (borderWidth && borderWidth !== 0) {
        newLeft = newLeft - borderWidth
        newTop = newTop - borderWidth
      }
    } else {
      // !#zh 上下点，宽度固定在中间
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : borderWidth * 2
        // 当有border-Width时需要减去borderWidth的大小
        if (borderWidth && borderWidth !== 0) {
          newLeft = newLeft - borderWidth
          newTop = newTop - borderWidth
        }
      }
      // !#zh 左右点，高度固定在中间
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = -borderWidth/2 - 5
        // 当有border-Width时需要减去borderWidth的大小
        // if (borderWidth && borderWidth !== 0) {
        //   newLeft = newLeft - borderWidth
        //   newTop = newTop - borderWidth
        // }
      }
    }
  }else if (types.includes(Controls.ControlList[index].ControlType)) {  // fix input框border导致选框错位问题
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    } else {
      // !#zh 上下点，宽度固定在中间
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : height
      }
      // !#zh 左右点，高度固定在中间
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = height / 2
      }
    }
  } else {
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
      // 当有border-Width时需要减去borderWidth的大小
      if (borderWidth && borderWidth !== 0) {
        newLeft = newLeft - borderWidth
        newTop = newTop - borderWidth
      }
    } else {
      // !#zh 上下点，宽度固定在中间
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : height
        // 当有border-Width时需要减去borderWidth的大小
        if (borderWidth && borderWidth !== 0) {
          newLeft = newLeft - borderWidth
          newTop = newTop - borderWidth
        }
      }
      // !#zh 左右点，高度固定在中间
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = height / 2
        // 当有border-Width时需要减去borderWidth的大小
        if (borderWidth && borderWidth !== 0) {
          newLeft = newLeft - borderWidth
          newTop = newTop - borderWidth
        }
      }
    }
  }
  const style = {
    marginLeft: (hasL || hasR) ? '-5px' : 0,
    marginTop: (hasT || hasB) ? '-4px' : 0,
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: point.split('').reverse().map(m => directionKey[m]).join('') + '-resize'
  }
  return style
}

//切换标签重新赋值图表数据
function chartsChangFun(type){
  let rightType = type
  if(chartType != undefined){
    if(chartType == 'piechart'){      //饼图
      setTimeout(()=>{
        if(document.getElementById('pie') != null){
        console.log('chartName',chartName)
          if(localdata.ControlList.length == 1){
            if(localdata.ControlList[0].Name == chartName){
              return
            }else{
              document.getElementById('pie').contentWindow.PieinitEchart(BarChartData,chartName,rightType)
              document.getElementById('pie').contentWindow.varEchartsFun(BarChartData,'pie')
            }
          }

         
        }
      },300)
    }else if(chartType == 'dashboardchart'){   //仪表盘
      setTimeout(()=>{
        if(document.getElementById('dash') != null){
          document.getElementById('dash').contentWindow.DashinitEchart(BarChartData,chartName,rightType)
          document.getElementById('dash').contentWindow.varEchartsFun(BarChartData,'dash')
        }
      },300)
    }else if(chartType == 'barchart'){  //柱形图
      setTimeout(()=>{
        if(document.getElementById('barId') != null){
          document.getElementById('barId').contentWindow.BarinitEchart(BarChartData,chartName,rightType)
          document.getElementById('barId').contentWindow.varEchartsFun(BarChartData,'bar')
          document.getElementById('barId').contentWindow.AuxiliaryLineInit(BarChartData,'bar')
        }
      },300)
    }else if(chartType == 'linechart'){  //折线图
      setTimeout(()=>{
        if(document.getElementById('line') != null){
          document.getElementById('line').contentWindow.LineinitEchart(BarChartData,chartName,rightType)
          document.getElementById('line').contentWindow.varEchartsFun(BarChartData,'line')
          document.getElementById('line').contentWindow.AuxiliaryLineInit(BarChartData,'line')
        }
      },300)
    }
  }
}

let cfName
//赋值右侧图表数据
function echartsDataInit(EchartsType,EchartsName){
 
  
  if(EchartsType == 'piechart'){   //点击饼图
    for(let i=0;i<Controls.Data.PieChartItemList.length;i++){
        if(Controls.Data.PieChartItemList[i].name == EchartsName){
            BarChartData = Controls.Data.PieChartItemList[i]   //饼图数据、类型、名字
            chartType = 'piechart'
            chartName = EchartsName
        }
    }
    setTimeout(()=>{    
      if(document.getElementById('pie') != null && EchartsName != undefined){
        //图表属性配置和变量配置初始化
         
  
            if(cfName == EchartsName){
              return
            }else{
              document.getElementById('pie').contentWindow.PieinitEchart(BarChartData,EchartsName)
              document.getElementById('pie').contentWindow.varEchartsFun(BarChartData,'pie')
              cfName = EchartsName
            }
          
      }     
    },300)
  }else if(EchartsType == 'dashboardchart'){            //点击仪表盘
    for(let i=0;i<Controls.Data.DashBoardChartItemList.length;i++){
        if(Controls.Data.DashBoardChartItemList[i].name == EchartsName){
            BarChartData = Controls.Data.DashBoardChartItemList[i]   //仪表盘数据、类型、名字
            chartType = 'dashboardchart'
            chartName = EchartsName
        }
    }
    setTimeout(()=>{
      if(document.getElementById('dash') != null && EchartsName != undefined){

          if(cfName == EchartsName){
            return
          }else{
            document.getElementById('dash').contentWindow.DashinitEchart(BarChartData,EchartsName)
            document.getElementById('dash').contentWindow.varEchartsFun(BarChartData,'dash')
            cfName = EchartsName
          }
        
        
      }                              //图表属性配置和变量配置初始化
    },300)
  }else if(EchartsType == 'barchart'){
    for(let i=0;i<Controls.Data.BarChartItemList.length;i++){
        if(Controls.Data.BarChartItemList[i].name == EchartsName){  //柱形图数据、类型、名字
            BarChartData = Controls.Data.BarChartItemList[i]
            chartType = 'barchart'
            chartName = EchartsName
        }
    }
    setTimeout(()=>{       
      if(document.getElementById('barId') != null && EchartsName != undefined){


          if(cfName == EchartsName){
            return
          }else{
            document.getElementById('barId').contentWindow.BarinitEchart(BarChartData,EchartsName)
            document.getElementById('barId').contentWindow.varEchartsFun(BarChartData,'bar')
            document.getElementById('barId').contentWindow.AuxiliaryLineInit(BarChartData,'bar')
            cfName = EchartsName
          }
        
        
      }                          //图表属性配置和变量、辅助线配置初始化
    },300)
  }else if(EchartsType == 'linechart'){
    for(let i=0;i<Controls.Data.LineChartItemList.length;i++){
        if(Controls.Data.LineChartItemList[i].name == EchartsName){ //折线图数据、类型、名字
            BarChartData = Controls.Data.LineChartItemList[i]
            chartType = 'linechart'
            chartName = EchartsName
        }
    }
    setTimeout(()=>{       
      if(document.getElementById('line') != null && EchartsName != undefined){


          if(cfName == EchartsName){
            return
          }else{
            document.getElementById('line').contentWindow.LineinitEchart(BarChartData,EchartsName)
            document.getElementById('line').contentWindow.varEchartsFun(BarChartData,'line')
            document.getElementById('line').contentWindow.AuxiliaryLineInit(BarChartData,'line')
            cfName = EchartsName
          }
        
       
      }                            //图表属性配置和变量、辅助线配置初始化
    },300)
  }
}
let reuse = document.getElementById('reuse')
let style = window.getComputedStyle(reuse)
let reuseSetting = {
  view:{
    showLine: false,
    fontCss : {color:"#333333"}
  },
  data: {
      simpleData: {
          enable: true
      }
  },
  callback: {
    onMouseDown: reusedown
},
}
let reuseData=[
  { id:1, pId:0, name:"文件 1", open:true},
  { id:11, pId:1, name:"文件 1-1", open:true},
  { id:111, pId:11, name:"矩形", index: 4},
  { id:112, pId:11, name:"圆形", index: 5},
  { id:12, pId:1, name:"文件 1-2", open:true},
  { id:121, pId:12, name:"直线", index: 3},
  { id:122, pId:12, name:"图片", index: 0},
  { id:2, pId:0, name:"文件 2", open:true},
  { id:21, pId:2, name:"数值显示", index: 2},
  { id:22, pId:2, name:"文件 2-2", open:true},
  { id:221, pId:22, name:"矩形状态灯", index: 7},
];
$(document).ready(function () {
  $.fn.zTree.init($("#reusetree"), reuseSetting, reuseData);
})
function reusedown (e,id, node) {
  e.stopImmediatePropagation()
  if (!node.open) {
    e.target.setAttribute('draggable', true)
    document.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData("index", JSON.stringify(node.index));
      e.dataTransfer.effectAllowed = 'copyMove'
    }, false)

    document.addEventListener("drag",function(e){
      e.preventDefault()
    }, false)
  }

  // var treeObj = $.fn.zTree.getZTreeObj("reusetree");
  //   var nodes = treeObj.getSelectedNodes();
  //   var node = nodes[0];
  //   if(node.isParent){
  //     //判断后做操作
  //     console.log('1')
  // }
  //         //为父节点
}
// 打开复用弹窗
function openReuse() {

  if (style.left === '-300px') {
    reuse.style.left = '0px'
  }else {
    reuse.style.left = '-300px'
  }
  
}
// 关闭复用弹窗
function closeReuse () {
  let reuse = document.getElementById('reuse')
  reuse.style.left = '-300px'
}
// Colorpicker.create({
//         el: "color-picker1",
//         color: "rgba(0,0,0,0)",
//         change: function (elem, hex,rgba) {
//           elem.style.backgroundColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
//           // Controls.ControlList[index].PropertyList.Color = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
//           // if((data.ControlType!='piechart'&&data.ControlType!='dashboardchart'&&data.ControlType!='barchart'&&data.ControlType!='linechart')){
//           //   childElement(index)
//           // }
//         }
//       })