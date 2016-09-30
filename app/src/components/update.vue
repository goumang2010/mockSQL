<template>
    <div class="content-new">
    <h3>伪造更新SQL</h3>
    <hr>
    <div class="left">
        <div class="form-group">
            <label for="name" class="control-label">数据表</label>
            <div  class="group-col">
                <input 
                type="text" 
                class="form-control" 
                id="name" 
                v-model="tableName" 
                placeholder="填写数据表名称，默认为table_name">
            </div>
        </div>
        <div class="form-group">
            <label for="description" class="control-label">参数设置</label>
            <div class="group-col">
                <input type="text" class="form-control" v-model="repeat" placeholder="循环次数">
                <textarea class="form-control" style="margin-top: 10px;" rows="2" v-model="presql" placeholder="预制SQL"></textarea>
            </div>
        </div>
        <div class="form-group">
            <label for="description" class="control-label">字段值</label>
            <div class="group-col fixed-field">
                <div class="input-box">
                    <input type="text" class="form-control" v-model="curField.name" placeholder="字段名称">
                    <input type="text" class="form-control" v-model="curField.value" placeholder="可选值，用,分隔">
                </div>
                <span class="se-btn">
                    <label>数值</label>
                    <input type="checkbox" value="numeric" v-model="curField.type"> 
                    <button class="btn btn-primary btn-field" @click="addField()">添加</button>
                </span>
                
                <ul class="form-control">
                    <li v-for = "(item, index) in updateFields">
                        <span>{{item.name}}:{{item.value}}</span>
                        <i @click = "updateFields.splice(index, 1)"><b></b></i>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom-form">
            <input type="submit" value="GO" class="btn btn-success" @click="creatTask()" :class="{disabled: !(updateFields.length)}" :disabled="(!updateFields.length)">
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
    .se-btn {
        float: left;
        margin-left: 10px;
        margin-top: 10px;
    }
    .se-btn label {
        font-size: 12px;
        font-weight: normal;
    }
    .se-btn input[type=checkbox] {
        vertical-align: text-bottom;
    }
    .btn-field {
        font-size: 12px;
        padding: 3px 10px;
    }
    .fixed-field {
        overflow: hidden;
    }
    .fixed-field .input-box {
    }
    .fixed-field .input-box input {
        margin: 0 5px;
        width: 45%;
        float: left;
    }
    .fixed-field ul {
        overflow: hidden;
        font-size: 12px;
        float: left;
        min-height: 120px;
        clear: both;
        margin-top: 10px;
        margin-bottom: 0;
    }
    .fixed-field ul li {
        list-style: none;
        float: left;
        height: 30px;
        border-radius: 3px;
        background: #3b73b9;
        line-height: 30px;
        color: #fff;
        margin-bottom: 2px;
        margin-right: 5px;
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
import mockUpdate from '../api/mockUpdate';
import {tasks, Task} from '../api/task';
export default {
    name: 'projectNew',
    data() {
        return {
            id: null,
            tableName: '',
            repeat: '',
            presql: '',
            curField: {
                name: '',
                value: '',
                type: []
            },
            updateFields: [],
            output: ''
        };
    },
    activated() {
        let task = this.$store.getters.taskInfo;
        if (task.argv) {
            let argv = {...task.argv};
            this.tableName = argv.t;
            this.updateFields = [...argv.filter];
            this.$store.dispatch('resetTaskInfo');
        }
    },
    async mounted() {
    },
    components: {
    },
    methods: {
        async creatTask() {
            let arg = {
                t: this.tableName,
                filter: this.updateFields,
                r: this.repeat,
                presql: this.presql
            };
            let result = mockUpdate(arg);
            this.output = `${this.presql}\n${result.join('\n')}`;
            tasks.add(new Task({
                type: 'update',
                tbname: arg.t,
                argv: arg
            }));
            this.$store.dispatch('freshTasksList');
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
                let valobj = this.updateFields.find(x => x.name === cur.name);
                if (valobj) {
                    valobj.value = cur.value;
                } else {
                    this.updateFields.push(cur);
                }
            }
        }
    }
};
</script>
