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
                    <li><a href="javascript:void(0)" @click="selectChange({sortBy: 'name', orderBy: 'asc'})">名称顺序</a></li>
                    <li><a href="javascript:void(0)" @click="selectChange({sortBy: 'name', orderBy: 'desc'})">名称倒序</a></li>
                    <li><a href="javascript:void(0)" @click="selectChange({sortBy: 'updatetime', orderBy: 'asc'})">时间顺序</a></li>
                    <li><a href="javascript:void(0)" @click="selectChange({sortBy: 'updatetime', orderBy: 'desc'})">时间倒序</a></li>
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
                <button type="button" class="btn btn-sm btn-danger" @click="deleteItem(item)">删除</button>
            </div>
            <div class="title">
                <a href="javascript:void(0)" @click="itemDetail(item)">
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
    <v-pagination :pagination-config.sync="paginationConf" v-if="paginationConf.totalItems > 8"></v-pagination>
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
    color: #5c5c5c;
    text-align: left;
}

ul.content-list>li .title {
    font-weight: 600
}

ul.content-list>li a {
    color: #333
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
import actions from 'actions';
import store from 'store';
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
                itemsPerPage: 8,
                pagesLength: 5,
                totalItems: 0,
                onChange() {}
            },
            sortText: '时间倒序',
            listData: [],
            selectedParams: {},
            reset: false,
            queryParam: {
                keyword: '',
                page: 1,
                sortBy: '',
                orderBy: ''
            }
        };
    },
    props: ['type', 'map', 'tablink', 'getTasks', 'routeName'],
    components: {
        'top-tab': TopTab
    },
    async mounted() {
        let tasks = await this.getTasks();
        this.api = {
            count: {
                fn: (param) => {
                    return tasks.count(param);
                },
                param: {
                    'filter': ''
                }
            },
            pagination: {
                fn: (param) => {
                    console.log(param);
                    if (param.orderBy && param.sortBy) {
                        param.sort = {};
                        param.sort[this.map[param.sortBy]] = param.orderBy === 'asc' ? 1 : -1;
                        delete param.orderBy;
                        delete param.sortBy;
                    }
                    return tasks.pagination(param);
                },
                param: {
                    'select': '',
                    'sort': {'_updatedAt': -1},
                    'limit': 8,
                    'page': 1,
                    'filter': ''
                }
            },
            delete: {
                fn: tasks.deleteTasks
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
            this.$router.push({
                query: this.queryParam
            });
        };
        this.tablink.onChange = (item) => {
            this.paginationConf.currentPage = 1;
            this.tablink.currentType = item.tab;
            this.queryHandler();
        };
        this.parseQuery();
        this.setUi(this.selectedParams);
        this.$watch('queryParam', this.queryHandler, {deep: true});
    },
    methods: {
        filter() {
            this.queryParam.keyword;
            if (this.paginationConf.currentPage !== 1) {
                this.paginationConf.currentPage = 1;
                return;
            }
            this.$router.push({
                query: this.queryParam
            });
        },
        fetchData() {
            (async () => {
                let res = await this.api.pagination.fn(this.selectedParams);
                this.listData = res;
            })();
            (async () => {
                let res = await this.api.count.fn(this.selectedParams);
                this.paginationConf.totalItems = res;
            })();
        },
        parseQuery() {
            Object.assign(this.selectedParams, this.queryParam);
            if (this.selectedParams.page) {
                this.selectedParams.page = parseInt(this.selectedParams.page);
            }
            this.fetchData();
        },
        setUi(params) {
            this.paginationConf.currentPage = params.page;
            if (params.sortBy === 'name') {
                this.sortText = (params.orderBy === 'desc' ? '名称倒序' : '名称顺序');
            } else if (params.sortBy === 'time') {
                this.sortText = (params.orderBy === 'desc' ? '时间倒序' : '时间顺序');
            }
            this.tablink.currentType = params.groupBy;
        },
        selectChange(params) {
            this.queryParam.sortBy = params.sortBy;
            this.queryParam.orderBy = params.orderBy;
            this.paginationConf.currentPage = 1;
            if (params.sortBy === 'name') {
                this.sortText = (params.orderBy === 'desc' ? '名称倒序' : '名称顺序');
            } else if (params.sortBy === 'updatetime') {
                this.sortText = (params.orderBy === 'desc' ? '时间倒序' : '时间顺序');
            }
            this.$router.push({
                query: this.queryParam
            });
        },
        editItem(item) {
        },
        deleteItem(item) {
        },
        queryHandler() {
            if (isEmptyObject(this.queryParam)) {
                this.reset = true;
                this.selectedParams = this.api.pagination.param;
                this.setUi(this.selectedParams);
                this.fetchData();
                return;
            };
            this.parseQuery();
        }
    }
};
</script>
