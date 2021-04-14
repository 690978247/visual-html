/* 此处为右侧数据交互事件部分 */

 /* 1.数值显示组件 */
// 指定条件初始化
// 表格table
// let data = []
let check = ''
function initCondition (index) {
let pop = document.getElementById('additionPop')
let tbody = document.getElementById('func-tbody')
let str = ``
console.log('[[pp',Controls)
console.log('[[pp',Controls.ControlList[index].DataList)
if(Controls.ControlList[index].DataList){
  Controls.ControlList[index].DataList.forEach ((item, i) => {
    str += `<tr>
      <td rowspan="1" colspan="1"><div>${i + 1}</div></td>  
      <td rowspan="1" colspan="1"><div>${Controls.ControlList[index].Variate}</div></td>  
      <td rowspan="1" colspan="1"><div>${item.flag}</div></td>  
      <td rowspan="1" colspan="1"><div>${item.num}</div></td>  
      <td rowspan="1" colspan="1"><div class="table-back-color"><span style="background: ${item.backColor}" ></span></div></td>  
      <td rowspan="1" colspan="1" class="table-icon-del" ><i onclick="delRow(${i}, ${index})" class="iconfont iconshanchu" ></i></td>  
    </tr>
    `
  })
  tbody.innerHTML = str
}
}

// 打开选择变量弹窗
function openPop (index) {
  pageData.pageIndex = 1
  let popup = document.getElementById('popup')
  let tbody = document.getElementById('popup-tbody')
  let html = ``
  popup.style.display = 'block'
  check = Controls.ControlList[index].Variate
  pageData.totalPage = Math.ceil(tableData.length / pageData.pageSize )
  let data = homePage () // 此处调用分页方法获取data数据
   /* 表格部分 */
  data.forEach((item,i) => {
    html += `<tr>
      <td rowspan="1" colspan="1" class="table-checkbox" ><div><input type="checkbox" name="pop-check" ${Controls.ControlList[index].Variate === item.data2 ? 'checked' : ''} onchange="choiceRow(event, ${i}, ${index})" ></div></td>
      <td rowspan="1" colspan="1"><div>${item.data1}</div></td>
      <td rowspan="1" colspan="1"><div>${item.data2}</div></td>
      <td rowspan="1" colspan="1"><div>${item.data3}</div></td>
      <td rowspan="1" colspan="1"><div>${item.data4}</div></td>
      <td rowspan="1" colspan="1"><div>${item.data5}</div></td>
      <td rowspan="1" colspan="1"><div>${item.data6}</div></td>
      <td rowspan="1" colspan="1"><div>${item.data7}</div></td>
      <td rowspan="1" colspan="1"><div>${item.data8}</div></td>
      <td rowspan="1" colspan="1"><div>${item.data9}</div></td>
    </tr>`
  })
  tbody.setAttribute('data-index', index)
  tbody.innerHTML = html
  // 设置默认勾选
  var list = document.getElementsByName("pop-check");
  list.forEach((item, i) => {
    if (tableData[i] === Controls.ControlList[index].Variate) {
      item.checked = true
    }
  })
  /* 渲染生成分页部分 */
  renderPagination (index, 'popup-pagination')
  renderLis ()
}
// 关闭选择变量弹窗
function closePopup (e) {
  let popup = document.getElementById('popup')
  popup.style.display = 'none'
}
// 表格删除行
function delRow (i, index) {
  Controls.ControlList[index].DataList.splice(i, 1)
  initCondition(index)
}
// 表格checkbox 选中
function choiceRow (event, i, index) {
  // let index = (pageData.pageIndex * pageData.pageSize) + i
  let  num =  ((pageData.pageIndex - 1) * pageData.pageSize) + i
  var list = document.getElementsByName("pop-check");
  if (event.target.checked === true) {
      list.forEach(item => {
        item.checked = false
      })
      event.target.checked = true
      check = tableData[num].data2
    } else {
      Controls.ControlList[index].Variate = ''
    }
}
// 提交变量
function confirmPop () {
  let popup = document.getElementById('popup')
  let tbody = document.getElementById('popup-tbody') 
  let list = document.getElementsByName("pop-check");
  let index = tbody.dataset.index
  list.forEach((item, i) => {
    if (item.checked === true) {
      let num = ((pageData.pageIndex - 1) * pageData.pageSize) + i
      Controls.ControlList[index].Variate = tableData[num].data2
    }
  })
  popup.style.display = 'none'
  choice('data', tbody.dataset.index)
}
// 打开添加条件弹窗
function openAddition (index) {
  let additionPop = document.getElementById('additionPop')
  let select = document.getElementById('form-select')
  if (Controls.ControlList[index].Variate) {
    select.value = ''
    additionPop.setAttribute('data-index', index)
    additionPop.style.display = 'block'
    setTimeout(()=>{
      Colorpicker.create({
        el: "formColor",
        color: '#000000',
        change: function (elem, hex,rgba) {
          elem.style.backgroundColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
          // Controls.ControlList[index].PropertyList.BorderColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
          if((data.ControlType!='piechart'&&data.ControlType!='dashboardchart'&&data.ControlType!='barchart'&&data.ControlType!='linechart')){
            // childElement(index,'init')
            $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('borderColor',`rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')')
          }
        }
      })
    },50)
  } else {
    alert('请先选择变量！！')
  }
}
// 关闭添加条件弹窗
function closeAddtion () {
  let additionPop = document.getElementById('additionPop')
  let input = document.getElementById('form-input')
  let select = document.getElementById('form-select')
  select.value = ''
  input.value = ''
  additionPop.style.display = 'none'
}
function getFlag (value) {
  // let pop = document.getElementById('additionPop')
  // let index = pop.dataset.index
  // Controls.ControlList[index].DataList.flag = value
}
function getNum (e) {
  // let pop = document.getElementById('additionPop')
  // let index = pop.dataset.index
  // Controls.ControlList[index].DataList.num = e.target.value
}
// 提交条件数据
function confirmAddition (e) {
  let input = document.getElementById('form-input')
  let select = document.getElementById('form-select')
  let pop = document.getElementById('additionPop')
  let formColor = document.getElementById('formColor')
  let style = window.getComputedStyle(formColor)
  let index = pop.dataset.index
  if (input.value && select.value) {
    Controls.ControlList[index].DataList.push({
      flag: select.value,
      num: input.value,
      backColor: style.backgroundColor
    })
    closeAddtion()
    initCondition(index)
  } else {
    alert('条件或值不能为空')
  }
}