import Vue from 'vue'
import '../env'
import devConf from './dev'
import producationConf from './producation'
import websocket from '../libs/websocket'


if (Vue.ENV_PRODUCATION) {
    Vue.prototype.imgHost = 'https://baidu.com/uploads/'
    Vue.prototype.uploadApiHost = 'https://baidu.com/upload/kc/system/upload'
    Vue.prototype.ApiHost = 'https://api.com/chat/'
    Vue.ApiHost = 'https://api.com/chat/'
    Vue.prototype.G = producationConf
} else {
    Vue.prototype.imgHost = 'https://baidu.com/uploads/'
    Vue.prototype.uploadApiHost = 'https://baidu.com/upload/kc/system/upload'
    Vue.prototype.ApiHost = 'https://api.com/chat/'
    Vue.ApiHost = 'https://api.com/chat/'
    Vue.prototype.G = devConf
}


// // 图片懒加载
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload, {
//     error: require('../assets/images/error.png'),
//     loading: require('../assets/images/load.gif'),
//     attempt: 3
// })


// 输入框和键盘问题
if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener('resize', function() {　　
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {　　
            window.setTimeout(function() {　　　　　　　　　
                document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
        }
    })
}


// 点击后等待请求完成才可以再点击  利用自定义指令实现        使用时需要在标签上添加v-submit    现在限于button
Vue.submit = function() {
    if (Vue.el) {
        Vue.el.setAttribute('class', 'yd-btn-disabled ' + Vue.elClass)
    }
}

Vue.unSubmit = function() {
    if (Vue.el) {
        Vue.el.setAttribute('class', Vue.elClass)
    }
}

Vue.directive('submit', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el) {
        Vue.el = el
        Vue.elClass = el.getAttribute('class')
    },
    unbind: function() {
        Vue.el = null
        Vue.elClass = ''
    }
})

Vue.prototype.websocket = new websocket();