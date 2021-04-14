(function () {
    let html = ` 
    <div id='coverol' style="position:fixed;width:100%;height:100%;z-index:998;display:none" onclick="hidecover()"></div>
    <ul class="ul">
    <li class="line"></li>
    <li class="first">
      <span class="name">编辑仪表板</span>
      <div onclick='olclick()' style="background:#F5F8FB;border:1px solid #E4E8ED;display:inline-block;width: 75px;height: 25px;line-height:25px;cursor:pointer;position:relative">
       <span class='viewpass'>100%</span>
       <ol class='select-pass'>
       <li name='100%' class='selected' onclick='olloclick(this,event)'>100%</li>
       <li name= '75%' onclick='olloclick(this,event)'>75%</li>
       <li name = '50%' onclick='olloclick(this,event)'>50%</li>
       <li name = '25%' onclick='olloclick(this,event)'>25%</li>
       </ol>      
      </div>
    </li>

    <li class="line"></li>
    <li class="li" title="复制" onclick='copy()'>
      <div>
        <i class="iconfont iconfuzhi li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="粘贴" onclick='paste()'>
      <div>
        <i class="iconfont iconjiechuqunzu li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="剪切" onclick='cut()'>
      <div>
        <i class="iconfont iconjiechuqunzu li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="撤销" onclick='goback()'>
      <div>
        <i class="iconfont iconshangyibu li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="恢复" onclick='backgo()'>
      <div>
        <i class="iconfont iconxiayibu li-svgIcon" ></i>
      </div>
    </li> 
    <li class="line"></li>
    <li class="li" title="顶层" onclick='buttonztop()'>
      <div>
        <i class="iconfont iconzhiyudingceng li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="底层" onclick='buttonzbottom()'>
      <div>
        <i class="iconfont iconzhiyudiceng li-svgIcon" ></i>
      </div>
    </li>  
    <li class="li" title="上移一层" onclick='onetop()'>
    <div>
      <i class="iconfont iconzhiyudingceng li-svgIcon" ></i>
    </div>
  </li>
  <li class="li" title="下移一层" onclick='onebottom()'>
    <div>
      <i class="iconfont iconzhiyudiceng li-svgIcon" ></i>
    </div>
  </li> 
    <li class="li" title="左对齐" onclick='buttonleft()'>
      <div>
        <i class="iconfont iconzuoduiqi li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="右对齐" onclick='buttonright()'>
      <div>
        <i class="iconfont iconyouduiqi li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="顶部对齐" onclick='buttontop()'>
      <div>
        <i class="iconfont icondingduiqi li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="底部对齐" onclick='buttonbottom()'>
      <div>
        <i class="iconfont icondiduiqi li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="水平居中" onclick='buttonlevel()'>
      <div>
        <i class="iconfont iconshuipingduiqi li-svgIcon" ></i>
      </div>
    </li> 
    <li class="li" title="垂直居中" onclick='buttonvertical()'>
      <div>
        <i class="iconfont iconjuzhongduiqi li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" title="水平分布" onclick='leveldistribution()' >
      <div>
        <i class="iconfont iconshuipingfenbu li-svgIcon" ></i>
      </div>
    </li> 
    <li class="li" title="垂直分布" onclick='verticaldistribution()'>
      <div>
        <i class="iconfont iconchuizhifenbu li-svgIcon" ></i>
      </div>
    </li> 
  
    <li class="line line1"></li>   
    <li class="li btns-li" onclick='openReuse()' style="margin-left: 360px" >
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>复用</span></button>
    </li> 
    <li  class="li btns-li" style="width: 90px" >
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>仪表板设置</span></button>
    </li> 
    <li  class="li btns-li" onclick="preview()">
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>预览</span></button>
    </li>
    <li  class="li btns-li" onclick="saveAs()" style="width: 63px" >
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>另存为</span></button>
    </li >
    <li  class="li btns-li" onclick="save()">
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>保存</span></button>
    </li>  
    <li class="li btns-li" onclick="savePublish()" style="width: 90px">
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>保存并发布</span></button>
    </li>  
    <li class="li something"><img src="./images/gengduo@2x.png" alt="">
      <div class="floattap">
      </div>
    </li>                     
  </ul>`
  let floathtml = `  <ul>
 
  <li class="li " onclick="save()"><img src="./images/保存@2x.png" alt="">
    <div class="word">保存</div>
  </li>
<li class="li myimg" onclick="preview()" ><img src="./images/yulan.png" alt="">
  <div class="word">预览</div>
</li> 
<li class="li myimg"><img src="./images/shezhi.png" alt="">
<div class="word">设置</div>
</li> 
<li class="li myimg" onclick='openReuse()' ><img src="./images/zhongfu.png" alt="">
<div class="word">复用</div>
</li>            
<li class="line line1"></li> 
<li class="li" onclick='verticaldistribution()'><img src="./images/chuizhifenbu@2x.png" alt="">
<div class="word">垂直分布</div>
</li> 
<li class="li" onclick='leveldistribution()' ><img src="./images/shuipingfenbu@2x.png" alt="">
<div class="word">水平分布</div>
</li> 
<li class="li" onclick='buttonvertical()'><img src="./images/zhongjianduiqi@2x.png" alt="">
<div class="word">垂直居中</div>
</li>
<li class="li" onclick='buttonlevel()'><img src="./images/shuipingjuzhong@2x.png" alt="">
<div class="word">水平居中</div>
</li> 
<li class="li" onclick='buttonbottom()'><img src="./images/dibuduiqi@2x.png" alt="">
<div class="word">底部对齐</div>
</li>
<li class="li" onclick='buttontop()'><img src="./images/dingbuduiqi.png" alt="">
<div class="word">顶部对齐</div>
</li>
<li class="li" onclick='buttonright()'><img src="./images/youduiqi@2x.png" alt="">
<div class="word">右对齐</div>
</li>
<li class="li" onclick='buttonleft()'><img src="./images/zuoduiqi@2x.png" alt="">
<div class="word">左对齐</div>
</li>
<li class="li" onclick='buttonzbottom()'><img src="./images/zhidi@2x.png" alt="">
<div class="word">底层</div>
</li>
<li class="li" onclick='buttonztop()'><img src="./images/zhiding@2x.png" alt="">
<div class="word">顶层</div>
</li>
<li class="line"></li>  
<li class="li" onclick='backgo()'><img src="./images/huifu@2x.png" alt="">
<div class="word">恢复</div>
</li> 
<li class="li" onclick='goback()'><img src="./images/chexiao@2x.png" alt="">
<div class="word">撤销</div>
</li>
<li class="li" onclick='cut()'><img src="./images/jianqie@2x.png" alt="">
<div class="word">剪切</div>
</li>
<li class="li" onclick='paste()'><img src="./images/zhantie@2x.png" alt="">
<div class="word">粘贴</div>
</li>
<li class="li" onclick='copy()'><img src="./images/fuzhi@2x.png" alt="">
<div class="word">复制</div>
</li>
</ul>`
$('.page-tools').append(html)
$('.floattap').append(floathtml)
var selectContainer = document.getElementById('canvas-wrap');
var mouseOn = false;
var tmp = []
selectContainer.onmousedown = function (e) {
  setTimeout(()=>{
    if($('.colordiv')){
      for(let i=0;i<$('.colordiv').length;i++){
        $('.colordiv')[i].remove()
      }
    }
  })
    // clearEventBubble(e);
    if (e.buttons !== 1 || e.which !== 1) return;
    mouseStopId = setTimeout(function () {
      mouseOn = true;
    
  
      // 调整坐标原点为容器左上角
      startX = e.clientX - selectContainer.offsetLeft + selectContainer.scrollLeft;
      startY = e.clientY - selectContainer.offsetTop + selectContainer.scrollTop;
      var selDiv = document.createElement('div');
      selDiv.style.cssText = 'position:absolute;width:0;height:0;margin:0;padding:0;border:1px dashed #eee;background-color:royalblue;z-index:1000;opacity:0.1;display:none;';
      selDiv.id = 'selectDiv';
      // 添加框选元素到容器内
      document.getElementById('canvas-wrap').appendChild(selDiv);
      selDiv.style.left = startX + 'px';
      selDiv.style.top = startY + 'px';
    }, 20);
    document.onmousemove = function (e) {
        // tmp = []
      if (!mouseOn) return;
    //   clearEventBubble(e);
      var selectContainer = document.getElementById('canvas-wrap');
      var _x = e.clientX - selectContainer.offsetLeft + selectContainer.scrollLeft;
      var _y = e.clientY - selectContainer.offsetTop + selectContainer.scrollTop;
      var _H = selectContainer.offsetWidth
      // 鼠标移动超出容器内部，进行相应的处理
      // 向右拖拽
      if (e.clientX > selectContainer.offsetLeft + selectContainer.offsetWidth) {
        let maxLeft = selectContainer.scrollWidth - selectContainer.offsetWidth
        let step = selectContainer.scrollLeft + 20
        if (step >= maxLeft) {
          selectContainer.scrollLeft = maxLeft
        } else {
          selectContainer.scrollLeft = step
        }
      }
      // 向左拖拽
      if (e.clientX < selectContainer.offsetLeft) {
        let minLeft = 0
        let step = selectContainer.scrollLeft - 20
        if (step <= minLeft) {
          selectContainer.scrollLeft = minLeft
        } else {
          selectContainer.scrollLeft = step
        }
      }
      var selDiv = document.getElementById('selectDiv');
      selDiv.style.display = 'block';
      selDiv.style.left = Math.min(_x, startX) + 'px';
      selDiv.style.top = Math.min(_y, startY) + 'px';
      if ((Math.min(_x, startX) + Math.abs(_x - startX)) <= selectContainer.scrollWidth) {
        selDiv.style.width = Math.abs(_x - startX) + 'px';
      }
      selDiv.style.height = Math.abs(_y - startY) + 'px';
      if (selDiv) {
        var fileDivs = $('.commonModule');
        var l = selDiv.offsetLeft;
        var t = selDiv.offsetTop;
        var w = selDiv.offsetWidth;
        var h = selDiv.offsetHeight;
        for (var i = 0; i < fileDivs.length; i++) {
           var sl = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft;
           var st = fileDivs[i].offsetHeight + fileDivs[i].offsetTop;
           if (l <=fileDivs[i].offsetLeft && t <=fileDivs[i].offsetTop  && sl <= l + w && st <= t + h) {
              if(tmp.indexOf(parseInt($(fileDivs[i]).attr('data-id')))<=-1){
                tmp.push(parseInt($(fileDivs[i]).attr('data-id')));
              }
          
         }
         }
     }
    };
   
    document.onmouseup = function (e) {
        document.onmousemove = null
     let save = []
     var selDiv = document.getElementById('selectDiv');
     if (selDiv) {
        var fileDivs = $('.commonModule');
        var l = selDiv.offsetLeft;
        var t = selDiv.offsetTop;
        var w = selDiv.offsetWidth;
        var h = selDiv.offsetHeight;
        for (var i = 0; i < fileDivs.length; i++) {
           var sl = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft;
           var st = fileDivs[i].offsetHeight + fileDivs[i].offsetTop;
           if (l <=fileDivs[i].offsetLeft && t <=fileDivs[i].offsetTop  && sl <= l + w && st <= t + h) {
               save.push(parseInt($(fileDivs[i]).attr('data-id')));
         }
         }
         save.sort((a,b)=>{
             return tmp.indexOf(a) - tmp.indexOf(b)
         })
     
          if(save.length!==0){
            if(type!=='ctrl'){
              setClass(save)
              if(save.length>1){
                initCommon()
              }else{
                 initCommon()
                Controls.ControlList.forEach((item)=>{
                  if(item.PropertyList.ZIndex == save[0]){
                    let index = save[0]
                    let childItem = item
                    //echartType 判断单击是否重新渲染右侧图表
                    let echartType = ''
                    if(index){
                      if($('.r-input').val() == childItem.Name){
                        echartType = 'init'
                      }else{
                        echartType = ''
                      }
                    }
                    rightCommon(childItem.title, childItem.Name, index)
                  
                    changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, index,echartType)

                  }
                })
                // 
              }
            }
           
            
          }
         if (!mouseOn) return;
        //  clearEventBubble(e);
         mouseOn = false;
         $(selDiv).remove()
         tmp = []
     }
     
    };
    document.onmouseleave = function (e) {
        document.onmousemove = null
     let save = []
     var selDiv = document.getElementById('selectDiv');
     if (selDiv) {
        var fileDivs = $('.commonModule');
        var l = selDiv.offsetLeft;
        var t = selDiv.offsetTop;
        var w = selDiv.offsetWidth;
        var h = selDiv.offsetHeight;
        for (var i = 0; i < fileDivs.length; i++) {
           var sl = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft;
           var st = fileDivs[i].offsetHeight + fileDivs[i].offsetTop;
           if (l <=fileDivs[i].offsetLeft && t <=fileDivs[i].offsetTop  && sl <= l + w && st <= t + h) {
               save.push(parseInt($(fileDivs[i]).attr('data-id')));
         }
         }
         save.sort((a,b)=>{
            return tmp.indexOf(a) - tmp.indexOf(b)
        })
     
        if(save.length!==0){
          if(type!=='ctrl'){
            setClass(save)
            if(save.length>1){
              initCommon()
            }else{
              Controls.ControlList.forEach((item)=>{
                if(item.PropertyList.ZIndex == save[0]){
                  let index = save[0]
                  let childItem = item
                  //echartType 判断单击是否重新渲染右侧图表
                  let echartType = ''
                  if(index){
                    if($('.r-input').val() == childItem.Name){
                      echartType = 'init'
                    }else{
                      echartType = ''
                    }
                  }
                  rightCommon(childItem.title, childItem.Name, index)
                
                  changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, index,echartType)

                }
              })
              // 
            }
          }
         
          
        }
         if (!mouseOn) return;
         clearEventBubble(e);
         mouseOn = false;
         $(selDiv).remove()
         tmp = []
     }
     
    };
  }
  
  function clearEventBubble (e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;

    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
  }
//   置顶
buttonztop = function(){
 
  let zIndex = 0;
  let index = []
  let indexarr = []
  let zindexarr1 = []
  let zindexarr2 = []
  selectdata.forEach((item,nowindex)=>{
    zindexarr1.push(item.PropertyList.ZIndex)
   
  })
  

  Controls.ControlList.forEach((item)=>{
    if(item.PropertyList.ZIndex>zIndex){
      zIndex = item.PropertyList.ZIndex
    }
    zindexarr2.push(item.PropertyList.ZIndex)
  })
  zindexarr2 = zindexarr2.filter(item=>{
    let id  = zindexarr1.map(v=>v) 
    return !id.includes(item) 
  })
  if(zindexarr2.length>0){
    if(Math.min(...zindexarr1)<Math.max(...zindexarr2)){
      selectdata.forEach((item,nowindex)=>{
        $(`.commonModule[data-id=${localdata.ControlList[nowindex].PropertyList.ZIndex}]`).remove()
      })
      selectdata.forEach((item,nowindex)=>{
        let now = 0
        Controls.ControlList.forEach((item1,index1)=>{
          if(item1.PropertyList.ZIndex==item.PropertyList.ZIndex){
            now = index1
          }
        })
        let childItem = Controls.ControlList[parseInt(now)]
        childItem.PropertyList.ZIndex = zIndex+1+nowindex
        changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, parseInt(now))
        localdata.ControlList[nowindex].PropertyList.ZIndex = zIndex+1+nowindex
      
        indexarr.push( localdata.ControlList[nowindex].PropertyList.ZIndex)
       
      })
      childElement()
      
      setClass(indexarr)
    }
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
 
 }
 //   置底
buttonzbottom = function(){
  let zIndex = 0;
  let index = []
  let indexarr = []
  let zindexarr1 = []
  let zindexarr2 = []
  selectdata.forEach((item,nowindex)=>{
    zindexarr1.push(item.PropertyList.ZIndex)
   
  })
  

  Controls.ControlList.forEach((item)=>{
    if(item.PropertyList.ZIndex<zIndex){
      zIndex = item.PropertyList.ZIndex
    }
    zindexarr2.push(item.PropertyList.ZIndex)
  })
  zindexarr2 = zindexarr2.filter(item=>{
    let id  = zindexarr1.map(v=>v) 
    return !id.includes(item) 
  })
  if(zindexarr2.length>0){
    if(Math.max(...zindexarr1)>Math.min(...zindexarr2)){
      
      selectdata.forEach((item,nowindex)=>{
        $(`.commonModule[data-id=${localdata.ControlList[nowindex].PropertyList.ZIndex}]`).remove()
      })
      selectdata.forEach((item,nowindex)=>{
        let now = 0
        Controls.ControlList.forEach((item1,index1)=>{
          if(item1.PropertyList.ZIndex==item.PropertyList.ZIndex){
            now = index1
          }
        })
        let childItem = Controls.ControlList[parseInt(now)]
        childItem.PropertyList.ZIndex = zIndex-1-nowindex
        changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, parseInt(now))
        localdata.ControlList[nowindex].PropertyList.ZIndex = zIndex-1-nowindex
      
        indexarr.push( localdata.ControlList[nowindex].PropertyList.ZIndex)
       
      })
      childElement()
      
      setClass(indexarr)
    }
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
 }
//  左对齐
buttonleft = function (){
  let left = 9999999999999999999
  if(selectdata.length>1){
    left = selectdata[0].PropertyList.Left
    selectdata.forEach((item,index1)=>{
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name){
          localdata.ControlList[index1].PropertyList.Left = left;
          item1.PropertyList.Left = left;
          item.PropertyList.Left = left;
          changeCommon({...item1.PropertyList, ControlType: item1.ControlType}, index)
        }
      })
    })
      let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.PropertyList.ZIndex)
    })
childElement()
    setClass(tmp)
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
 }
//  上对齐
buttontop = function (){
  let top = 9999999999999999999
  if(selectdata.length>1){
    top = selectdata[0].PropertyList.Top
    selectdata.forEach((item,index1)=>{
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name){
          localdata.ControlList[index1].PropertyList.Top = top;
          item1.PropertyList.Top = top;
          item.PropertyList.Top = top;
          changeCommon({...item1.PropertyList, ControlType: item1.ControlType}, index)
          
          
        }
      })
    })
      let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.PropertyList.ZIndex)
    })
   childElement()
    setClass(tmp)
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
 }
//  右对齐
buttonright = function (){
  let right = 9999999999999999999
  let width = 9999999999999999999
  if(selectdata.length>1){
    right = selectdata[0].PropertyList.Left
    width = selectdata[0].PropertyList.Width
    selectdata.forEach((item,index1)=>{
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name&&index1!==0){
          let left = right +(width - item1.PropertyList.Width)
          item1.PropertyList.Left = left;
          item.PropertyList.Left = left;
          localdata.ControlList[index1].PropertyList.Left = left;
          changeCommon({...item1.PropertyList, ControlType: item1.ControlType}, index)
         
          
        }
      })
    })
      let tmp = []
    selectdata.forEach((item)=>{
         tmp.push(item.PropertyList.ZIndex)
    })
    
childElement()
setClass(tmp)
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
 }
 //  下对齐
buttonbottom = function (){
  let bottom = 9999999999999999999
  let height = 9999999999999999999
  if(selectdata.length>1){
    bottom = selectdata[0].PropertyList.Top
    height = selectdata[0].PropertyList.Height
    selectdata.forEach((item,index1)=>{
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name&&index1!==0){
          let top = bottom +(height - item1.PropertyList.Height)
          item1.PropertyList.Top = top;
          item.PropertyList.Top = top;
          localdata.ControlList[index1].PropertyList.Top = top;
          changeCommon({...item1.PropertyList, ControlType: item1.ControlType}, index)
        
          
        }
      })
    })
      let tmp = []
    selectdata.forEach((item)=>{
         tmp.push(item.PropertyList.ZIndex)
    })
childElement()
    setClass(tmp)
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
 }
  //  水平对齐
buttonlevel = function (){
  let bottom = 9999999999999999999
  let height = 9999999999999999999
  if(selectdata.length>1){
    bottom = selectdata[0].PropertyList.Top
    height = selectdata[0].PropertyList.Height
    let end = bottom+(height/2)
    selectdata.forEach((item,index1)=>{
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name&&index1!==0){
          let top = end  - item1.PropertyList.Height/2
          item1.PropertyList.Top = top;
          item.PropertyList.Top = top
          localdata.ControlList[index1].PropertyList.Top = top;
          changeCommon({...item1.PropertyList, ControlType: item1.ControlType}, index)
       
          
        }
      })
    })
      let tmp = []
    selectdata.forEach((item)=>{
       tmp.push(item.PropertyList.ZIndex)
    })
childElement()
    setClass(tmp)
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
 }
//  垂直居中
buttonvertical = function (){
  let right = 9999999999999999999
  let width = 9999999999999999999
  if(selectdata.length>1){
    right = selectdata[0].PropertyList.Left
    width = selectdata[0].PropertyList.Width
    let end = right+(width/2)
    selectdata.forEach((item,index1)=>{
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name&&index1!==0){
          let left = end  - item1.PropertyList.Width/2
          item1.PropertyList.Left = left;
          item.PropertyList.Left = left
          localdata.ControlList[index1].PropertyList.Left = left;
          changeCommon({...item1.PropertyList, ControlType: item1.ControlType}, index)
         
          
        }
      })
    })
      let tmp = []
    selectdata.forEach((item)=>{
        tmp.push(item.PropertyList.ZIndex)
    })
childElement()
    setClass(tmp)
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
 }
//  水平分布
leveldistribution = function(){
  let right = 0;
  let left = 99999999999;
  let width = 0;
  let core = 0;
  let start = 0;
  let end = 0;
  if(selectdata.length>=3){
    selectdata.forEach((item,index)=>{
      item.PropertyList.max =  item.PropertyList.Left+parseInt(item.PropertyList.Width)
    })
    selectdata.sort((a,b)=>{
      return a.PropertyList.max - b.PropertyList.max;
    })
    selectdata.forEach((item,index)=>{
      if(left>=item.PropertyList.Left){
        left = item.PropertyList.Left
        start = index
      }
      width = width + parseInt(item.PropertyList.Width);
      if(right<=(item.PropertyList.Left+parseInt(item.PropertyList.Width))){
        right = item.PropertyList.Left+parseInt(item.PropertyList.Width)
        end = index
      }
    })
    core = right - left;
    let division = (core - width)/(selectdata.length-1) 
    let nowwidth = left
    selectdata.forEach((item,index1)=>{
      // if(index1>=1){
        nowwidth +=parseInt(item.PropertyList.Width)
      // }
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name&&index1!==start&&index1!==end){
          let now  = (index1)*division;
          let left1 = now+nowwidth - parseInt(item1.PropertyList.Width)
          item1.PropertyList.Left = left1;
          item.PropertyList.Left = left1
          localdata.ControlList[index1].PropertyList.Left = left1;
          changeCommon({...item1.PropertyList, ControlType: item1.ControlType}, index)
        
          
        }
      })
    })
      let tmp = []
    selectdata.forEach((item)=>{
      tmp.push(item.PropertyList.ZIndex)
    })
childElement()
    setClass(tmp)
   
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
}
// 垂直分布
verticaldistribution = function(){
  let bottom = 0;
  let top = 99999999999;
  let height = 0;
  let core = 0;
  let start = 0;
  let end = 0;
  if(selectdata.length>=3){
    selectdata.forEach((item,index)=>{
      item.PropertyList.max =  item.PropertyList.Top+parseInt(item.PropertyList.Height)
    })
    selectdata.sort((a,b)=>{
      return a.PropertyList.max - b.PropertyList.max;
    })
    selectdata.forEach((item,index)=>{
      if(top>=item.PropertyList.Top){
        top = item.PropertyList.Top
        start = index
      }
      height = height + parseInt(item.PropertyList.Height);
      if(bottom<=(item.PropertyList.Top+parseInt(item.PropertyList.Height))){
        bottom = item.PropertyList.Top+parseInt(item.PropertyList.Height)
        end = index
      }
    })
    core = bottom - top;
    let division = (core - height)/(selectdata.length-1) 
    let nowwidth = top
    selectdata.forEach((item,index1)=>{
        nowwidth +=parseInt(item.PropertyList.Height)
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name&&index1!==start&&index1!==end){
          let now  = (index1)*division;
          let top1 = now+nowwidth - parseInt(item.PropertyList.Height)
          item1.PropertyList.Top = top1;
          item.PropertyList.Top = top1
          localdata.ControlList[index1].PropertyList.Top = top1;
          changeCommon({...item1.PropertyList, ControlType: item1.ControlType}, index)
          childElement()
          
        }
      })
    })
      let tmp = []
    selectdata.forEach((item)=>{
        tmp.push(item.PropertyList.ZIndex)
    })
    setClass(tmp)
   
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
}
sort = function(a,b,c){
 let arr = []
 a.forEach((item)=>{
   if(c = 'top'){
     if(item.zindex>b){
       arr.push(item)
     }
   }else if(c=='bottom'){
    if(item.zindex<b){
      arr.push(item)
    }
   }
 })
 if(c == 'top'){
   arr.sort((a,b)=>{
    return a.zindex - b.zindex;
  })
  return arr[0]
 }else if(c == 'bottom'){
  arr.sort((a,b)=>{
    return b.zindex - a.zindex;
  })
  return arr[0]
 }
}
// 递归算法
recursion = function(a,b){
  for(let j=0;j<b.length;j++){
              for(let i=0;i<a.length;i++){
                if(a[i]== b[j]){
              if(a[i+1]!==undefined){
                  let num = a[i]
                   a[i]= a[i+1]
                   a[i+1]= num
                   b.splice(0,1)
              }else{
                   b.splice(0,1)
              }
                
               recursion(a,b)
                  break;
                }
            }
          }
}
recursion1 = function(a,b){
  for(let j=0;j<b.length;j++){
              for(let i=0;i<a.length;i++){
                if(a[i]== b[j]){
              if(a[i-1]!==undefined){
                  let num = a[i]
                   a[i]= a[i-1]
                   a[i-1]= num
                   b.splice(0,1)
              }else{
                   b.splice(0,1)
              }
                
               recursion1(a,b)
                  break;
                }
            }
          }
}
// 向上一级
onetop = function(){
  let daitiarr = JSON.parse(JSON.stringify(selectdata))
  daitiarr.sort((a,b)=>{
    return b.PropertyList.ZIndex - a.PropertyList.ZIndex;
  })
  let arr = []
  let arr1 = []
  let arr2 = []
  let arr3 = []
  Controls.ControlList.forEach((item1,index)=>{
     arr.push(item1.PropertyList.ZIndex)
     arr2.push(item1.PropertyList.ZIndex)
     let obj = {
       index:index,
       zindex:item1.PropertyList.ZIndex
     }
     arr3.push(obj)
  })
  if(arr.length!==daitiarr.length){
    arr.sort((a,b)=>{
      return a - b;
    })
    arr2.sort((a,b)=>{
      return a - b;
    })
    daitiarr.forEach((item,index)=>{  
      arr1.push(item.PropertyList.ZIndex) 
         })
         
         recursion(arr,arr1)
            let Arr2 = []
             for(let k=0;k<arr.length;k++){
               for(let f=0;f<arr3.length;f++){
                  if(arr3[f].zindex == arr[k]){
                   Arr2.push(arr3[f])
                   continue;
                  }
               }
             }
             for(let h=0;h<arr2.length;h++){
                Arr2[h].zindex = arr2[h]
             }
                 Arr2.forEach((item)=>{
             if(Controls.ControlList[item.index].PropertyList.ZIndex!==item.zindex){
              Controls.ControlList[item.index].PropertyList.ZIndex = item.zindex;
            
             }
          })
          console.log(Arr2)
          console.log(Controls)
          Controls.ControlList.forEach((item)=>{
            selectdata.forEach((item1,index)=>{
              if(item.Name == item1.Name){
                item1.PropertyList.ZIndex = item.PropertyList.ZIndex;
                localdata.ControlList[index].PropertyList.ZIndex = item.PropertyList.ZIndex;
              }
            })
          })
            let tmp = []
              selectdata.forEach((item)=>{
                  tmp.push(item.PropertyList.ZIndex)
              })
          childElement(undefined,undefined,'all')
    setClass(tmp)
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
 
}
// 向下一级
onebottom = function(){
  let daitiarr = JSON.parse(JSON.stringify(selectdata))
  daitiarr.sort((a,b)=>{
    return a.PropertyList.ZIndex - b.PropertyList.ZIndex;
  })
  let arr = []
  let arr1 = []
  let arr2 = []
  let arr3 = []
  Controls.ControlList.forEach((item1,index)=>{
     arr.push(item1.PropertyList.ZIndex)
     arr2.push(item1.PropertyList.ZIndex)
     let obj = {
       index:index,
       zindex:item1.PropertyList.ZIndex
     }
     arr3.push(obj)
  })
  
  if(arr.length!==daitiarr.length){
    arr.sort((a,b)=>{
      return a - b;
    })
    arr2.sort((a,b)=>{
      return a - b;
    })
    daitiarr.forEach((item,index)=>{  
      arr1.push(item.PropertyList.ZIndex) 
         })
         
         recursion1(arr,arr1)
      
            let Arr2 = []
             for(let k=0;k<arr.length;k++){
               for(let f=0;f<arr3.length;f++){
                  if(arr3[f].zindex == arr[k]){
                   Arr2.push(arr3[f])
                   continue;
                  }
               }
             }
             for(let h=0;h<arr2.length;h++){
                Arr2[h].zindex = arr2[h]
             }
                 Arr2.forEach((item)=>{
            console.log(item)
             if(Controls.ControlList[item.index].PropertyList.ZIndex!==item.zindex){
              Controls.ControlList[item.index].PropertyList.ZIndex = item.zindex;
             
             }
          })
          Controls.ControlList.forEach((item)=>{
            selectdata.forEach((item1,index)=>{
              if(item.Name == item1.Name){
                item1.PropertyList.ZIndex = item.PropertyList.ZIndex;
                localdata.ControlList[index].PropertyList.ZIndex = item.PropertyList.ZIndex;
              }
            })
          })

            let tmp = []
    selectdata.forEach((item)=>{
        tmp.push(item.PropertyList.ZIndex)
    })
childElement(undefined,undefined,'all')
    setClass(tmp)
  }
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
}
// 删除
deletediv = function(){
  localdata.ControlList.forEach((item,index)=>{
    $(`.commonModule[data-id=${item.PropertyList.ZIndex}]`).remove()
  })
  selectdata.forEach((item,index1)=>{
  Controls.ControlList.forEach((item1,index)=>{
    if(item.Name == item1.Name){
      deleteData(item.ControlType,item.Name)
      Controls.ControlList.splice(index, 1)
   
      
    }
  })
})
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
initCommon()
back(selectdata, Controls)
}
//删除图表数据
function deleteData(type,name){
  console.log(type)
  console.log(name)
  let pieData = Controls.Data.PieChartItemList
  let DashBoarData = Controls.Data.DashBoardChartItemList
  let LineData = Controls.Data.LineChartItemList
  let BarData = Controls.Data.BarChartItemList
  if(type == 'piechart'){
    for(let i=0;i<pieData.length;i++){
      if(name == pieData[i].name){
        Controls.Data.PieChartItemList.splice(i,1)
      }
    }
  }else if(type == 'dashboardchart'){
    for(let i=0;i<DashBoarData.length;i++){
      if(name == DashBoarData[i].name){
        Controls.Data.DashBoardChartItemList.splice(i,1)
      }
    }
  }else if(type == 'barchart'){
    for(let i=0;i<BarData.length;i++){
      if(name == BarData[i].name){
        Controls.Data.BarChartItemList.splice(i,1)
      }
    }
  }else if(type == 'linechart'){
    for(let i=0;i<LineData.length;i++){
      if(name == LineData[i].name){
        Controls.Data.LineChartItemList.splice(i,1)
      }
    }
  }
  
}

// 复制
copy = function(){
  if(localdata.length==0){
    return
  }
 copydata = JSON.parse(JSON.stringify(localdata))
 cutdata = {ControlList:[]}

 
}
// 粘贴
paste = function(){
  if(copydata.ControlList.length==0&&cutdata.ControlList.length==0){
    return
  }
  if(copydata.ControlList.length!==0){
    let zindex = 0
    let index1 = 0
    let id  = 0
    selectdata = []
    localdata.ControlList = []
    Controls.ControlList.forEach((item1,index)=>{
      if(zindex<=item1.PropertyList.ZIndex){
        zindex = item1.PropertyList.ZIndex
      }
      if(index1<=item1.index){
        index1 = item1.index
      }
      if(id<=item1.PropertyList.id){
        id = item1.PropertyList.id
      }
    })
    let parr  = []
    let parr1  = []
    let darr  = []
    let barr  = []
    let larr  = []
    copydata.ControlList.forEach((item,index2)=>{
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name){
          let item2 = JSON.parse(JSON.stringify(item1))
          if(item.ControlType == 'piechart' ){
             copydata.Data.PieChartItemList.forEach((item4)=>{
               if(item.Name = item4.name){
                 let item5 = JSON.parse(JSON.stringify(item4))
                 item5.name =  item2.ControlType + (id+1+index2)
                 if(parr1.indexOf(item5.name)<=-1){
                  parr.push(item5)
                  parr1.push(item5.name)
                 }
               }
             })
          }else  if(item.ControlType == 'dashboardchart'){ 
          copydata.Data.DashBoardChartItemList.forEach((item4)=>{
            if(item.Name = item4.name){
              let item5 = JSON.parse(JSON.stringify(item4))
              item5.name =  item2.ControlType + (id+1+index2)
              if(parr1.indexOf(item5.name)<=-1){
                darr.push(item5)
               parr1.push(item5.name)
              }
            
             
            }
          })
       }else  if(item.ControlType == 'barchart'){  
       copydata.Data.BarChartItemList.forEach((item4)=>{
         if(item.Name = item4.name){
           let item5 = JSON.parse(JSON.stringify(item4))
           item5.name =  item2.ControlType + (id+1+index2)
           if(parr1.indexOf(item5.name)<=-1){
            barr.push(item5)
            parr1.push(item5.name)
           }
         }
       })
    }else if(item.ControlType == 'linechart'){
    copydata.Data.LineChartItemList.forEach((item4)=>{
      if(item.Name = item4.name){
        let item5 = JSON.parse(JSON.stringify(item4))
        item5.name =  item2.ControlType + (id+1+index2)
        if(parr1.indexOf(item5.name)<=-1){
         larr.push(item5)
         parr1.push(item5.name)
        }
      
       
      }
    })
 }
        }
      })
    })
    let arr = []
    copydata.ControlList.forEach((item,index2)=>{
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name){
          let item2 = JSON.parse(JSON.stringify(item))
          item2.PropertyList.Top = item2.PropertyList.Top+20;
          item2.PropertyList.Left = item2.PropertyList.Left+20;
          item2.PropertyList.ZIndex = zindex+index2+1
          item2.index = index1+index2+1
          item2.Name = item2.ControlType + (id+1+index2)
          item2.PropertyList.id = id+1+index2
          arr.push(item2)
        }
      })
     })
     Controls.ControlList =   Controls.ControlList.concat(arr)
     localdata.ControlList = localdata.ControlList.concat(arr)
     copydata.ControlList = JSON.parse(JSON.stringify(arr))
     changeCommon({...Controls.ControlList[  Controls.ControlList.length-1].PropertyList, ControlType: Controls.ControlList[  Controls.ControlList.length-1].ControlType},   Controls.ControlList.length-1)
     parr = [... new Set(parr)]
     darr = [... new Set(darr)]
     barr = [... new Set(barr)]
     larr = [... new Set(larr)]
     Controls.Data.PieChartItemList =  Controls.Data.PieChartItemList.concat(parr)
     localdata.Data.PieChartItemList = localdata.Data.PieChartItemList.concat(parr)
     Controls.Data.DashBoardChartItemList =  Controls.Data.DashBoardChartItemList.concat(darr)
     localdata.Data.DashBoardChartItemList = localdata.Data.DashBoardChartItemList.concat(darr)
     Controls.Data.BarChartItemList =  Controls.Data.BarChartItemList.concat(barr)
     localdata.Data.BarChartItemList = localdata.Data.BarChartItemList.concat(barr)
     Controls.Data.LineChartItemList =  Controls.Data.LineChartItemList.concat(larr)
     localdata.Data.LineChartItemList = localdata.Data.LineChartItemList.concat(larr)
       let tmp = []
      copydata.ControlList.forEach((item)=>{
               tmp.push(item.PropertyList.ZIndex)
          })
      childElement()
      let PieChartNameData = []
      let DNameData = []
      let BNameData = []
      let LNameData = []
      localdata.ControlList.forEach((item1)=>{
        localdata.Data.PieChartItemList.forEach((item)=>{
          if(item1.Name == item.name){
            if(PieChartNameData.indexOf(item.name)<0){
              PieChartNameData.push(item.name)
            }
           
          }
       
        })
      })
      localdata.ControlList.forEach((item1)=>{
        localdata.Data.DashBoardChartItemList.forEach((item)=>{
          if(item1.Name == item.name){
            if(DNameData.indexOf(item.name)<0){
              DNameData.push(item.name)
            }
           
          }
       
        })
      })
      localdata.ControlList.forEach((item1)=>{
        localdata.Data.BarChartItemList.forEach((item)=>{
          if(item1.Name == item.name){
            if(BNameData.indexOf(item.name)<0){
              BNameData.push(item.name)
            }
           
          }
       
        })
      })
      localdata.ControlList.forEach((item1)=>{
        localdata.Data.LineChartItemList.forEach((item)=>{
          if(item1.Name == item.name){
            if(LNameData.indexOf(item.name)<0){
              LNameData.push(item.name)
            }
           
          }
       
        })
      })
     PiechartEcharts(localdata.Data.PieChartItemList,PieChartNameData)
     DashChartDataFun(localdata.Data.DashBoardChartItemList,DNameData)
     BarChartDataFun(localdata.Data.BarChartItemList,BNameData)
     LineChartDataFun(localdata.Data.LineChartItemList,LNameData)
      setClass(tmp) 
      back(selectdata, Controls)
  }else if(cutdata.length!==0){
  
     cutdata.ControlList.forEach((item,index2)=>{
      Controls.ControlList.forEach((item1,index)=>{
        if(item.Name == item1.Name){
          item1.PropertyList.Top = item1.PropertyList.Top+20;
          item1.PropertyList.Left = item1.PropertyList.Left+20;
          item.PropertyList.Top = item1.PropertyList.Top+20;
          item.PropertyList.Left = item1.PropertyList.Left+20;
          changeCommon({...item1.PropertyList, ControlType: item1.ControlType},index)
        
        }
      })
     })
       let tmp = []
          selectdata.forEach((item)=>{
             tmp.push(item.PropertyList.ZIndex)
          })
      childElement()
      let PieChartNameData = []
      let DNameData = []
      let BNameData = []
      let LNameData = []
      localdata.ControlList.forEach((item1)=>{
        localdata.Data.PieChartItemList.forEach((item)=>{
          if(item1.Name == item.name){
            if(PieChartNameData.indexOf(item.name)<0){
              PieChartNameData.push(item.name)
            }
           
          }
       
        })
      })
      localdata.ControlList.forEach((item1)=>{
        localdata.Data.DashBoardChartItemList.forEach((item)=>{
          if(item1.Name == item.name){
            if(DNameData.indexOf(item.name)<0){
              DNameData.push(item.name)
            }
           
          }
       
        })
      })
      localdata.ControlList.forEach((item1)=>{
        localdata.Data.BarChartItemList.forEach((item)=>{
          if(item1.Name == item.name){
            if(BNameData.indexOf(item.name)<0){
              BNameData.push(item.name)
            }
           
          }
       
        })
      })
      localdata.ControlList.forEach((item1)=>{
        localdata.Data.LineChartItemList.forEach((item)=>{
          if(item1.Name == item.name){
            if(LNameData.indexOf(item.name)<0){
              LNameData.push(item.name)
            }
           
          }
       
        })
      })
     PiechartEcharts(localdata.Data.PieChartItemList,PieChartNameData)
     DashChartDataFun(localdata.Data.DashBoardChartItemList,DNameData)
     BarChartDataFun(localdata.Data.BarChartItemList,BNameData)
     LineChartDataFun(localdata.Data.LineChartItemList,LNameData)
          setClass(tmp)
      back(selectdata, Controls)
      setTimeout(()=>{
        cutdata = JSON.parse(JSON.stringify(localdata))
     })
  }
  
}
// 储存撤销的数据
back = function(data,data2){
  revoke.push(JSON.parse(JSON.stringify(data2)))
  if(revoke.length>4){
    revoke.shift()
  }
  firstback = true
}
// 恢复
backgo = function(){
 if(recovery.length>=1){
   if(!recovery[recovery.length-1]){
    Controls = {
      ControlList: [],
      Data:{}
    }
    localdata = {
      ControlList: [],
      Data:{}
    }
    
   }else{
     Controls = JSON.parse(JSON.stringify(recovery[recovery.length-1]))
     localdata= JSON.parse(JSON.stringify(recovery[recovery.length-1]))
   }
   firstback = true
   revoke = (JSON.parse(JSON.stringify(backtmp)))
   if(revoke.length>4){
     revoke.shift()
   }
   if(revoke[revoke.length-1] == []){
    revoke = [[]]
  }
  childElement('index',undefined,'all')
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
  recovery.pop()
 }
}
// 撤销
goback = function(){
  
  if(revoke.length<1){
    return
  }
  var end = '不加'
  recovery.push(JSON.parse(JSON.stringify(revoke[revoke.length-1])))
  if(firstback){
    backtmp   = JSON.parse(JSON.stringify(revoke))
    revoke.pop()
    if(revoke.length == 0){
      recovery.pop()
      return
    }
    end = JSON.parse(JSON.stringify(revoke[revoke.length-1]))
  }
  if(!revoke[revoke.length-1]){
    enddata = []
  }else{
      Controls = JSON.parse(JSON.stringify(revoke[revoke.length-1]))
      localdata = JSON.parse(JSON.stringify(revoke[revoke.length-1]))
   
  }
  if(Controls.length == 0){
    Controls = {
      ControlList: [],
      Data:{
        BarChartItemList:[],
        DashBoardChartItemList:[],
        LineChartItemList:[],
        PieChartItemList:[]
      }
    }
    localdata = {
      ControlList: [],
      Data:{
        BarChartItemList:[],
        DashBoardChartItemList:[],
        LineChartItemList:[],
        PieChartItemList:[]
      }
    }
  }
  console.log(Controls)
  childElement('index',undefined,'all')
  setTimeout(()=>{
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  },300)
  revoke.pop()
  if(end!=='不加'){
    revoke.push(end)
  }
}
// 剪切
cut = function(){
  if(localdata.length==0){
    return
  }
  cutdata = JSON.parse(JSON.stringify(localdata))
  copydata = {ControlList:[]}
}
document.onkeydown = function(e){
  if(e.keyCode == 46){
    deletediv()
  }
  if(window.event.ctrlKey){
    if(e.keyCode == 67){
      copy()
    }else if(e.keyCode == 86){
      paste()
    }else if(e.keyCode == 88){
      cut()
    }else if(e.keyCode == 90){
      goback()
    }else if(e.keyCode == 89){
       backgo()
    }
  }
}
olclick = function(){
  $('#coverol').toggle()
  $('.select-pass').toggle()

  if(viewpass.length>1){
    Controls.ControlList.forEach((item)=>{
   
       item.PropertyList.Width =  item.PropertyList.Width/(parseFloat(viewpass[viewpass.length-1]))
       console.log(viewpass[viewpass.length-1])
      item.PropertyList.Height = item.PropertyList.Height/(parseFloat(viewpass[viewpass.length-1]))
    })
  }
 
}
olloclick = function(a,event){

  $('#coverol').hide()
 $(a).siblings('li').removeClass('selected')
 $(a).attr('class','selected')
 $('.viewpass')[0].innerText = $(a).attr('name')
 viewpass.push((parseInt($(a).attr('name'))/100))
 if(viewpass.length>2){
   viewpass.shift()
 }
 Controls.ControlList.forEach((item)=>{

   item.PropertyList.Width =   item.PropertyList.Width*(parseInt($(a).attr('name'))/100)
   item.PropertyList.Height = item.PropertyList.Height*(parseInt($(a).attr('name'))/100)
 })
childElement('index',undefined,'all')
setTimeout(()=>{
  PieChartDataFun()
  DashChartDataFun()
  BarChartDataFun()
  LineChartDataFun()
},300)
back(selectdata, Controls)
event.stopImmediatePropagation()
}
hidecover = function(){
  $('#coverol').hide()
  $('.select-pass').hide()

}
})()