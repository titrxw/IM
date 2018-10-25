<template>
    <div class="theme-padding-top">
      <div v-for="(item, index) in contacts" :key="index" @click="select(item.union_id)"  class="friends">
        <img :src="item.headimgurl"/>
        <div class="info">
          <span class="name">{{item.name}}</span>
          <span class="account">{{item.mobile}}</span>
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
    getFriendList () {
      if (this.contacts.length == 0) {
        this.websocket.send({
          'action': 'FRIEND_LIST'
        })
      }
    }
  },
  computed: {
    ...mapState([
        'contacts'
    ])
  },
  mounted () {
    let self = this;
    if (this.websocket._handle) {
      self.getFriendList()
    }
    this.websocket.setOnConnect(function (data) {
      self.getFriendList()
    })
    this.websocket.connect(this.sysConstant.WEBSOCKET_HOST);
  }
};
</script>
<style lang="less" scoped>
.friends {
  height: 70px;
  display: flex;
  background: #fff;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;
  img {
    width: 50px;
    height: 50px;
  }
  .info {
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    line-height: 25px;
  }
  .operate {
    padding-top: 10px;
  }
}
</style>
