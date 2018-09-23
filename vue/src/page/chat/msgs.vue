<template>
<div class="message">
  <div v-for="(item, index) in list" :key="index" class="item" @click="select(item.id)">
      <div class="header">
          <img class="img" :src="item.icon"></img>
      </div>
      <div class="content">
          <div class="name"><span>{{item.name}}</span> <span style="float:right;font-size:20px;color: #7b7b7b;">{{ item.time }}</span> </div>
          <div class="lastmsg">{{item.lastmsg}}</div>
      </div>
  </div>
</div>
</template>
<script>
export default {
  data: function() {
    return {
      list: [
        {
          time: "12:09",
          icon: "https://avatars1.githubusercontent.com/u/25978241?s=40&v=4",
          name: "测试",
          lastmsg: "cetry换个房间和"
        },
        {
          time: "12:19",
          icon: "https://avatars1.githubusercontent.com/u/25978241?s=40&v=4",
          name: "测试",
          lastmsg: "cetry换个房间和"
        },
        {
          time: "11:09",
          icon: "https://avatars1.githubusercontent.com/u/25978241?s=40&v=4",
          name: "测试",
          lastmsg: "cetry换个房间和"
        }
      ]
    };
  },
  methods: {
    select(id, evt) {},
  },
  mounted () {
    let that = this
    this.websocket.setOnMessage(function (data,action) {
      if (action == 'COMMON_USERBINDFD') {
        that.websocket.send({
          'controller': 'conversation',
            'action': 'text',
            'data': {
              'uid': 'u_228550207745257472',
              'text': 'dsadsafdsaf'
            }
        })
      }
    });
    
    if (this.websocket._handle) {
      this.websocket.send({
        'controller': 'conversation',
          'action': 'text',
          'data': {
            'uid': 'u_228550207745257472',
            'text': 'dsadsafdsaf'
          }
      })
    } else {
      this.websocket.connect(this.sysConstant.WEBSOCKET_HOST)
    }
  }
};
</script>
<style lang="less" scoped>
.message {
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fff;
  .item {
    display: flex;
    height: 68px;
    border-bottom: 1px solid #dad9d6;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
    .header {
      width: 48px;
      height: 48px;
      overflow: hidden;
      border-radius: 5px;
      .img {
        width: 50px;
        height: 50px;
      }
    }
    .content {
      margin-left: 10px;
      flex: 1;
      .name {
        color: #000;
        font-size: 16px;
        padding: 5px 0;
      }
      .lastmsg {
        overflow: hidden;
        height: 20px;
        color: #7b7b7b;
        font-size: 13px;
        padding-top: 2px;
      }
    }
  }
}
</style>