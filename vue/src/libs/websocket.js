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

    __onMessage(data, action) {
        if (action == 'CONVERSATION_LIST_SEND') {
            store.commit(action, data)
        } else if (action == 'FRIEND_LIST_SEND') {
            store.commit(action, data)
        } else if (action == 'FRIEND_ADDLOG_SEND') {
            if (data.add) {
                for (let index in data.add) {
                    data.add[index].is_friend = data.add[index].status == 1 ? false : true
                }
                store.commit('addPeoples', data.add)
            }
            if (data.request) {
                for (let index in data.request) {
                    data.request[index].is_friend = data.request[index].status == 1 ? false : true
                }
                store.commit('requestPeoples', data.request)
            }
        } else if (action == "FRIEND_FINDUSER_SEND") {
            if (!data) {
                return false;
            }
            store.commit(action, data)
        } else if (action == "FRIEND_ADD_SEND") {
            store.commit("msg", "添加好友请求发送成功");
        } else if (action == "FRIEND_ADD_RECV") {
            // 收到添加好友请求
            data.is_friend = false;
            store.commit(action, data)
        } else if (action == "FRIEND_SUREADD_SEND") {
            // data 为 uid
            // 更改 requestPeople 的status
            store.commit(action, data)
            store.commit("msg", "添加好友成功");
        } else if (action == "FRIEND_SUREADD_RECV") {
            // 收到添加好友请求
            // data.uid 为好友的id
            // 更改addPeoples的status
            store.commit(action, data)
        } else if (action == 'MEMBER_INFO_SEND') {
            store.commit(action, data)
        } else if (action == 'CONVERSATION_TEXT_SEND' || action == 'CONVERSATION_TEXT_RECV') {
            store.commit('CUR_CONVERSATION', data)
        }
        this._onMessage && this._onMessage(data, action);
    }

    connect(host) {
        console.log(this._handle)
        if (this._handle) {
            return true;
        }
        let that = this
            // if (!user.getToken()) {
            //     user.unlogin()
            //     router.replace({
            //         path: '/login'
            //     })
            //     return false;
            // }
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
            let data = {}
            if (event.data) {
                try {
                    data = JSON.parse(event.data)
                } catch (e) {
                    store.commit('msg', '数据格式错误' + event.data)
                }
                switch (data.ret) {
                    case 200:
                        that.__onMessage(data.data, data.action);
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
                        that.__onMessage(data.data, data.action);
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