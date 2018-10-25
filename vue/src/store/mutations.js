import Vue from 'vue'
const mutations = {
    updateStatus(state, val) {
        state.netStatus = val
    },
    msg(state, msg) {
        state.msg = msg
    },
    MEMBER_INFO_SEND(state, data) {
        state.userInfo = data
    },
    CONVERSATION_LIST_SEND(state, data) {
        if (JSON.stringify(data) == '[]') {
            data = {}
        }
        state.msgList = data
    },
    CUR_CONVERSATION(state, data) {
        Vue.set(state.msgList, data.union_id, data)
        console.log(state.msgList)
    },
    FRIEND_LIST_SEND(state, data) {
        state.contacts = data
    },
    addPeoples(state, data) {
        state.addPeoples = data
    },
    requestPeoples(state, data) {
        state.requestPeoples = data
    },
    FRIEND_FINDUSER_SEND(state, data) {
        Vue.set(state.addPeoples, data.union_id, data)
    },
    FRIEND_ADD_RECV(state, data) {
        Vue.set(state.requestPeoples, data.union_id, data)
    },
    FRIEND_SUREADD_SEND(state, data) {
        state.contacts.push(data)

        Vue.set(state.requestPeoples[data], 'is_friend', true)
        if (state.addPeoples[data]) {
            Vue.set(state.addPeoples[data], 'is_friend', true)
        }
    },
    FRIEND_SUREADD_RECV(state, data) {
        state.contacts.push(data)
        Vue.set(state.addPeoples[data.union_id], 'is_friend', true)
        if (state.requestPeoples[data.union_id]) {
            Vue.set(state.requestPeoples[data.union_id], 'is_friend', true)
        }
    }
}

export default mutations