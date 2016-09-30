<template>
<div>
    <div class="top-area">
        <top-tab :route-name="routeName" :tab-link="tablink"></top-tab>
        <div class="nav-controls">
            <form class="project-filter-form">
                <input type="search" @keyup="filter" v-model="queryParam.keyword" placeholder="Filter by name..." class="form-control input-short input-sm">
            </form>
            <div class="dropdown">
                <button class="dropdown-toggle btn btn-sm btn-default" type="button" @click="showSortDropDown = !showSortDropDown">
                    <span class="light">{{sortText}}</span>
                    <b class="caret"></b>
                </button>
                <ul class="dropdown-menu dropdown-menu-align-right dropdown-menu-selectable" v-show="showSortDropDown">
                    <li class="dropdown-header">排序</li>
                    <li><a href="javascript:void(0)" @click="selectChange({sortBy: 'sortname', orderBy: 'asc'})">名称顺序</a></li>
                    <li><a href="javascript:void(0)" @click="selectChange({sortBy: 'sortname', orderBy: 'desc'})">名称倒序</a></li>
                    <li><a href="javascript:void(0)" @click="selectChange({sortBy: 'sorttime', orderBy: 'asc'})">时间顺序</a></li>
                    <li><a href="javascript:void(0)" @click="selectChange({sortBy: 'sorttime', orderBy: 'desc'})">时间倒序</a></li>
                </ul>
            </div>
            <a v-if="this.type === 'project'" class="btn btn-sm btn-success"><i class="fa fa-plus"></i>新建项目</a>
            <a v-if="this.type === 'report'" class="btn btn-sm btn-success"><i class="fa fa-plus"></i>新建报表</a>
            <a v-if="this.type === 'component'" class="btn btn-sm btn-success"><i class="fa fa-plus"></i>新建组件</a>
            <a v-if="this.type === 'data'" class="btn btn-sm btn-success"><i class="fa fa-plus"></i>新建数据</a>
        </div>
    </div>
    <ul class="list-ul content-list">
        <li v-for="(item,index) of listData">
            <div class="btn-group" v-show="tablink.currentType !== 'deleted'">
                <button type="button" class="btn btn-sm btn-success" @click="editItem(item)">编辑</button>
                <button type="button" class="btn btn-sm btn-danger" @click="deleteItem(item, index)">删除</button>
            </div>
            <div class="title">
                <a href="javascript:void(0)" @click="editItem(item)" @mouseenter="showTip(item)" @mouseover="moveTip($event)" @mouseleave="hideTip()">
                    <div class="list-item-avatar-con" v-if="item[map.avatar]">
                        <img alt="" class="list-item-avatar" :src="item[map.avatar]">
                    </div>
                    <div class="list-item-avatar-con" style="background-color: #31B0D5; color: #FFFFFF" v-else>{{index+1+(paginationConf.currentPage-1)*paginationConf.itemsPerPage}}</div>
                    <span>{{item[map.name] | uppercase}} - {{item[map.id]}}</span>
                </a>
            </div>
            <div class="description">
                <p>{{item.argv | Object}} {{item[map.updatetime]?new Date(item[map.updatetime]).toLocaleString():'--'}}</p>
            </div>
        </li>
    </ul>
    <v-pagination :pagination-config.sync="paginationConf" v-if="paginationConf.totalItems > paginationConf.itemsPerPage"></v-pagination>
</div>
</template>

<style scoped>
.top-area {
    border-bottom: 1px solid #eee;
}
.top-area:before, .top-area:after {
    content: " ";
    display: table;
}
.top-area:after {
    clear: both;
}
.top-area .nav-links {
    display: inline-block;
    margin-bottom: 0;
    border-bottom: none;
}
.top-area .nav-controls {
    display: inline-block;
    float: right;
    text-align: right;
    padding: 11px 0;
    margin-bottom: 0;
}
.top-area .nav-controls>.dropdown {
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
}
.dropdown-menu-align-right {
    left: auto;
    right: 0;
}
.top-area .nav-controls>.dropdown:last-child, .top-area .nav-controls>.btn:last-child {
    margin-right: 0;
}
.top-area .nav-controls>form {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
}
.top-area .nav-controls .project-filter-form input {
    background-color: #fafafa;
    width: 200px;
}
.dropdown-menu-selectable {
    display: block;
}

.nav-links .active a {
    border-bottom-color: #000;
}
.nav-links a {
    padding-top: 0;
    line-height: 1;
}

ul.content-list>li:before,
ul.content-list>li:after {
    content: " ";
    display: table
}

ul.content-list>li:after {
    clear: both
}

ul.content-list>li:last-child {
    border-bottom: none
}

ul.content-list>li {
    border-color: #f0f0f0;
    font-size: 15px;
    color: #eee;
    text-align: left;
}

ul.content-list>li .title {
    font-weight: 600
}

ul.content-list>li a {
    color: #fff;
}

ul.content-list>li .description p {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    white-space: nowrap;
    max-width: 82%;
    margin-bottom: 0
}

ul.content-list>li .btn-group {
    padding-top: 1px;
    float: right
}

.list-ul {
    margin: 5px 0;
    padding: 0;
    list-style: none
}

.list-ul>li {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    display: block;
    margin: 0
}

.list-ul>li:before,
.list-ul>li:after {
    content: " ";
    display: table
}

.list-ul>li:after {
    clear: both
}

.list-ul>li:last-child {
    border-bottom: none
}

.list-item-avatar-con {
    float: left;
    margin-right: 15px;
    width: 40px;
    height: 40px;
    padding: 0;
    line-height: 40px;
    text-align: center;
    border-radius: 50%
}

.list-item-avatar {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%
}
.pagination-con ul {
    padding-left: 0px;
}
</style>
<script>
import TopTab from '../common/top-tab.vue';
import { $ } from '../../util/dom.js';
import {isEmptyObject} from '../../util/common';

export default {
    name: 'task-list',
    data() {
        return {
            api: null,
            showSortDropDown: false,
            paginationConf: {
                currentPage: 1,
                itemsPerPage: 7,
                pagesLength: 3,
                totalItems: 0,
                onChange() {}
            },
            sortText: '',
            listData: [],
            selectedParams: {},
            reset: false,
            queryParam: {
                keyword: '',
                page: 1,
                sortBy: 'sorttime',
                orderBy: 'desc',
                type: 'all'
            },
            timeoutList: []
        };
    },
    props: ['type', 'map', 'tablink', 'tasks', 'routeName'],
    components: {
        'top-tab': TopTab
    },
    async mounted() {
        let tasks = this.tasks;
        this.api = {
            count: {
                fn: (param) => tasks.count(param),
                param: {}
            },
            pagination: {
                fn: (param) => tasks.pagination(param),
                param: {
                    'select': '',
                    'limit': this.paginationConf.itemsPerPage,
                    'page': 1
                }
            },
            delete: {
                fn: (param) => tasks.deleteItem(param)
            }
        };
        $('html')[0].on('click', (e) => {
            if (!e.target.classList.contains('dropdown-toggle') && !e.target.classList.contains('light') && !e.target.classList.contains('caret')) {
                this.showSortDropDown = false;
            };
        });
        this.paginationConf.itemsPerPage = this.api.pagination.param.limit;
        this.selectedParams = this.api.pagination.param;
        this.paginationConf.onChange = () => {
            if (this.reset && this.paginationConf.currentPage === 1) {
                this.reset = false;
                return;
            }
            this.queryParam.page = this.paginationConf.currentPage;
        };
        this.tablink.onChange = (item) => {
            this.paginationConf.currentPage = 1;
            this.queryParam.type = item.tab;
        };
        this.parseQuery(this.queryParam);
        this.setUi(this.selectedParams);
    },
    methods: {
        filter() {
            if (this.paginationConf.currentPage !== 1) {
                this.paginationConf.currentPage = 1;
                return;
            }
        },
        fetchData(selectedParams) {
            (async () => {
                console.log(this.paginationConf);
                let res = await this.api.pagination.fn(selectedParams);
                this.listData = res;
            })();
            (async () => {
                let res = await this.api.count.fn(selectedParams);
                this.paginationConf.totalItems = res;
            })();
        },
        parseQuery(params) {
            Object.assign(this.selectedParams, params);
            let {page, limit, skip, type, keyword, sortBy, orderBy} = this.selectedParams;
            let trimed = {page, limit, skip, type, keyword, sortBy, orderBy};
            // this.selectedParams = {page, limit, skip, type, keyword};
            if (trimed.sortBy) {
                trimed.sortBy = this.map[trimed.sortBy];
            }
            this.fetchData(trimed);
        },
        setUi(params) {
            this.paginationConf.currentPage = params.page;
            if (params.sortBy === 'sortname') {
                this.sortText = (params.orderBy === 'desc' ? '名称倒序' : '名称顺序');
            } else if (params.sortBy === 'sorttime') {
                this.sortText = (params.orderBy === 'desc' ? '时间倒序' : '时间顺序');
            }
            this.tablink.currentType = params.type;
        },
        selectChange(params) {
            this.queryParam.sortBy = params.sortBy;
            this.queryParam.orderBy = params.orderBy;
            this.paginationConf.currentPage = 1;
            if (params.sortBy === 'sortname') {
                this.sortText = (params.orderBy === 'desc' ? '名称倒序' : '名称顺序');
            } else if (params.sortBy === 'sorttime') {
                this.sortText = (params.orderBy === 'desc' ? '时间倒序' : '时间顺序');
            }
        },
        showTip(item) {
            let text = `类型：${item.type}<br>表名：${item.tbname || '--'}<br>模型地址：${item.argv._ ? item.argv._[0] : '--'}<br>循环次数：${item.argv.r}<br>时间：${new Date(item.date).toLocaleString()}`;
            let config = {
                show: true,
                style: 'tip',
                delay: false,
                msg: text
            };
            this.timeoutList.forEach(x => clearTimeout(x));
            this.timeoutList = [];
            this.$store.dispatch('popover', config);
        },
        moveTip(e) {
            let config = {
                top: e.clientY - 10,
                left: e.clientX + 20
            };
            this.$store.dispatch('movePopover', config);
        },
        hideTip() {
            this.timeoutList.push(setTimeout(() => this.$store.dispatch('hidePopover'), 500));
        },
        editItem(item) {
            this.$store.dispatch('setTaskInfo', item);
            this.$router.push('/' + item.type);
        },
        async deleteItem(item, index) {
            try {
                await this.api.delete.fn(item);
            } catch (e) {
                console.log(e);
            }
            this.listData.splice(index, 1);
        },
        queryHandler() {
            if (isEmptyObject(this.queryParam)) {
                this.reset = true;
                this.selectedParams = this.api.pagination.param;
                this.setUi(this.selectedParams);
                this.fetchData();
                return;
            };
            this.parseQuery(this.queryParam);
        }
    },
    watch: {
        'queryParam': {
            handler() {
                return this.queryHandler();
            },
            deep: true
        },
        '$store.getters.freshCount': {
            handler(newValue, oldValue) {
                if (newValue !== 0) {
                    this.queryHandler();
                }
            }
        }
    }
};
</script>
