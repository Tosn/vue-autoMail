import autoMailComponent from './autoMail.vue'
import Vue from 'vue'
const defaultMails = [
    'qq.com',
    '163.com',
    '126.com',
    'sina.com',
    'sohu.com',
    'yahoo.cn',
    'gmail.com',
    'hotmail.com',
    'live.cn'
]


const OFFSET_TOP = 10  // 偏移默认值
/**
 * @description -弹出位置定位
 * @author Tosn
 * @param {*} el
 * @returns {Object} -styles
 */
function mailBoxStyle (el) {
    let offset_top = Number(el.getAttribute("data-offset")) || OFFSET_TOP
    let left = el.offsetLeft
    let top = el.offsetTop
    let height = el.offsetHeight

    return {
        left: left + 'px',
        top: top + height + offset_top + 'px'
    }
}
/**
 * @description -判断dom中是否已存在元素node
 * @author Tosn
 * @param {*} node
 * @returns {Boolean}
 */
function hasNode (node) {
    return document.body.contains(node)
}

/**
 * @description -构建mail的list下拉
 * @author Tosn
 * @param {*} el -当前激活元素
 * @param {*} mails -邮件的类型
 * @param {*} $instance -vue虚拟dom实例
 */
function createMailHtml (el, mails, $instance) {
    $instance.mailList = mails
    $instance.value = el.value
    if (!hasNode($instance.$el)) {
        document.body.appendChild($instance.$el)
        $instance.styles = mailBoxStyle(el)
    }
}

/**
 * @description -删除邮箱dom
 * @author Tosn
 * @param {*} $instance  -vue虚拟实例
 */
function removeMailHtml ($instance) {
    if (hasNode($instance.$el)) {
        document.body.removeChild($instance.$el)
    }
}

export default {
    inserted (el, binding) {
        let {value: mails} = binding
        mails = mails || defaultMails
        let AutoMailContainer = Vue.extend(autoMailComponent)
        let $instance = new AutoMailContainer().$mount()

        // 给当前input塞值
        $instance.inserValue = (val) => {
            el.value = val
            // 绑定值 手动触发一次@input 使其变成双向绑定
            const event = document.createEvent('HTMLEvents')
            event.initEvent('input', false, true)
            el.dispatchEvent(event)
        }

        $instance.removeMailHtml = function () {
            removeMailHtml($instance)
        }

        el.addEventListener('keyup', function (event) {
            // 如果value 是空的 则不显示 邮箱下拉
            if (el.value.trim() == '' || event.keyCode == 13) {
                removeMailHtml($instance)
                return
            }
            createMailHtml(el, mails, $instance)
        })

        // 获得焦点  回车、上、下绑定事件
        el.addEventListener('focus', function () {
            document.addEventListener('keydown', $instance.switchKey, false)
        })

        el.addEventListener('blur', function () {
            // 失去焦点 解除绑定事件
            document.removeEventListener('keydown', $instance.switchKey, false)
            setTimeout(() => {
                if (hasNode($instance.$el)) {
                    $instance.setDefaultValue()
                }
                $instance.removeMailHtml($instance)
            }, 200)
        })
    }
}