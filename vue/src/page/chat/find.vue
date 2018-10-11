<template>
  <div>
    <Search
        placeholder="请输入手机号码"
        v-model="searchValue"
        :results="searchResults"
        @on-cancel="onCancel"
        :autoFixed="false"
        @on-submit="onSubmit"></Search>
    <div class="theme-padding-top">
      <div v-for="(item, index) in addPeoples" :key="index"  class="people">
        <img :src="item.headimgurl"/>
        <div class="info">
          <span class="name">{{item.name}}</span>
          <span class="account">{{item.mobile}}</span>
        </div>
        <div class="operate">
          <yd-button @click.native="addFriend(item.union_id)" type="hollow" v-if="!item.is_friend">添加</yd-button>
          <yd-button type="primary" @click.native="sendMsg(item.union_id)" v-if="item.is_friend">发消息</yd-button>
        </div>
      </div>
    </div>
    <div class="theme-padding-top">
      <div v-for="(item, index) in requestPeoples" :key="index"  class="people">
        <img :src="item.headimgurl"/>
        <div class="info">
          <span class="name">{{item.name}}</span>
          <span class="account">{{item.mobile}}</span>
        </div>
        <div class="operate">
          <yd-button @click.native="sureAddFriend(item.union_id)" type="hollow" v-if="!item.is_friend">添加</yd-button>
          <yd-button type="primary" @click.native="sendMsg(item.union_id)" v-if="item.is_friend">发消息</yd-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search";
import Validate from "@/libs/validate";
export default {
  data() {
    return {
      searchValue: "",
      searchResults: [],
      addPeoples: {},
      requestPeoples: {}
    };
  },
  components: {
    Search
  },
  methods: {
    onCancel() {},
    onSubmit() {
      if (!Validate.isMobile(this.searchValue)) {
        this.$store.commit("msg", "请输入正确的手机号码");
        return false;
      }
      this.websocket.send({
        'action': 'FRIEND_FINDUSERBYMOBILE',
        data: {
          mobile: this.searchValue
        }
      });
    },
    addFriend(uid) {
      this.websocket.send({
        'action': 'FRIEND_ADD',
        data: {
          uid: uid
        }
      });
    },
    sendMsg(uid) {
      this.$router.push("/chat/input?uid=" + uid);
    },
    sureAddFriend(uid) {
      this.websocket.send({
        'action': 'FRIEND_SUREADD',
        data: {
          uid: uid
        }
      });
    }
  },
  mounted() {
    let self = this;
    if (this.websocket._handle) {
      self.websocket.send({
        'action': 'FRIEND_ADDLOG'
      })
    }
    this.websocket.setOnConnect(function (data, action) {
      self.websocket.send({
        'action': 'FRIEND_ADDLOG'
      })
    })
    this.websocket.setOnMessage(function(data, action) {
      if (action == 'FRIEND_ADDLOG_SEND') {
        if (data.add) {
          for (let index in data.add) {
            data.add[index].is_friend = data.add[index].status == 1 ? false : true
          }
          self.addPeoples = data.add
        }
        if (data.request) {
          for (let index in data.request) {
            data.request[index].is_friend = data.request[index].status == 1 ? false : true
          }
          self.requestPeoples = data.request
        }
      } else if (action == "FRIEND_FINDUSERBYMOBILE_SEND") {
        if (!data) {
          return false;
        }
        self.$set(self.addPeoples, data.union_id, data)
      } else if (action == "FRIEND_ADD_SEND") {
        self.$store.commit("msg", "添加好友请求发送成功");
        // 发送成功
      } else if (action == "FRIEND_ADD_RECV") {
        // 收到添加好友请求
        data.is_friend = false;
        self.$set(self.requestPeoples, data.union_id, data)
      } else if (action == "FRIEND_SUREADD_SEND") {
        // data 为 uid
        // 更改 requestPeople 的status
        self.$set(self.requestPeoples[data], 'is_friend', true)
        if (self.addPeoples[data]) {
          self.$set(self.addPeoples[data], 'is_friend', true)
        }
        self.$store.commit("msg", "添加好友成功");
      } else if (action == "FRIEND_SUREADD_RECV") {
        // 收到添加好友请求
        // data.uid 为好友的id
        // 更改addPeoples的status
        self.$set(self.addPeoples[data.union_id], 'is_friend', true)
        if (self.requestPeoples[data.union_id]) {
          self.$set(self.requestPeoples[data.union_id], 'is_friend', true)
        }
      }
    });
    this.websocket.connect(this.sysConstant.WEBSOCKET_HOST);
  }
};
</script>
<style lang="less">
.people {
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
