<template>
  <yd-layout>
    <chatItem v-for="(item, index) in chatItems" :key="index"   @resend="resend" :length="chatItems.length" :index="index" :item="item"></chatItem>
    <chatInput  slot="tabbar" @beforeSend="beforeSend"/>
  </yd-layout>
</template>
<script>
import chatItem from "./chat-item";
import chatInput from "./chat-input";
import { mapState,mapActions } from 'vuex'
import {
  CONVERSATION_TEXT,
  CONVERSATION_HISTORY,
  CONVERSATION_TEXT_SEND,
  CONVERSATION_TEXT_RECV,
  CONVERSATION_HISTORY_SEND
} from '../../../conf/constant'
export default {
  components: {
    chatItem,
    chatInput
  },
  data: function() {
    return {
      unionId: '',
      chatItems: [],
      pageHeight: 400
    };
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions(['getUserInfo']),
    beforeSend(data) {
      if (!this.websocket._handle) {
        return false;
      }
      data.headimgurl = this.userInfo.headimgurl
      data.isMy = true;
      data.sendStatus = "success";
      if (data.type == "image") {
        data.content = "https://zh5j.cn/uploads/" + data.content;
      }
      this.chatItems.push(data);
      this.websocket.send({
        'action': CONVERSATION_TEXT,
        data: {
          uid: this.unionId,
          text: data.content
        }
      })
    },
    resend(data) {},
    getConversations() {
      this.websocket.send({
        'action': CONVERSATION_HISTORY,
        'data': {
          uid:this.unionId,
          page : 1
        }
      })
    }
  },
  mounted () {
    this.unionId = this.$route.query.uid
    let self = this;
    this.websocket.setOnConnect(function (data, action) {
      self.getUserInfo(self.websocket)
      self.getConversations()
    })
    this.websocket.setOnMessage(function(data, action) {
      if (action == CONVERSATION_TEXT_SEND) {
        
      } else if (action == CONVERSATION_TEXT_RECV) {
        data.isMy = false;
        data.sendStatus = "success";
        self.chatItems.push(data);
      } else if (action == CONVERSATION_HISTORY_SEND) {
        self.chatItems = [...self.chatItems, ...data]
      }
    });
    this.websocket.connect(this.G.WEBSOCKET_HOST);
  }
};
</script>

