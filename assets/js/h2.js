document.addEventListener('DOMContentLoaded', () => {
 // 获取所有 h2 标签
 const headings = document.querySelectorAll('h2');

 // 遍历每个 h2
 headings.forEach((h2, index) => {
 // 创建一个新的 div 容器
 const wrapper = document.createElement('div');
 wrapper.classList.add('h2-section');

 // 将当前 h2 插入到新 div 中
 h2.parentNode.insertBefore(wrapper, h2);
 wrapper.appendChild(h2);

 // 包裹 h2 到下一个 h2 之间的所有元素
 let nextSibling = wrapper.nextSibling;
 while (nextSibling && nextSibling !== headings[index + 1]) {
 const current = nextSibling;
 nextSibling = nextSibling.nextSibling; // 提前保存下一个节点
 wrapper.appendChild(current); // 移动当前节点到 wrapper 中
 }
 });
});
