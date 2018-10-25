const mutations = {
    updateStatus(state, val) {
        state.netStatus = val
    },
    msg(state, msg) {
        state.msg = msg
    },
    userInfo(state, data) {
        state.userInfo = data
    },
    CONVERSATION_LIST_SEND(state, data) {
        state.msgList = data
    },
    FRIEND_LIST_SEND (state, data) {
        state.contacts = data
    },
    addPeoples (state, data) {
        state.addPeoples = data
    },
    requestPeoples (state, data) {
        state.requestPeoples = data
    },
    FRIEND_FINDUSER_SEND (state, data) {
        state.addPeoples[data.union_id] = data
    },
    FRIEND_ADD_RECV (state, data) {
        state.requestPeoples[data.union_id] = data
    },
    FRIEND_SUREADD_SEND (state, data) {
        state.requestPeoples[data]['is_friend'] = true
        if (state.addPeoples[data]) {
            state.addPeoples[data]['is_friend'] = true
        }
    },
    FRIEND_SUREADD_RECV (state, data) {
        state.addPeoples[data.union_id]['is_friend'] = true
        if (state.requestPeoples[data.union_id]) {
            state.requestPeoples[data.union_id]['is_friend'] = true
        }
    }
}

export default mutations