export default class MyWebSocket {
    _onError
    _onClose
    _onConnect
    _onMessage
    _handle
    
    constructor () {
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
        if (this._handle) {
            return true;
        }
        let that = this
        this._handle = new WebSocket(host);
        //与WebSocket建立连接
        this._handle.onopen = function(event) {
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
            that._onMessage && that._onMessage(event);
        };
    }
    send(data) {
        if (typeof data == 'object') {
            data = JSON.stringify(data)
        }
        this._handle.send(data)
    }
}