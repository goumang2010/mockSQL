<template>
    <div>
        <div class="navbar-header">
          <button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <b class="navbar-brand">MockSQL</b>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav side-nav">
                <li>
                    <router-link to="/insert" :class="{'active': isActive === 'insert'}"><i class="fa fa-fw fa-plus"></i>插入</router-link>
                </li>
                <li>
                    <router-link to="/update" :class="{'active': isActive === 'update'}"><i class="fa fa-fw fa-pencil-square-o"></i>更新</router-link>
                </li>
                <li>
                    <router-link to="/history" :class="{'active': isActive === 'history'}"><i class="fa fa-fw fa-history"></i>历史</router-link>
                </li>
                <li>
                    <router-link to="/help" :class="{'active': isActive === 'help'}"><i class="fa fa-fw fa-question-circle-o"></i>帮助</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.fa {
    margin-right: 10px;
    margin-left: -10px;
}
.navbar-brand {
    margin-top: 10px;
}
.side-nav {
    height: 100%;
    border-radius: 0;
    overflow-y: auto;
    overflow-x: hidden;
}

.side-nav>li>a {
    min-width: 150px;
    background-color: #9d9d9d;
    color: #eee;
    margin: 10px 5px;
    cursor: pointer;
}

.side-nav li a:hover,
.active,
.side-nav li a:focus {
    outline: none;
    background-color: #000 !important;
    opacity: 0.8;
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
import jQuery from 'jquery';
export default {
    name: 'nav-slide',
    mounted() {
        window.jQuery = jQuery;
        require('bootstrap/js/collapse.js');
    },
    data() {
        return {
            isActive: ''
        };
    },
    watch: {
        '$route.path': {
            handler() {
                try {
                    this.isActive = this.$route.path.match(/\/(\w+)?\/?/)[1];
                } catch (e) {
                    console.log(e);
                    this.isActive = '';
                }
            },
            immediate: true
        }
    }
};
</script>
