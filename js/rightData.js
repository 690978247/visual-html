/* 此处为右侧数据交互事件部分 */

 /* 1.数值显示组件 */
// 指定条件初始化
function initCondition (index) {
let pop = document.getElementById('additionPop')
let tbody = document.getElementById('func-tbody')
let str = ``
Controls.ControlList[index].DataList.forEach ((item, i) => {
  str += `<tr>
    <td rowspan="1" colspan="1"><div>${i + 1}</div></td>  
    <td rowspan="1" colspan="1"><div>${Controls.ControlList[index].Variate}</div></td>  
    <td rowspan="1" colspan="1"><div>${item.flag}</div></td>  
    <td rowspan="1" colspan="1"><div>${item.num}</div></td>  
    <td rowspan="1" colspan="1"><div class="table-back-color"><span style="background: ${item.backColor}" ></span></div></td>  
  </tr>
  `
})
tbody.innerHTML = str
}

// 打开选择变量弹窗
function openPop (index) {
  tableData = [
    {
      data1: '基础采集点',
      data2: 'channeng1',
      data3: '产能1',
      data4: 'KW/h',
      data5: 'int',
      data6: '计算累计',
      data7: '力源',
      data8: 'Q102',
      data9: 'SYC20200305',
    },
    {
      data1: '基础采集点1',
      data2: 'bianliang2',
      data3: '变量2',
      data4: 'KW/h',
      data5: 'float',
      data6: '计算瞬时',
      data7: '力源',
      data8: 'Q102',
      data9: 'SYC20200305',
    }
  ]
  let popup = document.getElementById('popup')
  let tbody = document.getElementById('popup-tbody')
  let html = ``
  popup.style.display = 'block'
  tableData.forEach((item,i) => {
    html += `<tr>
      <td rowspan="1" colspan="1"><div><input type="checkbox" name="pop-check" ${Controls.ControlList[index].Variate === item.data2 ? 'checked' : ''} onchange="choiceRow(event, ${i}, ${index})" ></div></td>
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
}
// 关闭选择变量弹窗
function closePopup (e) {
  let popup = document.getElementById('popup')
  popup.style.display = 'none'
}
// 表格checkbox 选中
function choiceRow (event, i, index) {
  var list = document.getElementsByName("pop-check");
  if (event.target.checked === true) {
      list.forEach(item => {
        item.checked = false
      })
      event.target.checked = true
      Controls.ControlList[index].Variate = tableData[i].data2
    } else {
      Controls.ControlList[index].Variate = ''
    }
}
// 提交变量
function confirmPop () {
  let popup = document.getElementById('popup')
  let tbody = document.getElementById('popup-tbody') 
  popup.style.display = 'none'
  choice('data', tbody.dataset.index)
}
// 打开添加条件弹窗
function openAddition (index) {
  let additionPop = document.getElementById('additionPop')
  let select = document.getElementById('form-select')
  select.value = ''
  additionPop.setAttribute('data-index', index)
  additionPop.style.display = 'block'
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
  let index = pop.dataset.index
  if (input.value && select.value) {
    Controls.ControlList[index].DataList.push({
      flag: select.value,
      num: input.value,
      backColor: '#000'
    })
    closeAddtion()
    initCondition(index)
  } else {
    alert('条件或值不能为空')
  }
}