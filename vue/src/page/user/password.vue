<template>
  <div>
    <yd-cell-item >
      <span slot="left">旧密码</span>
      <yd-input  slot="right" placeholder="请输入旧密码" v-model="form.password"/>
    </yd-cell-item>
    <yd-cell-item >
      <span slot="left">新密码</span>
      <yd-input  slot="right" placeholder="请输入新密码" v-model="form.new_password"/>
    </yd-cell-item>
    <yd-cell-item >
      <span slot="left">确认密码</span>
      <yd-input  slot="right" placeholder="请输入确认密码" v-model="form.sure_password"/>
    </yd-cell-item>
 
    <div class="pd30">
      <yd-button @click.native="submit" size="large" type="warning">提交</yd-button>
    </div>
  </div>
</template>
<script>
import {MEMBER_PASSWORD_SEND, MEMBER_PASSWORD} from '../../conf/constant'
export default {
  data() {
    return {
      form: {
        password: "",
        new_password: "",
        sure_password: ""
      }
    };
  },

  methods: {
    submit() {
      let msg = "";
      if (!this.form.password) {
        msg = "请输入旧密码";
      } else if (!this.form.new_password) {
        msg = "请输入新密码";
      } else if (!this.form.sure_password) {
        msg = "请输入确认密码";
      } else if (this.form.new_password != this.form.sure_password) {
        msg = "两次密码输入不一致";
      }
      if (msg) {
        this.$store.commit('msg', msg)
        return false;
      }
      this.websocket.send({
        'action': MEMBER_PASSWORD,
        'data': this.form
      })
    }
  },
  mounted: function () {
    let self = this;
    this.websocket.setOnMessage(function(data, action) {
      if (action == MEMBER_PASSWORD_SEND) {
        self.$router.go(-1)
      }
    });
    this.websocket.connect(this.G.WEBSOCKET_HOST);
  }
};
</script>

