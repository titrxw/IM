<template>
  <yd-layout>
    <chatItem v-for="(item, index) in chatItems" :key="index"   @resend="resend" :length="chatItems.length" :index="index" :item="item"></chatItem>
    <chatInput  slot="tabbar" @beforeSend="beforeSend"/>
  </yd-layout>
</template>
<script>
import chatItem from "./chat-item";
import chatInput from "./chat-input";
export default {
  components: {
    chatItem,
    chatInput
  },
  data: function() {
    return {
      chatItems: [
        {
          showTime: true,
          time: "2018-7-7",
          headUrl:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58",
          isMy: false,
          content: "sdfdsfgfhdgf3hfgh",
          type: "text",
          sendStatus: "success"
        },
        {
          showTime: false,
          time: "2018-7-7",
          headUrl:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58",
          isMy: true,
          content: "sdfdsfgfh4dgfhfgh",
          type: "text",
          sendStatus: "failed"
        },
        {
          showTime: false,
          time: "2018-7-7",
          headUrl:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58",
          isMy: true,
          content: "sdfdsfgfhdg4f5hfgh",
          type: "text",
          sendStatus: "success"
        },
        {
          showTime: true,
          time: "2018-7-7",
          headUrl:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58",
          isMy: false,
          content: "sdfdsfgfhdgf6hfgh",
          type: "text",
          sendStatus: "sending"
        },
        {
          showTime: true,
          time: "2018-7-7",
          headUrl:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58",
          isMy: true,
          content:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58",
          type: "image",
          sendStatus: "failed"
        },
        {
          showTime: true,
          time: "2018-7-7",
          headUrl:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58",
          isMy: false,
          content:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58",
          type: "image",
          sendStatus: "success"
        }
      ],
      pageHeight: 400
    };
  },
  methods: {
    beforeSend(data) {
      data.headUrl =
        "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=893776491,1251327685&fm=58";
      data.isMy = true;
      data.sendStatus = "success";
      if (data.type == "image") {
        data.content = "https://zh5j.cn/uploads/" + data.content;
      }
      this.chatItems.push(data);
      console.log(this.chatItems);
    },
    resend(data) {}
  }
};
</script>

