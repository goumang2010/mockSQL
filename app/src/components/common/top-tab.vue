<template>
    <ul class="nav-links">
        <li :class="{'active': isActive === item.tab}" v-for="item in tabLink.list">
            <a @click="routerGo(routeName, item)">{{item.msg}}</a>
    </ul>
</template>
<style scoped>
.nav-links {
    padding: 0;
    margin: 0;
    list-style: none;
    height: auto;
    border-bottom: 1px solid #e5e5e5;
}
.nav-links li {
    display: inline-block;
}
.nav-links li a {
    display: inline-block;
    margin: 14px;
    padding-top: 2px;
    padding-bottom: 11px;
    margin-bottom: -1px;
    font-size: 15px;
    line-height: 28px;
    color: #959494;
    border-bottom: 2px solid transparent;
    cursor: pointer;
}
.nav-links li a:hover, .nav-links li a:active, .nav-links li a:focus {
    text-decoration: none;
    outline: none;
}
.nav-links li.active a {
    border-bottom: 2px solid #4a8bee;
    color: #fff;
}
</style>
<script>
export default {
    name: 'top-tab',
    props: ['tabLink', 'routeName'],
    data() {
        return {
            isActive: '',
            watchKey() {
                return this.$route.query[this.tabLink.key];
            },
            tabSelected: null
        };
    },
    mounted() {
        this.$watch('tabSelected', this.handleChange, { deep: true, immediate: true });
    },
    methods: {
        routerGo(routeName, item) {
            this.tabLink.onChange && this.tabLink.onChange(item);
            this.$route.query[this.tabLink.key] = item.tab;
            this.$router.push({
                name: routeName,
                query: this.$route.query
            });
            this.tabSelected = item.tab;
        },
        handleChange() {
            if (!this.tabSelected) {
                this.isActive = this.tabLink.list[0].tab;
            } else {
                this.isActive = this.$route.query[this.tabLink.key];
            }
        }
    }
};
</script>
