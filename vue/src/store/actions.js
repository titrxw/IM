export default {
  getUserInfo = ({
    commit,
    state
  }, websocket) => {
    if (JSON.stringify(state.userInfo) == "{}") {
      websocket.send({
        action: "MEMBER_INFO"
      });
    }
  },
  getAddLogs = ({
    commit,
    state
  }, websocket) => {
    if (JSON.stringify(state.addPeoples) == '{}' || JSON.stringify(state.requestPeoples) == '{}') {
      websocket.send({
        action: "FRIEND_ADDLOG"
      });
    }
  },
  getFriendList = ({
    commit,
    state
  }, websocket) => {
    if (state.contacts.length == 0) {
      websocket.send({
        action: "FRIEND_LIST"
      });
    }
  },
  getMsgList = ({
    commit,
    state
  }, websocket) => {
    if (JSON.stringify(state.msgList) == '{}') {
      websocket.send({
        action: "CONVERSATION_LIST"
      });
    }
  },
}
