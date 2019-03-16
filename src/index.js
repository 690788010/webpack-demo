// import './style.css';

// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);

// btn.onclick = function() {
//     var div = document.createElement('div');
//     div.innerHTML = 'item';
//     document.body.appendChild(div);
// }

import counter from './counter.js';
import number from './number.js';

counter();
number();

// css-loader和VueLoader都帮我们写了以下这部分代码。
// 但是，如果项目中有比较偏的数据，则需要自己写下面这样的HMR代码
if(module.hot){         // 如果开启了模块热替换功能
    // 监听number模块是否发生变化
    module.hot.accept('./number', () => {
        document.body.removeChild(document.getElementById('number'));
        number();
    })
}
