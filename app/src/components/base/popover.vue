<template>
    <div class="popover fade bottom in" v-show="popoverConfig.show" role="tooltip" transition="fade" v-bind:style="popoverStyle">
        <div class="arrow"></div>
        <h3 class="popover-title">testtitle</h3>
        <div class="popover-content" style="width:100%">
            <ul style="max-height:300px;width:100%;overflow-y:auto;">
                <li style='width:100%'>
                    <a class='poplia' title='testtitle'>testdddd</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
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
                // display: 'block',
                top: this.popoverConfig.top,
                left: this.popoverConfig.left
            };
        }
    },
    methods: {
        hide() {
            this.$store.dispatch('hidePopover');
        }
    }
};
</script>
