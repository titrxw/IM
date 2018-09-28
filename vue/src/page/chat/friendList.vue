<template>
<div class="friends">
  <div v-for="(item, index) in contacts" :key="index"  class="user" @click="select(item.union_id)">
        <img :src="item.icon" class="user_icon"></img>
        <span class="user_name">{{item.name}}</span>
  </div>
</div>
</template>
<script>
export default {
  data: function() {
    return {
      contacts: []
    };
  },
  methods: {
    select(id) {
      this.$router.push('/chat/input?uid=' + id)
    }
  },
  mounted () {
    let self = this;
    this.websocket.setOnConnect(function (data, action) {
      self.websocket.send({
        'controller': 'friend',
        'action': 'list'
      })
    })
    this.websocket.setOnMessage(function(data, action) {
      if (action == 'FRIEND_LIST_SEND') {
        self.contacts = data
      }
    });
    this.websocket.connect(this.sysConstant.WEBSOCKET_HOST);
  }
};
</script>
<style lang="less" scoped>
.friends {
  padding-left: 10px;
  padding-right: 10px;
  background:#fff;
  .user {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 52px;
    border-bottom: 1px solid #dad9d6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px;
    position: relative;
    .user_icon {
      width: 35px;
      height: 35px;
      position: absolute;
      border-radius: 5px;
    }
    .user_name {
      margin-left: 45px;
      margin-top: 0px;
      font-size: 16px;
      line-height: 35px;
    }
  }
}
</style>
