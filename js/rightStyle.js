/* 次吃放置右侧样式交互事件部分 */

// 右侧样式与数据标签 切换tab
function choice (type, index) {

  let style = document.getElementById('r-btns-style')
  let event = document.getElementById('r-btns-event')
  let changeGroup = document.getElementById('change-group')
  
  chartsChangFun(type)
  
  if (type === 'style') {
    if (index !== undefined) { //判断是否为画布， 若为画布则直接initCommon
      changeCommon({...Controls.ControlList[index].PropertyList, ControlType: Controls.ControlList[index].ControlType}, index)
        if(selectdata<=1){
    setClass(index)
  }else{
    let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.index)
    })
    setClass(tmp)
  }
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
    
    if(Controls.ControlList.length>0&&index!==undefined){
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
              <div class="func-others"><input type="checkbox" style="width: 12px" id="label1" ><label for="label1">双击时弹出历史曲线窗口</label></div>
              <div class="func-others"><input type="checkbox" style="width: 12px" id="label2" ><label for="label2">数值字体颜色按条件变化</label> </div>
          <div>
            <div class="func-condition" >
              <span>指定条件</span>
              <i class="iconfont iconxinzenglianxiren" onclick="openAddition(${index})" ></i>
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
    } else if (Controls.ControlList[index].ControlType === 'image') {  // 动态图片
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'line') {  // 直线
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'solidrectangle') {  // 矩形
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'solidellipse') {  // 圆形
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'ellipselamp') {  // 圆形状态灯
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'commonlamp') {  // 矩形状态灯
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'statictextblock') {  // 静态文本
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'dynamictext') {  // 动态文本
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'cornerbutton') {  // 控制按钮
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'rwtextbox') {  // 读写框
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'jumplink') {  // 跳转链接
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'textsearch') {  // 文本查询
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'associatedatetimepicker') {  // 日期时间
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'datasearch') {  // 数值查询
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'dropsearch') {  // 下拉查询
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'searchbutton') {  // 查询按钮
      html += `<span>UI 稿暂未出</span>`
    } else if (Controls.ControlList[index].ControlType === 'resetbutton') {  // 重置按钮
      html += `<span>UI 稿暂未出</span>`
    } else if(Controls.ControlList[index].ControlType === 'linechart'){
      html += `<div style="width:100%;height:626px" class="pieBox">
                <iframe id="line" style="width:100%;height:100%;border:none" src="./折线图/折线图变量.html"></iframe>
              </div>`
    }else if(Controls.ControlList[index].ControlType === 'barchart'){
      html += `<div style="width:100%;height:626px" class="pieBox">
              <iframe id="barId" style="width:100%;height:100%;border:none" src="./柱形图/柱形图变量.html"></iframe>
            </div>`
    }else if(Controls.ControlList[index].ControlType === 'dashboardchart'){
      html += `<div style="width:100%;height:626px" class="pieBox">
                <iframe id="dash" style="width:100%;height:100%;border:none" src="./仪表盘/仪表盘变量.html"></iframe>
              </div>`
    }else if(Controls.ControlList[index].ControlType === 'piechart'){
      html += ` <div style="width:100%;height:626px" class="pieBox">
       
            <iframe id="pie" style="width:100%;height:100%;border:none" src="./饼图/饼图变量.html"></iframe>
        </div>`
    }

    changeGroup.innerHTML = html
    // console.log(index)
    }
 
    initCondition(index)
  }
}
// 右侧属性栏初始化
function initCommon (type) {
 console.log('触发了')
  let commonGroup = document.getElementById('common-group')
  let changeGroup = document.getElementById('change-group')
  // <input type="text" class="r-input" onblur="setCanvasName(event)" value="${commonList.Name}" />
  let commonStr = `<div class="r-item"><span class="dashboard-title" >仪表板设置</span></div>`
  // 注：bi-collapse-content里面需要嵌套一个根元素div，根据此div计算各个content的高度
  let dropList = ['根目录','子目录1','子目录2','子目录3'].map(d => {
    return `<li class="dropdown-item ${d === commonList.Position ? 'selected' : ''}">${d}</li>`
  }).join('')
  let permissionList = ['李白','杜甫','张三丰','大聪明'].map(d => {
    return `<li class="dropdown-item ${d === commonList.Permision ? 'selected' : ''}">${d}</li>`
  }).join('')
    let changeStr = `<div class="dashboard-collpase" >
      <div class="bi-collapse">
            <div class="bi-collapse-title" onclick="toggleCollpase(event)">样式<i class="iconfont iconxialajiantou" ></i></div>
            <div class="bi-collapse-content" >
              <div>
                <div class="dashboard-area" >
                    <span class="area-name request-fild" >名称</span>
                    <input class="area-input" type="text" onblur="setCanvasName(event)" value="${commonList.Name}" ></input>
                </div>
                <div class="dashboard-area" >
                    <span class="area-name" >位置</span>
                    
                    <div class="global-select" >
                      <div class="global-input" onclick="toggleItem(event)" >
                        <input type="text" class="search-input input-inner" value="${commonList.Position}" readonly="readonly" autocomplete="off" placeholder="请选择" ></input>
                        <span class=""input-suffix >
                          <span class="input-suffix-inner" >
                            <i class="iconfont iconxialajiantou" ></i>
                          </span>
                        </span>
                      </div>
                      <ul class="select-dropdown" onmousedown="choiceSelectValue(event, 'Position')" >
                        ${dropList}
                      </ul>
                     </div>

                </div>
                <div class="dashboard-area dashboard-start" >
                  <span class="area-name" >背景</span>
                  <div>
                    <div class="area-gruops" >
                      <input type="radio" onchange="choiceBack(event, 'color')" name="bg-radio" id="color" class="area-radio" ${commonList.BackSetting === 'color' ? 'checked' : ''} ></input>
                      <label for="color" class="label-title" >颜色</label>
                      <span class="back-color" style="display: ${commonList.BackSetting === 'color' ? 'block': 'none' }" id="backColor"></span>
                    </div>
                    <div class="area-gruops" >
                      <input type="radio" onchange="choiceBack(event, 'img')" name="bg-radio" id="img" class="area-radio" ${commonList.BackSetting === 'img' ? 'checked' : ''} ></input>
                      <label for="img" class="label-title" >图片</label>
                      <i class="iconfont icontianjia area-icon" style="display: ${commonList.BackSetting === 'img' ? 'block': 'none' }" id="dashboardImg" ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bi-collapse-title" onclick="toggleCollpase(event)">安全策略<i class="iconfont iconxialajiantou" ></i>
              <span class="bi-collapse-subTitle" onclick="copeSetting(event, 'others')" >从其他仪表板复制配置</span>
              <span class="bi-collapse-subTitle" onclick="copeSetting(event, 'self')">将配置复制给其他仪表板</span>
            </div>
            <div class="bi-collapse-content">
              <div>
                <div class="dashboard-area" >
                  <span class="area-title request-fild" >访问权限</span>
                </div>
                <div class="permission-groups" >
                  <div>
                    <input type="radio" onchange="choicePermission(event, 'public')" name="permission-radio" id="public" class="permission-radio" >
                      <label for="public" class="permission-label" >公开</label>
                    </input>
                    <input type="radio" onchange="choicePermission(event, 'custom')" name="permission-radio" id="custom" checked class="permission-radio" >
                      <label for="custom" class="permission-label">自定义</label>
                    </input>
                    <input type="radio" onchange="choicePermission(event, 'private')" name="permission-radio" id="private" class="permission-radio" >
                      <label for="private" class="permission-label">私有</label>
                    </input>
                  </div>
                  <div id="custom-permission" >
                    <div class="global-select" >
                      <div class="global-input" onclick="toggleItem(event)" >
                        <input type="text" class="search-input input-inner" value="${commonList.Permision}" readonly="readonly" autocomplete="off" placeholder="请选择" ></input>
                        <span class=""input-suffix >
                          <span class="input-suffix-inner" >
                            <i class="iconfont iconxialajiantou" ></i>
                          </span>
                        </span>
                      </div>
                      <ul class="select-dropdown" onmousedown="choiceSelectValue(event, 'Permision')" >
                        ${permissionList}
                      </ul>
                     </div>
                  </div>
                </div>
                <div class="dashboard-area dashboard-start" >
                  <span class="area-name" >描述</span>
                  <textarea autocomplete="off" rows="3" class="area-textarea" placeholder="请输入" onblur="addDescription(event)" >${commonList.Description}</textarea>
                </div>
              </div>
            </div>
        </div>
      </div>
    `
    commonGroup.innerHTML = commonStr
    changeGroup.innerHTML = changeStr
    var list = [...document.getElementsByClassName('commonModule')]
    let select = [...document.querySelectorAll('.global-select input')]
    initCollpase()
    if (!type) {
      selectdata = []
      localdata.ControlList = []
    }
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
    Colorpicker.create({
      el: "backColor",
      color: commonList.BackColor,
      change: function (elem, hex,rgba) {
        elem.style.backgroundColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
        commonList.BackColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
        let wrap = document.getElementById('canvas-wrap')
        wrap.style.backgroundColor = commonList.BackColor
      }
    })
    let canvasWrap = document.getElementById('canvas-wrap')
    layui.use('upload', function(){
      var upload = layui.upload;
      //执行实例
      var uploadInst = upload.render({
        elem: '#dashboardImg',
        url: 'https://httpbin.org/post',
        accept: 'images',
        acceptMime: 'image/*',
        size: 1024*2,
        done: function(res){
            console.log('上传成功',res)
            commonList.BackImg = res.files.file
            canvasWrap.style.backgroundImage = `url(${res.files.file})`
            canvasWrap.style.backgroundRepeat = `norepear`
            canvasWrap.style.backgroundSize = `100% 100%`
          //上传完毕回调
        },error: function(){
          console.log('error')
          //请求异常回调
        }
      })
    })
    bindSelectEvent()
}
// 关闭下拉框
function hideDrop(e) {
  e.preventDefault()
  let suffix = e.target.parentElement.lastElementChild.firstElementChild
  suffix.classList.remove('is-reverse')
  e.target.parentElement.parentElement.lastElementChild.style.display = 'none'
}
function choiceBack (e, type) {
  let color = document.getElementById('backColor')
  let img = document.getElementById('dashboardImg')
  let canvasWrap = document.getElementById('canvas-wrap')
  if (type === 'img') {
    img.style.display = 'block'
    color.style.display = 'none'
    commonList.BackSetting = 'img'
    commonList.BackColor = '#fff'
    canvasWrap.style.backgroundColor = commonList.BackColor
    canvasWrap.style.backgroundImage = commonList.BackImg
  } else {
    img.style.display = 'none'
    color.style.display = 'block'
    commonList.BackSetting = 'color'
    commonList.BackImg = 'none'
    canvasWrap.style.backgroundColor = commonList.BackColor
    canvasWrap.style.backgroundImage = 'none'
    Colorpicker.create({
      el: "backColor",
      color: commonList.BackColor,
      change: function (elem, hex,rgba) {
        elem.style.backgroundColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
        commonList.BackColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
        let wrap = document.getElementById('canvas-wrap')
        wrap.style.backgroundColor = commonList.BackColor
      }
    })
  }
}
function choicePermission (e, type) {
  let custom = document.getElementById('custom-permission')
  if (type === 'custom') {
    custom.style.display = 'block'
  } else {
    custom.style.display = 'none'
  }
  // 需要初始化一下折叠面板的高度 1为初始化第二个面板
  initCollpase(1)
}
// 描述
function addDescription (e) {
  commonList.Description = e.target.value
}
// 下拉框绑定事件
function bindSelectEvent () {
  let drops = [...document.getElementsByClassName('select-dropdown')]
  drops.forEach(item => {
    item.addEventListener('mousedown', selectDroopValue)
  })
}
function selectDroopValue (e) {
  e.stopPropagation()
  if (e.target !== e.currentTarget) {
    let input = e.currentTarget.parentElement.firstElementChild.firstElementChild
    let items = [...e.currentTarget.children]
    let suffix = e.currentTarget.parentElement.firstElementChild.lastElementChild.lastElementChild
    input.value = e.target.innerText
    items.forEach(item => {
      if (item.innerText === e.target.innerText) {
        item.classList.add('selected')
        // 此处使用jq移除兄弟元素的class
        $(item).siblings().removeClass('selected')
      }
    })
    suffix.classList.remove('is-reverse')
    e.currentTarget.style.display = 'none'
  }
}
// 选择下拉内容
function choiceLineType (e, index) {
  e.stopPropagation()
  Controls.ControlList[index].PropertyList.Style = e.target.innerText
  childElement(index)
}

function choiceSelectValue (e, type) {
  e.stopPropagation()
  if (type === 'Position') {
    commonList.Position = e.target.innerText
  } else if (type === 'Permision') {
    commonList.Permision = e.target.innerText
  }
}
function copeSetting (e, type) {
  e.stopPropagation()
  // other 数据
  let otherSetting = {
    view:{
        showLine: false,
        fontCss : {color:"#333333"}
    },
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
      onCheck: onCheck
    },
  }
  let otherData =[
    { id:1, pId:0, name:"文件 1", open:true},
    { id:11, pId:1, name:"文件 1-1", open:true},
    { id:111, pId:11, name:"文件 1-1-1"},
    { id:112, pId:11, name:"文件 1-1-2"},
    { id:12, pId:1, name:"文件 1-2", open:true},
    { id:121, pId:12, name:"文件 1-2-1"},
    { id:122, pId:12, name:"文件 1-2-2"},
    { id:2, pId:0, name:"文件 2", open:true},
    { id:21, pId:2, name:"文件 2-1"},
    { id:22, pId:2, name:"文件 2-2", open:true},
    { id:221, pId:22, name:"文件 2-2-1"},
    { id:222, pId:22, name:"文件 2-2-2"},
    { id:23, pId:2, name:"文件 2-3"}
  ]
  //  self 数据
  let selfSetting = {
    view:{
        showLine: false,
        fontCss : {color:"#333333"}
    },
    check: {
        enable: true,
        chkStyle: "radio",
        radioType: "all" //all控制单选（整棵树）  level（同一级）
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onCheck: onCheckRaido
    },
  }
  let selfData =[
    { id:1, pId:0, name:"文件 1", open:true, nocheck: true},
    { id:11, pId:1, name:"文件 1-1", open:true, nocheck: true},
    { id:111, pId:11, name:"文件 1-1-1"},
    { id:112, pId:11, name:"文件 1-1-2"},
    { id:12, pId:1, name:"文件 1-2", open:true, nocheck: true},
    { id:121, pId:12, name:"文件 1-2-1"},
    { id:122, pId:12, name:"文件 1-2-2"},
    { id:2, pId:0, name:"文件 2", open:true, nocheck: true},
    { id:21, pId:2, name:"文件 2-1"},
    { id:22, pId:2, name:"文件 2-2", open:true, nocheck: true},
    { id:221, pId:22, name:"文件 2-2-1"},
    { id:222, pId:22, name:"文件 2-2-2"},
    { id:23, pId:2, name:"文件 2-3"}
  ];
  otherSetting.check.chkboxType = { "Y" : "s", "N" : "s" };
  if (type === 'others') {  //其他仪表板复制
    $.fn.zTree.init($("#treeCopeto"), otherSetting, otherData);
    layer.open({
      type: 1,
      title: ['选择从哪个仪表板复制权限配置', 'font-weight: 500;font-size: 16px;color: #FFFFFF;background: #409EFF;text-align:center;'],
      closeBtn: 1,
      btn: ['取消', '应用'],
      shadeClose: true,
      skin: 'z-addDashboard',
      content: $('.copeConfigureTo') ,
      area: ['599px', '650px'],
      btn2: function(index, layero){
        var dataObj = ConfigureToidsArr;
        if(dataObj == ""){
          layer.msg('请选择仪表板');
          return false
        }else{
          layer.alert('应用成功')
        }
      }                     
    });
  } else if (type === 'self') { //自己仪表板复制
    $.fn.zTree.init($("#treeCopeFrom"), selfSetting, selfData);
    layer.open({
      type: 1,
      title: ['选择要将权限配置复制到的仪表板', 'font-weight: 500;font-size: 16px;color: #FFFFFF;background: #409EFF;text-align:center;'],
      closeBtn: 1,
      btn: ['取消', '应用'],
      shadeClose: true,
      skin: 'z-addDashboard',
      content: $('.copeConfigureForm') ,
      area: ['599px', '650px'],
      success  : function(layero,index){
          //完成后的回调
      },
      yes: function(index, layero){
        layer.close(index);
      },
      btn2: function(index, layero){
        var dataObj = ConfigureFromidsArr;
        if(dataObj == ""){
          layer.msg('请选择仪表板');
          return false
        }else{
          // dataObj = ''
          // ConfigureFromidsArr = ''
          layer.alert('应用成功')
        }
      }           
    });

  }
}
// self
var ConfigureFromidsArr = ''
var ConfigureToidsArr = ''
//Y 属性定义 checkbox 被勾选后的情况； 
//N 属性定义 checkbox 取消勾选后的情况； 
//"p" 表示操作会影响父级节点； 
//"s" 表示操作会影响子级节点。
function onCheck(e,treeId,treeNode){
  var treeObj=$.fn.zTree.getZTreeObj("treeCopeto"),
  nodes=treeObj.getCheckedNodes(true),
  v1="";
  h1="";
  for(var i=0;i<nodes.length;i++){
      v1+=nodes[i].name + ",";
      h1+=nodes[i].id + ",";  
  }
  ConfigureToidsArr = h1;
  ConfigureToidsArr = ConfigureToidsArr.slice(0,-1);
}
 // other
 
function onCheckRaido(e,treeId,treeNode){
  var treeObj=$.fn.zTree.getZTreeObj("treeCopeFrom"),
  nodes=treeObj.getCheckedNodes(true),
  v2="";
  h2="";
  for(var i=0;i<nodes.length;i++){
      v2+=nodes[i].name + ",";
      h2+=nodes[i].id + ",";  
  }
  
  ConfigureFromidsArr = h2;
  ConfigureFromidsArr = ConfigureFromidsArr.slice(0,-1);
}
// 折叠面板事件
// 初始化
function initCollpase(i) {
  let Colls = document.querySelectorAll('.dashboard-collpase .bi-collapse-title')
  if (!i) {
    // 全部初始化
    Colls.forEach((e, index) => {
      e.nextElementSibling.style.height = e.nextElementSibling.firstElementChild.offsetHeight + 20 + 'px'
    })
  } else {
    // 单个面板初始化
    Colls.forEach((e, index) => {
      if (i === index) {
        e.nextElementSibling.style.height = e.nextElementSibling.firstElementChild.offsetHeight + 20 + 'px'
      }
    })
  }
}
// 折叠事件
function toggleCollpase(e) {
  let content = e.currentTarget.nextElementSibling
  let height = content.firstElementChild.offsetHeight + 20
  let icon = e.currentTarget.firstElementChild
  let style = window.getComputedStyle(content)
  if (style.height !== '0px') {
    content.style.height = '0px'
    icon.style.transform = 'rotate(0deg)'
  } else {
    content.style.height = height + 'px';
    icon.style.transform = 'rotate(180deg)'
  }
}
function bardown (index) {
  let scroll = document.getElementById('scroll')
  let bar = document.getElementById('bar')
  let mask = document.getElementById('mask')
  let startX = scroll.offsetLeft
  let move = moveEvent => {
    moveEvent.stopPropagation()
    moveEvent.preventDefault()
    let currX = moveEvent.clientX
    let barleft = currX - startX
    if(barleft < 0) {
      barleft = 0;
    } else if (barleft > scroll.offsetWidth - bar.offsetWidth) {
      barleft = scroll.offsetWidth - bar.offsetWidth;
    }
    Controls.ControlList[index].PropertyList.Opacity = parseInt(barleft / 169 * 100)
    bar.style.left = barleft + 'px'
    mask.style.width = barleft + 'px'
    var input = document.querySelector('.r-opacity .r-pos-input')
    input.value = parseInt(barleft / 169 * 100)
    childElement(index)
  }
  let up = () => {
    document.removeEventListener('mousemove', move, true)
    document.removeEventListener('mouseup', up, true)
  }
  document.addEventListener('mousemove', move, true)
  document.addEventListener('mouseup', up, true)
  return true
}
// 检视:画布 内容
function setCanvasName (e) {
  commonList.Name = e.target.value
  initCommon()
} 
// 右侧属性栏公共样式
function rightCommon (title, name, index) {
  let titles = ['静态图片','矩形','圆形', '直线', '静态文本','跳转链接','查询按钮','重置按钮']
  let commonGroup = document.getElementById('common-group')
  let commonStr = ``
  // <input type="text" class="r-input" onblur="handleblur(event, ${index}, 'Name')" value="${name}" />
  if (titles.includes(title)) {
    commonStr =`<div class="r-btns">
      <div id="r-btns-style" class="active">样式</div>
    </div>`
  } else {
    commonStr =`<div class="r-btns">
      <div id="r-btns-event" onclick="choice('event', ${index})">数据</div>
      <div id="r-btns-style" class="active" onclick="choice('style', ${index})" >样式</div>
    </div>`
  }
  commonGroup.innerHTML = commonStr
}
// 字体
function changeText (e, index, prop) {
  Controls.ControlList[index].PropertyList[prop] = e.target.value
  childElement()
  if(selectdata<=1){
    setClass(index)
  }else{
    let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}
// 聚焦
function handleFocus (e, index) {
  laydate.render({
    elem: '#date' + index, //指定元素
    type: 'datetime',
    value: Controls.ControlList[index].Date
  });
}
// 设置阴影
function setShadow (e, index) {
  if (e.target.title === '内阴影') {
    Controls.ControlList[index].PropertyList.BoxShadow = '0px 0px 10px #666 inset'
  } else if (e.target.title === '外阴影') {
    Controls.ControlList[index].PropertyList.BoxShadow = '0px 0px 10px #666'
  }
  childElement(index)
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
    e.target.value = e.target.value + '像素'
    // if(selectdata<=1){
    //   setClass(index)
    // }else{
    //   let tmp = []
    //   selectdata.forEach((item)=>{
    //     tmp.push(item.index)
    //   })
    //   setClass(tmp)
    // }
  } else if (prop === 'Opacity') {
    Controls.ControlList[index].PropertyList[prop] = e.target.value
    changeCommon({...Controls.ControlList[index].PropertyList,ControlType: Controls.ControlList[index].ControlType}, index)
  } else {
    Controls.ControlList[index].PropertyList[prop] = e.target.value
  }
  console.log(localdata)
  childElement()
  if(selectdata<=1){
    setClass(index)
  }else{
    let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.PropertyList.ZIndex)
    })
    setClass(tmp)
  }
  
}
// 修改border样式
function initBorderStyle (index) {
  let borderStyle = [...document.getElementsByClassName('pos-border-style')]
  if (borderStyle.length !== 0) {
    if (Controls.ControlList[index].PropertyList.Style === 'solid') {
      borderStyle[0].style.borderStyle = 'dashed'
    } else {
      borderStyle[0].style.borderStyle = 'solid'
    }
  }
}
function changeColor (e, index, prop) {
    Controls.ControlList[index].PropertyList[prop] = e.target.innerText
  childElement()
  if(selectdata<=1){
    setClass(index)
  }else{
    let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.index)
    })
    setClass(tmp)
  }
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
    if (Controls.ControlList[index].PropertyList[prop] === 'none' || Controls.ControlList[index].PropertyList[prop] === undefined) {
      Controls.ControlList[index].PropertyList[prop] = 'underline'
    } else {
      Controls.ControlList[index].PropertyList[prop] = 'none'
    }
  }
  childElement()
  if(selectdata<=1){
    setClass(index)
  }else{
    let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}
function changeFamily(value, index) {
  Controls.ControlList[index].PropertyList.FontFamily = value
  childElement()
  if(selectdata<=1){
    setClass(index)
  }else{
    let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}
// 修改文本对齐方式
function changeTextAlign (e, index, align) {
  Controls.ControlList[index].PropertyList.TextAlign = align
  childElement()
  changeCommon({...Controls.ControlList[index].PropertyList,ControlType: Controls.ControlList[index].ControlType}, index)
  if(selectdata<=1){
    setClass(index)
  }else{
    let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}
//修改图片
function changeImg (value, index) {
  Controls.ControlList[index].PropertyList.Img = `./imgs/${value}.jpg`
  childElement()
  if(selectdata<=1){
    setClass(index)
  }else{
    let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}
// 右侧属性栏变化样式
function changeCommon (data, index,text) {
   
  let changeGroup = document.getElementById('change-group')
  let lines = lineList.map(d => {
    return `<li class="dropdown-item ${d === data.Style ? 'selected' : ''}">${d}</li>`
  }).join('')
  // 添加折叠面版
  let changeStr = `
  <div class="dashboard-collpase" >
    <div class="bi-collapse">
    <div class="bi-collapse-title" onclick="toggleCollpase(event)">基本信息<i class="iconfont iconxialajiantou" ></i></div>
  `
  if (data.ControlType === 'solidrectangle'){  //矩形样式
    changeStr += `<div class="bi-collapse-content">
        <div>
          <div class="pos-group" >
            <div class="r-pos-title" ><span>尺寸</span> </div>
            <div class="r-pos r-pos-detail">
            <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
            <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
          </div>
          <div class="r-pos r-pos-detail">
            <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
            <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
          </div>
            <div class="r-pos r-pos-detail">
              <div><span class="iconfont iconjiaodu rotateIcon" ></span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Rotate')" value="${data.Rotate}" ></div>
            </div>
            </div>
            <div class="pos-others">
            <span>填充</span>
            <span class="pos-back-color" id="backColor${index}" ></span>
            </div>
            <div class="pos-others">
              <span class="pos-border">阴影</span>
              <div class="font-border" onclick="setShadow(event, ${index})">
                <span class="font-border-color" title="内阴影" ></span>
                <span class="font-border-color" title="外阴影"></span>
              </div>
            </div>
            <div class="pos-others">
              <span class="pos-border">边框</span>
              <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
              <span class="pos-border-color" id="borderColor${index}" ></span>
              <div class="global-select r-select" >
                <div class="global-input" onclick="toggleItem(event)" >
                  <input type="text" class="search-input input-inner" value="${data.Style}" readonly="readonly" autocomplete="off" placeholder="请选择" ></input>
                  <span class=""input-suffix >
                    <span class="input-suffix-inner" >
                      <i class="iconfont iconxialajiantou" ></i>
                    </span>
                  </span>
                </div>
                <ul class="select-dropdown" onmousedown="choiceLineType(event, ${index}, 'Style')""  >
                  ${lines}
                </ul>
              </div>
            </div>
            <div class="pos-group">
              <div class="scroll" id="scroll">
                <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
                </div>
                <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
                </div>
              </div>
              <div class="r-opacity">
                <span>不透明度(%)</span>
                <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
              </div>
      </div>
      </div>
    </div>`
  } else if (data.ControlType === 'line') { //直线样式
    changeStr += `<div class="bi-collapse-content">
    <div>
    <div class="pos-group" >
      <div class="r-pos-title" ><span>位置和尺寸</span> </div>
      <div class="r-pos r-pos-detail">
      <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
    </div>
    <div class="r-pos r-pos-detail">
      <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
      <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
    </div>
      </div>
      <div class="pos-others">
      <span class="pos-border">边框</span>
      <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
      <span class="pos-border-color" id="borderColor${index}"></span>
      <div class="global-select r-select" >
        <div class="global-input" onclick="toggleItem(event)" >
          <input type="text" class="search-input input-inner" value="${data.Style}" readonly="readonly" autocomplete="off" placeholder="请选择" ></input>
          <span class=""input-suffix >
            <span class="input-suffix-inner" >
              <i class="iconfont iconxialajiantou" ></i>
            </span>
          </span>
        </div>
        <ul class="select-dropdown" onmousedown="choiceLineType(event, ${index}, 'Style')""  >
          ${lines}
        </ul>
      </div>
    </div>
    <div class="pos-group">
        <div class="scroll" id="scroll">
          <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
          </div>
          <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
          </div>
        </div>
        <div class="r-opacity">
          <span>不透明度(%)</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
        </div>
      </div>
      </div>
      </div>`
  } else if (data.ControlType === 'staticimage') {  //静态图片
      if (data.ControlType === 'staticimage') { //静态图片
        changeStr +=`<div class="bi-collapse-content">
        <div>
        <div class="pos-group" >
          <div class="r-pos-title" ><span>位置和尺寸</span> </div>
          <div class="r-pos r-pos-detail">
            <div><span>W </span><input id="Cwidth" class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
            <div><span>H </span><input id="Cheight" class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
          </div>
          <div class="r-pos r-pos-detail">
            <div><span>X </span><input id="Cleft" class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
            <div><span>Y </span><input id="Ctop" class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
          </div>
          <div class="r-pos r-pos-detail">
            <div><span class="iconfont iconjiaodu rotateIcon" ></span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Rotate')" value="${data.Rotate}" ></div>
          </div>
          </div>
        <div class="r-pos-title" ><span>组件名称</span> </div>
        <div class="r-title-input" >
          <input type="text" onblur="handleblur(event, ${index}, 'ComName')" value="${data.ComName}" />
        </div>
        <div class="pos-upload">
          <span>图片</span>
          <img class="pos-upload-img" src='${data.Img}' ></img>
          <div class="imgupload" id="uploadimg${index}" >
            <i class="iconfont iconshangchuantupian" ></i>
            <span>点击上传</span> 
          </div>
          <span>jpg,png,gif,bmp ≤ 2MB</span>
      </div>
      </div>
      </div>
      `
      // 边框部分
      changeStr +=`
      <div class="bi-collapse-title" onclick="toggleCollpase(event)">边框<i class="iconfont iconxialajiantou" ></i></div>
      <div class="bi-collapse-content">
        <div>
          <div class="r-border-common" >
            <div class="r-border-common_item" >
              <span>描边</span>
              <span class="pos-back-color" id="borderColor${index}"></span>
            </div>
            <div class="r-border-common_item" >
              <span>圆角</span>
              <input type="text" class="r-border-common_input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
            </div>
          </div>
          <div class="r-border-common" >
            <div class="r-border-common_item" >
              <span>线宽</span>
              <input type="text" class="r-border-common_input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}像素" />
            </div>
            <div class="r-border-common_item" >
              <span>线型</span>
              <div class="global-select r-select" >
                <div class="global-input" onclick="toggleItem(event)" >
                  <input type="text" class="search-input input-inner" value="${data.Style}" readonly="readonly" autocomplete="off" placeholder="请选择" ></input>
                  <span class=""input-suffix >
                    <span class="input-suffix-inner" >
                      <i class="iconfont iconxialajiantou" ></i>
                    </span>
                  </span>
                </div>
                <ul class="select-dropdown" onmousedown="choiceLineType(event, ${index}, 'Style')""   >
                  ${lines}
                </ul>
              </div>
            </div>
          </div>
          <div class="r-border-common" >
            <div class="r-border-common_item" >
              <span>阴影</span>
              <div class="r-border-shadow" onclick="setShadow(event, ${index})">
                <span title="内阴影" ></span>
                <span title="外阴影"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    }
  } else if (data.ControlType === 'image') {  //动态图片
    changeStr +=`<div class="bi-collapse-content">
    <div>
    <div class="pos-group" >
      <div class="r-pos-title" ><span>位置和尺寸</span> </div>
      <div class="r-pos r-pos-detail">
      <div><span>W </span><input id="Cwidth" class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H </span><input id="Cheight" class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X </span><input id="Cleft" class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
        <div><span>Y </span><input id="Ctop" class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span class="iconfont iconjiaodu rotateIcon" ></span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Rotate')" value="${data.Rotate}" ></div>
      </div>
      </div>
      <div class="pos-others">
        <span>图片</span>
        <select id="group" class="pos-select" onchange="changeImg(this[selectedIndex].value, ${index})" value="img1">
          <option value="img1">img1</option>
          <option value="img2">img2</option>
        </select>
      </div>
      </div>
      </div>
      `
  } else if (data.ControlType === 'datatextblock') {  //数值显示
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
      <div class="r-pos-title" ><span>位置和尺寸</span> </div>
      <div class="r-pos r-pos-detail">
      <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
      <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
    </div>
    <div class="r-pos r-pos-detail">
      <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
      <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
    </div>
      </div>
      <div class="pos-group" >
          <div class="r-pos-font">
            <span>字体</span>
            <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
              <option value="微软雅黑">微软雅黑</option>
              <option value="宋体">宋体</option>
            </select>
        </div>
          <div class="r-font-prop">
            <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
            <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
            <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
            <span class="r-font-color" id="fontColor${index}" ></span>
          </div>
        </div>
        <div class="pos-others">
          <span>填充</span>
          <span class="pos-back-color" id="backColor${index}"></span>
        </div>
        <div class="pos-others">
          <span class="pos-border">阴影</span>
          <div class="font-border" onclick="setShadow(event, ${index})">
            <span class="font-border-color" title="内阴影" ></span>
            <span class="font-border-color" title="外阴影"></span>
          </div>
        </div>
        <div class="pos-others">
          <span class="pos-border">边框</span>
          <div class="font-border">
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
            <span class="font-border-color" id="borderColor${index}"></span>
          </div>
        </div>
        <div class="pos-group">
          <div class="scroll" id="scroll">
            <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
            </div>
            <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
            </div>
          </div>
          <div class="r-opacity">
            <span>不透明度(%)</span>
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
          </div>
        </div>
        </div>
        </div>
        `
    } else if (data.ControlType === 'statictextblock') {  //静态文本
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
        <div class="r-pos-title"><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
        <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
        <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
      </div>
        </div>
        <div class="pos-group" >
            <div class="r-pos-font">
              <span>字体</span>
              <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
                <option value="微软雅黑">微软雅黑</option>
                <option value="宋体">宋体</option>
              </select>
          </div>
            <div class="r-font-prop">
              <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
              <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
              <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
              <span class="r-font-color" id="fontColor${index}" ></span>
            </div>
          </div>
          <div class="pos-others">
            <span>填充</span>
            <span class="pos-back-color" id="backColor${index}"></span>
          </div>
          <div class="pos-group">
            <div class="scroll" id="scroll">
              <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
              </div>
              <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
              </div>
            </div>
            <div class="r-opacity">
              <span>不透明度(%)</span>
              <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
            </div>
          </div>
          </div>
          </div>
          `
    } else if (data.ControlType === 'dynamictext') {  //动态文本
      // <input class="pos-select pos-input" onblur="changeText(event, ${index}, 'Text')" value=${data.Text} />
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
        <div class="r-pos-title"><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
          <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
          <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span class="iconfont iconjiaodu rotateIcon" ></span><input class="r-pos-input" type="text" onblur="handleblur(event, ${index}, 'Rotate')" value="${data.Rotate}" ></div>
        </div>
      </div>
      <div class="r-pos-title" ><span>组件名称</span> </div>
      <div class="r-title-input" >
        <input type="text" onblur="handleblur(event, ${index}, 'ComName')" value="${data.ComName}" />
      </div>
      <div class="r-pos-title" ><span>文本内容</span> </div>
      <div class="r-title-input" >
        <input type="text" onblur="changeText(event, ${index}, 'Text')" value=${data.Text} />
      </div>
      <div class="r-pos-title" ><span>样式</span> </div>
        <div class="pos-group" >
            <div class="r-pos-font">
              <span>字体</span>
              <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
                <option value="微软雅黑">微软雅黑</option>
                <option value="宋体">宋体</option>
              </select>
          </div>
            <div class="r-font-prop">
              <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
              <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
              <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
              <span class="r-font-color" id="fontColor${index}" ></span>
            </div>
          </div>
          <div class="pos-group" >
            <div class="aligin-style-span">
              <span>对齐方式</span>
              <div class="r-align-style">
                <i class="iconfont iconzuoduiqi" style=" ${data.TextAlign ==='left'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'left')" title="左对齐"></i>
                <i class="iconfont iconjuzhongduiqi" style=" ${data.TextAlign ==='center'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'center')" title="居中对齐"></i>
                <i class="iconfont iconyouduiqi" style=" ${data.TextAlign ==='right'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'right')" title="右对齐"></i>
              </div>
            </div>
          </div>
          <div class="pos-group">
            <div class="scroll" id="scroll">
              <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
              </div>
              <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
              </div>
            </div>
            <div class="r-opacity">
              <span>不透明度(%)</span>
              <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
            </div>
          </div>
          </div>
          </div>
          `
           // 边框部分
      changeStr +=`
      <div class="bi-collapse-title" onclick="toggleCollpase(event)">边框<i class="iconfont iconxialajiantou" ></i></div>
      <div class="bi-collapse-content">
        <div>
          <div class="r-border-common" >
            <div class="r-border-common_item" >
              <span>描边</span>
              <span class="pos-back-color" id="borderColor${index}"></span>
            </div>
            <div class="r-border-common_item" >
              <span>圆角</span>
              <input type="text" class="r-border-common_input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
            </div>
          </div>
          <div class="r-border-common" >
            <div class="r-border-common_item" >
              <span>线宽</span>
              <input type="text" class="r-border-common_input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}像素" />
            </div>
            <div class="r-border-common_item" >
              <span>线型</span>
              <div class="global-select r-select" >
                <div class="global-input" onclick="toggleItem(event)" >
                  <input type="text" class="search-input input-inner" value="${data.Style}" readonly="readonly" autocomplete="off" placeholder="请选择" ></input>
                  <span class=""input-suffix >
                    <span class="input-suffix-inner" >
                      <i class="iconfont iconxialajiantou" ></i>
                    </span>
                  </span>
                </div>
                <ul class="select-dropdown" onmousedown="choiceLineType(event, ${index}, 'Style')""   >
                  ${lines}
                </ul>
              </div>
            </div>
          </div>
          <div class="r-border-common" >
            <div class="r-border-common_item" >
              <span>阴影</span>
              <div class="r-border-shadow" onclick="setShadow(event, ${index})">
                <span title="内阴影" ></span>
                <span title="外阴影"></span>
              </div>
            </div>
          </div>
          <div  class="r-border-common">
            <div class="r-border-common_item" >
              <span>填充</span>
              <span class="pos-back-color" id="backColor${index}"></span>
            </div>
          </div>
        </div>
      </div>
      `
    } else if (data.ControlType ===  'solidellipse') { //圆形
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
        <div class="r-pos-title"><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
        <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
        <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
      </div>
        </div>
        <div class="pos-others">
          <span>填充</span>
          <span class="pos-back-color" id="backColor${index}"></span>
        </div>
        <div class="pos-others">
          <span class="pos-border">阴影</span>
          <div class="font-border" onclick="setShadow(event, ${index})">
            <span class="font-border-color" title="内阴影" ></span>
            <span class="font-border-color" title="外阴影"></span>
          </div>
        </div>
        <div class="pos-others">
          <span class="pos-border">边框</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
          <span class="pos-border-color" id="borderColor${index}"></span>
          <div class="global-select r-select" >
            <div class="global-input" onclick="toggleItem(event)" >
              <input type="text" class="search-input input-inner" value="${data.Style}" readonly="readonly" autocomplete="off" placeholder="请选择" ></input>
              <span class=""input-suffix >
                <span class="input-suffix-inner" >
                  <i class="iconfont iconxialajiantou" ></i>
                </span>
              </span>
            </div>
            <ul class="select-dropdown" onmousedown="choiceLineType(event, ${index}, 'Style')""  >
              ${lines}
            </ul>
          </div>
        </div>
        <div class="pos-group">
          <div class="scroll" id="scroll">
            <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
            </div>
            <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
            </div>
          </div>
          <div class="r-opacity">
            <span>不透明度(%)</span>
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
          </div>
        </div>
        </div>
        </div>`
    } else if (data.ControlType === 'ellipselamp') {  //圆形状态灯
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
          <div class="r-pos-title"><span>位置和尺寸</span> </div>
          <div class="r-pos r-pos-detail">
          <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
          <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
        </div>
          </div>
          <div class="pos-others">
            <span class="pos-border">阴影</span>
            <div class="font-border" onclick="setShadow(event, ${index})">
              <span class="font-border-color" title="内阴影" ></span>
              <span class="font-border-color" title="外阴影"></span>
            </div>
          </div>
          <div class="pos-group">
            <div class="scroll" id="scroll">
              <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
              </div>
              <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
              </div>
            </div>
            <div class="r-opacity">
              <span>不透明度(%)</span>
              <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
            </div>
          </div>
          </div>
          </div>`
    } else if (data.ControlType === 'commonlamp') {  //矩形状态灯
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
          <div class="r-pos-title"><span>位置和尺寸</span> </div>
          <div class="r-pos r-pos-detail">
          <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
          <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
        </div>
        <div class="r-pos r-pos-detail">
          <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
          <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
        </div>
          </div>
          <div class="pos-others">
            <span>圆角</span>
            <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
          </div>
          <div class="pos-others">
            <span class="pos-border">阴影</span>
            <div class="font-border" onclick="setShadow(event, ${index})">
              <span class="font-border-color" title="内阴影" ></span>
              <span class="font-border-color" title="外阴影"></span>
            </div>
          </div>
          <div class="pos-group">
            <div class="scroll" id="scroll">
              <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
              </div>
              <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
              </div>
            </div>
            <div class="r-opacity">
              <span>不透明度(%)</span>
              <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
            </div>
          </div>
          </div>
          </div>`
    } else if (data.ControlType === 'cornerbutton') { //控制按钮
      // <div class="pos-group" >
      //   <div class="r-pos r-pos-font">
      //     <span>字体</span>
      //     <input class="pos-select pos-input" onblur="changeText(event, ${index}, 'Text')" value=${data.Text} />
      //   </div>
      // </div>
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
        <div class="r-pos-title"><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
        <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
        <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
      </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color" id="fontColor${index}" ></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color" id="backColor${index}"></span>
      </div>
      <div class="pos-group" >
        <div class="aligin-style-span">
          <span>对齐方式</span>
          <div class="r-align-style">
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
          <span class="font-border-color" id="borderColor${index}"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>圆角</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
      </div>
      <div class="pos-others">
        <span class="pos-border">阴影</span>
        <div class="font-border" onclick="setShadow(event, ${index})">
          <span class="font-border-color" title="内阴影" ></span>
          <span class="font-border-color" title="外阴影"></span>
        </div>
      </div>
      <div class="pos-group">
        <div class="scroll" id="scroll">
          <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
          </div>
          <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
          </div>
        </div>
        <div class="r-opacity">
          <span>不透明度(%)</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
        </div>
      </div>
      </div>
      </div>`
    } else if (data.ControlType === 'rwtextbox') { //读写框
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
        <div class="r-pos-title"><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
        <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
        <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
      </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color" id="fontColor${index}" ></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color" id="backColor${index}"></span>
      </div>
      <div class="pos-group" >
        <div class="aligin-style-span">
          <span>对齐方式</span>
          <div class="r-align-style">
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
          <span class="font-border-color" id="borderColor${index}"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>圆角</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
      </div>
      <div class="pos-others">
        <span class="pos-border">阴影</span>
        <div class="font-border" onclick="setShadow(event, ${index})">
          <span class="font-border-color" title="内阴影" ></span>
          <span class="font-border-color" title="外阴影"></span>
        </div>
      </div>
      <div class="pos-group">
        <div class="scroll" id="scroll">
          <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
          </div>
          <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
          </div>
        </div>
        <div class="r-opacity">
          <span>不透明度(%)</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
        </div>
      </div>
      </div>
      </div>`
    } else if (data.ControlType === 'jumplink') {  //跳转链接
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
        <div class="r-pos-title"><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
        <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
        <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
      </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos-font">
          <span>字体</span>
          <input class="pos-select pos-input" onblur="changeText(event, ${index}, 'Text')" value=${data.Text} />
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color" id="fontColor${index}" ></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color" id="backColor${index}"></span>
      </div>
      </div>
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
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
        <div class="r-pos-title"><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
        <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
        <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
      </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color" id="fontColor${index}" ></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color" id="backColor${index}"></span>
      </div>
      <div class="pos-others">
        <span class="pos-border">边框</span>
        <div class="font-border">
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
          <span class="font-border-color" id="borderColor${index}"></span>
        </div>
      </div>
      <div class="pos-group" >
        <div class="aligin-style-span">
          <span>对齐方式</span>
          <div class="r-align-style">
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
        <div class="font-border" onclick="setShadow(event, ${index})">
          <span class="font-border-color" title="内阴影" ></span>
          <span class="font-border-color" title="外阴影"></span>
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos-font">
          <span>匹配模式</span>
          <select id="group" class="pos-select" value="1">
            <option value="模糊匹配">模糊匹配</option>
            <option value="精确匹配">精确匹配</option>
          </select>
        </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos-font">
          <span>提示内容</span>
          <input class="pos-select pos-input" onblur="changeText(event, ${index}, 'Placeholder')" value=${data.Placeholder} />
        </div>
      </div>
      <div class="pos-group" >
        <div class="pos-checkbox" >
          <input type="checkbox" style="width: 12px" id="label1" ><label for="label1">开启即时查询</label>
        </div>
      </div>
      <div class="pos-group">
        <div class="scroll" id="scroll">
          <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
          </div>
          <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
          </div>
        </div>
        <div class="r-opacity">
          <span>不透明度(%)</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
        </div>
      </div>
      </div>
      </div>`
    } else if (data.ControlType === 'associatedatetimepicker') {  //日期时间
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
      <div class="r-pos-title"><span>位置和尺寸</span> </div>
      <div class="r-pos r-pos-detail">
      <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
      <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
    </div>
    <div class="r-pos r-pos-detail">
      <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
      <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
    </div>
    </div>
    <div class="pos-group" >
      <div class="r-pos-font">
        <span>字体</span>
        <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
          <option value="微软雅黑">微软雅黑</option>
          <option value="宋体">宋体</option>
        </select>
      </div>
      <div class="r-font-prop">
        <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
        <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
        <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
        <span class="r-font-color" id="fontColor${index}" ></span>
      </div>
    </div>
    <div class="pos-others">
      <span>填充</span>
      <span class="pos-back-color" id="backColor${index}"></span>
    </div>
    <div class="pos-others">
      <span class="pos-border">边框</span>
      <div class="font-border">
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
        <span class="font-border-color" id="borderColor${index}"></span>
      </div>
    </div>
    <div class="pos-group" >
      <div class="aligin-style-span">
        <span>对齐方式</span>
        <div class="r-align-style">
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
      <div class="font-border" onclick="setShadow(event, ${index})">
        <span class="font-border-color" title="内阴影" ></span>
        <span class="font-border-color" title="外阴影"></span>
      </div>
    </div>
    </div>
    </div>`
    } else if (data.ControlType === 'datasearch') {  // 数值查询
      changeStr += `
      <div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
      <div class="r-pos-title"><span>位置和尺寸</span> </div>
      <div class="r-pos r-pos-detail">
      <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
      <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
    </div>
    <div class="r-pos r-pos-detail">
      <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
      <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
    </div>
    </div>
    <div class="pos-group" >
      <div class="r-pos-font">
        <span>字体</span>
        <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
          <option value="微软雅黑">微软雅黑</option>
          <option value="宋体">宋体</option>
        </select>
      </div>
      <div class="r-font-prop">
        <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
        <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
        <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
        <span class="r-font-color" id="fontColor${index}" ></span>
      </div>
    </div>
    <div class="pos-others">
      <span>填充</span>
      <span class="pos-back-color" id="backColor${index}"></span>
    </div>
    <div class="pos-others">
      <span class="pos-border">边框</span>
      <div class="font-border">
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
        <span class="font-border-color" id="borderColor${index}"></span>
      </div>
    </div>
    <div class="pos-group" >
      <div class="aligin-style-span">
        <span>对齐方式</span>
        <div class="r-align-style">
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
      <div class="font-border" onclick="setShadow(event, ${index})">
        <span class="font-border-color" title="内阴影" ></span>
        <span class="font-border-color" title="外阴影"></span>
      </div>
    </div>
    <div class="pos-group" >
        <div class="pos-checkbox" >
          <input type="checkbox" style="width: 12px" id="label1" ><label for="label1">开启即时查询</label>
        </div>
    </div>
    </div>
    </div>
      `
    } else if (data.ControlType === 'dropsearch') { //下拉查询
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
      <div class="r-pos-title"><span>位置和尺寸</span> </div>
      <div class="r-pos r-pos-detail">
      <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
      <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
    </div>
    <div class="r-pos r-pos-detail">
      <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
      <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
    </div>
    </div>
    <div class="pos-group" >
      <div class="r-pos-font">
        <span>字体</span>
        <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
          <option value="微软雅黑">微软雅黑</option>
          <option value="宋体">宋体</option>
        </select>
      </div>
      <div class="r-font-prop">
        <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
        <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
        <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
        <span class="r-font-color" id="fontColor${index}" ></span>
      </div>
    </div>
    <div class="pos-others">
      <span>填充</span>
      <span class="pos-back-color" id="backColor${index}"></span>
    </div>
    <div class="pos-others">
      <span class="pos-border">边框</span>
      <div class="font-border">
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
        <span class="font-border-color" id="borderColor${index}"></span>
      </div>
    </div>
    <div class="pos-group" >
      <div class="aligin-style-span">
        <span>对齐方式</span>
        <div class="r-align-style">
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
      <div class="font-border" onclick="setShadow(event, ${index})">
        <span class="font-border-color" title="内阴影" ></span>
        <span class="font-border-color" title="外阴影"></span>
      </div>
    </div>
    <div class="pos-group" >
      <div class="pos-checkbox" >
        <input type="checkbox" style="width: 12px" id="label1" ><label for="label1">开启即时查询</label>
      </div>
    </div>
    </div>
    </div>`
    } else if (data.ControlType === 'searchbutton') { //查询按钮
      changeStr += `
      <div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
        <div class="r-pos-title"><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
        <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
        <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
      </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color" id="fontColor${index}" ></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color" id="backColor${index}"></span>
      </div>
      <div class="pos-group" >
        <div class="aligin-style-span">
          <span>对齐方式</span>
          <div class="r-align-style">
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
          <span class="font-border-color" id="borderColor${index}"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>圆角</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
      </div>
      <div class="pos-others">
        <span class="pos-border">阴影</span>
        <div class="font-border" onclick="setShadow(event, ${index})">
          <span class="font-border-color" title="内阴影" ></span>
          <span class="font-border-color" title="外阴影"></span>
        </div>
      </div>
      <div class="pos-group">
        <div class="scroll" id="scroll">
          <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
          </div>
          <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
          </div>
        </div>
        <div class="r-opacity">
          <span>不透明度(%)</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
        </div>
      </div>
      </div>
      </div>`
    } else if (data.ControlType === 'resetbutton') { //重置按钮
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
        <div class="r-pos-title"><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
        <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
        <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
      </div>
      <div class="r-pos r-pos-detail">
        <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
        <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
      </div>
      </div>
      <div class="pos-group" >
        <div class="r-pos-font">
          <span>字体</span>
          <select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">
            <option value="微软雅黑">微软雅黑</option>
            <option value="宋体">宋体</option>
          </select>
        </div>
        <div class="r-font-prop">
          <span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
          <span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
          <span><input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
          <span class="r-font-color" id="fontColor${index}" ></span>
        </div>
      </div>
      <div class="pos-others">
        <span>填充</span>
        <span class="pos-back-color" id="backColor${index}"></span>
      </div>
      <div class="pos-group" >
        <div class="aligin-style-span">
          <span>对齐方式</span>
          <div class="r-align-style">
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
          <span class="font-border-color" id="borderColor${index}"></span>
        </div>
      </div>
      <div class="pos-others">
        <span>圆角</span>
        <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
      </div>
      <div class="pos-others">
        <span class="pos-border">阴影</span>
        <div class="font-border" onclick="setShadow(event, ${index})">
          <span class="font-border-color" title="内阴影" ></span>
          <span class="font-border-color" title="外阴影"></span>
        </div>
      </div>
      <div class="pos-group">
        <div class="scroll" id="scroll">
          <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
          </div>
          <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
          </div>
        </div>
        <div class="r-opacity">
          <span>不透明度(%)</span>
          <input type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
        </div>
      </div>
      </div>
      </div>`
    }else if(data.ControlType === 'piechart'){
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
          <div class="r-pos-title"><span>尺寸</span> </div>
          <div class="r-pos r-pos-detail">
            <div><span></span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
            <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
          </div>
          <div class="r-pos r-pos-detail">
            <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
            <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
          </div>
          </div>
          </div>
          </div>
          <div class="pos-group">
            
          
            <div style="width:100%;height:626px" class="pieBox">
                <iframe id="pie" style="width:100%;height:100%;border:none" src="./饼图/饼图.html"></iframe>
            </div>
          </div>`
          // <iframe id="pie" style="width:100%;height:100%;border:none" src="./饼图/饼图.html"></iframe>
    }else if(data.ControlType === 'dashboardchart'){
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
          <div class="r-pos-title"><span>尺寸</span> </div>
          <div class="r-pos r-pos-detail">
            <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
            <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
          </div>
          <div class="r-pos r-pos-detail">
            <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
            <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
          </div>
          </div>
          </div>
          </div>
          <div class="pos-group">
           
            <div style="width:100%;height:626px" class="pieBox">
            <iframe id="dash" style="width:100%;height:100%;border:none" src="./仪表盘/仪表盘.html"></iframe>
            </div>
          </div>`
    }else if(data.ControlType === 'barchart'){
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
          <div class="r-pos-title"><span>尺寸</span> </div>
          <div class="r-pos r-pos-detail">
            <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
            <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
          </div>
          <div class="r-pos r-pos-detail">
            <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
            <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
          </div>
          </div>
          </div>
          </div>
          <div class="pos-group">
           
            <div style="width:100%;height:626px" class="pieBox">
              <iframe id="barId" style="width:100%;height:100%;border:none" src="./柱形图/柱形图.html"></iframe>
            </div>
          </div>`
    }else if(data.ControlType === 'linechart'){
      changeStr += `<div class="bi-collapse-content">
      <div>
      <div class="pos-group" >
          <div class="r-pos-title"><span>尺寸</span> </div>
          <div class="r-pos r-pos-detail">
            <div><span>W</span><input class="r-pos-input" id="Cwidth" type="text" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
            <div><span>H</span><input class="r-pos-input" id="Cheight" type="text" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
          </div>
          <div class="r-pos r-pos-detail">
            <div><span>X</span><input class="r-pos-input" id="Cleft" type="text" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
            <div><span>Y</span><input class="r-pos-input" id="Ctop" type="text" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
          </div>
          </div>
          </div>
          </div>
          <div class="pos-group">
           
            <div style="width:100%;height:626px" class="pieBox">
            <iframe id="line" style="width:100%;height:100%;border:none" src="./折线图/折线图.html"></iframe>
            </div>
          </div>`
    }
    //折叠面板结束标签
    changeStr += `</div>
      </div>
    `
 
    if(text=='init'){
      $('#Cwidth').val(data.Width)
      $('#Cheight').val(data.Height)
      $('#Cleft').val(data.Left)
      $('#Ctop').val(data.Top)
    }
    if(text != 'init'){
      changeGroup.innerHTML = changeStr
      childElement(index,'init')
      setTimeout(()=>{
        changeGroup.innerHTML = changeStr
        initCollpase()
        initBorderStyle(index)
        bindSelectEvent()
    
        //  setTimeout(()=>{
          // changeGroup.innerHTML = changeStr
        // })
        if(Controls.ControlList[index].PropertyList.BorderColor) {  // 判断是否有此属性值，有则渲染颜色选择去
          setTimeout(()=>{
            Colorpicker.create({
              el: "borderColor"+ index,
              color:Controls.ControlList[index].PropertyList.BorderColor,
              change: function (elem, hex,rgba) {
                elem.style.backgroundColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
                Controls.ControlList[index].PropertyList.BorderColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
                if((data.ControlType!='piechart'&&data.ControlType!='dashboardchart'&&data.ControlType!='barchart'&&data.ControlType!='linechart')){
                  // childElement(index,'init')
                  // 动态文本特殊处理
                  if (Controls.ControlList[index].ControlType === "dynamictext"){
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}] .moduleShape`).css('borderColor',`rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')')
                  } else {
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('borderColor',`rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')')
                  }
                }
              }
            })
          },50)
     
        }
        if (Controls.ControlList[index].PropertyList.BackColor) {
          childElement(index,'init')
          setTimeout(()=>{
            Colorpicker.create({
              el: "backColor"+ index,
              color: Controls.ControlList[index].PropertyList.BackColor,
              change: function (elem, hex,rgba) {
                elem.style.backgroundColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
                Controls.ControlList[index].PropertyList.BackColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
                if((data.ControlType!='piechart'&&data.ControlType!='dashboardchart'&&data.ControlType!='barchart'&&data.ControlType!='linechart')){
                  // childElement(index,'init')
                  $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('backgroundColor',`rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')')
                }
              }
            })
          },50)
     
        }
        if (Controls.ControlList[index].PropertyList.Color) {
          setTimeout(()=>{
            Colorpicker.create({
              el: "fontColor"+ index,
              color:Controls.ControlList[index].PropertyList.Color,
              change: function (elem, hex,rgba) {
                elem.style.backgroundColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
                Controls.ControlList[index].PropertyList.Color = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
                if((data.ControlType!='piechart'&&data.ControlType!='dashboardchart'&&data.ControlType!='barchart'&&data.ControlType!='linechart')){
                  console.log($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`))
                  console.log(`rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')')
                  $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('color',`rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')')
                  // childElement(index,'init')
                }
              }
            })
          },50)
         
        }
        // 添加图片上传
        let imgs = ['staticimage']
        let uploadImg = document.getElementById(`uploadimg${index}`)
        if (imgs.includes(Controls.ControlList[index].ControlType)) {
          layui.use('upload', function(){
            var upload = layui.upload;
            //执行实例
            var uploadInst = upload.render({
              elem: `#uploadimg${index}`,
              url: 'https://httpbin.org/post',
              accept: 'images',
              acceptMime: 'image/*',
              size: 1024*2,
              done: function(res){
                localdata.ControlList[0].PropertyList.Img = res.files.file
                Controls.ControlList[index].PropertyList.Img = res.files.file
                uploadImg.previousElementSibling.src = res.files.file
                childElement(index)
                //上传完毕回调
              },error: function(){
                console.log('error')
                //请求异常回调
              }
            })
          })
        }
      })
    }
}
    