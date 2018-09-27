<template>
  <yd-layout>
    <chatItem v-for="(item, index) in chatItems" :key="index"   @resend="resend" :length="chatItems.length" :index="index" :item="item"></chatItem>
    <chatInput  slot="tabbar" @beforeSend="beforeSend"/>
  </yd-layout>
</template>
<script>
import chatItem from "./chat-item";
import chatInput from "./chat-input";
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
  methods: {
    beforeSend(data) {
      if (!this.websocket._handle) {
        return false;
      }
      data.headUrl =
        "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58";
      data.isMy = true;
      data.sendStatus = "success";
      if (data.type == "image") {
        data.content = "https://zh5j.cn/uploads/" + data.content;
      }
      this.chatItems.push(data);
      this.websocket.send({
        controller: "conversation",
        action: "text",
        data: {
          uid: this.unionId,
          text: data.content
        }
      })
    },
    resend(data) {}
  },
  mounted () {
    this.unionId = this.$route.query.uid
    let self = this;
    this.websocket.setOnMessage(function(data, action) {
      if (action == "CONVERSATION_TEXT_SEND") {
        
      } else if (action == "CONVERSATION_TEXT_RECV") {
        data.headUrl =
          "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58";
        data.isMy = false;
        data.sendStatus = "success";
        self.chatItems.push(data);
      }
    });
    this.websocket.connect(this.sysConstant.WEBSOCKET_HOST);
  }
};
</script>

