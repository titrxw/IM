<template>
<div class="message">
  <div v-for="(item, index) in msgList" :key="index" class="item" @click="select(item.union_id)">
      <div class="header">
          <img class="img" :src="item.headimgurl"></img>
      </div>
      <div class="content">
          <div class="name"><span>{{item.name}}</span> <span style="float:right;font-size:13px;color: #7b7b7b;">{{ item.time }}</span> </div>
          <div class="lastmsg">{{item.content}}</div>
      </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: function() {
    return {
    };
  },
  methods: {
    select(id) {
      this.$router.push('/chat/input?uid=' + id)
    },
    getMsgList () {
      if (JSON.stringify(this.msgList) == '{}') {
        this.websocket.send({
          'action': 'CONVERSATION_LIST'
        })
      }
    }
  },
  computed: {
    ...mapState([
        'msgList'
    ])
  },
  mounted () {
    let self = this
    this.websocket.setOnConnect(function (data) {
      self.getMsgList()
    })
    if (this.websocket._handle) {
      self.getMsgList()
    }
    this.websocket.connect(this.sysConstant.WEBSOCKET_HOST)
  }
};
</script>
<style lang="less" scoped>
.message {
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fff;
  .item {
    display: flex;
    height: 68px;
    border-bottom: 1px solid #dad9d6;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
    .header {
      width: 48px;
      height: 48px;
      overflow: hidden;
      border-radius: 5px;
      .img {
        width: 50px;
        height: 50px;
      }
    }
    .content {
      margin-left: 10px;
      flex: 1;
      .name {
        color: #000;
        font-size: 16px;
        padding: 5px 0;
      }
      .lastmsg {
        overflow: hidden;
        height: 20px;
        color: #7b7b7b;
        font-size: 13px;
        padding-top: 2px;
      }
    }
  }
}
</style>