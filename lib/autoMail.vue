<template>
    <div class="autoMail-box" v-if="filterMails.length > 0" :style="styles">
        <ul>
            <li v-for="(mail, index) in filterMails" @mouseover="current = index" :class="{current: index == current}"  :key="mail" @click="chooseMail">{{prefix(value) + mail}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                mailList: [],
                value: '',
                current: 0,   // 当前选中的mail类型
            }
        },
        computed: {
            filterMails () {
                // 根据输入的值 过滤邮箱
                let value = this.value
                let inx = value.indexOf('@')
                if (inx <= 0) return this.mailList
                let suffix = value.substr(inx+1)
                return this.mailList.filter(mail => mail.indexOf(suffix) >= 0)
            }
        },
        watch: {
            "value" () {
                this.current = 0
            }
        },
        methods: {
            prefix (value) {
                // 获取前缀
                let inx = value.indexOf('@')
                if (inx <= 0) return `${value}@`
                let prefix = value.substr(0, inx)
                return `${prefix}@`
            },
            chooseMail (event) {
                // 选择邮箱li
                let value = event.target.innerHTML
                this.inserValue(value)
            },
            setDefaultValue () {
                // 失去焦点，给默认的值给input框
                let value = this.$el.querySelector("li.current").innerHTML
                this.inserValue(value)
            },
            switchKey (event) {
                // 当获得焦点 上下 和 回车事件
                let keyCode = event.keyCode
                switch (keyCode) {
                    case 13:  // 回车
                        this.setDefaultValue()
                        break
                    case 38:  // up
                        if (this.current == 0) {
                            this.current = this.filterMails.length - 1
                            return
                        }
                        this.current--
                        break
                    case 40:  // down
                        if (this.current == this.filterMails.length - 1) {
                            this.current = 0
                            return
                        }
                        this.current++
                        break
                }
            }
        }
    }
</script>

<style scoped>
.autoMail-box {
    position: absolute;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    margin: 0;
    padding: 10px;
}
.autoMail-box ul {
    list-style: none;
    min-width: 200px;
    margin: 0;
    padding: 0;
}
.autoMail-box ul li {
    color: #333;
    margin: 0;
    padding: 0;
    line-height: 30px;
    padding: 0 10px;
}
.autoMail-box ul li.current {
    background-color: lightblue;
}
</style>