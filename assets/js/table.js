// 获取表格元素
const tables = document.getElementsByTagName('table');
for (const table of tables) {
  // 使用querySelectorAll结合CSS选择器获取第一列的td元素
  const firstColumnTds = table.querySelectorAll('tr td:first-child');
  // 可以遍历获取到的元素集合，添加class
  firstColumnTds.forEach(td => {
    td.classList.add('space-no-wrap');
  });
}
