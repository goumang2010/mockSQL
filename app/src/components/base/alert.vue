<template>
    <div class="alert-con" v-show="alertConfig.show" transition="fade">
        <div class="alert" :class="[alertType, {'alert-dismissible': alertConfig.dismissible}]" role="alert">
            <button @click="hide()" v-show="alertConfig.dismissible" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            {{alertConfig.msg}}
        </div>
    </div>
</template>
<style scoped>
.alert-con {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2000;
}
</style>
<script>
export default {
    name: 'Alert',
    computed: {
        alertType() {
            return 'alert-' + this.alertConfig.type;
        },
        alertConfig() {
            return this.$store.getters.alertConfig;
        }
    },
    methods: {
        hide() {
            this.$store.dispatch('hideAlert');
        }
    }
};
</script>
