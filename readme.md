## autoMail

### 安装

```js
//安装
npm install vue-auto-mail --save

//mian.js 引入注册
import autoMail from 'vue-auto-mail'
Vue.directive('autoMail', autoMail)
```

### 功能简介
邮箱后缀补全:<br>
![](https://user-gold-cdn.xitu.io/2020/2/26/17080ab8cbef5a27?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

已集成功能：
* 输入自动过滤
* 回车选择，上下选择
* 失去焦点自动填充（模仿的163邮箱登录）
* 支持自定义邮箱类型
* 支持邮箱选择距离元素top自定义


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