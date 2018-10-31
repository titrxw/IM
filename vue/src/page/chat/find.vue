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
import {mapState, mapActions} from 'vuex'
import {
  FRIEND_FINDUSER,
  FRIEND_ADD,
  FRIEND_SUREADD
} from '../../conf/constant'
export default {
  data() {
    return {
      searchValue: "",
      searchResults: []
    };
  },
  components: {
    Search
  },
  computed: {
    ...mapState([
        'addPeoples',
        'requestPeoples'
    ])
  },
  methods: {
    ...mapActions(['getAddLogs']),
    onCancel() {},
    onSubmit() {
      if (!this.searchValue) {
        this.$store.commit("msg", "请输入搜索条件");
        return false;
      }
      this.websocket.send({
        'action': FRIEND_FINDUSER,
        data: {
          keyword: this.searchValue
        }
      });
    },
    addFriend(uid) {
      this.websocket.send({
        'action': FRIEND_ADD,
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
        'action': FRIEND_SUREADD,
        data: {
          uid: uid
        }
      });
    }
  },
  mounted() {
    let self = this;
    this.websocket.setOnConnect(function () {
      self.getAddLogs(self.websocket)
    })
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
