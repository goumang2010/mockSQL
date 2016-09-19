<template>
    <div class="side-nav-con" :class="{'side-close': !sideNavShow}">
        <ul class="nav navbar-nav side-nav">
            <li :class="{'active': isActive === 'insert'}">
                <a v-link="{name: 'newTask'}"><i class="fa fa-fw fa-plus"></i>插入</a>
            </li>
            <li :class="{'active': isActive === 'update'}">
                <a><i class="fa fa-fw fa-pencil-square-o"></i>更新</a>
            </li>
            <li :class="{'active': isActive === 'history'}">
                <a><i class="fa fa-fw fa-history"></i>历史</a>
            </li>
            <li :class="{'active': isActive === 'help'}">
                <a><i class="fa fa-fw fa-question-circle-o"></i>帮助</a>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.fa {
    margin-right: 10px;
    margin-left: -10px;
}
.side-nav-con {
    position: relative;
    overflow-x: hidden;
    -webkit-transition: all ease 0.2s;
    transition: all ease 0.2s;
    padding-left: 40px;
}

.side-nav {
    height: 100%;
    border-radius: 0;
    overflow-y: auto;
    overflow-x: hidden;
}

.side-nav>li>a {
    width: 180px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #ddd;
    margin: 10px 5px;
    cursor: pointer;
}

.side-nav li a:hover,
.side-nav li a:focus {
    outline: none;
    background-color: #000 !important;
    color: #eee;
}

.side-nav>li>ul {
    padding: 0;
}

.side-nav>li>ul>li>a {
    display: block;
    padding: 10px 15px 10px 38px;
    text-decoration: none;
    color: #999;
}

.side-nav>li>ul>li>a:hover {
    color: #fff;
}

</style>
<script>
import actions from 'actions';
import store from 'store';
export default {
    name: 'nav-slide',
    data() {
        return {
            isActive: ''
        };
    },
    vuex: {
        getters: {
            sideNavShow: () => store.state.sideNavShow
        }
    },
    methods: {
        controlSideNav() {
            actions.controlSideNav(store, !this.sideNavShow);
        }
    },
    watch: {
        '$route.path': {
            handler: function() {
                try {
                    this.isActive = this.$route.path.match(/\/(\w+)\//)[1];
                } catch (e) {
                    this.isActive = '';
                }
            },
            immediate: true
        }
    }
};
</script>
