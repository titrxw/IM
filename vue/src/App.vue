<template>
  <yd-layout>
    <transition name="page-move">
      <router-view class="page-view"></router-view>
    </transition>
    <yd-tabbar style="height:50px;" slot="tabbar" v-if="$route.meta.showTabBar" activeColor="#393D49">
      <yd-tabbar-item title="消息" link="/" :active="$route.path == '/'">
      </yd-tabbar-item>
      <yd-tabbar-item title="好友" link="/friends" :active="$route.path == '/friends'">
      </yd-tabbar-item>
      <yd-tabbar-item title="发现" link="/find" :active="$route.path == '/find'">
      </yd-tabbar-item>
      <yd-tabbar-item title="我的" link="/user" :active="$route.path == '/user'">
      </yd-tabbar-item>
    </yd-tabbar>
    <yd-backtop></yd-backtop>
  </yd-layout>
</template>
<script>
export default {
  name: "app",
  watch: {
    "$store.state.msg"(val) {
      if (val) {
        this.$dialog.toast({
          mes: val,
          timeout: 1500,
          callback: () => {
            this.$store.commit("msg", "");
          }
        });
      }
    },
    '$store.state.netStatus' (val) {
      if (!val) {
        this.$dialog.loading.open("加载中...");
      } else {
        this.$dialog.loading.close();
      }
    }
  }
};
</script>
<style scoped>
.page-view{
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  top:0px;
  position: absolute;
  width:100%;
}

.page-move-enter-active,
.page-move-leave-active {
  -webkit-transition: -webkit-transform .3s;
  transition: -webkit-transform .3s;
  transition: transform .3s;
  transition: transform .3s, -webkit-transform .3s;

  transition: opacity .5s;
}
.page-move-enter, .page-move-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

