## autoMail

### 安装

```js
//安装
npm install vue-auto-mail --save

//mian.js 引入注册
import autoMail from 'vue-auto-mail'
Vue.directive('autoMail', autoMail)
```

### 使用方法

默认使用
```html
<input v-autoMail>
```

使用指定的email后缀
```html
<input v-autoMail="[qq.com, 163.com]">
<!--v-autoMail 值传一个数组-->
```

指定autoMail距离input元素的上下位置
```html
<input v-autoMail data-offset="20">
<!--默认值是10  设置data-offset的值 需要是数字-->
```