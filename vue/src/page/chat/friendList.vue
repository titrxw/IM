<template>
<div class="friends">
  <div v-for="(item, index) in contacts" :key="index"  class="user" @click="select(item.id)">
        <img :src="item.icon" class="user_icon"></img>
        <span class="user_name">{{item.name}}</span>
  </div>
</div>
</template>
<script>
export default {
  data: function() {
    return {
      contacts: [
        {
          icon: "https://avatars1.githubusercontent.com/u/25978241?s=40&v=4",
          name: "测试"
        },
        {
          icon: "https://avatars1.githubusercontent.com/u/25978241?s=40&v=4",
          name: "测试1"
        },
        {
          icon: "https://avatars1.githubusercontent.com/u/25978241?s=40&v=4",
          name: "测试2"
        }
      ],
      total: 0
    };
  },
  methods: {
    select(id, evt) {
      wepy.navigateTo({ url: "/pages/chat/chat?id=" + id });
    }
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
