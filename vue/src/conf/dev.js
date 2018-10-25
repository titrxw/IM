import BaseConf from './base'

const devConfig = {...BaseConf,
    WEBSOCKET_HOST: 'ws://192.168.2.102:8081/chat/'
}

export default devConfig