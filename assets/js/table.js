// 获取表格元素
const tables = document.getElementsByTagName('table');
for (const table of tables) {
  const d = document.createElement('div');
  d.classList.add('table-container')
  table.parentNode.insertBefore(d, table);
  d.appendChild(table);
  // 使用querySelectorAll结合CSS选择器获取第一列的td元素
  const firstColumnTds = table.querySelectorAll('tr td:first-child');
  // 可以遍历获取到的元素集合，添加class
  firstColumnTds.forEach(td => {
    td.classList.add('space-no-wrap', 'vocabulary');
  });
}
