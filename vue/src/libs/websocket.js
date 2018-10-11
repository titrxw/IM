import store from '../store'
import user from '../beans/user'
import router from '../router'
export default class MyWebSocket {
    _onError
    _onClose
    _onConnect
    _onMessage
    _handle

    constructor() {
        this._onError = null;
        this._onClose = null;
        this._onConnect = null;
        this._onMessage = null;
        this._handle = null;
    }

    setOnConnect(callback) {
        if (typeof callback != 'function') return false;
        this._onConnect = callback;
    }
    setOnClose(callback) {
        if (typeof callback != 'function') return false;
        this._onClose = callback;
    }
    setOnError(callback) {
        if (typeof callback != 'function') return false;
        this._onError = callback;
    }
    setOnMessage(callback) {
        if (typeof callback != 'function') return false;
        this._onMessage = callback;
    }

    connect(host) {
        console.log(this._handle)
        if (this._handle) {
            return true;
        }
        let that = this
        if (!user.getToken()) {
            user.unlogin()
            router.replace({
                path: '/login'
            })
            return false;
        }
        host = host + '?uid=' + user.getToken()
        this._handle = new WebSocket(host);
        //与WebSocket建立连接
        this._handle.onopen = function(event) {
            that.send({
                'action': 'COMMON_USERBINDFD',
                'data': {
                    'uid': user.getToken()
                }
            });
            that._onConnect && that._onConnect(event);
        };
        //与WebSocket建立连接
        this._handle.onclose = function(event) {
            that._handle = null;
            that._onClose && that._onClose(event);
        };
        this._handle.onerror = function(event) {
            that._handle = null;
            that._onError && that._onError(event);
        };
        //处理服务器返回的信息
        this._handle.onmessage = function(event) {
            console.log(event)
            let data = {}
            if (event.data) {
                try {
                    data = JSON.parse(event.data)
                } catch (e) {
                    store.commit('msg', '数据格式错误' + event.data)
                }
                switch (data.ret) {
                    case 200:
                        that._onMessage && that._onMessage(data.data, data.action);
                        break;
                        // 业务需要 
                    case 302:
                        return false
                    case 300:
                        // 登录超时
                        user.unlogin()
                        router.replace({
                            path: '/login'
                        })
                        return false
                    case 404:
                        router.push({
                            path: '/404'
                        });
                        return false;
                    default:
                        if (data.ret) {
                            store.commit('msg', data.msg)
                            return false
                        }
                        that._onMessage && that._onMessage(data.data, data.action);
                }
            }
        };
    }
    send(data) {
        if (typeof data == 'object') {
            data = JSON.stringify(data)
        }
        this._handle.send(data)
    }
}