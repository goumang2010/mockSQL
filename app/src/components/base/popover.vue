<template>
<div v-show="popoverConfig.show">
    <div v-if="popoverConfig.style === 'tip'" class="tip" v-bind:style="popoverStyle"><p v-html="popoverConfig.msg"></p></div>
    <div  class="popover fade bottom in" role="tooltip" transition="fade" v-bind:style="popoverStyle" v-else>
        <div class="arrow"></div>
        <h3 class="popover-title">testtitle</h3>
        <div class="popover-content" style="width:100%">
            <ul style="max-height:300px;width:100%;overflow-y:auto;">
                <li style='width:100%'>
                    <a class='poplia' :title="popoverConfig.title" v-html="popoverConfig.msg"></a>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<style scoped>
.tip{
    display: block;
    position: absolute;  
    border: 0px solid rgb(51, 51, 51); 
    white-space: nowrap; 
    transition: left 0.4s, top 0.4s; 
    border-radius: 4px;
    color: rgb(255, 255, 255); 
    padding: 5px; 
    background-color: rgba(0, 0, 0, 0.7);
}
.tip p {
    text-align: left;
}
.popover {
    width: 400px;
    display: block;
}
.popover > .arrow {
    left: 100px;
}
.popover .poplia{
    display: inline-block;
    width: 100%;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
}
</style>
<script>
export default {
    name: 'Popover',
    computed: {
        popoverConfig() {
            return this.$store.getters.popoverConfig;
        },
        popoverStyle() {
            return {
                top: this.popoverConfig.top + 'px',
                left: this.popoverConfig.left + 'px'
            };
        }
    }
};
</script>
