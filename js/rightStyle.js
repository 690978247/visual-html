/* 次吃放置右侧样式交互事件部分 */

// 右侧样式与数据标签 切换tab
function choice (type, index) {
  let style = document.getElementById('r-btns-style')
  let event = document.getElementById('r-btns-event')
  let changeGroup = document.getElementById('change-group')
  if (type === 'style') {
    if (index !== undefined) { //判断是否为画布， 若为画布则直接initCommon
      changeCommon({...Controls.ControlList[index].PropertyList, ControlType: Controls.ControlList[index].ControlType}, index)
      setClass(index)
      style.className += ' active'
      event.classList.remove("active")
    } else {
      initCommon()
    }
  } else {  // 此处为选中元素之后赋予样式
    event.className += ' active'
    style.classList.remove("active")
    let html = ``
    // changeGroup.innerHTML = ''
    if (Controls.ControlList[index].ControlType === 'datatextblock') {//数值显示
        html += `<div class="data" >
        <div class="data-func" >
          <span>功能设置</span>
              <div class="func-variable">
                <span class="func-wrap-title" >变量</span>
                <div class="func-wrap-center">
                  <input type="text" class="func-wrap-input" disabled value="${Controls.ControlList[index].Variate}"  />
                  <span class="func-wrap-choice" onclick="openPop(${index})" >选择</span>
                </div>
                <span class="func-wrap-last" >${Controls.ControlList[index].Variate ? 1 : 0}/1</span>
              </div>
              <div class="func-others" ><input type="checkbox" id="label1" ><label for="label1">双击时弹出历史曲线窗口</label></div>
              <div class="func-others" ><input type="checkbox" id="label2" ><label for="label2">数值字体颜色按条件变化</label> </div>
          <div>
            <div class="func-condition" >
              <span>指定条件</span>
              <i class="iconfont icontianjiajiahaowubiankuang" onclick="openAddition(${index})" ></i>
            </div>
            <div class="func-table">
              <table  cellspacing="0" cellpadding="0" border="0" >
                <tbody id="func-tbody">
                </tbody>
              </table>
            </div> 
          </div>
          <div class="func-format">
            <span class="func-format-title" >显示格式</span>
            <input type="text" class="func-format-input" placeholder="整数位数" />
            <input type="text" class="func-format-input" placeholder="小数位数" />
          </div>
        </div>
      </div>`
    }
    changeGroup.innerHTML = html
    initCondition(index)
  }
}

// 右侧属性栏初始化
function initCommon () {
  let commonGroup = document.getElementById('common-group')
  let changeGroup = document.getElementById('change-group')
  let commonStr = `<div class="r-item" >检视: <span id="r-item-title">${commonList.Title}</span></div>
    <input type="text" class="r-input" onblur="setCanvasName(event)" value="${commonList.Name}" />
    <div class="r-btns">
      <div id="r-btns-style" class="active" onclick="choice('style')" >样 式</div>
      <div id="r-btns-event" onclick="choice('event')">数 据</div>
    </div>`
    let changeStr = `<div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color"></span>
      </div>
    `
    commonGroup.innerHTML = commonStr
    changeGroup.innerHTML = changeStr
    var list = [...document.getElementsByClassName('commonModule')]
    list.forEach((item) => {
      item.classList.remove("activeItem")
    })
    var childs = [...document.getElementsByClassName('edit-shape-point')]
    childs.forEach(item => {
      item.parentNode.removeChild(item)
    })
}

// 右侧属性栏公共样式
function rightCommon (title, name, index) {
  let commonGroup = document.getElementById('common-group')
  let commonStr = `<div class="r-item" >检视: <span id="r-item-title">${title}</span></div>
    <input type="text" class="r-input" onblur="handleblur(event, ${index}, 'Name')" value="${name}" />
    <div class="r-btns">
      <div id="r-btns-style" class="active" onclick="choice('style', ${index})" >样 式</div>
      <div id="r-btns-event" onclick="choice('event', ${index})">数 据</div>
    </div>`
    commonGroup.innerHTML = commonStr
}

// 字体
function changeText (e, index, prop) {
  Controls.ControlList[index].PropertyList[prop] = e.target.value
  childElement()
  setClass(index)
}

// 样式赋值
function handleblur (e, index, prop) {
  // if (prop !== 'Name') {
  //   Controls.ControlList[index].PropertyList[prop] = e.target.value
  // } else {
  //   Controls.ControlList[index].Name = e.target.value
  // }
  
  if (prop === 'Name') {
    Controls.ControlList[index].Name = e.target.value
  } else if (prop === 'Text') {
    Controls.ControlList[index].PropertyList[prop] = e.target.innerText
  } else if (prop === 'BorderWidth') {
    Controls.ControlList[index].PropertyList[prop] = e.target.value
    setClass(index)
  } else {
    Controls.ControlList[index].PropertyList[prop] = e.target.value
  }
  childElement()
  setClass(index)
}

// 修改border样式
function changeColor (e, index, prop) {
  if (Controls.ControlList[index].PropertyList[prop] === 'solid') {
    Controls.ControlList[index].PropertyList[prop] = 'dashed'
  } else {
    Controls.ControlList[index].PropertyList[prop] = 'solid'
  }
  childElement()
  setClass(index)
}

// 修改字体样式
function changeFont (e, index, prop) {
  if (prop === 'FontWeight') {
    if (Controls.ControlList[index].PropertyList[prop] === 'normal') {
      Controls.ControlList[index].PropertyList[prop] = 'bold'
    } else {
      Controls.ControlList[index].PropertyList[prop] = 'normal'
    }
  } else {
    if (Controls.ControlList[index].PropertyList[prop] === 'none') {
      Controls.ControlList[index].PropertyList[prop] = 'underline'
    } else {
      Controls.ControlList[index].PropertyList[prop] = 'none'
    }
  }
  childElement()
  setClass(index)
}

function changeFamily(value, index) {
  Controls.ControlList[index].PropertyList.FontFamily = value
  childElement()
  setClass(index)
}

// 修改文本对齐方式
function changeTextAlign (e, index, align) {
  Controls.ControlList[index].PropertyList.TextAlign = align
  childElement()
  changeCommon({...Controls.ControlList[index].PropertyList,ControlType: Controls.ControlList[index].ControlType}, index)
  setClass(index)
}

//修改图片
function changeImg (value, index) {
  Controls.ControlList[index].PropertyList.Img = `./imgs/${value}.jpg`
  childElement()
  setClass(index)
}

// 右侧属性栏变化样式
function changeCommon (data, index) {
  let changeGroup = document.getElementById('change-group')
  let changeStr = ''
  if (data.ControlType === 'solidrectangle'){  //矩形样式
    changeStr = `<div class="pos-group" >
      <div class="r-pos"><span>尺寸</span> </div>
      <div class="r-pos r-pos-detail">
        <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
        <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
      </div>
      </div>
      <div class="pos-others">
      <span>填充</span>
      <span class="pos-back-color"></span>
      </div>
      <div class="pos-others">
        <span class="pos-border">阴影</span>
        <div class="font-border">
          <span class="font-border-color" title="内阴影" ></span>
          <span class="font-border-color" title="内阴影"></span>
        </div>
      </div>
      <div class="pos-others">
        <span class="pos-border">边框</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
        <span class="pos-border-color"></span>
        <span class="pos-border-style" onclick="changeColor(event, ${index}, 'Style')"></span>
      </div>
      <div class="pos-others">
        <span>不透明度(%)</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
      </div>`
  } else if (data.ControlType === 'line') { //直线样式
    changeStr = `<div class="pos-group" >
      <div class="r-pos">位置，<span>尺寸</span> </div>
      <div class="r-pos r-pos-detail">
        <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
        <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
      </div>
      </div>
      <div class="pos-others">
      <span class="pos-border">边框</span>
      <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
      <span class="pos-border-color"></span>
      <span class="pos-border-style" onclick="changeColor(event, ${index}, 'Style')"></span>
    </div>
    <div class="pos-others">
      <span>不透明度(%)</span>
      <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
    </div>`
  } else if (data.ControlType === 'staticimage' || data.ControlType === 'image') {  //静态图片和动态图片
    changeStr =`<div class="pos-group" >
      <div class="r-pos">位置，<span>尺寸</span> </div>
      <div class="r-pos r-pos-detail">
        <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
        <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
      </div>
      </div>
      <div class="pos-others">
      <span>不透明度(%)</span>
      <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
      </div>`
      if (data.ControlType === 'staticimage') {
        changeStr +=`<div class="pos-others">
        <span>图片</span>
        <select id="group" class="pos-select" onchange="changeImg(this[selectedIndex].value, ${index})" value="img1">
          <option value="img1">img1</option>
          <option value="img2">img2</option>
        </select>
        <span class="pos-selectImg">...</span>
      </div>`
    }
  } else if (data.ControlType === 'datatextblock') {  //数值显示
      changeStr += `<div class="pos-group" >
      <div class="r-pos">位置，<span>尺寸</span> </div>
      <div class="r-pos r-pos-detail">
        <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
        <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
      </div>
      </div>
      <div class="pos-group" >
          <div class="r-pos r-pos-font">
            <span>字体</span>
            <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
              <option value="微软雅黑">微软雅黑</option>
              <option value="宋体">宋体</option>
            </select>
        </div>
          <div class="r-pos r-font-prop">
            <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
            <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
            <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
            <span class="r-font-color"></span>
          </div>
        </div>
        <div class="pos-others">
          <span>填充</span>
          <span class="pos-back-color"></span>
        </div>
        <div class="pos-others">
          <span class="pos-border">阴影</span>
          <div class="font-border">
            <span class="font-border-color" title="内阴影" ></span>
            <span class="font-border-color" title="内阴影"></span>
          </div>
        </div>
        <div class="pos-others">
          <span class="pos-border">边框</span>
          <div class="font-border">
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
            <span class="font-border-color"></span>
          </div>
        </div>
        <div class="pos-others">
          <span>不透明度(%)</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
        </div>
        `
    } else if (data.ControlType === 'statictextblock') {  //静态文本
      changeStr += `<div class="pos-group" >
        <div class="r-pos">位置，<span>尺寸</span> </div>
        <div class="r-pos r-pos-detail">
          <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
          <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
        </div>
        </div>
        <div class="pos-group" >
            <div class="r-pos r-pos-font">
              <span>字体</span>
              <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
                <option value="微软雅黑">微软雅黑</option>
                <option value="宋体">宋体</option>
              </select>
          </div>
            <div class="r-pos r-font-prop">
              <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
              <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
              <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
              <span class="r-font-color"></span>
            </div>
          </div>
          <div class="pos-others">
            <span>填充</span>
            <span class="pos-back-color"></span>
          </div>
          <div class="pos-others">
            <span>不透明度(%)</span>
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
          </div>
          `
    } else if (data.ControlType === 'dynamictext') {  //动态文本
      changeStr += `<div class="pos-group" >
        <div class="r-pos">位置，<span>尺寸</span> </div>
        <div class="r-pos r-pos-detail">
          <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
          <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
        </div>
        </div>
        <div class="pos-group" >
            <div class="r-pos r-pos-font">
              <span>字体</span>
              <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
                <option value="微软雅黑">微软雅黑</option>
                <option value="宋体">宋体</option>
              </select>
          </div>
            <div class="r-pos r-font-prop">
              <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
              <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
              <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
              <span class="r-font-color"></span>
            </div>
          </div>
          <div class="pos-group" >
            <div class="r-pos aligin-style-span">
              <span>对齐方式</span>
              <div class="r-pos r-align-style">
                <i class="iconfont iconzuoduiqi" style=" ${data.TextAlign ==='left'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'left')" title="左对齐"></i>
                <i class="iconfont iconjuzhongduiqi" style=" ${data.TextAlign ==='center'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'center')" title="居中对齐"></i>
                <i class="iconfont iconyouduiqi" style=" ${data.TextAlign ==='right'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'right')" title="右对齐"></i>
              </div>
            </div>
          </div>
          <div class="pos-others">
            <span>不透明度(%)</span>
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
          </div>
          `
    } else if (data.ControlType ===  'solidellipse') { //圆形
      changeStr = `<div class="pos-group" >
        <div class="r-pos">位置，<span>尺寸</span> </div>
        <div class="r-pos r-pos-detail">
          <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
          <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
        </div>
        </div>
        <div class="pos-others">
          <span>填充</span>
          <span class="pos-back-color"></span>
        </div>
        <div class="pos-others">
          <span class="pos-border">阴影</span>
          <div class="font-border">
            <span class="font-border-color" title="内阴影" ></span>
            <span class="font-border-color" title="内阴影"></span>
          </div>
        </div>
        <div class="pos-others">
          <span class="pos-border">边框</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
          <span class="pos-border-color"></span>
          <span class="pos-border-style" onclick="changeColor(event, ${index}, 'Style')"></span>
        </div>
        <div class="pos-others">
          <span>不透明度(%)</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
        </div>`
    } else if (data.ControlType === 'ellipselamp') {  //圆形状态灯
      changeStr = `<div class="pos-group" >
          <div class="r-pos">位置，<span>尺寸</span> </div>
          <div class="r-pos r-pos-detail">
            <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
            <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
          </div>
          <div class="r-pos r-pos-detail">
            <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
            <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
          </div>
          </div>
          <div class="pos-others">
            <span class="pos-border">阴影</span>
            <div class="font-border">
              <span class="font-border-color" title="内阴影" ></span>
              <span class="font-border-color" title="内阴影"></span>
            </div>
          </div>
          <div class="pos-others">
            <span>不透明度(%)</span>
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
          </div>`
    } else if (data.ControlType === 'commonlamp') {  //矩形状态灯
      changeStr = `<div class="pos-group" >
          <div class="r-pos">位置，<span>尺寸</span> </div>
          <div class="r-pos r-pos-detail">
            <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
            <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
          </div>
          <div class="r-pos r-pos-detail">
            <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
            <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
          </div>
          </div>
          <div class="pos-others">
            <span>圆角</span>
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
          </div>
          <div class="pos-others">
            <span class="pos-border">阴影</span>
            <div class="font-border">
              <span class="font-border-color" title="内阴影" ></span>
              <span class="font-border-color" title="内阴影"></span>
            </div>
          </div>
          <div class="pos-others">
            <span>不透明度(%)</span>
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
          </div>`
    } else if (data.ControlType === 'cornerbutton') { //控制按钮
      // <div class="pos-group" >
      //   <div class="r-pos r-pos-font">
      //     <span>字体</span>
      //     <input class="pos-select pos-input" onblur="changeText(event, ${index}, 'Text')" value=${data.Text} />
      //   </div>
      // </div>
      changeStr = `<div class="pos-group" >
        <div class="r-pos">位置，<span>尺寸</span> </div>
        <div class="r-pos r-pos-detail">
          <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
            <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-pos r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color"></span>
      </div>
      <div class="pos-group" >
        <div class="r-pos aligin-style-span">
          <span>对齐方式</span>
          <div class="r-pos r-align-style">
            <i class="iconfont iconzuoduiqi" style=" ${data.TextAlign ==='left'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'left')" title="左对齐"></i>
            <i class="iconfont iconjuzhongduiqi" style=" ${data.TextAlign ==='center'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'center')" title="居中对齐"></i>
            <i class="iconfont iconyouduiqi" style=" ${data.TextAlign ==='right'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'right')" title="右对齐"></i>
          </div>
        </div>
      </div>
      <div class="pos-others">
        <span class="pos-border">边框</span>
        <div class="font-border">
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
          <span class="font-border-color"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>圆角</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
      </div>
      <div class="pos-others">
        <span class="pos-border">阴影</span>
        <div class="font-border">
          <span class="font-border-color" title="内阴影" ></span>
          <span class="font-border-color" title="内阴影"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>不透明度(%)</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
      </div>`
    } else if (data.ControlType === 'rwtextbox') { //读写框
      changeStr = `<div class="pos-group" >
        <div class="r-pos">位置，<span>尺寸</span> </div>
        <div class="r-pos r-pos-detail">
          <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
            <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-pos r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color"></span>
      </div>
      <div class="pos-group" >
        <div class="r-pos aligin-style-span">
          <span>对齐方式</span>
          <div class="r-pos r-align-style">
            <i class="iconfont iconzuoduiqi" style=" ${data.TextAlign ==='left'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'left')" title="左对齐"></i>
            <i class="iconfont iconjuzhongduiqi" style=" ${data.TextAlign ==='center'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'center')" title="居中对齐"></i>
            <i class="iconfont iconyouduiqi" style=" ${data.TextAlign ==='right'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'right')" title="右对齐"></i>
          </div>
        </div>
      </div>
      <div class="pos-others">
        <span class="pos-border">边框</span>
        <div class="font-border">
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
          <span class="font-border-color"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>圆角</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
      </div>
      <div class="pos-others">
        <span class="pos-border">阴影</span>
        <div class="font-border">
          <span class="font-border-color" title="内阴影" ></span>
          <span class="font-border-color" title="内阴影"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>不透明度(%)</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
      </div>`
    } else if (data.ControlType === 'jumplink') {
      changeStr = `<div class="pos-group" >
        <div class="r-pos">位置，<span>尺寸</span> </div>
        <div class="r-pos r-pos-detail">
          <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
            <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos r-pos-font">
          <span>字体</span>
          <input class="pos-select pos-input" onblur="changeText(event, ${index}, 'Text')" value=${data.Text} />
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-pos r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color"></span>
      </div>
      `
    } else if (data.ControlType === 'textsearch') { //文本查询)
      // <div class="pos-others">
      //   <span class="pos-border">边框</span>
      //   <div class="font-border">
      //     <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
      //     <span class="font-border-color"></span>
      //   </div>
      // </div>
      changeStr = `<div class="pos-group" >
        <div class="r-pos">位置，<span>尺寸</span> </div>
        <div class="r-pos r-pos-detail">
          <div><span>W：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}" ></div>
            <div><span>Y：</span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}"></div>
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-pos r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color"></span>
      </div>
      <div class="pos-others">
        <span class="pos-border">边框</span>
        <div class="font-border">
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
          <span class="font-border-color"></span>
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos aligin-style-span">
          <span>对齐方式</span>
          <div class="r-pos r-align-style">
            <i class="iconfont iconzuoduiqi" style=" ${data.TextAlign ==='left'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'left')" title="左对齐"></i>
            <i class="iconfont iconjuzhongduiqi" style=" ${data.TextAlign ==='center'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'center')" title="居中对齐"></i>
            <i class="iconfont iconyouduiqi" style=" ${data.TextAlign ==='right'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'right')" title="右对齐"></i>
          </div>
        </div>
      </div>
      <div class="pos-others">
        <span>圆角</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
      </div>
      <div class="pos-others">
        <span class="pos-border">阴影</span>
        <div class="font-border">
          <span class="font-border-color" title="内阴影" ></span>
          <span class="font-border-color" title="内阴影"></span>
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos r-pos-font">
          <span>匹配模式</span>
          <select id="group" class="pos-select" value="1">
            <option value="1">模式一</option>
            <option value="2">模式二</option>
          </select>
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos r-pos-font">
          <span>提示内容</span>
          <input class="pos-select pos-input" onblur="changeText(event, ${index}, 'Placeholder')" value=${data.Placeholder} />
        </div>
      </div>
      <div class="pos-others">
        <span>不透明度(%)</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
      </div>`
    }
  changeGroup.innerHTML = changeStr
}
    