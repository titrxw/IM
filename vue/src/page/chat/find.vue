<template>
  <div>
    <Search
        placeholder="请输入手机号码"
        v-model="searchValue"
        @on-cancel="onCancel"
        :autoFixed="false"
        @on-submit="onSubmit"></Search>
    <div>
      <div v-for="(item, index) in peoples" :key="index"  class="people" @click="select(item.id)">
        <img :src="item.icon"/>
        <div class="info">
          <span class="name">{{item.name}}</span>
          <span class="account">{{item.account}}</span>
        </div>
        <div class="operate">
          <yd-button type="hollow" v-if="item.status == 0">添加</yd-button>
          <yd-button type="primary" v-if="item.status == 1">发消息</yd-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from '@/components/search'
export default {
  data () {
    return {
      searchValue: '',
      peoples: [
        {
          icon: "https://avatars1.githubusercontent.com/u/25978241?s=40&v=4",
          name: "测试1",
          account: '23210493240',
          status: 0
        },
        {
          icon: "https://avatars1.githubusercontent.com/u/25978241?s=40&v=4",
          name: "测试213213",
          account: '23232210493240',
          status: 0
        },
        {
          icon: "https://avatars1.githubusercontent.com/u/25978241?s=40&v=4",
          name: "测试76",
          account: '2493240',
          status: 1
        }
      ]
    }
  },
  components: {
    Search
  },
  methods: {
    onCancel () {

    },
    onSubmit () {

    }
  },
  mounted () {
    let self = this
    this.websocket.setOnMessage(function (data, action) {
      if (action == 'FRIEND_FINDUSERBYMOBILE') {
        self.peoples = data
      }
    });
    this.websocket.connect(this.sysConstant.WEBSOCKET_HOST)
  }
}
</script>
<style lang="less">
.people{
    height: 70px;
    display: flex;
    background: #fff;
    padding: 10px;
    border-bottom: 1px solid #f4f4f4;
    img{
      width:50px;
      height:50px;
    }
    .info{
      flex: 1;
      margin-left: 10px;
      display: flex;    
      flex-direction: column;
      line-height: 25px;
    }
    .operate{
      padding-top: 10px;
    }
}
</style>
