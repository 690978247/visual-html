/* 此处放置中间画布事件 */

// 当点击画布空白元素部分时，切换到检视：画布部分
function clickWrap (e) {
  e.preventDefault()
  if (e.target.id && e.target.id === 'wrap') {
    initCommon()
  }
}

// 画布禁止鼠标右键点击
function forbidMouse(e) {
  e.preventDefault()
}

// 打开右侧菜单
function openRightMenu (e, index) {
  e.preventDefault()
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';
  //改变自定义菜单的宽，让它显示出来
  menu.style.display = 'block'
  delIndex = index
}

//关闭右键菜单，很简单
window.onclick = function(e){
//用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
  menu.style.display = 'none'
}

// 删除画布元素
function delElement (event) {
  Controls.ControlList.splice(delIndex, 1)
  initCommon()
  childElement()
}

// 鼠标点击可以的按钮resize事件
function handleMouseDownOnPoint (point, event, type, index) {
  let downEvent = event
  // 抛出事件让父组件设置当前元素选中状态
  downEvent.stopPropagation()
  downEvent.preventDefault() // Let's stop this event.
  const pos = {...Controls.ControlList[index].PropertyList}
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
    pos.ZIndex = 20
    // console.log(pos.left)
    // console.log(pos.top)
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
    resize(pos, index)
    // this.$emit('resize', pos, index)
  }
  let up = () => {
    Controls.ControlList[index].PropertyList.ZIndex = 10
    setClass(index)
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
function resize (pos, index) {
  if (Controls.ControlList[index]) {
    Controls.ControlList[index].PropertyList = pos
    childElement(index)
    changeCommon({...pos, ControlType: Controls.ControlList[index].ControlType} , index)
  }
}

// 创建生成画布元素
function childElement (index) {
  let html = ''
  let wrap = document.getElementById('wrap')
  if (Controls.ControlList.length !== 0) {
    Controls.ControlList.forEach((item, index) => {
      if (item.ControlType === 'solidrectangle') {  //矩形样式
        html += `<div class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
        border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;
        background-color: ${item.PropertyList.BackColor}; height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
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
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
        height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <img class="moduleShape" src="${item.PropertyList.Img}" alt="图片" />
        </div>
        `
      } else if (item.ControlType === 'datatextblock') {  //数值显示
        html += `<div class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
        height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};opacity: ${Number(item.PropertyList.Opacity) / 100}; 
        border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px; 
        font-family: ${item.PropertyList.FontFamily};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}"
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
        height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};opacity: ${Number(item.PropertyList.Opacity) / 100};
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
        height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};opacity: ${Number(item.PropertyList.Opacity) / 100};
        border: none"
        >
        <div class="moduleShape common-input" contenteditable="true" style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily}; text-align:${item.PropertyList.TextAlign}" onblur="handleblur(event, ${index}, 'Text')" >
          <span>${item.PropertyList.Text}</span>
        </div>
        </div>
        `
      } else if (item.ControlType ===  'solidellipse') { //圆形
        html += `<div class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: 50%;
        border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;
        background-color: ${item.PropertyList.BackColor}; height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
        opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape">
          </div>
        </div>
        `
      } else if (item.ControlType === 'ellipselamp') {  //圆形状态灯
        html += `<div class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: 50%;
        height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background-color: #DDDDDD;
        opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape">
          </div>
        </div>
        `
      } else if (item.ControlType === 'commonlamp') { //矩形状态灯
        html += `<div class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: ${item.PropertyList.BorderRadius}px;
        height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background-color: #DDDDDD;
        opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape">
          </div>
        </div>
        `
      } else if (item.ControlType === 'cornerbutton') { //控制按钮
        html += `<div class="commonModule div-btn" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="moduleShape common-input" contenteditable="true"  style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onblur="handleblur(event, ${index}, 'Text')" >
          <span>${item.PropertyList.Text}</span>
        </div>
        </div>`
      } else if (item.ControlType === 'rwtextbox') {  //读写框
        html += `<div class="commonModule div-text" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="moduleShape common-input" contenteditable="true"  style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onblur="handleblur(event, ${index}, 'Text')" >
          <span>${item.PropertyList.Text}</span>
        </div>
        </div>`
      } else if (item.ControlType === 'jumplink') { //跳转链接
        html += `<div class="commonModule div-text" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="moduleShape common-input"  style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" >
          <span>跳转链接 ></span>
        </div>
        </div>`
      } else if (item.ControlType === 'textsearch') { //文本查询
        html += `<div class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <input class="search-input" style="width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="${item.PropertyList.Placeholder}"
        value="${item.PropertyList.Text}" onblur="changeText(event, ${index}, 'Text')" />
        </div>`
      }
    })
  }
  // wrap.insertAdjacentHTML('afterend',html)   insertAdjacentHTML方法往html中插入模板字符串
  wrap.innerHTML = html
  if (index) {
    setClass(index)
  }
}

// 画布元素拖拽
function handleDown (e) {
  // let index = e.target.dataset.id ? e.target.dataset.id : e.target.parentElement.dataset.id
  let index = e.currentTarget.dataset.id
  let childItem = Controls.ControlList[index]
  rightCommon(childItem.title, childItem.Name, index)
  changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, index)
  const { PropertyList: pos } = childItem
  let startY = e.clientY
  let startX = e.clientX
  let startTop = Number(pos.Top)
  let startLeft = Number(pos.Left)
  let firstTime = ''
  let lastTime = ''
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
    childItem.PropertyList.ZIndex = 20
    childItem.PropertyList.Top = pos.Top
    childItem.PropertyList.Left = pos.Left
    changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, index)
    childElement()
  }
  let up = () => {
    lastTime = new Date().getTime()
    if ((lastTime - firstTime) > 200) {
      childItem.PropertyList.ZIndex = 10
      setClass(index)
    }
    document.removeEventListener('mousemove', move, true)
    document.removeEventListener('mouseup', up, true)
  }
  document.addEventListener('mousemove', move, true)
  document.addEventListener('mouseup', up, true)
  return true
}

// 给选中的画布元素添加选中效果
function setClass (i) {
  var list = [...document.getElementsByClassName('commonModule')]
  var str = ``
  list.forEach((item) => {
    if (item.dataset.id == i) { // 注意：此处用== 不用===
      item.className += ' activeItem'
      if (Controls.ControlList[i].pointList && Controls.ControlList[i].pointList.length !== 0) {
        Controls.ControlList[i].pointList.forEach((p) => {
          // str += `<div class="edit-shape-point"> </div>`
          let style = getPointStyle(p, i)
          str += `<div class="edit-shape-point" onmousedown="handleMouseDownOnPoint('${p}',event, 'div', ${i})" style="left: ${style.left};top: ${style.top};margin-left: ${style.marginLeft};margin-top: ${style.marginTop};
           cursor: ${style.cursor}"> </div>`
        })
      }
      item.insertAdjacentHTML('beforeend', str) 
      // item.innerHTML = str
    } else {
      item.classList.remove("activeItem")
      item.classList.remove("edit-shape-point")
      let child = [...item.children]
      child.forEach(item => {
        if (item.className === 'edit-shape-point') {
          item.parentNode.removeChild(item)
        }
      })
    }
  })
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
  }else if (Controls.ControlList[index].ControlType === 'textsearch') {
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
  }else {
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