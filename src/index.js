import _ from 'lodash';
// css-loader 对引入的css进行解析
// require('./style.css')


// "CSS/" 为模块名(或别名)，在 webpack.config.js 中进行配置 (resolve属性)，映射的位置为 "src/css"
import 'CSS/style.css';
import 'CSS/another.css';

import printMe from 'JS/print.js';

const docBody = document.body;

// 创建一个div
const divEle = document.createElement('div');
// 使用lodash拼接字符串数组（并使用空格作为分隔符）
divEle.innerHTML = _.join(['Hello', 'webpack'], ' ');
// 将新建的div添加到 document.body 中
docBody.appendChild(divEle);

// 从style.css中加载的类
// divEle.classList.add('hello');
divEle.className = 'green';

const btn = document.createElement('button');
btn.innerHTML = 'Click Me';
btn.onclick = printMe;
docBody.appendChild(btn);


const div2 = document.createElement('div');
div2.innerHTML = '测试别名式导入'
div2.className = 'gray';
docBody.appendChild(div2);