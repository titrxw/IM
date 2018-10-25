<template>
    <div class="user-center">
      <div class="head-bg"> 
        <div class="user-head-bg head-box">
          <img class="user-head-pic" :src="userInfo.headimgurl">
        </div>
        <div class="user-desc-box head-box">
          <span class="user-desc name-font-size">{{ userInfo['name'] }}</span>
          <span class="user-desc name-font-size">{{ userInfo['mobile'] }}</span>
        </div>
      </div>
      <yd-cell-group>
        <yd-cell-item href="/user/password" type="link" arrow>
          <span slot="left">修改密码</span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
</template>
<script>
import { mapState,mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(['getUserInfo'])
  },
  mounted: function() {
    let self = this;
    if (this.websocket._handle) {
      self.getUserInfo(this.websocket);
    }
    this.websocket.setOnConnect(function(data, action) {
      self.getUserInfo(self.websocket);
    });
    this.websocket.connect(this.sysConstant.WEBSOCKET_HOST);
  }
};
</script>
<style scoped lang="less">
.user-center {
  .head-bg {
    height: 150px;
    width: 100%;
    background: url("../../assets/images/user-bg.png");
    background-size: 100% 100%;
    padding-top: 35px;
    .head-bg-pic {
      position: absolute;
      display: block;
      top: 0px;
      width: 100%;
      height: 162px;
    }
  }
  .user-head-bg {
    height: 70px;
    width: 70px;
    background: #fff;
    position: relative;
    padding: 1px;
    margin-left: 10px;
    border-radius: 100%;
    .user-head-pic {
      height: 100%;
      width: 100%;
      border-radius: 100%;
      position: relative;
    }
  }
  .head-box {
    float: left;
  }
  .user-desc-box {
    height: 50px;
    width: 160px;
    margin-top: 8px;
    .user-desc {
      text-align: left;
      width: 100%;
      display: block;
      color: white;
      margin-top: 7px;
      margin-left: 10px;
      position: relative;
    }
  }
}
</style>

