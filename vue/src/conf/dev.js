import BaseConf from './base'

const devConfig = {...BaseConf,
    WEBSOCKET_HOST: 'ws://localhost:8081/chat/'
}

export default devConfig