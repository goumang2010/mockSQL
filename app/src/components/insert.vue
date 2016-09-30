<template>
    <div class="content-new">
    <h3>伪造插入SQL</h3>
    <hr>
    <div class="left">
        <div class="form-group">
            <label for="name" class="control-label">数据表</label>
            <div  class="group-col">
                <input 
                type="text" 
                class="form-control" 
                id="name" 
                v-model="taskInfo.tbname" 
                placeholder="填写数据表名称，默认为table_name">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label">模型选择</label>
            <div class="model-sel">
                <div class="group-col">
                    <a class="btn btn-sm">
                        <button type="button" class="btn btn-sm btn-default" onclick="document.querySelector('#model_select').click()">打开文件 ...</button>
                    </a>
                    <input style="display:none" type="file" id="model_select" accept=".js,.json,.sql" @change="getFileName($event)">
                </div>
                <div class="group-col model-type">
                    <em :class="{selected: taskInfo.modelType===0}" @click="taskInfo.modelType=0;">模块</em> 
                    <em class="disabled">JSON</em>
                    <em :class="{selected: taskInfo.modelType===2}" @click="taskInfo.modelType=2;">sql</em>
                </div>
                <input type="text" class="form-control" v-model="fileName" placeholder="模型地址"></input>
            </div>
        </div>
        <div class="form-group">
            <label for="description" class="control-label">参数设置</label>
            <div class="group-col">
                <input type="text" class="form-control" v-model="taskInfo.r" placeholder="循环次数">
                <textarea class="form-control" style="margin-top: 10px;" rows="2" v-model="taskInfo.preSQL" placeholder="预制SQL"></textarea>
            </div>
        </div>
        <div class="form-group">
            <label for="description" class="control-label">固定字段</label>
            <div class="group-col fixed-field">
                <div class="input-box">
                    <input type="text" class="form-control" v-model="curField.name" placeholder="字段名称">
                    <input type="text" class="form-control" v-model="curField.value" placeholder="可选值，用,分隔">
                </div>
                <span class="se-btn">
                    <label>数值</label>
                    <input type="checkbox" value="numeric" v-model="curField.type"> 
                    <a href="javascript:;" class="se-btn-a" @click="addField()"><i></i></a>
                </span>
                <ul>
                    <li v-for = "(item, index) in taskInfo.fixedFields">
                        <span>{{item.name}}:{{item.value}}</span>
                        <i @click = "taskInfo.fixedFields.splice(index, 1)"><b></b></i>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom-form">
            <input type="submit" value="GO" class="btn btn-success" @click="creatTask()" :class="{disabled: !(fileName)}" :disabled="(!fileName)">
            <a class="btn btn-default cancel" >取消</a>
        </div>
    </div>
    <div class="right">
        <div class="form-group">
            <label for="output" class="control-label">结果</label>
            <div class="group-col">
                <textarea class="form-control" rows="20" id="output" v-model="output"></textarea>
            </div>
        </div>
        <div class="bottom-form">
            <input type="submit" value="复制" class="btn btn-primary" @click="copyText()">
            <a class="btn btn-default cancel" @click="output=''">清空</a>
        </div>
    </div>
    </div>

</template>
<style scoped>
    .content-new {
        width: calc(100% - 50px);
        margin: 0 auto;
        overflow: hidden;
    }
    .left {
        float: left;
        width: 330px;
    }
    .right {
        float: right;
        width: calc(100% - 350px);
    }
    .right textarea {
        height: 100%;
    }
    .group-col em{
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid #ccc;
        font-style: normal;
        display: inline-block;
        height: 22px;
        width: 50px;
        padding: 0 6px;
        text-align: center;
        margin-top: 5px;
        margin-right: 10px;
    }
    em.selected {
        border: 1px solid #449D44;
    }

    .se-btn {
        float: left;
        margin-left: 10px;
    }
    .se-btn label {
        font-size: 12px;
        font-weight: normal;
    }
    .se-btn input[type=checkbox] {
        vertical-align: text-bottom;
    }
    .se-btn-a {
        display: block;
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
    }
    .se-btn-a i {
        background: url('../assets/img/newAdd.png') no-repeat;
        display: block;
        width: 15px;
        height: 10px;
        background-position: 0 -153px;
        margin: 9px auto;
    }
    .model-sel {
        overflow: hidden;
    }
    .model-sel > .group-col {
        float: left;
    }
    .model-sel > span {
        float: left;
        margin-top: 5px;
    }
    .model-type {
        margin-top: 5px;
    }
    .fixed-field {
        overflow: hidden;
    }
    .fixed-field .input-box {
        float: left;
        width: 45%;
    }
    .fixed-field .input-box input {
        margin-bottom: 5px;
    }
    .fixed-field ul {
        overflow: hidden;
        font-size: 12px;
        float: right;
        max-width: 120px;
    }
    .fixed-field ul li {
        list-style: none;
        float: right;
        height: 30px;
        border-radius: 3px;
        background: #3b73b9;
        line-height: 30px;
        color: #fff;
        margin-bottom: 2px;
    }
    .fixed-field ul li span {
        float: left;
        padding: 0 11px;
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .fixed-field ul i {
        cursor: pointer;
        float: left;
        display: inline-block;
        width: 20px;
        height: 28px;
        border-left: 1px solid #4a7bb6;
    }
    .fixed-field ul i b {
        background: url('../assets/img/newAdd.png') no-repeat;
        background-position: 0 -11px; 
        display: inline-block;
        float: left;
        width: 8px;
        height: 8px;
        margin: 10px 0 0 5px;
        transition: all .6s;
    }
    .fixed-field ul i:hover b {
        transform: rotate(180deg);
    }
</style>
<script>
import mockInsert from '../api/mockInsert';
import path from 'path';
import {tasks, Task} from '../api/task';

export default {
    name: 'projectNew',
    data() {
        return {
            id: null,
            fileName: '',
            tasks: null,
            reportData: {},
            curField: {
                name: '',
                value: '',
                type: []
            },
            taskInfo: {
                tbname: '',
                modelType: 0,
                preSQL: '',
                fixedFields: []
            },
            output: ''
        };
    },
    activated() {
        let task = this.$store.getters.taskInfo;
        if (task.argv) {
            let argv = {...task.argv};
            this.taskInfo.tbname = argv.t;
            this.taskInfo.modelType = argv.f;
            this.taskInfo.fixedFields = [...argv.filter];
            this.fileName = argv._[0];
            this.taskInfo.r = argv.r;
            this.$store.dispatch('resetTaskInfo');
        }
    },
    async mounted() {
    },
    methods: {
        async creatTask() {
            let arg = {
                _: [this.fileName],
                t: this.taskInfo.tbname,
                f: this.taskInfo.modelType,
                filter: this.taskInfo.fixedFields,
                r: this.taskInfo.r || 100,
                presql: this.presql
            };
            let result = mockInsert(arg);
            this.output = `${this.taskInfo.preSQL.replace(/[\s]+$/g, '\n')}${result.join('\n')}`;
            tasks.add(new Task({
                type: 'insert',
                tbname: arg.t,
                argv: arg
            }));
            this.$store.dispatch('freshTasksList');
        },
        getFileName(e) {
            let filename = e.target.files[0].path;
            this.fileName = filename;
            let extname = path.extname(filename).toLowerCase();
            let basename = path.basename(filename, extname);
            if (this.taskInfo.tbname === '') {
                this.taskInfo.tbname = basename;
            }
            switch (extname) {
            case '.js':
                this.taskInfo.modelType = 0;
                break;
            case '.sql':
                this.taskInfo.modelType = 2;
                break;
            case '.json':
                this.taskInfo.modelType = 1;
                break;
            default:
                break;
            }
            this.fileName = filename;
        },
        copyText() {
            let $ouput = document.getElementById('output');
            $ouput.focus();
            $ouput.select();
            document.execCommand('copy');
        },
        addField() {
            let cur = Object.assign({}, this.curField);
            if (cur.name !== '' && cur.value !== '') {
                cur.type = cur.type[0];
                let valobj = this.taskInfo.fixedFields.find(x => x.name === cur.name);
                if (valobj) {
                    valobj.value = cur.value;
                } else {
                    this.taskInfo.fixedFields.push(cur);
                }
            }
        }
    }
};
</script>
