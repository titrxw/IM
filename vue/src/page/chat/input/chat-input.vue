<template>
    <div class="input-flex-column">
        <div class="input-text-voice-super">
            <input v-if="inputObj.inputStatus==='text'"
                   class="chat-input-style" style="margin-left:8px;"
                   maxlength="500"  v-model="textMessage"/>
            <div style="padding: 10px;" >
              <img @click="chatInputSendExtra" class="extra-btn-style" src="../../../assets/images/chat/extra.png"/>
            </div>
        </div>
        <div v-if="chatInputShowExtra">
            <div class="list-divide-line" />
            <extra @extra-click="extraClick" :extras="chatInputExtraArr"></extra>
        </div>
    </div>

</template>
<script>
import extra from "./extra";
export default {
  components: {
    extra
  },
  data: function() {
    return {
      chatInputExtraArr: [
        {
          type: "image",
          picName: "choose_picture",
          description: "图片"
        }
      ],
      chatInputShowExtra: false,
      inputObj: {
        inputType: "",
        inputStatus: "text"
      },
      textMessage: ""
    };
  },

  methods: {
    chatInputSendExtra() {
      this.chatInputShowExtra = !this.chatInputShowExtra;
    },
    SendText(e) {
      this.textMessage = "";
      this.$emit("beforeSend", {
        type: "text",
        content: e.detail.value
      });
    },
    async extraClick(type) {
      if (type == "image") {
        
      }
    }
  }
};
</script>
<style scoped>
input {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
}

.extra-btn-style {
    width: 32px;
    height: 32px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}
.input-text-voice-super {
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  align-items: center;
  height: 58px;
}

.list-divide-line {
  width: 100%;
  height: 1px;
  background-color: #dddddd;
}

.chat-input-style {
    border-radius: 10px;
    border: 1px solid gainsboro;
    background-color: #efefef;
}

.chat-input-send-button-style {
  width: 100px;
  padding: 15px 0;
  font-size: 30px;
  text-align: center;
  margin: 0 10px;
  border-radius: 10px;
}
</style>
