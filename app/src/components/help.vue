<template>
    <div class="content">
        <div class="readme" v-html="readme"></div>
    </div>

</template>
<style scoped>
.readme {
    width: 90%;
    margin: 0 auto;
    text-align: left;
}
</style>
<script>
import path from 'path';
var html = require('readme');

export default {
    name: 'projectNew',
    data() {
        return {
            readme: ''
        };
    },
    activated() {
    },
    async mounted() {
        this.readme = html;
    }
};
</script>
