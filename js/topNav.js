/* 顶部导航栏事件 */
// 预览功能
function preview () {
  window.open('preview.html', '_parent')
  localStorage.setItem("CommonCanvas", JSON.stringify(commonList))
  localStorage.setItem("Controls", JSON.stringify(Controls))
}
// 保存功能
function save () {
  alert('保存成功！！')
  localStorage.setItem("CommonCanvas", JSON.stringify(commonList))
  localStorage.setItem("saveControls", JSON.stringify(Controls))
}
// 另存为
function saveAs () {
  alert('另存成功!!')
}
// 保存并发布
function savePublish () {
  alert('发布成功!!')
}