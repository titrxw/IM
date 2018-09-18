<template>
    <div  class="extra-super" >
        <div v-for="(item, index) in extras" :key="index"  @click="clickExtraItem(item.type)" class="flex-column" style="width: 25%" >
            <img class="extra-image-size" :src="'../../../assets/images/chat/extra/' + item.picName + '.png'" />
            <span class="extra-text-size">{{item.description}}</span>
        </div>
    </div>
</template>
<script>
export default{
    props: {
        extras: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    methods: {
        clickExtraItem (type) {
            this.$emit('extra-click',type)
        }
    }
}
</script>
<style scoped>
.extra-super{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 25px;
    height: 144px;
    width: 100%;
    background-color: white;
}
.extra-image-size{
    width: 76px;
    height: 76px
}
.extra-text-size{
    color: #666666;
    font-size: 13px;
    margin-top: 10px;
}

.flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.flex-row{
    display: flex;
}
</style>
