<template>
  <div>
    <yd-cell-item >
      <span slot="left">旧密码</span>
      <input  slot="right" placeholder="请输入旧密码" v-model="form.password"/>
    </yd-cell-item>
    <yd-cell-item >
      <span slot="left">新密码</span>
      <input  slot="right" placeholder="请输入新密码" v-model="form.new_password"/>
    </yd-cell-item>
    <yd-cell-item >
      <span slot="left">确认密码</span>
      <input  slot="right" placeholder="请输入确认密码" v-model="form.sure_password"/>
    </yd-cell-item>
 
    <div class="pd30">
      <yd-button @click.native="submit" type="warning">提交</yd-button>
    </div>
  </div>
</template>
<script>
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
    }
  }
};
</script>

