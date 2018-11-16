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
import { mapState,mapActions } from 'vuex'
export default {
  data: function() {
    return {
    };
  },
  methods: {
    ...mapActions(['getFriendList']),
    select(id) {
      this.$router.push('/chat/input?uid=' + id)
    }
  },
  computed: {
    ...mapState([
        'contacts'
    ])
  },
  mounted () {
    let self = this;
    this.websocket.setOnConnect(function () {
      self.getFriendList(self.websocket)
    })
    this.websocket.connect(this.G.WEBSOCKET_HOST);
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
